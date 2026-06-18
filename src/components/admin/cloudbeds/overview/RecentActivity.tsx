"use client";

const activities = [
  {
    id: 1,
    title: "New Reservation",
    description: "Deluxe Double booked",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Guest Check-In",
    description: "Executive Suite",
    time: "10 min ago",
  },
  {
    id: 3,
    title: "Payment Received",
    description: "฿8,500",
    time: "15 min ago",
  },
  {
    id: 4,
    title: "Room Available",
    description: "Suite 302",
    time: "30 min ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white border rounded-3xl p-6">
      <h3 className="text-lg font-bold mb-5">
        Recent Activity
      </h3>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-b last:border-0 pb-4"
          >
            <h4 className="font-semibold">
              {activity.title}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {activity.description}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}