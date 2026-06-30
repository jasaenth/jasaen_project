"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { IBooking } from "@/types/Booking";

interface Props {
  booking: IBooking | null;
  onClose: () => void;
  onSave: (updatedBooking: IBooking) => void;
}

export default function BookingEditModal({ booking, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<IBooking | null>(null);

  const [availableUnits, setAvailableUnits] = useState<string[]>([]);

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  useEffect(() => {
    if (!booking?.room?._id) return;

    fetch(`/api/rooms/${booking.room._id}`)
      .then((res) => res.json())
      .then((data) => {
        const units =
          data?.data?.units
            ?.filter(
              (unit: any) =>
                unit.status === "AVAILABLE" ||
                unit.unitNumber === booking.assignedUnit,
            )
            .map((unit: any) => unit.unitNumber) || [];

        setAvailableUnits(units);
      })
      .catch(console.error);
  }, [booking]);

  function formatInputDate(date?: string | Date | null) {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  }

  if (!formData) return null;

  const handleChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    } as IBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Update Booking</h2>

            <p className="text-sm text-gray-500 mt-1">
              Booking ID: {formData._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Guest & Room */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-5">Guest Information</h3>

              <div className="space-y-4">
                <Info label="Guest Name" value={formData.user?.name} />

                <Info label="Guest Email" value={formData.user?.email} />

                <Info label="Mobile" value={formData.user?.mobile || "-"} />

                <Info label="Guests" value={String(formData.guests)} />
              </div>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-5">Room Information</h3>

              <div className="space-y-4">
                <Info label="Room Name" value={formData.room?.roomName} />

                <Info label="Room Type" value={formData.room?.roomType} />

                <Info label="Total Amount" value={`₹${formData.totalAmount}`} />
              </div>
            </div>
          </div>

          {/* Booking Management */}
          <div className="border rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-6">Booking Management</h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Booking Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="CONFIRMED">CONFIRMED</option>

                  <option value="IN_HOUSE">IN HOUSE</option>

                  <option value="COMPLETED">COMPLETED</option>

                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Status
                </label>

                <select
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    handleChange("paymentStatus", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="PENDING">PENDING</option>

                  <option value="PAID">PAID</option>

                  <option value="FAILED">FAILED</option>

                  <option value="REFUNDED">REFUNDED</option>
                </select>
              </div>

              {/* Room Number */}
              {formData.status === "IN_HOUSE" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Assign Room Number
                  </label>

                  <select
                    value={formData.assignedUnit || ""}
                    onChange={(e) =>
                      handleChange("assignedUnit", e.target.value)
                    }
                    className="w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">Select Room Number</option>

                    {availableUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        Room {unit}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {[, "COMPLETED"].includes(formData.status) && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Assigned Room
                  </label>

                  <div className="border rounded-xl px-4 py-3 bg-gray-50 font-semibold">
                    Room {formData.assignedUnit || "-"}
                  </div>
                </div>
              )}

              {/* Reserved Check In */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reserved Check In
                </label>

                <input
                  type="date"
                  value={formatInputDate(formData.checkIn)}
                  onChange={(e) => handleChange("checkIn", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Reserved Check Out */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reserved Check Out
                </label>

                <input
                  type="date"
                  value={formatInputDate(formData.checkOut)}
                  onChange={(e) => handleChange("checkOut", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Actual Check In */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Actual Check In
                </label>

                <input
                  type="date"
                  value={formatInputDate(formData.actualCheckIn)}
                  onChange={(e) =>
                    handleChange("actualCheckIn", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Actual Check Out */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Actual Check Out
                </label>

                <input
                  type="date"
                  value={formatInputDate(formData.actualCheckOut)}
                  onChange={(e) =>
                    handleChange("actualCheckOut", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-3 border rounded-xl">
              Cancel
            </button>

            <button
              onClick={() => onSave(formData)}
              className="px-6 py-3 bg-primary text-white rounded-xl"
            >
              Save Changes
            </button>
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

      <p className="font-semibold mt-1 break-all">{value}</p>
    </div>
  );
}
