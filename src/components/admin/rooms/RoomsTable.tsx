"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Room } from "./roomsData";
import RoomMobileCard from "./RoomMobileCard";

interface Props {
  rooms: Room[];
  onView: (room: Room) => void;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
}

const RoomsTable = ({
  rooms,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl border border-borderlight shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bgmain border-b border-borderlight">
              <tr className="text-left">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Room Name</th>
                <th className="px-6 py-4">Room Type</th>
                <th className="px-6 py-4">Price (₹)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-borderlight hover:bg-bgmain/40"
                >
                  <td className="px-6 py-5">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-5 font-medium">
                    {room.name}
                  </td>

                  <td className="px-6 py-5">{room.type}</td>

                  <td className="px-6 py-5 font-semibold">
                    ₹{room.price}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        room.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(room)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit(room)}
                        className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(room.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {rooms.map((room) => (
          <RoomMobileCard
            key={room.id}
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