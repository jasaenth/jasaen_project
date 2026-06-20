"use client";

import { useEffect, useState } from "react";
import ReservationFilters from "./ReservationFilters";
import ReservationsTable from "./ReservationsTable";
import { getReservations } from "@/lib/api/cloudbeds";

export default function ReservationsPanel() {
  const [reservations, setReservations] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [totalReservations, setTotalReservations] = useState(0);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadReservations(page);
  }, [page]);

  async function loadReservations(pageNumber: number) {
    try {
      setLoading(true);

      const response = await getReservations(pageNumber);

      setReservations(response.data || []);
      setTotalReservations(response.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredReservations = reservations.filter((reservation) =>
    [
      reservation.guestName,
      reservation.reservationID,
      reservation.status,
      reservation.sourceName,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Reservations</p>

            <h3 className="text-2xl font-bold mt-2 font-playfair">{totalReservations}</h3>
          </div>

          <div >
            <ReservationFilters search={search} setSearch={setSearch} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-10 text-center">
          Loading reservations...
        </div>
      ) : (
        <>
          <ReservationsTable reservations={filteredReservations} />

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
        </>
      )}
    </div>
  );
}
