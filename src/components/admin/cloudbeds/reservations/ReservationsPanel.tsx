"use client";

import { useState } from "react";

import SectionHead from "../SectionHead";
import ReservationFilters from "./ReservationFilters";
import ReservationsTable from "./ReservationsTable";

export default function ReservationsPanel() {
  const [search, setSearch] =
    useState("");

  return (
    <div className="space-y-6">
      <SectionHead
        title="Reservations"
        subtitle="Manage bookings, arrivals and departures."
      />

      <ReservationFilters
        search={search}
        setSearch={setSearch}
      />

      <ReservationsTable />
    </div>
  );
}