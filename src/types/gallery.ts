export interface GalleryItem {
  _id: string;
  title: string;
  subtitle: string;
  tag: "HOTEL" | "ROOM" | "AMENITIES" | "SURROUNDINGS";
  image: string;
  publicId: string;
}