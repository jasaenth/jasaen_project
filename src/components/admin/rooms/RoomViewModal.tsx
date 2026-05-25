"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { IRoom } from "@/models/Room";
import { RoomData } from "@/types/room";

interface Props {
  room: RoomData | null;
  onClose: () => void;
}

const RoomViewModal = ({
  room,
  onClose,
}: Props) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] relative shadow-2xl flex flex-col overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 bg-white rounded-full p-2 shadow"
        >
          <X size={22} />
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto h-full p-8">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Room Details
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* IMAGES */}
            <div>
              <div className="relative h-80 rounded-2xl overflow-hidden border">
                <Image
                  src={
  room.images?.[0]?.url ||
  "https://via.placeholder.com/800x500?text=No+Image"
}
                  alt={room.roomName}
                  fill
                  className="object-cover"
                />
              </div>

              {room.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {room.images.map((img) => (
                    <div
                      key={img.publicId}
                      className="relative h-24 rounded-xl overflow-hidden border"
                    >
                      <Image
                        src={img.url}
                        alt="Room"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold">
                  {room.roomName}
                </h3>

                <p className="text-gray-500 mt-2">
                  {room.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Info label="Room Type" value={room.roomType} />
                <Info label="Slug" value={room.slug} />
                <Info
                  label="Price"
                  value={`₹${room.pricePerNight}`}
                />
                <Info
                  label="Discount"
                  value={`₹${room.discountPrice || 0}`}
                />
                <Info
                  label="Adults"
                  value={String(room.maxAdults)}
                />
                <Info
                  label="Children"
                  value={String(room.maxChildren)}
                />
                <Info
                  label="Bed Type"
                  value={room.bedType}
                />
                <Info
                  label="Room Size"
                  value={`${room.roomSize} sq ft`}
                />
                <Info
                  label="Total Units"
                  value={String(room.totalUnits)}
                />
                <Info
                  label="Available"
                  value={String(room.availableUnits)}
                />
                <Info
                  label="Featured"
                  value={room.isFeatured ? "Yes" : "No"}
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-3">
              Description
            </h3>

            <div className="bg-gray-50 border rounded-xl p-5">
              {room.description}
            </div>
          </div>

          {/* AMENITIES */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">
              Amenities
            </h3>

            <div className="flex flex-wrap gap-3">
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary text-white rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* UNITS */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">
              Room Units
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: room.totalUnits }, (_, i) => (
                <div
                  key={i + 1}
                  className="border rounded-xl p-4"
                >
                  <p className="font-semibold">
                    Unit {i + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
  <div className="border rounded-xl p-4 bg-gray-50">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

export default RoomViewModal;