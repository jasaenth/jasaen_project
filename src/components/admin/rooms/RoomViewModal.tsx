"use client";

import Image from "next/image";
import { X, BedDouble, Users, Expand, IndianRupee } from "lucide-react";
import { RoomData } from "@/types/room";

interface Props {
  room: RoomData | null;
  onClose: () => void;
}

export default function RoomViewModal({ room, onClose }: Props) {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] overflow-hidden rounded-4xl bg-[#f7f3eb] shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-20
            w-10
            h-10
            rounded-full
            bg-white
            shadow
            flex
            items-center
            justify-center
          "
        >
          <X size={18} />
        </button>

        <div className="h-full overflow-y-auto">
          {/* Hero Image */}
          <div className="relative h-70">
            <Image
              src={
                room.images?.[0]?.url || "https://via.placeholder.com/1200x700"
              }
              alt={room.roomName}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <span className="bg-white/90 text-charcoal text-xs px-3 py-1 rounded-full">
                {room.roomType}
              </span>

              <h2 className="font-display text-4xl mt-3">{room.roomName}</h2>

              <p className="mt-2 text-sm text-white/80 max-w-xl">
                {room.shortDescription}
              </p>
            </div>
          </div>

          <div className="p-6">
            {room.units?.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#e6ddd0] p-5 mb-6">
                <p className="uppercase tracking-[0.2em] text-[11px] text-gray-500 mb-3">
                  Room Numbers
                </p>

                <div className="flex flex-wrap gap-2">
                  {room.units.map((unit) => (
                    <span
                      key={unit.unitNumber}
                      className="px-3 py-1.5 rounded-full bg-[#f3ecdf] border border-[#e6ddd0] text-sm "
                    >
                      {unit.unitNumber}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price + Availability */}
            <div className="bg-white rounded-2xl border border-[#e6ddd0] p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="uppercase tracking-[0.2em] text-[11px] text-gray-500">
                    Price Per Night
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-4xl font-semibold font-playfair">
                      ฿ {room.pricePerNight}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <p className="uppercase tracking-[0.2em] text-[11px] text-gray-500">
                    Available Units
                  </p>

                  <h4 className="text-2xl font-semibold mt-2">
                    {room.availableUnits}/{room.totalUnits}
                  </h4>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-4 gap-4 mt-6 ">
              <InfoCard
                icon={<BedDouble size={18} />}
                label="Bed Type"
                value={room.bedType}
              />

              <InfoCard
                icon={<Users size={18} />}
                label="Adults"
                value={String(room.maxAdults)}
              />

              <InfoCard
                icon={<Users size={18} />}
                label="Children"
                value={String(room.maxChildren)}
              />

              <InfoCard
                icon={<Expand size={18} />}
                label="Room Size"
                value={`${room.roomSize} sq ft`}
              />
            </div>

            {/* Gallery */}
            {room.images?.length > 1 && (
              <div className="mt-8">
                <h3 className="font-display text-2xl text-maroon mb-4">
                  Gallery
                </h3>

                <div className="grid grid-cols-4 gap-3">
                  {room.images.map((img) => (
                    <div
                      key={img.publicId}
                      className="relative h-24 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-display text-2xl text-maroon mb-4">
                Description
              </h3>

              <div className="bg-white rounded-2xl border border-[#e6ddd0] p-5 text-sm leading-relaxed text-gray-700">
                {room.description}
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="font-display text-2xl text-maroon mb-4">
                Amenities
              </h3>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((item, index) => (
                  <span
                    key={index}
                    className="
                      px-3
                      py-1.5
                      text-sm
                      bg-white
                      border
                      border-[#e6ddd0]
                      rounded-full
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div className="mt-8">
              <h3 className="font-display text-2xl text-maroon mb-4">
                Room Inventory
              </h3>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {(room.units?.length
                  ? room.units
                  : Array.from({ length: room.totalUnits }, (_, i) => ({
                      unitNumber: String(i + 1),
                    }))
                ).map((unit, i) => (
                  <div
                    key={unit.unitNumber || i}
                    className="
                        bg-white
                        border
                        border-[#e6ddd0]
                        rounded-xl
                        p-3
                        text-center
                      "
                  >
                    <p className="text-xs text-gray-500">Room</p>

                    <h4 className="text-lg font-semibold mt-1">
                      {unit.unitNumber}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e6ddd0] p-4">
      <div className="text-maroon mb-3">{icon}</div>

      <p className="uppercase tracking-[0.15em] text-[10px] text-gray-500">
        {label}
      </p>

      <h4 className="text-base font-semibold mt-1 font-playfair">{value}</h4>
    </div>
  );
}
