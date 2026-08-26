"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, CalendarDays, Users, Moon, CreditCard, MapPin } from "lucide-react";

interface Booking {
  _id: string;
  bookingId: string;
  status: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  createdAt: string;

  room?: {
    _id: string;
    roomName: string;
    roomType: string;
    description?: string;
    images?: {
      url: string;
      publicId?: string;
    }[];
    amenities?: string[];
  };
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected booking for popup
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

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

  const calculateNights = (
    checkIn: string,
    checkOut: string
  ) => {
    return Math.max(
      1,
      Math.ceil(
        (new Date(checkOut).getTime() -
          new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <>
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

              {bookings.map((booking) => {
                const nights = calculateNights(
                  booking.checkIn,
                  booking.checkOut
                );

                const roomImage =
                  booking.room?.images?.[0]?.url ||
                  "/images/placeholder-room.jpg";

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

                      {/* Room Image */}

                      <div className="relative h-80 lg:h-full min-h-[320px]">
                        <Image
                          src={roomImage}
                          alt={
                            booking.room?.roomName ||
                            "Hotel Room"
                          }
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 to-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <span className="text-white text-xs uppercase tracking-[0.25em]">
                            Jasaen Boutique Hotel
                          </span>
                        </div>
                      </div>

                      {/* Booking Content */}

                      <div className="lg:col-span-3 p-8 lg:p-10">

                        {/* Booking ID + Status */}

                        <div className="flex flex-wrap items-center gap-3 mb-4">

                          <span className="text-[11px] uppercase tracking-[0.25em] text-gold">
                            Booking-ID : {booking.bookingId}
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

                        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">

                          <Info
                            label="Booked On"
                            value={formatDate(
                              booking.createdAt
                            )}
                          />

                          <Info
                            label="Check In"
                            value={formatDate(
                              booking.checkIn
                            )}
                          />

                          <Info
                            label="Check Out"
                            value={formatDate(
                              booking.checkOut
                            )}
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
                            value={`฿${Number(
                              booking.totalAmount
                            ).toFixed(2)}`}
                          />

                        </div>

                        {/* Actions */}

                        <div className="flex flex-wrap gap-4 mt-10">

                          {/* VIEW BOOKING */}

                          <button
                            onClick={() =>
                              setSelectedBooking(
                                booking
                              )
                            }
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
                            View Booking
                          </button>

                          {/* Need Assistance */}

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

      {/* BOOKING DETAILS MODAL */}

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          calculateNights={calculateNights}
          formatDate={formatDate}
          formatDateTime={formatDateTime}
        />
      )}
    </>
  );
}

/* =========================================================
   BOOKING DETAILS MODAL
========================================================= */

function BookingDetailsModal({
  booking,
  onClose,
  calculateNights,
  formatDate,
  formatDateTime,
}: {
  booking: Booking;
  onClose: () => void;
  calculateNights: (
    checkIn: string,
    checkOut: string
  ) => number;
  formatDate: (date: string) => string;
  formatDateTime: (date: string) => string;
}) {
  const roomImage =
    booking.room?.images?.[0]?.url ||
    "/images/placeholder-room.jpg";

  const nights = calculateNights(
    booking.checkIn,
    booking.checkOut
  );

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          bg-ivory
          w-full
          max-w-6xl
          max-h-[92vh]
          overflow-y-auto
          rounded-4xl
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}

        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
            h-10
            w-10
            rounded-full
            bg-white/90
            backdrop-blur
            flex
            items-center
            justify-center
            text-charcoal
            shadow-md
            hover:bg-white
            transition
          "
        >
          <X size={20} />
        </button>

        {/* =================================================
            ROOM IMAGE
        ================================================= */}

        <div className="relative h-[320px] md:h-[430px]">

          <Image
            src={roomImage}
            alt={
              booking.room?.roomName ||
              "Hotel Room"
            }
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white">

            <div className="flex flex-wrap items-center gap-3 mb-3">

              <span className="text-xs uppercase tracking-[0.25em] text-gold">
                Your Reservation
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
                      ? "bg-green-500 text-white"
                      : booking.status === "PENDING"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }
                `}
              >
                {booking.status}
              </span>

            </div>

            <h2 className="font-display text-4xl md:text-5xl">
              {booking.room?.roomName}
            </h2>

            <p className="mt-2 text-white/80">
              {booking.room?.roomType}
            </p>

          </div>
        </div>

        {/* =================================================
            BOOKING INFORMATION
        ================================================= */}

        <div className="p-6 md:p-10">

          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                Booking Information
              </p>

              <h3 className="font-display text-3xl text-maroon mt-2">
                Reservation Details
              </h3>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xs text-textmuted">
                Booking ID
              </p>

              <p className="font-semibold text-charcoal">
                {booking.bookingId}
              </p>
            </div>

          </div>

          {/* Main Details */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

            <DetailCard
              icon={<CalendarDays size={20} />}
              label="Check In"
              value={formatDate(booking.checkIn)}
            />

            <DetailCard
              icon={<CalendarDays size={20} />}
              label="Check Out"
              value={formatDate(booking.checkOut)}
            />

            <DetailCard
              icon={<Moon size={20} />}
              label="Number of Nights"
              value={`${nights} ${
                nights === 1 ? "Night" : "Nights"
              }`}
            />

            <DetailCard
              icon={<Users size={20} />}
              label="Guests"
              value={`${booking.guests} ${
                booking.guests === 1
                  ? "Guest"
                  : "Guests"
              }`}
            />

            <DetailCard
              icon={<CreditCard size={20} />}
              label="Total Amount"
              value={`฿${Number(
                booking.totalAmount
              ).toFixed(2)}`}
            />

            <DetailCard
              icon={<CalendarDays size={20} />}
              label="Booked On"
              value={formatDateTime(
                booking.createdAt
              )}
            />

          </div>

          {/* =================================================
              ROOM INFORMATION
          ================================================= */}

          <div className="mt-10 pt-10 border-t border-borderlight">

            <div className="flex items-center gap-2">

              <MapPin
                size={20}
                className="text-gold"
              />

              <h3 className="font-display text-3xl text-maroon">
                Room Information
              </h3>

            </div>

            <div className="mt-5">

              <h4 className="text-xl font-semibold text-charcoal">
                {booking.room?.roomName}
              </h4>

              <p className="text-textmuted mt-1">
                {booking.room?.roomType}
              </p>

              {booking.room?.description && (
                <p className="mt-5 text-textmuted leading-7">
                  {booking.room.description}
                </p>
              )}

            </div>

            {/* Amenities */}

            {booking.room?.amenities &&
              booking.room.amenities.length > 0 && (
                <div className="mt-7">

                  <h4 className="text-sm uppercase tracking-[0.2em] text-maroon font-medium">
                    Room Amenities
                  </h4>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {booking.room.amenities.map(
                      (amenity, index) => (
                        <span
                          key={index}
                          className="
                            rounded-full
                            bg-white
                            border
                            border-borderlight
                            px-4
                            py-2
                            text-sm
                            text-charcoal
                          "
                        >
                          {amenity}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

          </div>

          {/* =================================================
              FOOTER ACTIONS
          ================================================= */}

          <div className="flex flex-wrap justify-end gap-3 mt-10 pt-8 border-t border-borderlight">

            <button
              onClick={onClose}
              className="
                rounded-full
                border
                border-borderlight
                px-7
                py-3
                text-charcoal
                font-medium
                hover:bg-white
                transition
              "
            >
              Close
            </button>

            {booking.room?._id && (
              <Link
                href={`/rooms/${booking.room._id}`}
                onClick={onClose}
                className="
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
                View Room Page
              </Link>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

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

/* =========================================================
   MODAL DETAIL CARD
========================================================= */

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-borderlight
        p-5
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            h-10
            w-10
            rounded-full
            bg-gold/10
            text-gold
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-textmuted">
            {label}
          </p>

          <p className="mt-1 font-medium text-charcoal">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}