// middleware/fileUpload.js
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/";

    // Determine folder based on file type
    if (file.fieldname === "resume") {
      uploadPath += "resumes/";
    } else if (file.fieldname === "avatar") {
      uploadPath += "avatars/";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err);
      }
      cb(null, buf.toString("hex") + path.extname(file.originalname));
    });
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    // Allow PDFs and DOCs for resumes
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Please upload a PDF or DOC file"), false);
    }
  } else if (file.fieldname === "avatar") {
    // Allow images for avatars
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image file"), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export middleware for different upload scenarios
exports.uploadResume = upload.single("resume");
exports.uploadAvatar = upload.single("avatar");
exports.uploadMultiple = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
]);

// Error handling middleware
exports.handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 5MB",
      });
    }
  }
  next(err);
};
