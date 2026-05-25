"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { RoomData } from "@/types/room";

interface Props {
  room: RoomData;
  onView: (room: RoomData) => void;
  onEdit: (room: RoomData) => void;
  onDelete: (id: string) => void;
}

const fallbackImage =
  "https://via.placeholder.com/400x300?text=No+Image";

const RoomMobileCard = ({
  room,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-4 shadow-sm">
      <div className="relative h-52 rounded-xl overflow-hidden">
        <Image
          src={
            room.images?.[0]?.url ||
            fallbackImage
          }
          alt={
            room.roomName ||
            "Room image"
          }
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">
          {room.roomName}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {room.roomType}
        </p>

        <p className="font-semibold mt-2">
          ₹{room.pricePerNight}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Available:{" "}
          {room.availableUnits}/
          {room.totalUnits}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onView(room)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <Eye
            size={18}
            className="mx-auto"
          />
        </button>

        <button
          onClick={() => onEdit(room)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg"
        >
          <Pencil
            size={18}
            className="mx-auto"
          />
        </button>

        <button
          onClick={() =>
            onDelete(room._id)
          }
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2
            size={18}
            className="mx-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default RoomMobileCard;