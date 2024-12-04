// controllers/jobController.js
const Job = require("../models/Job");
const Application = require("../models/Application");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      type,
      location,
      experience,
      remote,
      salary,
      sort = "-createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    let query = {};

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Filters
    if (category) query.category = category;
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: "i" };
    if (experience) query.experience = experience;
    if (remote) query.isRemote = remote === "true";
    if (salary) query["salary.min"] = { $lte: parseInt(salary) };

    // Status should be published
    query.status = "published";

    // Execute query with pagination
    const jobs = await Job.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("postedBy", "firstName lastName company");

    // Get total count
    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      count: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: jobs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "firstName lastName company"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private/Employer
exports.createJob = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Employer
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Verify ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this job",
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Employer
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Verify ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this job",
      });
    }

    // Delete all applications for this job
    await Application.deleteMany({ job: req.params.id });

    // Delete the job
    await job.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
