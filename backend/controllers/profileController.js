// controllers/profileController.js
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "firstName lastName email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    // Create profile
    profile = await Profile.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(req.body);
    await profile.save();

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.addEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(req.body);
    await profile.save();

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateJobPreferences = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { jobPreferences: req.body } },
      { new: true }
    );

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
