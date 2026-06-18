"use client";

import SectionHead from "../SectionHead";
import RoomStats from "./RoomStats";
import RoomsTable from "./RoomsTable";

export default function RoomsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Room Management"
        subtitle="Manage room inventory, availability and maintenance status."
      />

      <RoomStats />

      <RoomsTable />
    </div>
  );
}