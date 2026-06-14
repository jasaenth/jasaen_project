"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Calendar, Users, BedDouble, Search } from "lucide-react";

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

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const searchParams = useSearchParams();

  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") || formatDate(today),
  );

  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || formatDate(tomorrow),
  );

  const [guests, setGuests] = useState(searchParams.get("guests") || "2");

  const [room, setRoom] = useState("Heritage Deluxe Room");

  const handleSearch = () => {
    router.push(
      `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
    );
  };

  return (
    <div className={className}>
      <div
        className={`
          bg-ivory
          rounded-4xl
          shadow-luxe
          border
          border-border
          p-8
          md:p-6
          ${containerClassName}
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Check In */}
          <Field icon={<Calendar size={16} />} label="Check In">
            <input
              type="date"
              min={formatDate(today)}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="
                w-full
                bg-transparent
                outline-none
                text-charcoal
                text-sm
              "
            />
          </Field>

          {/* Check Out */}
          <Field icon={<Calendar size={16} />} label="Check Out">
            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="
                w-full
                bg-transparent
                outline-none
                text-charcoal
                text-sm
              "
            />
          </Field>

          {/* Guests */}
          <Field icon={<Users size={16} />} label="Guests">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="
                w-full
                bg-transparent
                outline-none
                text-charcoal
                text-sm
              "
            >
              <option value="1">1 Guest</option>            
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="1">1 Guest + 1 Child</option>
              <option value="2">2 Guests + 1 Child</option>
              <option value="3">3 Guests + 1 Child</option>
              <option value="3">3 Guests + 2 Child</option>
            </select>
          </Field>


          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="
              h-18
              rounded-2xl
              bg-maroon
              hover:bg-maroon-deep
              text-ivory
              font-medium
              text-sm
              tracking-wide
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Search size={18} />
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className="
        border
        border-border
        rounded-2xl
        px-5
        py-3
        block
        focus-within:border-gold
        transition
      "
    >
      <span
        className="
          flex
          items-center
          gap-2
          text-[10px]
          uppercase
          tracking-[0.28em]
          text-maroon
          font-medium
        "
      >
        {icon}
        {label}
      </span>

      <div className="mt-2">{children}</div>
    </label>
  );
}
