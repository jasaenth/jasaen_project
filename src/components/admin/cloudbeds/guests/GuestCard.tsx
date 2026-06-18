"use client";

import { Mail, Phone } from "lucide-react";

interface GuestCardProps {
  guest: {
    id: string;
    name: string;
    email: string;
    phone: string;
    stays: number;
    spent: string;
  };
}

export default function GuestCard({
  guest,
}: GuestCardProps) {
  return (
    <div className="bg-white border rounded-3xl p-6 hover:shadow-lg transition-all">
      
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
          {guest.name.charAt(0)}
        </div>

        <div>
          <h3 className="font-bold text-lg">
            {guest.name}
          </h3>

          <p className="text-sm text-gray-500">
            Guest ID: {guest.id}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail size={16} />
          <span className="text-sm">
            {guest.email}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Phone size={16} />
          <span className="text-sm">
            {guest.phone}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            Total Stays
          </p>

          <h4 className="text-xl font-bold mt-1">
            {guest.stays}
          </h4>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            Lifetime Spend
          </p>

          <h4 className="text-xl font-bold mt-1">
            {guest.spent}
          </h4>
        </div>
      </div>
    </div>
  );
}