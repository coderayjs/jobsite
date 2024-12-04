// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Here you'll make an API call to verify the token
        // For now, we'll just use the stored user data
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      // Here you'll make an API call to login
      // For now, we'll just simulate it
      const mockUser = {
        id: "1",
        name: "Test User",
        email: credentials.email,
        role: "user",
      };
      const mockToken = "mock-token";

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      setError("Login failed");
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      // Here you'll make an API call to register
      // For now, we'll just simulate it
      const mockUser = {
        id: "1",
        name: userData.name,
        email: userData.email,
        role: "user",
      };
      const mockToken = "mock-token";

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      setError("Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isEmployer: user?.role === "employer",
        isAdmin: user?.role === "admin",
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
