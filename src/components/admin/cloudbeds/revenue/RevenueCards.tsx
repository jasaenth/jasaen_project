"use client";

import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Hotel,
} from "lucide-react";

const cards = [
  {
    title: "Total Revenue",
    value: "฿1,284,500",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "ADR",
    value: "฿3,250",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "RevPAR",
    value: "฿2,665",
    icon: BarChart3,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Occupancy",
    value: "82%",
    icon: Hotel,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function RevenueCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white border rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
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