// src/routes/index.js
import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Jobs from "../pages/Jobs";
import Settings from "../pages/Settings";
import Verification from "../pages/Verification";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          !isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/signin"
        element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/verification"
        element={
          <ProtectedRoute>
            <Verification />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
