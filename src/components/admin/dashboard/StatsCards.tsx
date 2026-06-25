"use client";

import { useEffect, useState } from "react";
import { CalendarDays, } from "lucide-react";

export default function StatsCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data.data));
  }, []);

  if (!stats) return null;

  const cards = [
    {
      title: "ACTIVE BOOKINGS",
      value: stats.totalBookings,
      subtitle: `${stats.pendingBookings} Pending`,
      icon: CalendarDays,
    },
    {
      title: "REVENUE",
      value: `฿ ${stats.revenue.toLocaleString()}`,
      subtitle: "All Time",
      icon: CalendarDays,
    },
    
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-4xl border border-borderlight p-6 shadow-sm"
          >
            <div className="flex justify-between">
              <div className="w-10 h-10 rounded-full bg-[#f5ecef] flex items-center justify-center">
                <Icon size={22} className="text-maroon" />
              </div>

              <span className="text-green-600 text-sm">{item.subtitle}</span>
            </div>

            <h3 className="text-3xl font-playfair mt-5">{item.value}</h3>

            <p className="mt-2 text-xs text-muted-foreground">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}
