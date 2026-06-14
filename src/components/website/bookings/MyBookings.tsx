"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");

      const data = await res.json();

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-40 text-center">
        <p className="text-textmuted">
          Loading your reservations...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-bgmain min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="gold-divider justify-center mb-5">
            Guest Dashboard
          </span>

          <h1 className="font-display text-5xl md:text-6xl text-maroon">
            My Bookings
          </h1>

          <p className="mt-4 text-textmuted max-w-2xl mx-auto">
            Manage your reservations, review booking details,
            and prepare for your next stay at Jasaen Boutique Hotel.
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-ivory rounded-4xl border border-borderlight shadow-soft p-14 text-center">
            <h3 className="font-display text-4xl text-maroon">
              No Reservations Yet
            </h3>

            <p className="mt-4 text-textmuted">
              Discover our rooms and create your first stay.
            </p>

            <Link
              href="/rooms"
              className="
                inline-flex
                items-center
                mt-8
                rounded-full
                bg-gold
                px-8
                py-4
                text-charcoal
                font-medium
                hover:bg-gold-soft
                transition
              "
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {bookings.map((booking: any) => {
              const nights = Math.max(
                1,
                Math.ceil(
                  (new Date(booking.checkOut).getTime() -
                    new Date(booking.checkIn).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              );

              return (
                <div
                  key={booking._id}
                  className="
                    bg-ivory
                    rounded-4xl
                    overflow-hidden
                    border
                    border-borderlight
                    shadow-soft
                    hover:shadow-luxe
                    transition-all
                    duration-500
                  "
                >
                  <div className="grid lg:grid-cols-4">
                    {/* Image */}
                    <div className="relative h-80 lg:h-full">
                      <Image
                        src={booking.room?.images?.[0]?.url}
                        alt={booking.room?.roomName}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      {/* Booking ID + Status */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-gold">
                          Booking #{booking._id.slice(-8)}
                        </span>

                        <span
                          className={`
                            rounded-full
                            px-4
                            py-1.5
                            text-xs
                            font-medium
                            ${
                              booking.status === "CONFIRMED"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Room Name */}
                      <h2 className="font-display text-4xl text-maroon">
                        {booking.room?.roomName}
                      </h2>

                      <p className="text-textmuted mt-2">
                        {booking.room?.roomType}
                      </p>

                      {/* Booking Details */}
                      <div className="grid md:grid-cols-6 gap-4 mt-8">
                        <Info
                          label="Booked On"
                          value={new Date(
                            booking.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        />

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
                          value={booking.guests}
                        />

                        <Info
                          label="Nights"
                          value={nights}
                        />

                        <Info
                          label="Total"
                          value={`₹${booking.totalAmount}`}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-4 mt-10">
                        <Link
                          href={`/rooms/${booking.room._id}`}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            bg-maroon
                            px-7
                            py-3
                            text-ivory
                            font-medium
                            hover:bg-maroon/90
                            transition
                          "
                        >
                          View Room
                        </Link>

                        <Link
                          href="/contact"
                          className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gold
                            px-7
                            py-3
                            text-maroon
                            font-medium
                            hover:bg-gold/10
                            transition
                          "
                        >
                          Need Assistance?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
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
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-borderlight
        p-4
      "
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-textmuted">
        {label}
      </p>

      <p className="mt-2 text-charcoal font-medium">
        {value}
      </p>
    </div>
  );
}