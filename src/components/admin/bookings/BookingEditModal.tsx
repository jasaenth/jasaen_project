"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Booking } from "./bookingsData";

interface Props {
  booking: Booking | null;
  onClose: () => void;
  onSave: (updatedBooking: Booking) => void;
}

const BookingEditModal = ({
  booking,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] = useState<Booking | null>(booking);

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  if (!formData) return null;

  const handleChange = (
    key: keyof Booking,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Edit Booking
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <Input
            label="Guest Name"
            value={formData.guestName}
            onChange={(v) => handleChange("guestName", v)}
          />

          <Input
            label="Email"
            value={formData.email}
            onChange={(v) => handleChange("email", v)}
          />

          <Input
            label="Room Type"
            value={formData.roomType}
            onChange={(v) => handleChange("roomType", v)}
          />

          <Input
            label="Amount"
            value={formData.amount}
            onChange={(v) => handleChange("amount", Number(v))}
          />

          <select
            value={formData.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value as Booking["status"]
              )
            }
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Canceled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}) => (
  <div>
    <p className="text-sm text-textmuted mb-2">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-borderlight rounded-xl px-4 py-3"
    />
  </div>
);

export default BookingEditModal;