import React from "react";
import clsx from "clsx";

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 duration-300 ease-in-out"
      style={{
        animation: "fadeInUp 0.5s ease", // Smooth entry animation
      }}>
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        </div>

        {/* Icon Container */}
        <div
          className={clsx(
            "p-3 rounded-lg transition-all duration-300 ease-in-out",
            `bg-${color}-100`,
            `text-${color}-600`
          )}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
