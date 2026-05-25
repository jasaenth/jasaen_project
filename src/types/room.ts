export type RoomData = {
  _id: string;
  roomName: string;
  slug: string;
  roomType:
    | "STANDARD"
    | "DELUXE"
    | "SUITE"
    | "EXECUTIVE"
    | "PRESIDENTIAL";
  description: string;
  shortDescription: string;
  pricePerNight: number;
  discountPrice?: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  roomSize: number;
  amenities: string[];
  images: {
    url: string;
    publicId: string;
  }[];
  totalUnits: number;
  availableUnits: number;
  isFeatured: boolean;
};