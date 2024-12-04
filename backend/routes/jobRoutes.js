// backend/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplications,
  getMyApplications,
  getMyPostedJobs,
} = require("../controllers/jobController");

// Job routes
router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", protect, authorize("employer", "admin"), createJob);
router.put("/:id", protect, authorize("employer", "admin"), updateJob);
router.delete("/:id", protect, authorize("employer", "admin"), deleteJob);

// Application routes
router.post("/:id/apply", protect, applyForJob);
router.get(
  "/:id/applications",
  protect,
  authorize("employer", "admin"),
  getJobApplications
);
router.get("/applications/me", protect, getMyApplications);
router.get(
  "/posted/me",
  protect,
  authorize("employer", "admin"),
  getMyPostedJobs
);

module.exports = router;
