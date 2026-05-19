"use client";

import { useState } from "react";
import RoomsFilters from "@/components/admin/rooms/RoomsFilters";
import RoomsTable from "@/components/admin/rooms/RoomsTable";
import RoomViewModal from "@/components/admin/rooms/RoomViewModal";
import RoomEditModal from "@/components/admin/rooms/RoomEditModal";
import RoomsPagination from "@/components/admin/rooms/RoomsPagination";
import {
  Room,
  roomsData,
} from "@/components/admin/rooms/roomsData";

const ITEMS_PER_PAGE = 5;

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(roomsData);

  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("All");

  const [selectedRoom, setSelectedRoom] =
    useState<Room | null>(null);

  const [editRoom, setEditRoom] =
    useState<Room | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      roomType === "All" || room.type === roomType;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(
    filteredRooms.length / ITEMS_PER_PAGE
  );

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setRooms((prev) =>
      prev.filter((room) => room.id !== id)
    );
  };

  const handleSave = (updatedRoom: Room) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room
      )
    );

    setEditRoom(null);
  };

  return (
    <div className="space-y-6">
      <RoomsFilters
        search={search}
        roomType={roomType}
        setSearch={setSearch}
        setRoomType={setRoomType}
        onAddRoom={() => {}}
      />

      <RoomsTable
        rooms={paginatedRooms}
        onView={setSelectedRoom}
        onEdit={setEditRoom}
        onDelete={handleDelete}
      />

      <RoomsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <RoomViewModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />

      <RoomEditModal
        room={editRoom}
        onClose={() => setEditRoom(null)}
        onSave={handleSave}
      />
    </div>
  );
}