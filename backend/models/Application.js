// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  resume: {
    url: {
      type: String,
      required: true,
    },
    filename: String,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "reviewing", "shortlisted", "rejected", "accepted"],
    default: "pending",
  },
  expectedSalary: {
    amount: Number,
    currency: {
      type: String,
      default: "USD",
    },
  },
  experience: {
    years: Number,
    details: String,
  },
  answers: [
    {
      question: String,
      answer: String,
    },
  ],
  notes: [
    {
      text: String,
      addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  statusHistory: [
    {
      status: {
        type: String,
        enum: ["pending", "reviewing", "shortlisted", "rejected", "accepted"],
      },
      changedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent multiple applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Update timestamps
applicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Application", applicationSchema);
