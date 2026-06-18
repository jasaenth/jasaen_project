"use client";

import SectionHead from "../SectionHead";
import GuestCard from "./GuestCard";

const guests = [
  {
    id: "GST-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+66 89 123 4567",
    stays: 8,
    spent: "฿42,500",
  },
  {
    id: "GST-002",
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "+66 88 444 5555",
    stays: 4,
    spent: "฿18,700",
  },
  {
    id: "GST-003",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+66 87 999 8888",
    stays: 12,
    spent: "฿71,300",
  },
  {
    id: "GST-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+66 85 111 2222",
    stays: 6,
    spent: "฿29,800",
  },
  {
    id: "GST-005",
    name: "David Lee",
    email: "david@example.com",
    phone: "+66 84 777 9999",
    stays: 3,
    spent: "฿11,400",
  },
  {
    id: "GST-006",
    name: "Sophia Taylor",
    email: "sophia@example.com",
    phone: "+66 83 555 7777",
    stays: 9,
    spent: "฿53,900",
  },
];

export default function GuestsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Guest Management"
        subtitle="Manage guest profiles, contact information and stay history."
      />

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-3xl p-6">
          <p className="text-sm text-gray-500">
            Total Guests
          </p>

          <h3 className="text-3xl font-bold mt-2">
            324
          </h3>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-sm text-gray-500">
            Returning Guests
          </p>

          <h3 className="text-3xl font-bold mt-2">
            108
          </h3>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-sm text-gray-500">
            VIP Guests
          </p>

          <h3 className="text-3xl font-bold mt-2">
            26
          </h3>
        </div>
      </div>

      {/* Guest Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guests.map((guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
          />
        ))}
      </div>
    </div>
  );
}