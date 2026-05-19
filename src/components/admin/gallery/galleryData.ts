export interface GalleryImage {
  id: string;
  title: string;
  category: "Room Images" | "Hotel Images" | "Amenities Images";
  image: string;
  description: string;
}

export const galleryData: GalleryImage[] = [
  {
    id: "IMG001",
    title: "Hotel Lobby",
    category: "Hotel Images",
    image: "/images/gallery/hotel-lobby.jpg",
    description: "Luxury hotel lobby area.",
  },
  {
    id: "IMG002",
    title: "Hotel Exterior",
    category: "Hotel Images",
    image: "/images/gallery/hotel-exterior.jpg",
    description: "Front exterior view of hotel.",
  },
  {
    id: "IMG003",
    title: "Deluxe Room",
    category: "Room Images",
    image: "/images/gallery/deluxe-room.jpg",
    description: "Premium deluxe room.",
  },
  {
    id: "IMG004",
    title: "Suite Room",
    category: "Room Images",
    image: "/images/gallery/suite-room.jpg",
    description: "Luxury suite room.",
  },
  {
    id: "IMG005",
    title: "Restaurant",
    category: "Amenities Images",
    image: "/images/gallery/restaurant.jpg",
    description: "Hotel restaurant.",
  },
  {
    id: "IMG006",
    title: "Swimming Pool",
    category: "Amenities Images",
    image: "/images/gallery/pool.jpg",
    description: "Outdoor swimming pool.",
  },
  {
    id: "IMG007",
    title: "Fitness Center",
    category: "Amenities Images",
    image: "/images/gallery/gym.jpg",
    description: "Modern fitness center.",
  },
  {
    id: "IMG008",
    title: "Spa & Wellness",
    category: "Amenities Images",
    image: "/images/gallery/spa.jpg",
    description: "Relaxing spa area.",
  },
];