"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, BedDouble, Maximize } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/getUser";

interface Props {
  id: string;
}

export default function RoomDetails({ id }: Props) {
  const [room, setRoom] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const router = useRouter();

  const totalNights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 1;

  const totalAmount = (room?.discountPrice || 0) * totalNights;

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`/api/rooms/${id}`);

      if (!res.ok) {
        console.error("Room fetch failed");
        return;
      }

      const data = await res.json();

      setRoom(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!room) {
    return (
      <div className="container mx-auto py-20 text-center">Loading room...</div>
    );
  }

  const handleBooking = async () => {
    try {
      const userRes = await fetch("/api/me");

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const { user } = await userRes.json();

      if (!user) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/payment/create-session", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          roomId: room._id,
          roomName: room.roomName,
          amount: totalAmount,
          checkIn,
          checkOut,
          guests,
          currency: "inr",
        }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        Home / Rooms / {room.roomName}
      </div>

      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={room.images?.[selectedImage]?.url}
              alt={room.roomName}
              fill
              priority
              className="object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {room.images.map((image: any, index: number) => (
              <button
                key={image._id}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 rounded-xl overflow-hidden border-2 transition ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${room.roomName}-${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="border rounded-2xl p-8 bg-white">
          <p className="uppercase text-primary font-semibold tracking-wider">
            {room.roomType}
          </p>

          <h1 className="text-4xl font-bold mt-3">{room.roomName}</h1>

          <p className="text-gray-600 mt-5 leading-7">
            {room.shortDescription}
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Users size={18} />
              {room.maxAdults} Adults
            </div>

            <div className="flex items-center gap-2">
              <BedDouble size={18} />
              {room.bedType}
            </div>

            <div className="flex items-center gap-2">
              <Maximize size={18} />
              {room.roomSize} m²
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-400 line-through">
              ₹{room.pricePerNight}
            </p>

            <h2 className="text-4xl font-bold text-primary">
              ₹{room.discountPrice}
            </h2>

            <span className="text-gray-500">/ NIGHT</span>

            <div className="mt-5 border-t pt-5">
              <div className="flex justify-between text-sm">
                <span>
                  ₹{room.discountPrice} × {totalNights} night
                  {totalNights > 1 ? "s" : ""}
                </span>

                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mt-3 text-xl font-bold text-primary">
                <span>Total</span>

                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-green-600 font-semibold">
              {room.availableUnits} Rooms Available
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p>Check In: {checkIn}</p>

              <p>Check Out: {checkOut}</p>

              <p>Guests: {guests}</p>

              <p>Nights: {totalNights}</p>

              <hr className="my-3" />

              <p>
                ₹{room.discountPrice} × {totalNights} night
                {totalNights > 1 ? "s" : ""}
              </p>

              <p className="text-xl font-bold text-primary mt-2">
                Total: ₹{totalAmount}
              </p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-semibold"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* About Room */}
      <div className="grid lg:grid-cols-2 gap-10 mt-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">About This Room</h2>

          <p className="text-gray-600 leading-8">{room.shortDescription}</p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {room.amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                ✓ {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Room Gallery</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {room.images.map((image: any, index: number) => (
            <div
              key={image._id}
              onClick={() => setSelectedImage(index)}
              className={`relative h-52 rounded-xl overflow-hidden cursor-pointer border-2 ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={`${room.roomName}-${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Room Info */}
      <div className="mt-20 border rounded-2xl p-8 bg-white">
        <h2 className="text-3xl font-bold mb-8">Room Information</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Info label="Room Type" value={room.roomType} />

          <Info label="Bed Type" value={room.bedType} />

          <Info label="Room Size" value={`${room.roomSize} m²`} />

          <Info label="Adults" value={room.maxAdults} />

          <Info label="Children" value={room.maxChildren} />

          <Info
            label="Available Units"
            value={`${room.availableUnits}/${room.totalUnits}`}
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>

      <p className="font-semibold text-lg mt-1">{value}</p>
    </div>
  );
}
