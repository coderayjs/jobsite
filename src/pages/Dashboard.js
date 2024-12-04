// src/pages/Dashboard.js
import React from "react";
import { DollarSign, Clock, CheckCircle } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  StatsCard,
  JobsTable,
  NotificationsList,
} from "../components/dashboard";

const Dashboard = () => {
  // This would typically come from an API
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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Earned"
            value={`$${stats.totalEarned}`}
            icon={DollarSign}
            color="green"
          />
          <StatsCard
            title="Pending Amount"
            value={`$${stats.pendingAmount}`}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Completed Jobs"
            value={stats.completedJobs}
            icon={CheckCircle}
            color="blue"
          />
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
        <JobsTable jobs={recentJobs} />

        {/* Notifications */}
        <NotificationsList notifications={notifications} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
