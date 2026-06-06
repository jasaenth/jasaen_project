"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        "/api/bookings"
      );

      const data =
        await res.json();

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (
    id: string
  ) => {
    if (
      !confirm(
        "Cancel this booking?"
      )
    )
      return;

    try {
      const res = await fetch(
        `/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setBookings((prev: any) =>
          prev.filter(
            (item: any) =>
              item._id !== id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
      <h1 className="text-4xl font-bold mb-10">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <h3 className="text-2xl font-semibold">
            No Bookings Found
          </h3>

          <p className="mt-3 text-gray-500">
            Start exploring our
            rooms.
          </p>

          <Link
            href="/rooms"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl"
          >
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map(
            (booking: any) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border"
              >
                <div className="grid lg:grid-cols-4">
                  {/* Image */}
                  <div className="relative h-72 lg:h-auto">
                    <Image
                      src={
                        booking.room
                          .images?.[0]
                          ?.url
                      }
                      alt={
                        booking.room
                          .roomName
                      }
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-8">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <h2 className="text-3xl font-bold">
                          {
                            booking
                              .room
                              .roomName
                          }
                        </h2>

                        <p className="text-gray-500 mt-2">
                          {
                            booking
                              .room
                              .roomType
                          }
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold h-fit ${
                          booking.status ===
                          "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : booking.status ===
                                "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-5 mt-8">
                      <Info
                        label="Check In"
                        value={new Date(
                          booking.checkIn
                        ).toLocaleDateString()}
                      />

                      <Info
                        label="Check Out"
                        value={new Date(
                          booking.checkOut
                        ).toLocaleDateString()}
                      />

                      <Info
                        label="Guests"
                        value={
                          booking.guests
                        }
                      />

                      <Info
                        label="Total"
                        value={`₹${booking.totalAmount}`}
                      />
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Link
                        href={`/rooms/${booking.room._id}`}
                        className="bg-primary text-white px-6 py-3 rounded-xl"
                      >
                        View Room
                      </Link>

                      {booking.status !==
                        "CANCELLED" && (
                        <button
                          onClick={() =>
                            cancelBooking(
                              booking._id
                            )
                          }
                          className="border border-red-500 text-red-500 px-6 py-3 rounded-xl"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}