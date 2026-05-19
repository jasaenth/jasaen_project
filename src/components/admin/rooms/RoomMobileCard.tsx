"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Room } from "./roomsData";

interface Props {
  room: Room;
  onView: (room: Room) => void;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
}

const RoomMobileCard = ({
  room,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative w-28 h-24 rounded-xl overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{room.name}</h3>
          <p className="text-textmuted">{room.type}</p>
          <p className="font-semibold text-primary mt-2">
            ₹{room.price}
          </p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              room.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {room.status}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onView(room)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <Eye size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onEdit(room)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(room.id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default RoomMobileCard;