"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { IBooking } from "@/types/Booking";

interface Props {
  booking: IBooking | null;
  onClose: () => void;
  onSave: (
    updatedBooking: IBooking
  ) => void;
}

const BookingEditModal = ({
  booking,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] =
    useState<IBooking | null>(null);

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  if (!formData) return null;

  const handleChange = (
    key:
      | "status"
      | "paymentStatus",
    value: string
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    } as IBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-8">
          Update Booking
        </h2>

        {/* Booking Details */}
        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Booking ID"
            value={formData._id}
          />

          <Info
            label="Guest Name"
            value={formData.user.name}
          />

          <Info
            label="Guest Email"
            value={formData.user.email}
          />

          <Info
            label="Guest Mobile"
            value={formData.user.mobile}
          />

          <Info
            label="Room Name"
            value={
              formData.room.roomName
            }
          />

          <Info
            label="Room Type"
            value={
              formData.room.roomType
            }
          />

          <Info
            label="Check In"
            value={new Date(
              formData.checkIn
            ).toLocaleDateString()}
          />

          <Info
            label="Check Out"
            value={new Date(
              formData.checkOut
            ).toLocaleDateString()}
          />

          <Info
            label="Guests"
            value={String(
              formData.guests
            )}
          />

          <Info
            label="Total Amount"
            value={`₹${formData.totalAmount}`}
          />
        </div>

        {/* Editable Fields */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">

          {/* Booking Status */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Booking Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value
                )
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            >
              <option value="PENDING">
                PENDING
              </option>

              <option value="CONFIRMED">
                CONFIRMED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Payment Status
            </label>

            <select
              value={
                formData.paymentStatus
              }
              onChange={(e) =>
                handleChange(
                  "paymentStatus",
                  e.target.value
                )
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            >
              <option value="PENDING">
                PENDING
              </option>

              <option value="PAID">
                PAID
              </option>

              <option value="FAILED">
                FAILED
              </option>

              <option value="REFUNDED">
                REFUNDED
              </option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-10">

          <button
            onClick={onClose}
            className="px-6 py-3 border border-borderlight rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(formData)
            }
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-textmuted">
        {label}
      </p>

      <p className="font-semibold mt-1 break-all">
        {value}
      </p>
    </div>
  );
}

export default BookingEditModal;