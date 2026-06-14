export type RoomData = {
  _id: string;
  roomName: string;
  slug: string;
  roomType:
  | "STANDARD"
  | "DELUXE"
  | "DORMITORY"
  | "SUITE";
  description: string;
  shortDescription: string;
  pricePerNight: number;
  discountPrice?: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  roomSize: string;
  amenities: string[];
  images: {
    url: string;
    publicId: string;
  }[];
  totalUnits: number;
  availableUnits: number;
  isFeatured: boolean;
};