"use client";

import { Hotel, CheckCircle2, BedDouble, Wrench } from "lucide-react";

interface Props {
  rooms: any[];
}

export default function RoomStats({ rooms }: Props) {
  const totalRooms = rooms.length;

  const availableRooms = rooms.filter((r) => !r.roomBlocked).length;

  const blockedRooms = rooms.filter((r) => r.roomBlocked).length;

  const privateRooms = rooms.filter((r) => r.isPrivate).length;

  const stats = [
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: Hotel,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Available",
      value: availableRooms,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Private Rooms",
      value: privateRooms,
      icon: BedDouble,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Blocked",
      value: blockedRooms,
      icon: Wrench,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              bg-white
              border
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>

                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${stat.color}
                `}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
