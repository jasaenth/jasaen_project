"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface RelatedRoomsProps {
  currentRoomId: string;
}

export default function RelatedRooms({
  currentRoomId,
}: RelatedRoomsProps) {
  const [rooms, setRooms] = useState([]);

  const searchParams = useSearchParams();

const checkIn = searchParams.get("checkIn");
const checkOut = searchParams.get("checkOut");
const guests = searchParams.get("guests");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");

      if (!res.ok) return;

      const data = await res.json();

      const filtered = data.data
        .filter((room: any) => room._id !== currentRoomId)
        .slice(0, 3);

      setRooms(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  if (rooms.length === 0) return null;

  return (
    <section className="py-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="gold-divider">
            More Rooms
          </span>

          <h2 className="font-display text-5xl text-maroon mt-5">
            You May Also Like
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room: any) => (
            <Link
              key={room._id}
              href={`/rooms/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
              className="group"
            >
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft hover:shadow-luxe transition-all duration-500">
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={room.images?.[0]?.url}
                    alt={room.roomName}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1 text-xs uppercase tracking-wider text-maroon">
                    {room.roomType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-display text-3xl text-maroon">
                    {room.roomName}
                  </h3>

                  <p className="mt-2 text-sm text-textmuted line-clamp-2">
                    {room.shortDescription}
                  </p>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <span className="font-display text-3xl text-maroon">
                        ฿{room.discountPrice?.toLocaleString()}
                      </span>

                      <span className="text-textmuted">
                        {" "}
                        / night
                      </span>
                    </div>

                    <span className="flex items-center gap-2 text-gold font-medium group-hover:translate-x-1 transition">
                      View
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}