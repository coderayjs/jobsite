import React, { useState } from "react";
import { Mail, Lock, User, Briefcase, Eye, EyeOff, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUpModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "jobSeeker",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setApiError("");

      try {
        const response = await axios.post(
          "https://jobsite-yd5v.onrender.com/api/auth/register",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: formData.accountType === "employer" ? "employer" : "user",
          }
        );

        if (response.data.token) {
          // Save token and user data
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          // Close modal and redirect
          onClose();
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setApiError(
          error.response?.data?.message ||
            "Failed to register. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurred Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </div>

          {/* Add error message display */}
          {apiError && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          {/* Account Type Selection */}
          <div className="flex justify-center space-x-4 my-6">
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                formData.accountType === "jobSeeker"
                  ? "bg-blue-50 text-blue-600 border-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 border-2 border-transparent"
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "accountType", value: "jobSeeker" },
                })
              }>
              <User className="w-5 h-5 mr-2" />
              Job Seeker
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                formData.accountType === "employer"
                  ? "bg-blue-50 text-blue-600 border-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 border-2 border-transparent"
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "accountType", value: "employer" },
                })
              }>
              <Briefcase className="w-5 h-5 mr-2" />
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className={`mt-1 block w-full rounded-lg border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className={`mt-1 block w-full rounded-lg border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  className={`block w-full rounded-lg border p-2.5 pl-10 text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`block w-full rounded-lg border p-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Update submit button to show loading state */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50">
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Social Sign Up */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                LinkedIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;