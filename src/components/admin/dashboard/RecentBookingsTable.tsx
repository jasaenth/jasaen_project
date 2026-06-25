"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { IBooking } from "@/types/Booking";

export default function RecentBookingsTable() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/bookings");

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      const latestBookings = data.data
        .sort(
          (a: IBooking, b: IBooking) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

      setBookings(latestBookings);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-4xl border border-borderlight p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-maroon">
          Recent Bookings
        </h2>

        <Link
          href="/admin/bookings"
          className="text-maroon font-medium hover:underline"
        >
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No bookings found.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 text-left tracking-[0.25em] text-xs">
                GUEST
              </th>

              <th className="text-left tracking-[0.25em] text-xs">
                ROOM
              </th>

              <th className="text-left tracking-[0.25em] text-xs">
                CHECK-IN
              </th>

              

              <th className="text-left tracking-[0.25em] text-xs">
                AMOUNT
              </th>

              <th className="text-left tracking-[0.25em] text-xs">
                STATUS
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => {
              const nights = Math.ceil(
                (new Date(booking.checkOut).getTime() -
                  new Date(booking.checkIn).getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-6 font-medium">
                    {booking.user?.name}
                  </td>

                  <td>
                    {booking.room?.roomName}
                  </td>

                  <td>
                    {new Date(
                      booking.checkIn
                    ).toLocaleDateString()}
                  </td>

                 

                  <td>
                    ฿ {booking.totalAmount.toLocaleString()}
                  </td>

                  <td>
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        font-medium
                        ${
                          booking.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "CONFIRMED"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "IN_HOUSE"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "COMPLETED"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}