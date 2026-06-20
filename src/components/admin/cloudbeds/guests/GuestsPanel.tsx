"use client";

import { useEffect, useState } from "react";
import GuestCard from "./GuestCard";
import { getGuests } from "@/lib/api/cloudbeds";

export default function GuestsPanel() {
  const [page, setPage] = useState(1);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadGuests(page);
  }, [page]);

  async function loadGuests(pageNumber: number) {
    try {
      const response = await getGuests(pageNumber);

      const newGuests = response.data || [];

      setGuests((prev) => [...prev, ...newGuests]);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredGuests = guests.filter((guest) =>
    [guest.guestName, guest.guestEmail, guest.guestID, guest.reservationID]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center">
        Loading guests...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-3xl p-5">
        <input
          type="text"
          placeholder="Search guests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full
      border
      rounded-xl
      px-4
      py-3
    "
        />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guests.map((guest) => (
          <GuestCard key={guest.guestID} guest={guest} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="
      px-6
      py-3
      bg-black
      text-white
      rounded-xl
    "
        >
          Show More Guests
        </button>
      </div>
    </div>
  );
}
