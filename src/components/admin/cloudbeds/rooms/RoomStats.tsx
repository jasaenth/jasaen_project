"use client";

import {
  BedDouble,
  CheckCircle2,
  Wrench,
  Hotel,
} from "lucide-react";

const stats = [
  {
    title: "Total Rooms",
    value: "48",
    icon: Hotel,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Available",
    value: "32",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Occupied",
    value: "12",
    icon: BedDouble,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Maintenance",
    value: "4",
    icon: Wrench,
    color: "bg-red-100 text-red-600",
  },
];

export default function RoomStats() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white border rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}