"use client";

import {
  BedDouble,
  LogIn,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TodaysHouse() {
  const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  fetch("/api/admin/dashboard")
    .then((res) => res.json())
    .then((data) => setDashboard(data.data));
}, []);

if (!dashboard) return null;

console.log(dashboard);

const stats = [
  {
    title: "Arrivals",
    value: dashboard.arrivals,
    icon: LogIn,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Departures",
    value: dashboard.departures,
    icon: LogOut,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "In House",
    value: dashboard.inHouse,
    icon: BedDouble,
    color: "bg-green-100 text-green-700",
  },
];

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h2 className="font-display text-2xl text-maroon">
          Today's House
        </h2>

      </div>

      {/* Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                bg-white
                rounded-3xl
                border
                border-borderlight
                p-6
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              {/* Icon + Title */}

              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-11
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${item.color}
                  `}
                >
                  <Icon size={20} />
                </div>

                <p className="text-sm font-medium text-muted-foreground leading-5">
                  {item.title}
                </p>
              </div>

              {/* Value */}

              <div className="mt-6">
                <h3 className="text-4xl font-playfair font-semibold text-maroon">
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}