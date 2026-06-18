"use client";

import SectionHead from "../SectionHead";
import NotificationItem from "./NotificationItem";

const notifications = [
  {
    title: "New Reservation",
    message:
      "A new booking was received from Booking.com for Deluxe Double A.",
    time: "2 min ago",
    type: "success" as const,
  },
  {
    title: "Payment Failed",
    message:
      "Payment transaction PAY-324 failed for reservation RSV-102.",
    time: "15 min ago",
    type: "warning" as const,
  },
  {
    title: "Room Maintenance",
    message:
      "Room 302 has been marked for maintenance.",
    time: "30 min ago",
    type: "info" as const,
  },
  {
    title: "Guest Check-In",
    message:
      "John Smith successfully checked into Executive Suite.",
    time: "1 hour ago",
    type: "success" as const,
  },
  {
    title: "Channel Sync",
    message:
      "Inventory synced successfully across all OTA channels.",
    time: "2 hours ago",
    type: "info" as const,
  },
  {
    title: "Occupancy Alert",
    message:
      "Occupancy exceeded 90% for this weekend.",
    time: "3 hours ago",
    type: "warning" as const,
  },
];

export default function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Notifications"
        subtitle="System alerts, reservations, payments and hotel activity updates."
      />

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            title={notification.title}
            message={notification.message}
            time={notification.time}
            type={notification.type}
          />
        ))}
      </div>
    </div>
  );
}