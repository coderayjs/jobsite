// services/searchService.js
const Job = require("../models/Job");
const User = require("../models/User");
const Profile = require("../models/Profile");

class SearchService {
  async searchJobs(params) {
    try {
      const {
        keyword,
        location,
        type,
        experience,
        salary,
        remote,
        category,
        skills,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = params;

      // Build query
      let query = { status: "published" };
      let sort = {};

      // Text search with keyword
      if (keyword) {
        query.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } },
        ];
      }

      // Location filter
      if (location) {
        query.location = { $regex: new RegExp(location, "i") };
      }

      // Job type filter
      if (type) {
        if (Array.isArray(type)) {
          query.type = { $in: type };
        } else {
          query.type = type;
        }
      }

      // Experience level filter
      if (experience) {
        if (Array.isArray(experience)) {
          query.experience = { $in: experience };
        } else {
          query.experience = experience;
        }
      }

      // Salary range filter
      if (salary) {
        const salaryRange = this.parseSalaryRange(salary);
        if (salaryRange) {
          query["salary.min"] = { $lte: salaryRange.max };
          query["salary.max"] = { $gte: salaryRange.min };
        }
      }

      // Remote work filter
      if (remote === "true") {
        query.isRemote = true;
      }

      // Category filter
      if (category) {
        if (Array.isArray(category)) {
          query.category = { $in: category };
        } else {
          query.category = category;
        }
      }

      // Skills filter
      if (skills) {
        const skillsArray = Array.isArray(skills)
          ? skills
          : skills.split(",").map((s) => s.trim());
        query.skills = { $in: skillsArray };
      }

      // Apply sorting
      if (sortBy === "relevance" && keyword) {
        // Sort by text match relevance if keyword search is used
        sort.score = { $meta: "textScore" };
      } else {
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
      }

      // Execute query with pagination
      const jobs = await Job.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("postedBy", "firstName lastName company");

      // Get total count
      const total = await Job.countDocuments(query);

      return {
        jobs,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      };
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  async getJobSuggestions(userId) {
    try {
      const user = await User.findById(userId).populate("profile");

      if (!user.profile) {
        return [];
      }

      // Build query based on user profile and preferences
      const query = {
        status: "published",
        $or: [
          { skills: { $in: user.profile.skills.map((s) => s.name) } },
          { category: { $in: user.profile.jobPreferences.desiredJobTypes } },
        ],
      };

      // Salary preferences
      if (user.profile.jobPreferences.expectedSalary?.minimum) {
        query["salary.max"] = {
          $gte: user.profile.jobPreferences.expectedSalary.minimum,
        };
      }

      // Location preferences
      if (user.profile.jobPreferences.desiredLocations?.length > 0) {
        query.$or.push({
          location: {
            $in: user.profile.jobPreferences.desiredLocations.map(
              (loc) => new RegExp(loc, "i")
            ),
          },
        });
      }

      // Remote work preference
      if (user.profile.jobPreferences.remoteWork) {
        query.$or.push({ isRemote: true });
      }

      return await Job.find(query)
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("postedBy", "firstName lastName company");
    } catch (error) {
      console.error("Job suggestions error:", error);
      throw error;
    }
  }

  async searchCandidates(params) {
    try {
      const {
        keyword,
        skills,
        experience,
        location,
        page = 1,
        limit = 10,
      } = params;

      // Build query for profiles
      let query = {
        "settings.profileVisibility": "public",
      };

      // Keyword search in bio and title
      if (keyword) {
        query.$or = [
          { bio: { $regex: keyword, $options: "i" } },
          { title: { $regex: keyword, $options: "i" } },
        ];
      }

      // Skills filter
      if (skills) {
        const skillsArray = Array.isArray(skills) ? skills : skills.split(",");
        query["skills.name"] = { $in: skillsArray };
      }

      // Experience filter
      if (experience) {
        query["experience.years"] = { $gte: parseInt(experience) };
      }

      // Location filter
      if (location) {
        query["location.city"] = { $regex: location, $options: "i" };
      }

      const profiles = await Profile.find(query)
        .populate("user", "firstName lastName email")
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await Profile.countDocuments(query);

      return {
        profiles,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error("Candidate search error:", error);
      throw error;
    }
  }

  // Helper method to parse salary range
  parseSalaryRange(salary) {
    if (typeof salary === "string" && salary.includes("-")) {
      const [min, max] = salary.split("-").map((num) => parseInt(num.trim()));
      return { min, max };
    }
    if (typeof salary === "number") {
      return { min: 0, max: salary };
    }
    return null;
  }

  // Helper method to calculate relevance score
  calculateRelevanceScore(job, userProfile) {
    let score = 0;

    // Skills match
    const userSkills = new Set(
      userProfile.skills.map((s) => s.name.toLowerCase())
    );
    const jobSkills = new Set(job.skills.map((s) => s.toLowerCase()));
    const skillsMatch = [...userSkills].filter((skill) => jobSkills.has(skill));
    score += (skillsMatch.length / jobSkills.size) * 40; // Skills worth 40%

    // Experience match
    if (userProfile.experience && job.experience) {
      const experienceMatch = Math.abs(
        userProfile.experience.years - parseInt(job.experience)
      );
      score += (1 / (experienceMatch + 1)) * 30; // Experience worth 30%
    }

    // Location match
    if (userProfile.jobPreferences.desiredLocations.includes(job.location)) {
      score += 20; // Location worth 20%
    }

    // Remote preference match
    if (userProfile.jobPreferences.remoteWork === job.isRemote) {
      score += 10; // Remote preference worth 10%
    }

    return Math.min(score, 100); // Cap at 100%
  }
}

module.exports = new SearchService();
