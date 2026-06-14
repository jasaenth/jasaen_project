// components/RoomsPage.tsx
"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronDown,
  Users,
  Bed,
  Maximize2,
  CheckCircle,
  XCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { IRoom } from "@/models/Room";

type SortOption = "popularity" | "price-low" | "price-high" | "rating";

const RoomsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "STANDARD" | "DELUXE" | "DORMITORY" | "SUITE"
  >("all");

  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [roomsData, setRoomsData] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();

    return new Date(date.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  };

  const searchParams = useSearchParams();

  const checkIn = searchParams.get("checkIn") || formatDate(today);

  const checkOut = searchParams.get("checkOut") || formatDate(tomorrow);

  const guests = searchParams.get("guests") || "1";
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
      );

      const data = await res.json();

      if (res.ok) {
        setRoomsData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: "all",
      name: "All Rooms",
      count: roomsData.length,
    },

    ...Array.from(new Set(roomsData.map((room) => room.roomType))).map(
      (type) => ({
        id: type,
        name: type,
        count: roomsData.filter((room) => room.roomType === type).length,
      }),
    ),
  ];

  const getAvailableUnits = (room: IRoom) => {
    return room.availableUnits;
  };

  const isFullyBooked = (room: IRoom) => {
    return room.availableUnits <= 0;
  };

  // Get availability status text and color
  const getAvailabilityStatus = (room: IRoom) => {
    const available = getAvailableUnits(room);
    if (available <= 0) {
      return {
        text: "Sold Out",
        color: "text-red-600",
        bg: "bg-red-100",
        icon: XCircle,
      };
    } else if (available <= 2) {
      return {
        text: `Only ${available} left!`,
        color: "text-orange-600",
        bg: "bg-orange-100",
        icon: AlertCircle,
      };
    } else {
      return {
        text: `${available} available`,
        color: "text-green-600",
        bg: "bg-green-100",
        icon: CheckCircle,
      };
    }
  };

  // Get sort label
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case "popularity":
        return "Popularity";
      case "price-low":
        return "Price: Low to High";
      case "price-high":
        return "Price: High to Low";
      case "rating":
        return "User Rating: Highest First";
      default:
        return "Popularity";
    }
  };

  // Filter and sort rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? roomsData
        : roomsData.filter((room) => room.roomType === selectedCategory);

    // Filter by guest count
    filtered = filtered.filter((room) => room.maxAdults >= Number(guests));
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort(
          (a, b) =>
            (a.discountPrice || a.pricePerNight) -
            (b.discountPrice || b.pricePerNight),
        );
        break;

      case "price-high":
        filtered = [...filtered].sort(
          (a, b) =>
            (b.discountPrice || b.pricePerNight) -
            (a.discountPrice || a.pricePerNight),
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [roomsData, selectedCategory, sortBy, guests]);

  if (loading) {
    return <div className="py-16 text-center">Loading rooms...</div>;
  }
  return (
    <section className="bg-bgmain px-6 md:px-12 pt-16 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
                  <ChevronDown className="w-5 h-5" />
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as "all" | "STANDARD" | "DELUXE" | "DORMITORY" | "SUITE")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center text-sm ${
                        selectedCategory === cat.id
                          ? "bg-secondary text-white"
                          : "hover:bg-secondary/10 text-textmain"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  AVAILABILITY STATUS
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-textmuted">Available (3+ units)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-textmuted">
                      Limited (1-2 units left)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-textmuted">Sold Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Cards */}
          <div className="lg:col-span-3">
            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-borderlight rounded-lg hover:shadow-md transition"
                >
                  <span className="text-textmuted text-sm">Sort by:</span>
                  <span className="text-primary font-semibold">
                    {getSortLabel(sortBy)}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-textmuted transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-borderlight overflow-hidden z-20">
                      <div className="py-2">
                        {[
                          {
                            id: "popularity",
                            label: "Popularity",
                            subtext: "",
                          },
                          {
                            id: "price-low",
                            label: "Price",
                            subtext: "Low to High",
                          },
                          {
                            id: "price-high",
                            label: "Price",
                            subtext: "High to Low",
                          },
                          {
                            id: "rating",
                            label: "User Rating",
                            subtext: "Highest First",
                          },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as SortOption);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-secondary/10 transition ${
                              sortBy === option.id ? "bg-secondary/10" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full border ${
                                  sortBy === option.id
                                    ? "border-secondary bg-secondary"
                                    : "border-gray-300"
                                }`}
                              />
                              <div>
                                <span className="text-textmain">
                                  {option.label}
                                </span>
                                {option.subtext && (
                                  <p className="text-xs text-textmuted">
                                    {option.subtext}
                                  </p>
                                )}
                              </div>
                            </div>
                            {sortBy === option.id && (
                              <CheckCircle className="w-4 h-4 text-secondary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="space-y-6">
              {filteredAndSortedRooms.map((room) => {
                const availableUnits = getAvailableUnits(room);
                const isSoldOut = isFullyBooked(room);
                const availability = getAvailabilityStatus(room);
                const AvailabilityIcon = availability.icon;

                return (
                  <div
                    key={room._id?.toString()}
                    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group ${
                      isSoldOut ? "opacity-75" : ""
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <Image
                          src={room.images?.[0]?.url || "/images/no-room.jpg"}
                          alt={room.roomName}
                          fill
                          className="object-cover"
                        />
                        {/* <div className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          {room.code}
                        </div> */}
                        {/* {room.rating && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            {room.rating}
                          </div>
                        )} */}
                        {/* Units Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                          📦 {availableUnits} / {room.totalUnits} units
                        </div>
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-primary">
                              {room.roomName}
                            </h3>
                            <p className="text-secondary font-semibold text-sm mt-1">
                              {room.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400 line-through">
                              ฿{room.pricePerNight}
                            </p>

                            <p className="text-2xl font-bold text-primary">
                              ฿{room.discountPrice}
                            </p>

                            <p className="text-textmuted text-sm">/ NIGHT</p>
                          </div>
                        </div>

                        {/* Availability Status */}
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${availability.bg} ${availability.color} mb-3`}
                        >
                          <AvailabilityIcon className="w-3 h-3" />
                          <span>{availability.text}</span>
                        </div>

                        {/* Room Stats */}
                        <div className="flex flex-wrap gap-4 my-3 text-textmuted text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {room.maxAdults} Adults + {room.maxChildren} Child
                              Guests
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{room.bedType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize2 className="w-4 h-4" />
                            <span>{room.roomSize} m²</span>
                          </div>
                        </div>

                        {/* Amenities Preview */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-bgmain px-2 py-1 rounded-full text-textmuted"
                            >
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 4 && (
                            <span className="text-xs bg-bgmain px-2 py-1 rounded-full text-textmuted">
                              +{room.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Button */}
                        {isSoldOut ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg font-semibold"
                          >
                            <XCircle className="w-4 h-4" />
                            SOLD OUT
                          </button>
                        ) : (
                          <Link
                            href={`/rooms/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 group-hover:gap-3"
                          >
                            VIEW DETAILS
                            <span className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Rooms Found */}
            {filteredAndSortedRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-textmuted text-lg">
                  No rooms found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsPage;
