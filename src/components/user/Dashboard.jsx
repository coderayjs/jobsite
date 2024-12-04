import React, { useState } from "react";
import {
  DollarSign,
  Briefcase,
  Clock,
  CheckCircle,
  Settings,
  User,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  PieChart,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = {
    totalEarned: 1250.0,
    pendingAmount: 450.0,
    completedJobs: 15,
    activeJobs: 3,
    pendingJobs: 2,
  };

  const recentJobs = [
    {
      id: 1,
      title: "Data Entry Specialist",
      company: "TechCorp",
      status: "Active",
      amount: 250,
    },
    {
      id: 2,
      title: "Virtual Assistant",
      company: "RemoteWork Inc",
      status: "Completed",
      amount: 300,
    },
    {
      id: 3,
      title: "Content Writer",
      company: "ContentKing",
      status: "Pending",
      amount: 150,
    },
  ];

  const notifications = [
    { id: 1, message: "New job invitation received", time: "2 hours ago" },
    { id: 2, message: "Payment processed successfully", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-64`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">JobBoard</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg">
              <PieChart size={20} />
              <span>Overview</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Briefcase size={20} />
              <span>Jobs</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <User size={20} />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings size={20} />
              <span>Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Shield size={20} />
              <span>Verification</span>
            </a>
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
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
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Earned</p>
                  <h3 className="text-2xl font-bold">${stats.totalEarned}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Pending Amount</p>
                  <h3 className="text-2xl font-bold">${stats.pendingAmount}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Completed Jobs</p>
                  <h3 className="text-2xl font-bold">{stats.completedJobs}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <CheckCircle className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Cashout
                  <DollarSign size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Jobs</h2>
              <button className="text-blue-600 flex items-center gap-2">
                <Plus size={20} />
                Find Jobs
              </button>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-4">Job Title</th>
                      <th className="pb-4">Company</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-t">
                        <td className="py-4">{job.title}</td>
                        <td className="py-4">{job.company}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              job.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : job.status === "Completed"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4">${job.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Notifications</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Bell size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
