"use client";

import { X } from "lucide-react";
import { Booking } from "./bookingsData";

interface BookingViewModalProps {
  booking: Booking | null;
  onClose: () => void;
}

const BookingViewModal = ({
  booking,
  onClose,
}: BookingViewModalProps) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-8 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-textmuted hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Booking Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Info label="Booking ID" value={booking.id} />
          <Info label="Guest Name" value={booking.guestName} />
          <Info label="Email" value={booking.email} />
          <Info label="Room Type" value={booking.roomType} />
          <Info label="Check In" value={booking.checkIn} />
          <Info label="Check Out" value={booking.checkOut} />
          <Info label="Guests" value={booking.guests.toString()} />
          <Info label="Amount" value={`₹${booking.amount}`} />
          <Info label="Status" value={booking.status} />
        </div>
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <p className="text-sm text-textmuted">{label}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

export default BookingViewModal;