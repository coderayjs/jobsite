// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  forgotPassword: (email) => api.post("/auth/forgotpassword", { email }),
  resetPassword: (token, password) =>
    api.put(`/auth/resetpassword/${token}`, { password }),
  getProfile: () => api.get("/auth/me"),
};

export const jobAPI = {
  getJobs: (params) => api.get("/jobs", { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post("/jobs", jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyForJob: (id, applicationData) =>
    api.post(`/jobs/${id}/apply`, applicationData),
  getApplications: (id) => api.get(`/jobs/${id}/applications`),
  getMyApplications: () => api.get("/jobs/applications/me"),
};

export const profileAPI = {
  getProfile: () => api.get("/profile"),
  updateProfile: (profileData) => api.put("/profile", profileData),
  addExperience: (experienceData) =>
    api.post("/profile/experience", experienceData),
  deleteExperience: (id) => api.delete(`/profile/experience/${id}`),
  addEducation: (educationData) =>
    api.post("/profile/education", educationData),
  deleteEducation: (id) => api.delete(`/profile/education/${id}`),
  uploadResume: (formData) =>
    api.post("/profile/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadAvatar: (formData) =>
    api.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const searchAPI = {
  searchJobs: (params) => api.get("/search/jobs", { params }),
  getJobSuggestions: () => api.get("/search/jobs/suggestions"),
  searchCandidates: (params) => api.get("/search/candidates", { params }),
  getSearchFilters: () => api.get("/search/filters"),
};

export default api;
