// models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // Basic Information
  avatar: {
    url: String,
    filename: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  bio: {
    type: String,
    maxlength: [500, "Bio cannot be more than 500 characters"],
  },

  // Professional Information
  title: String,
  skills: [
    {
      name: String,
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
      yearsOfExperience: Number,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      location: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: String,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      issueDate: Date,
      expiryDate: Date,
      credentialID: String,
      credentialURL: String,
    },
  ],

  // Job Preferences
  jobPreferences: {
    desiredJobTypes: [
      {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
      },
    ],
    desiredLocations: [String],
    remoteWork: {
      type: Boolean,
      default: true,
    },
    expectedSalary: {
      minimum: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },
    willingToRelocate: {
      type: Boolean,
      default: false,
    },
  },

  // Social Profiles
  social: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String,
    portfolio: String,
  },

  // Resume
  resumes: [
    {
      name: String,
      url: String,
      filename: String,
      isDefault: {
        type: Boolean,
        default: false,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // Settings
  settings: {
    emailNotifications: {
      jobAlerts: {
        type: Boolean,
        default: true,
      },
      applicationUpdates: {
        type: Boolean,
        default: true,
      },
      messages: {
        type: Boolean,
        default: true,
      },
    },
    profileVisibility: {
      type: String,
      enum: ["public", "private", "employers-only"],
      default: "public",
    },
  },

  // Timestamps
  lastActive: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp before saving
profileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Profile", profileSchema);
