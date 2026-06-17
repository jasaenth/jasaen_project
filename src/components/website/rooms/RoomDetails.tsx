"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, BedDouble, Maximize } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import RelatedRooms from "./RelatedRooms";

interface Props {
  id: string;
}

export default function RoomDetails({ id }: Props) {
  const [room, setRoom] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const searchParams = useSearchParams();
  
  const [showBookingModal, setShowBookingModal] =
  useState(false);

  const router = useRouter();

const getLocalDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().split("T")[0];
};

const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const checkIn =
  searchParams.get("checkIn") ||
  getLocalDate(today);

const checkOut =
  searchParams.get("checkOut") ||
  getLocalDate(tomorrow);

const guests =
  searchParams.get("guests") || "1";

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
          currency: "thb",
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
    <>
    <PageHero
        title={room.roomName}
        image={room.images?.[selectedImage]?.url}
        breadcrumb="About Us"
      />
  <div className="bg-bgmain pb-24">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
      

      {/* Gallery */}
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative h-137.5 rounded-4xl overflow-hidden shadow-luxe">
          <Image
            src={room.images?.[selectedImage]?.url}
            alt={room.roomName}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          {room.images?.map((image: any, index: number) => (
            <button
              key={image._id}
              onClick={() => setSelectedImage(index)}
              className={`
                relative
                h-30
                w-full
                overflow-hidden
                rounded-2xl
                border-2
                transition
                ${
                  selectedImage === index
                    ? "border-gold"
                    : "border-transparent"
                }
              `}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* Main Content */}
    <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20">
      <div className="grid lg:grid-cols-3 gap-14">
        {/* Left */}
        <div className="lg:col-span-2">
          <span className="gold-divider">
            Room Overview
          </span>

          <h2 className="font-display text-5xl text-maroon mt-4">
            Designed For Comfort
          </h2>

          <p className="text-textmuted leading-8 mt-6 text-lg">
            {room.description}
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <Users className="text-gold mb-4" size={28} />
              <h4 className="font-semibold">
                {room.maxAdults} Adults
              </h4>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <BedDouble className="text-gold mb-4" size={28} />
              <h4 className="font-semibold">
                {room.bedType}
              </h4>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <Maximize className="text-gold mb-4" size={28} />
              <h4 className="font-semibold">
                {room.roomSize} m²
              </h4>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-20">
            <span className="gold-divider">
              Amenities
            </span>

            <h2 className="font-display text-5xl text-maroon mt-4">
              Included With Your Stay
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {room.amenities?.map(
                (amenity: string, index: number) => (
                  <div
                    key={index}
                    className="
                      bg-white
                      rounded-2xl
                      p-5
                      shadow-soft
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div className="w-2 h-2 rounded-full bg-gold" />

                    <span>{amenity}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Room Information */}
          <div className="mt-20">
            <span className="gold-divider">
              Details
            </span>

            <h2 className="font-display text-5xl text-maroon mt-4">
              Room Information
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Info
                label="Room Type"
                value={room.roomType}
              />

              <Info
                label="Bed Type"
                value={room.bedType}
              />

              <Info
                label="Room Size"
                value={`${room.roomSize} m²`}
              />

              <Info
                label="Adults"
                value={room.maxAdults}
              />

              <Info
                label="Children"
                value={room.maxChildren}
              />

              <Info
                label="Available Units"
                value={`${room.availableUnits}/${room.totalUnits}`}
              />
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div>
          <div className="sticky top-28">
            <div
              className="
                bg-white
                rounded-4xl
                p-8
                shadow-luxe
                border
                border-borderlight
              "
            >
              <div className="text-center">
                <p className="text-textmuted line-through ">
                  ฿{room.pricePerNight}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-playfair text-4xl text-maroon">
                  ฿{room.discountPrice}
                </h3>

                <span className="text-textmuted ">
                  / per night
                </span>
                </div>
              </div>

              <div className="border-t mt-8 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Check In</span>
                  <span>{checkIn}</span>
                </div>

                <div className="flex justify-between">
                  <span>Check Out</span>
                  <span>{checkOut}</span>
                </div>

                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{guests}</span>
                </div>

                <div className="flex justify-between">
                  <span>Nights</span>
                  <span>{totalNights}</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="font-fairplay text-2xl text-maroon">
                    ฿{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gold/10 text-center">
                <p className="text-green-700 font-medium">
                  {room.availableUnits} Rooms Available
                </p>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="
                  w-full
                  mt-8
                  rounded-full
                  bg-gold
                  hover:bg-gold-soft
                  text-charcoal
                  py-4
                  font-semibold
                  transition
                "
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <RelatedRooms
    currentRoomId={room._id}
  />
  {showBookingModal && (
  <div
    className="
      fixed
      inset-0
      z-999
      bg-black/60
      flex
      items-center
      justify-center
      p-4
    "
  >
    <div
      className="
        bg-white
        rounded-4xl
        w-full
        max-w-lg
        p-8
        shadow-2xl
      "
    >
      <h2 className="font-display text-4xl text-maroon mb-6">
        Booking Summary
      </h2>

      <div className="space-y-4">
        <SummaryRow
          label="Room"
          value={room.roomName}
        />

        <SummaryRow
          label="Room Type"
          value={room.roomType}
        />

        <SummaryRow
          label="Check In"
          value={checkIn}
        />

        <SummaryRow
          label="Check Out"
          value={checkOut}
        />

        <SummaryRow
          label="Guests"
          value={guests}
        />

        <SummaryRow
          label="Nights"
          value={String(totalNights)}
        />

        <SummaryRow
          label="Price Per Night"
          value={`฿${room.discountPrice}`}
        />
      </div>

      <div className="border-t mt-6 pt-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">
            Total Amount
          </span>

          <span className="font-fairplay text-2xl text-maroon">
            ฿{totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() =>
            setShowBookingModal(false)
          }
          className="
            flex-1
            border
            rounded-full
            py-3
            font-medium
          "
        >
          Cancel
        </button>

        <button
          onClick={handleBooking}
          className="
            flex-1
            bg-gold
            rounded-full
            py-3
            font-medium
            text-charcoal
          "
        >
          Proceed Payment
        </button>
      </div>
    </div>
  </div>
)}
  </>
);
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft">
      <p className="text-textmuted text-sm">
        {label}
      </p>

      <p className="mt-2 font-semibold text-lg text-maroon">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-textmuted">
        {label}
      </span>

      <span className="font-playfair text-right">
        {value}
      </span>
    </div>
  );
}
