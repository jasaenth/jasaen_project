export interface Room {
  id: string;
  image: string;
  name: string;
  type: string;
  price: number;
  status: "Active" | "Inactive";
  description: string;
  capacity: number;
  amenities: string[];
}

export const roomsData: Room[] = [
  {
    id: "RM001",
    image: "/images/hero/hero-1.JPG",
    name: "Deluxe Room",
    type: "Deluxe",
    price: 4500,
    status: "Active",
    description: "Spacious deluxe room with modern interior.",
    capacity: 2,
    amenities: ["WiFi", "AC", "TV", "Mini Fridge"],
  },
  {
    id: "RM002",
    image: "/images/hero/hero-2.JPG",
    name: "Suite Room",
    type: "Suite",
    price: 8000,
    status: "Active",
    description: "Luxury suite with premium comfort.",
    capacity: 4,
    amenities: ["WiFi", "AC", "TV", "Balcony"],
  },
  {
    id: "RM003",
    image: "/images/hero/hero-3.JPG",
    name: "Standard Room",
    type: "Standard",
    price: 3000,
    status: "Active",
    description: "Comfortable standard room for budget travelers.",
    capacity: 2,
    amenities: ["WiFi", "AC"],
  },
  {
    id: "RM004",
    image: "/images/hero/hero-1.JPG",
    name: "Executive Room",
    type: "Executive",
    price: 6000,
    status: "Inactive",
    description: "Elegant executive room with workspace.",
    capacity: 2,
    amenities: ["WiFi", "AC", "Work Desk"],
  },
  {
    id: "RM005",
    image: "/images/hero/hero-2.JPG",
    name: "Family Room",
    type: "Family",
    price: 7000,
    status: "Active",
    description: "Large family room with multiple beds.",
    capacity: 5,
    amenities: ["WiFi", "AC", "TV", "Mini Fridge"],
  },
];