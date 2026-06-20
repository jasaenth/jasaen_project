"use client";

import { useEffect, useState } from "react";

import RoomStats from "./RoomStats";
import RoomsTable from "./RoomsTable";
import { getRooms } from "@/lib/api/cloudbeds";

export default function RoomsPanel() {
  const [rooms, setRooms] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const response = await getRooms();

      const roomData = response.data?.[0]?.rooms || [];

      setRooms(roomData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6">
      <RoomStats rooms={rooms} />

      <RoomsTable rooms={rooms} />
    </div>
  );
}
