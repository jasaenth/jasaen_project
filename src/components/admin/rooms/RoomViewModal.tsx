"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Room } from "./roomsData";

interface Props {
  room: Room | null;
  onClose: () => void;
}

const RoomViewModal = ({ room, onClose }: Props) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <div className="relative h-72 rounded-xl overflow-hidden mb-6">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-primary">
          {room.name}
        </h2>

        <p className="text-textmuted mt-2">
          {room.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Info label="Type" value={room.type} />
          <Info label="Price" value={`₹${room.price}`} />
          <Info label="Capacity" value={`${room.capacity} Guests`} />
          <Info label="Status" value={room.status} />
        </div>
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <p className="text-sm text-textmuted">{label}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

export default RoomViewModal;