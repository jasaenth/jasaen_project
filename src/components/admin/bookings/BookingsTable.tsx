"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import BookingMobileCard from "./BookingMobileCard";
import { IBooking } from "@/types/Booking";

interface Props {
  bookings: IBooking[];

  onView: (booking: IBooking) => void;

  onEdit: (booking: IBooking) => void;

  onDelete: (id: string) => void;

  onStatusChange: (
    id: string,
    status: "CONFIRMED" | "IN_HOUSE" | "COMPLETED" | "CANCELLED",
  ) => void;
}

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700",

  CONFIRMED: "bg-blue-100 text-blue-700",

  IN_HOUSE: "bg-green-100 text-green-700",

  COMPLETED: "bg-purple-100 text-purple-700",

  CANCELLED: "bg-red-100 text-red-700",
};

const BookingsTable = ({
  bookings,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) => {
  return (
    <>
      {/* Desktop Table */}

      <div className="hidden lg:block bg-white rounded-2xl border border-borderlight shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#faf7f1]">
              <tr className="text-left">
                <th className="px-6 py-5 tracking-[0.25em] text-xs">BOOKING</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">GUEST</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">ROOM</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">DATES</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">GUESTS</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">TOTAL</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">STATUS</th>

                <th className="px-6 py-5 tracking-[0.25em] text-xs">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="
                    border-b
                    border-borderlight
                    hover:bg-bgmain/50
                  "
                >
                  <td className="px-6 py-5 text-primary text-xs">
                    {booking._id}
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-sm">
                        {booking.user?.name || "User Deleted"}
                      </p>

                      <p className="text-xs text-textmuted">
                        {booking.user?.email || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-xs">
                    {booking.room?.roomType}
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-xs">
                      <p>{new Date(booking.checkIn).toLocaleDateString()}</p>

                      <p>
                        to {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-xs">{booking.guests}</td>

                  <td className="px-6 py-5 font-semibold text-xs">
                    ฿ {booking.totalAmount}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        ${
                          statusStyles[
                            booking.status as keyof typeof statusStyles
                          ]
                        }
                      `}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      

                      {/* View */}

                      <button
                        onClick={() => onView(booking)}
                        className="
                          p-2
                          rounded-lg
                          bg-blue-100
                          text-blue-700
                          hover:bg-blue-200
                        "
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() => onEdit(booking)}
                        className="
                          p-2
                          rounded-lg
                          bg-yellow-100
                          text-yellow-700
                          hover:bg-yellow-200
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => onDelete(booking._id)}
                        className="
                          p-2
                          rounded-lg
                          bg-red-100
                          text-red-700
                          hover:bg-red-200
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {bookings.map((booking) => (
          <BookingMobileCard
            key={booking._id}
            booking={booking}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default BookingsTable;
