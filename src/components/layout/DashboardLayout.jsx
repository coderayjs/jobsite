// src/components/layout/DashboardLayout.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  DollarSign,
  Briefcase,
  Settings,
  User,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  PieChart,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { icon: PieChart, text: "Overview", path: "/dashboard" },
    { icon: Briefcase, text: "Jobs", path: "/dashboard/jobs" },
    { icon: User, text: "Profile", path: "/dashboard/profile" },
    { icon: Settings, text: "Settings", path: "/dashboard/settings" },
    { icon: Shield, text: "Verification", path: "/dashboard/verification" },
  ];

  const currentUser = user?.id || "user1"; // Replace with actual logged-in user ID
  const chatPartner = "user2"; // Replace with the other user's ID (for example, the employer or freelancer)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-64`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              JobBoard
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  window.location.pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}>
                <item.icon size={20} />
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white shadow h-16 flex items-center justify-between px-4">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          {children}

        
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
