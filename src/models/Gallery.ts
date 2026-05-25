import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IGallery extends Document {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      enum: ["HOTEL", "ROOM", "AMENITIES", "SURROUNDINGS"],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
