// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  company: {
    type: String,
    required: [true, "Please add a company name"],
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  experience: {
    type: String,
    enum: ["Entry", "Junior", "Mid-Level", "Senior", "Lead"],
    required: true,
  },
  salary: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    currency: {
      type: String,
      default: "USD",
    },
  },
  skills: [
    {
      type: String,
    },
  ],
  requirements: [
    {
      type: String,
    },
  ],
  benefits: [
    {
      type: String,
    },
  ],
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published", "closed"],
    default: "published",
  },
  applicationDeadline: {
    type: Date,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  applicationsCount: {
    type: Number,
    default: 0,
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
jobSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search
jobSchema.index({
  title: "text",
  description: "text",
  company: "text",
  location: "text",
});

module.exports = mongoose.model("Job", jobSchema);
