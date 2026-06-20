"use client";

import { useEffect, useState } from "react";
import GuestCard from "./GuestCard";
import { getGuests } from "@/lib/api/cloudbeds";

export default function GuestsPanel() {
  const [page, setPage] = useState(1);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadGuests(1);
  }, []);

  async function loadGuests(pageNumber: number) {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await getGuests(pageNumber);

      setTotalCount(response.total || 0);

      const newGuests = response.data || [];

      setGuests((prev) => {
        const merged = [...prev, ...newGuests];

        const unique = merged.filter(
          (guest, index, self) =>
            index ===
            self.findIndex(
              (g) => g.guestID === guest.guestID
            )
        );

        return unique;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const filteredGuests = guests.filter((guest) =>
    [
      guest.guestName,
      guest.guestEmail,
      guest.guestID,
      guest.reservationID,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);
    loadGuests(nextPage);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center">
        <div className="text-lg font-medium">
          Loading guests...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white border rounded-3xl p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-sm font-medium ">
              Total Guests
            </h2>

            <p className=" mt-1 font-bold">
              {totalCount} 
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by name, email, guest ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              md:w-96
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

      </div>

    

      {/* Guest Cards */}
      {filteredGuests.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredGuests.map((guest) => (
            <GuestCard
              key={guest.guestID}
              guest={guest}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white border rounded-3xl p-12 text-center text-gray-500">
          No guests found
        </div>
      )}

      {/* Load More */}
      <div className="flex justify-center">

        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="
            px-6
            py-3
            bg-black
            text-white
            rounded-xl
            hover:bg-gray-800
            disabled:opacity-50
          "
        >
          {loadingMore
            ? "Loading..."
            : "Load More Guests"}
        </button>

      </div>

    </div>
  );
}