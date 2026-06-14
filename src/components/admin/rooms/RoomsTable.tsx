"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import RoomMobileCard from "./RoomMobileCard";
import { RoomData } from "@/types/room";
import RoomCard from "./RoomCard";


interface Props {
  rooms: RoomData[];
  onView: (room: RoomData) => void;
  onEdit: (room: RoomData) => void;
  onDelete: (id: string) => void;
}


const RoomsTable = ({ rooms, onView, onEdit, onDelete }: Props) => {
  return (
    <>
      {/* Desktop */}
      <div>
  {rooms.length === 0 ? (
    <div className="bg-white rounded-3xl p-20 text-center">
      No rooms found
    </div>
  ) : (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room._id}
          room={room}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )}
</div>

      {/* Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {rooms.map((room) => (
          <RoomMobileCard
            key={room._id}
            room={room}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default RoomsTable;
