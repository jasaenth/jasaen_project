"use client";

import { IBooking } from "@/types/Booking";
import { X } from "lucide-react";

interface BookingViewModalProps {
  booking: IBooking | null;
  onClose: () => void;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  IN_HOUSE: "bg-green-100 text-green-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const paymentColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-purple-100 text-purple-700",
};

export default function BookingViewModal({
  booking,
  onClose,
}: BookingViewModalProps) {
  if (!booking) return null;

  const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative overflow-hidden">
        {/* Header */}

        <div className="border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Booking Details</h2>

            <p className="text-sm text-gray-500 mt-1">
              Booking ID: {booking._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
              flex
              items-center
              justify-center
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-8 space-y-8">
          {/* Status Cards */}

          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-2xl p-4">
              <p className="text-xs uppercase text-gray-500">Booking Status</p>

              <span
                className={`
                  inline-flex
                  mt-3
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  ${statusColors[booking.status as keyof typeof statusColors]}
                `}
              >
                {booking.status.replace("_", " ")}
              </span>
            </div>

            <div className="border rounded-2xl p-4">
              <p className="text-xs uppercase text-gray-500">Payment Status</p>

              <span
                className={`
                  inline-flex
                  mt-3
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  ${
                    paymentColors[
                      booking.paymentStatus as keyof typeof paymentColors
                    ]
                  }
                `}
              >
                {booking.paymentStatus}
              </span>
            </div>

            <div className="border rounded-2xl p-4">
              <p className="text-xs uppercase text-gray-500">Total Amount</p>

              <h3 className="text-2xl font-bold mt-2 font-playfair">
                ฿ {booking.totalAmount}
              </h3>
            </div>
          </div>

          {/* Guest & Room */}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-5">Guest Information</h3>

              <div className="space-y-4">
                <Info label="Guest Name" value={booking.user?.name || "-"} />

                <Info label="Email" value={booking.user?.email || "-"} />

                <Info label="Phone" value={booking.user?.mobile || "-"} />

                <Info label="Guests" value={String(booking.guests)} />
              </div>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-5">Room Information</h3>

              <div className="space-y-4">
                <Info label="Room Name" value={booking.room?.roomName || "-"} />

                <Info label="Room Type" value={booking.room?.roomType || "-"} />

                <Info label="Room Size" value={booking.room?.roomSize || "-"} />

                <Info label="Bed Type" value={booking.assignedUnit || "-"} />
              </div>
            </div>
          </div>

          {/* Stay Information */}

          <div className="border rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-5">Stay Information</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <Info
                label="Reserved Check-In"
                value={formatDate(booking.checkIn)}
              />

              <Info
                label="Reserved Check-Out"
                value={formatDate(booking.checkOut)}
              />

              <Info
                label="Confirmed At"
                value={formatDate(booking.confirmedAt)}
              />

              <Info
                label="Actual Check-In"
                value={formatDate(booking.actualCheckIn)}
              />

              <Info
                label="Actual Check-Out"
                value={formatDate(booking.actualCheckOut)}
              />

              <Info label="Created At" value={formatDate(booking.createdAt)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-semibold mt-1 break-words">{value}</p>
    </div>
  );
}
