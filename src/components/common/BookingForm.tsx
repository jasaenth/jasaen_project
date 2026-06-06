"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingFormProps = {
  className?: string;
  containerClassName?: string;
};

export default function BookingForm({
  className = "",
  containerClassName = "",
}: BookingFormProps) {
  const router = useRouter();

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const [checkIn, setCheckIn] = useState(
    formatDate(today)
  );

  const [checkOut, setCheckOut] = useState(
    formatDate(tomorrow)
  );

  const [guests, setGuests] = useState("1");

  const handleSearch = () => {
    router.push(
      `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className={className}>
      <div
        className={`bg-bgmain rounded-2xl p-6 shadow-2xl ${containerClassName}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Check In */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              CHECK-IN
            </label>

            <input
              type="date"
              min={formatDate(today)}
              value={checkIn}
              onChange={(e) =>
                setCheckIn(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              CHECK-OUT
            </label>

            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) =>
                setCheckOut(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              GUESTS
            </label>

            <select
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition"
            >
              CHECK AVAILABILITY
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}