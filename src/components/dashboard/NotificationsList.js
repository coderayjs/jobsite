import React from "react";
import { Bell } from "lucide-react";
import clsx from "clsx";

export const NotificationsList = ({ notifications }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 duration-300 ease-in-out">
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">
        Recent Notifications
      </h2>
    </div>
    <div className="p-4">
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={clsx(
                "flex items-start space-x-4 p-4 border rounded-lg transition-all duration-200 ease-in-out",
                {
                  "bg-gray-50": notification.read,
                  "bg-yellow-50": !notification.read,
                }
              )}
              style={{
                animation: `fadeIn 0.5s ease ${index * 0.1}s`, // Staggered fade-in effect
              }}>
              <div
                className={clsx(
                  "p-3 rounded-lg transition-all duration-300 ease-in-out",
                  notification.read ? "bg-blue-100" : "bg-yellow-100"
                )}>
                <Bell size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  </div>
);

export default NotificationsList;
