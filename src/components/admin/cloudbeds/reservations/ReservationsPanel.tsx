"use client";

import { useEffect, useState } from "react";
import ReservationFilters from "./ReservationFilters";
import ReservationsTable from "./ReservationsTable";

import { getReservations } from "@/lib/api/cloudbeds";

export default function ReservationsPanel() {
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {
      const response = await getReservations();

      setReservations(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredReservations = reservations.filter((r) =>
    [r.guestName, r.reservationID, r.sourceName, r.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <ReservationFilters search={search} setSearch={setSearch} />
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Total Reservations</p>

          <h3 className="text-3xl font-bold mt-2">{reservations.length}</h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Checked In</p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {reservations.filter((r) => r.status === "checked_in").length}
          </h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Checked Out</p>

          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {reservations.filter((r) => r.status === "checked_out").length}
          </h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Pending Balance</p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {reservations.filter((r) => Number(r.balance) > 0).length}
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-10 text-center">
          Loading reservations...
        </div>
      ) : (
        <ReservationsTable reservations={filteredReservations} />
      )}
    </div>
  );
}
