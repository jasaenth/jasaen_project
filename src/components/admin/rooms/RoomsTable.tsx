"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import RoomMobileCard from "./RoomMobileCard";
import { RoomData } from "@/types/room";


interface Props {
  rooms: RoomData[];
  onView: (room: RoomData) => void;
  onEdit: (room: RoomData) => void;
  onDelete: (id: string) => void;
}

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

const RoomsTable = ({ rooms, onView, onEdit, onDelete }: Props) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl border border-borderlight shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bgmain border-b border-borderlight">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>

                <th className="px-6 py-4 text-left">Room Name</th>

                <th className="px-6 py-4 text-left">Room Type</th>

                <th className="px-6 py-4 text-left">Price</th>

                <th className="px-6 py-4 text-left">Available Units</th>

                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No rooms found
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b border-borderlight hover:bg-bgmain/40"
                  >
                    <td className="px-6 py-5">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden">
                        <Image
                          src={room.images?.[0]?.url || fallbackImage}
                          alt={room.roomName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-5 font-medium">{room.roomName}</td>

                    <td className="px-6 py-5">{room.roomType}</td>

                    <td className="px-6 py-5 font-semibold">
                      ₹{room.pricePerNight}
                    </td>

                    <td className="px-6 py-5">
                      {room.availableUnits}/{room.totalUnits}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onView(room)}
                          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => onEdit(room)}
                          className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(room._id)}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
