// components/RoomsPage.tsx
"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Users,
  Bed,
  Maximize2,
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import BookingForm from "../common/BookingForm";

// Type definitions
interface Room {
  id: number;
  code: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  priceDisplay: string;
  size: number;
  beds: number;
  bedType: string;
  maxGuests: number;
  bathroomType: string;
  amenities: string[];
  image: string;
  color: string;
  rating: number;
  popularity: number;
  units: number;
  bookedUnits: number;
}

type SortOption = "popularity" | "price-low" | "price-high" | "rating";

const RoomsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Actual rooms data with units from your table
  const roomsData: Room[] = [
    // Standard Rooms (category: "standard")
    {
      id: 1,
      code: "SG",
      name: "Standard Single",
      slug: "standard-single",
      category: "standard",
      description: "Climbing 3.5 ft. Bed / Shared Bathroom. Perfect for solo travelers seeking adventure.",
      price: 500,
      priceDisplay: "฿500",
      size: 9,
      beds: 1,
      bedType: "3.5 ft Loft",
      maxGuests: 1,
      bathroomType: "Shared",
      rating: 4.2,
      popularity: 85,
      units: 8,
      bookedUnits: 3,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Shared Bathroom",
        "Mini Fridge",
        "Climbing Loft Design",
      ],
      image: "/images/rooms/standard-single.jpg",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      code: "ST",
      name: "Standard Twin",
      slug: "standard-twin",
      category: "standard",
      description: "4 ft. + 3 ft. Climbing Bed / Private Bathroom. 2-level Loft design.",
      price: 750,
      priceDisplay: "฿750",
      size: 13,
      beds: 2,
      bedType: "4 ft & 3 ft Loft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.4,
      popularity: 82,
      units: 2,
      bookedUnits: 0,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "2-Level Loft",
        "Climbing Design",
      ],
      image: "/images/rooms/standard-twin.JPG",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      code: "SB",
      name: "Standard Double",
      slug: "standard-double",
      category: "standard",
      description: "Climbing 5 ft. Bed / Private Bathroom. Loft design with balcony.",
      price: 800,
      priceDisplay: "฿800",
      size: 13,
      beds: 1,
      bedType: "5 ft Loft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.6,
      popularity: 90,
      units: 3,
      bookedUnits: 2,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Balcony",
        "Loft Design",
        "Climbing Theme",
      ],
      image: "/images/rooms/standard-double.jpg",
      color: "from-blue-500 to-blue-600",
    },

    // Deluxe Rooms (category: "deluxe")
    {
      id: 4,
      code: "DS",
      name: "Deluxe Single",
      slug: "deluxe-single",
      category: "deluxe",
      description: "3.5 ft. Bed / Private Bathroom. Jail Cell Theme with unique character.",
      price: 700,
      priceDisplay: "฿700",
      size: 11,
      beds: 1,
      bedType: "3.5 ft",
      maxGuests: 1,
      bathroomType: "Private",
      rating: 4.5,
      popularity: 88,
      units: 2,
      bookedUnits: 1,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Unique Jail Cell Theme",
      ],
      image: "/images/rooms/deluxe-single.JPG",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 5,
      code: "DA",
      name: "Deluxe Double A (Bottle)",
      slug: "deluxe-double-a",
      category: "deluxe",
      description: "5 ft. Bed / Private Bathroom. Unique bottle-themed decor.",
      price: 900,
      priceDisplay: "฿900",
      size: 15,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.7,
      popularity: 94,
      units: 3,
      bookedUnits: 1,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Bottle Theme Decor",
      ],
      image: "/images/rooms/deluxe-bottle.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 6,
      code: "DB",
      name: "Deluxe Double B (Car)",
      slug: "deluxe-double-b",
      category: "deluxe",
      description: "5 ft. Bed / Private Bathroom. Car-themed design room.",
      price: 900,
      priceDisplay: "฿900",
      size: 20,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.6,
      popularity: 86,
      units: 3,
      bookedUnits: 3,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Car Theme Decor",
        "Spacious 20 sqm",
      ],
      image: "/images/rooms/deluxe-car.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 7,
      code: "DC",
      name: "Deluxe Double C (Jackson Pollock)",
      slug: "deluxe-double-c",
      category: "deluxe",
      description: "5 ft. Bed / Private Bathroom / Working Desk. Art-inspired Jackson Pollock decor.",
      price: 900,
      priceDisplay: "฿900",
      size: 20,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.9,
      popularity: 98,
      units: 3,
      bookedUnits: 0,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Working Desk",
        "Jackson Pollock Art Theme",
      ],
      image: "/images/rooms/deluxe-pollock.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 8,
      code: "DD",
      name: "Deluxe Double D (Slum)",
      slug: "deluxe-double-d",
      category: "deluxe",
      description: "5 ft. Bed / Private Bathroom / Working Desk. Urban industrial style.",
      price: 900,
      priceDisplay: "฿900",
      size: 20,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.3,
      popularity: 78,
      units: 2,
      bookedUnits: 2,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Working Desk",
        "Urban Industrial Style",
      ],
      image: "/images/rooms/deluxe-slum.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 9,
      code: "DE",
      name: "Deluxe Double E (Circle)",
      slug: "deluxe-double-e",
      category: "deluxe",
      description: "5 ft. Circle Bed / Private Bathroom. Unique circular bed design.",
      price: 900,
      priceDisplay: "฿900",
      size: 20,
      beds: 1,
      bedType: "5 ft Circle",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.7,
      popularity: 89,
      units: 2,
      bookedUnits: 1,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Unique Circle Bed",
      ],
      image: "/images/rooms/deluxe-circle.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 10,
      code: "DF",
      name: "Deluxe Double F",
      slug: "deluxe-double-f",
      category: "deluxe",
      description: "5 ft. Bed / Private Bathroom. Modern deluxe room.",
      price: 900,
      priceDisplay: "฿900",
      size: 15,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Private",
      rating: 4.4,
      popularity: 84,
      units: 1,
      bookedUnits: 0,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Modern Design",
      ],
      image: "/images/rooms/deluxe-f.jpg",
      color: "from-purple-500 to-purple-600",
    },

    // Shared/Bunk Rooms (category: "shared")
    {
      id: 11,
      code: "B4",
      name: "Bunks for 4",
      slug: "bunks-4",
      category: "shared",
      description: "2 Bunk beds / Semi Private Bathroom. Perfect for group of 4.",
      price: 1200,
      priceDisplay: "฿1,200",
      size: 27,
      beds: 4,
      bedType: "3.5 ft Bunk",
      maxGuests: 4,
      bathroomType: "Semi Private",
      rating: 4.0,
      popularity: 72,
      units: 3,
      bookedUnits: 0,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Semi Private Bathroom",
        "Shared Basin Area",
        "2 Bunk Beds",
      ],
      image: "/images/rooms/bunks-4.jpg",
      color: "from-green-500 to-green-600",
    },
    {
      id: 12,
      code: "MD",
      name: "Mix Dorm Room",
      slug: "mix-dorm",
      category: "shared",
      description: "1 in 3 Bunk beds / Shared Bathroom. Mixed men/women dormitory.",
      price: 350,
      priceDisplay: "฿350",
      size: 50,
      beds: 1,
      bedType: "3.5 ft Bunk",
      maxGuests: 1,
      bathroomType: "Shared",
      rating: 3.8,
      popularity: 65,
      units: 6,
      bookedUnits: 4,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Shared Bathroom",
        "Locker",
        "Reading Light",
      ],
      image: "/images/rooms/mix-dorm.jpg",
      color: "from-green-500 to-green-600",
    },
    {
      id: 13,
      code: "B6",
      name: "Bunks for 6",
      slug: "bunks-6",
      category: "shared",
      description: "3 Bunk beds / Shared Bathroom. Spacious room for 6 travelers.",
      price: 2100,
      priceDisplay: "฿2,100",
      size: 50,
      beds: 6,
      bedType: "3.5 ft Bunk",
      maxGuests: 6,
      bathroomType: "Shared",
      rating: 3.9,
      popularity: 68,
      units: 1,
      bookedUnits: 1,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Shared Bathroom",
        "Locker",
        "3 Bunk Beds",
      ],
      image: "/images/rooms/bunks-6.jpg",
      color: "from-green-500 to-green-600",
    },
    {
      id: 14,
      code: "B2",
      name: "Bed for 2",
      slug: "bed-for-2",
      category: "shared",
      description: "5 ft. Bed / Shared Bathroom. Small luggage guests only.",
      price: 700,
      priceDisplay: "฿700",
      size: 9,
      beds: 1,
      bedType: "5 ft",
      maxGuests: 2,
      bathroomType: "Shared",
      rating: 4.1,
      popularity: 75,
      units: 1,
      bookedUnits: 0,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Shared Bathroom",
        "Mini Fridge",
        "Small Luggage Only",
      ],
      image: "/images/rooms/bed-for-2.jpg",
      color: "from-green-500 to-green-600",
    },

    // Suite (category: "suite")
    {
      id: 15,
      code: "EX",
      name: "Executive Suite",
      slug: "executive-suite",
      category: "suite",
      description: "6 ft. Bed + 5 ft. Sofa Bed / Private Bathroom. Ultimate luxury suite.",
      price: 1500,
      priceDisplay: "฿1,500",
      size: 37,
      beds: 2,
      bedType: "6 ft & 5 ft Sofa",
      maxGuests: 3,
      bathroomType: "Private",
      rating: 5.0,
      popularity: 99,
      units: 1,
      bookedUnits: 1,
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Private Bathroom",
        "Mini Fridge",
        "Working Desk",
        "Sofa Bed",
        "Spacious 37 sqm",
      ],
      image: "/images/rooms/executive-suite.jpg",
      color: "from-amber-500 to-amber-600",
    },
  ];

  // Category filter options - Only 5 main categories
  const categories = [
    { id: "all", name: "All Rooms", count: roomsData.length },
    { id: "standard", name: "Standard Room", count: roomsData.filter((r) => r.category === "standard").length },
    { id: "deluxe", name: "Deluxe Room", count: roomsData.filter((r) => r.category === "deluxe").length },
    { id: "shared", name: "Shared/Bunk Room", count: roomsData.filter((r) => r.category === "shared").length },
    { id: "suite", name: "Executive Suite", count: roomsData.filter((r) => r.category === "suite").length },
  ];

  // Get available units for a room
  const getAvailableUnits = (room: Room) => {
    return room.units - room.bookedUnits;
  };

  // Check if room is fully booked
  const isFullyBooked = (room: Room) => {
    return getAvailableUnits(room) <= 0;
  };

  // Get availability status text and color
  const getAvailabilityStatus = (room: Room) => {
    const available = getAvailableUnits(room);
    if (available <= 0) {
      return { text: "Sold Out", color: "text-red-600", bg: "bg-red-100", icon: XCircle };
    } else if (available <= 2) {
      return { text: `Only ${available} left!`, color: "text-orange-600", bg: "bg-orange-100", icon: AlertCircle };
    } else {
      return { text: `${available} available`, color: "text-green-600", bg: "bg-green-100", icon: CheckCircle };
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
        : roomsData.filter((room) => room.category === selectedCategory);

    switch (sortBy) {
      case "popularity":
        filtered = [...filtered].sort((a, b) => b.popularity - a.popularity);
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
    }
    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <section className="bg-bgmain px-6 md:px-12 -mt-16 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Search/Booking Bar */}
        <BookingForm className="mb-16" containerClassName="max-w-4xl mx-auto" />

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
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center ${
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
                    <span className="text-textmuted">Limited (1-2 units left)</span>
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
                  <span className="text-primary font-semibold">{getSortLabel(sortBy)}</span>
                  <ChevronDown className={`w-4 h-4 text-textmuted transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-borderlight overflow-hidden z-20">
                      <div className="py-2">
                        {[
                          { id: "popularity", label: "Popularity", subtext: "" },
                          { id: "price-low", label: "Price", subtext: "Low to High" },
                          { id: "price-high", label: "Price", subtext: "High to Low" },
                          { id: "rating", label: "User Rating", subtext: "Highest First" },
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
                              <div className={`w-4 h-4 rounded-full border ${
                                sortBy === option.id ? "border-secondary bg-secondary" : "border-gray-300"
                              }`} />
                              <div>
                                <span className="text-textmain">{option.label}</span>
                                {option.subtext && (
                                  <p className="text-xs text-textmuted">{option.subtext}</p>
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
                    key={room.id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group ${
                      isSoldOut ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          {room.code}
                        </div>
                        {room.rating && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            {room.rating}
                          </div>
                        )}
                        {/* Units Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                          📦 {availableUnits} / {room.units} units
                        </div>
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-primary">{room.name}</h3>
                            <p className="text-secondary font-semibold text-sm mt-1">{room.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{room.priceDisplay}</p>
                            <p className="text-textmuted text-sm">/ NIGHT</p>
                          </div>
                        </div>

                        {/* Availability Status */}
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${availability.bg} ${availability.color} mb-3`}>
                          <AvailabilityIcon className="w-3 h-3" />
                          <span>{availability.text}</span>
                        </div>

                        {/* Room Stats */}
                        <div className="flex flex-wrap gap-4 my-3 text-textmuted text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{room.maxGuests} Guests</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'} ({room.bedType})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize2 className="w-4 h-4" />
                            <span>{room.size} m²</span>
                          </div>
                        </div>

                        {/* Bathroom & Additional Info */}
                        <div className="mb-3">
                          <span className="text-xs bg-bgmain px-2 py-1 rounded-full text-textmuted">
                            🚿 {room.bathroomType} Bathroom
                          </span>
                        </div>

                        {/* Amenities Preview */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-bgmain px-2 py-1 rounded-full text-textmuted">
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
                            href={`/rooms/${room.slug}`}
                            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 group-hover:gap-3"
                          >
                            VIEW DETAILS
                            <span className="transition-transform group-hover:translate-x-1">→</span>
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
                <p className="text-textmuted text-lg">No rooms found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsPage;