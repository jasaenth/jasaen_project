"use client";

import Image from "next/image";
import {
  Eye,
  Pencil,
  Trash2,
  BedDouble,
  Users,
  Expand,
} from "lucide-react";

import { RoomData } from "@/types/room";

interface Props {
  room: RoomData;
  onView: (room: RoomData) => void;
  onEdit: (room: RoomData) => void;
  onDelete: (id: string) => void;
}

export default function RoomCard({
  room,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden border border-[#e8dfd4] shadow-sm hover:shadow-lg transition-all">
      
      {/* IMAGE */}
      <div className="relative h-[260px]">
        <Image
          src={room.images?.[0]?.url}
          alt={room.roomName}
          fill
          className="object-cover"
        />

        {/* Type Badge */}
        <div className="absolute top-5 left-5">
          <span className="bg-white/95 backdrop-blur px-5 py-2 rounded-full text-sm font-medium text-gray-700">
            {room.roomType}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-5 right-5">
          <span className="bg-emerald-500 text-white px-5 py-2 rounded-full text-sm">
            Active
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold leading-none text-maroon">
              {room.roomName}
            </h3>

            <p className="mt-3 text-gray-500 text-xs">
              {room.shortDescription}
            </p>
          </div>

          <div className="text-right shrink-0">
            <h4 className="text-xl font-bold text-charcoal">
              ₹{room.pricePerNight}
            </h4>

            <p className="uppercase text-xs  text-gray-500">
              Per Night
            </p>
          </div>
        </div>

        {/* SPECS */}
        <div className="flex flex-wrap gap-6 mt-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Expand size={10} />
            <span className="text-xs">{room.roomSize} m²</span>
          </div>

          <div className="flex items-center gap-2">
            <BedDouble size={10} />
            <span className="text-xs">{room.bedType}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={10} />
            <span className="text-xs">{room.maxAdults}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#ece4d8] mt-6 pt-5">
          <div className="flex items-center gap-3">

            {/* View */}
            <button
              onClick={() => onView(room)}
              className="
                flex-1
                h-10
                rounded-full
                border
                border-[#e4ddd2]
                flex
                items-center
                text-sm
                justify-center
                gap-2
                hover:bg-gray-50
              "
            >
              <Eye size={14} />
              View
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit(room)}
              className="
                flex-1
                h-10
                rounded-full
                bg-[#f3ecdf]
                flex
                text-sm
                items-center
                justify-center
                gap-2
                hover:bg-[#ece2d0]
              "
            >
              <Pencil size={14} />
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(room._id)}
              className="
                h-12
                w-12
                flex
                items-center
                justify-center
                text-gray-500
                hover:text-red-500
              "
            >
              <Trash2 size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}