"use client";

import { useEffect, useState } from "react";

import RoomStats from "./RoomStats";
import RoomsTable from "./RoomsTable";
import { getRooms } from "@/lib/api/cloudbeds";

export default function RoomsPanel() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms(page);
  }, [page]);

  async function loadRooms(pageNumber: number) {
    try {
      setLoading(true);

      const response = await getRooms(pageNumber);
      setTotalRooms(response.total || 0);

      const roomData = response.data?.[0]?.rooms || [];

      setRooms(roomData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <RoomStats rooms={rooms} totalRooms={totalRooms} />

      <RoomsTable rooms={rooms} />

      {/* Pagination */}

      <div className="flex justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            px-5
            py-2
            border
            rounded-xl
            disabled:opacity-40
          "
        >
          Previous
        </button>

        <div
          className="
            px-5
            py-2
            bg-black
            text-white
            rounded-xl
          "
        >
          Page {page}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          className="
            px-5
            py-2
            border
            rounded-xl
          "
        >
          Next
        </button>
      </div>

      {loading && <div className="text-center">Loading rooms...</div>}
    </div>
  );
}
