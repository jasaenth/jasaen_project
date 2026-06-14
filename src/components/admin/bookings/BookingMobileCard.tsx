"use client";

import { IBooking } from "@/types/Booking";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  booking: IBooking;
  onView: (booking: IBooking) => void;
  onEdit: (booking: IBooking) => void;
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
        <p className="font-bold text-primary">{booking._id}</p>
        <p>{booking.user?.name || "User Deleted"}</p>
        <p className="text-textmuted">{booking.user?.email || "-"}</p>
        <p>{booking.room?.roomType}</p>
        <p>₹{booking.totalAmount}</p>
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
          onClick={() => onDelete(booking._id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default BookingMobileCard;