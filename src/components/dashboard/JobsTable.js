import React from "react";
import { Plus } from "lucide-react";

export const JobsTable = ({ jobs }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 duration-300 ease-in-out">
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">Recent Jobs</h2>
      <button className="text-blue-600 flex items-center gap-2 hover:text-blue-800 transition-all duration-200 ease-in-out">
        <Plus size={20} />
        Find Jobs
      </button>
    </div>
    <div className="p-4 overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-4">Job Title</th>
            <th className="pb-4">Company</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-t hover:bg-gray-50 transition-all duration-200 ease-in-out">
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
);

export default JobsTable;
