// controllers/applicationController.js
const Application = require("../models/Application");
const Job = require("../models/Job");
const sendEmail = require("../utils/sendEmail");

// @desc    Apply for job
// @route   POST /api/jobs/:jobId/apply
// @access  Private
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate(
      "postedBy",
      "email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if job is still accepting applications
    if (job.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications",
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
      expectedSalary: req.body.expectedSalary,
      experience: req.body.experience,
      answers: req.body.answers,
    });

    // Increment applications count
    job.applicationsCount += 1;
    await job.save();

    // Send email notification to employer
    await sendEmail({
      email: job.postedBy.email,
      subject: `New application for ${job.title}`,
      message: `You have received a new application for the position of ${job.title}.`,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Employer
exports.updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: "job",
        select: "postedBy title",
      })
      .populate({
        path: "applicant",
        select: "email firstName lastName",
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Verify ownership
    if (
      application.job.postedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this application",
      });
    }

    // Update status
    application.status = req.body.status;
    application.statusHistory.push({
      status: req.body.status,
      changedBy: req.user.id,
    });

    // Add note if provided
    if (req.body.note) {
      application.notes.push({
        text: req.body.note,
        addedBy: req.user.id,
      });
    }

    await application.save();

    // Send email notification to applicant
    await sendEmail({
      email: application.applicant.email,
      subject: `Application Status Update - ${application.job.title}`,
      message: `Your application status has been updated to: ${req.body.status}`,
    });

    res.json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get my applications
// @route   GET /api/applications/me
// @access  Private
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: "job",
        select: "title company status",
      })
      .sort("-createdAt");

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get applications for a job
// @route   GET /api/jobs/:jobId/applications
// @access  Private/Employer
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

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
        message: "Not authorized to view these applications",
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate({
        path: "applicant",
        select: "firstName lastName email",
      })
      .sort("-createdAt");

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
