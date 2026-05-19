"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Booking } from "./bookingsData";

interface Props {
  booking: Booking;
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

const BookingMobileCard = ({
  booking,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="space-y-2">
        <p className="font-bold text-primary">{booking.id}</p>
        <p>{booking.guestName}</p>
        <p className="text-textmuted">{booking.email}</p>
        <p>{booking.roomType}</p>
        <p>₹{booking.amount}</p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onView(booking)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <Eye size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onEdit(booking)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(booking.id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default BookingMobileCard;