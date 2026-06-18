"use client";

import { Bell } from "lucide-react";

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  type?: "info" | "success" | "warning";
}

export default function NotificationItem({
  title,
  message,
  time,
  type = "info",
}: NotificationItemProps) {
  const colors = {
    info: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white border rounded-3xl p-5">
      <div className="flex gap-4">
        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            ${colors[type]}
          `}
        >
          <Bell size={20} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold">
              {title}
            </h3>

            <span className="text-xs text-gray-400 whitespace-nowrap">
              {time}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}