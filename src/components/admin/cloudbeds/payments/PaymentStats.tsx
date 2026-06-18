"use client";

import {
  Wallet,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "฿1,284,500",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Transactions",
    value: "842",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Successful",
    value: "812",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Failed",
    value: "30",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
];

export default function PaymentStats() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white border rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {item.value}
                </h3>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
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