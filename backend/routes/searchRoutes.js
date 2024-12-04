// routes/searchRoutes.js
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const { protect, authorize } = require("../middleware/auth");
const { query } = require("express-validator");

// Validation middleware
const validateSearchQuery = [
  query("keyword").optional().trim().escape(),
  query("location").optional().trim().escape(),
  query("type")
    .optional()
    .isIn(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]),
  query("experience")
    .optional()
    .isIn(["Entry", "Junior", "Mid-Level", "Senior", "Lead"]),
  query("salary").optional().isNumeric(),
  query("remote").optional().isBoolean(),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 50 }),
  query("sortBy").optional().isIn(["createdAt", "relevance", "salary"]),
  query("sortOrder").optional().isIn(["asc", "desc"]),
];

// Routes
router.get("/jobs", validateSearchQuery, searchController.searchJobs);
router.get("/jobs/suggestions", protect, searchController.getJobSuggestions);
router.get(
  "/candidates",
  protect,
  authorize("employer", "admin"),
  searchController.searchCandidates
);
router.get("/filters", searchController.getSearchFilters);

module.exports = router;
