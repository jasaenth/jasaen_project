import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IRoomUnit {
  unitNumber: string;
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE" | "INACTIVE";
}

export interface IRoom extends Document {
  roomName: string;
  slug: string;

  roomType: "STANDARD" | "DELUXE" | "SUITE" | "EXECUTIVE" | "PRESIDENTIAL";

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

  units: IRoomUnit[];

  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    roomType: {
      type: String,
      enum: ["STANDARD", "DELUXE", "SUITE", "EXECUTIVE", "PRESIDENTIAL"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    maxAdults: {
      type: Number,
      required: true,
      default: 2,
    },

    maxChildren: {
      type: Number,
      required: true,
      default: 0,
    },

    bedType: {
      type: String,
      required: true,
    },

    roomSize: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    totalUnits: {
      type: Number,
      required: true,
      default: 1,
    },

    availableUnits: {
      type: Number,
      required: true,
      default: 1,
    },

    units: [
      {
        unitNumber: {
          type: String,
          required: true,
        },

        status: {
          type: String,
          enum: ["AVAILABLE", "BOOKED", "MAINTENANCE", "INACTIVE"],
          default: "AVAILABLE",
        },
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Room = models.Room || model<IRoom>("Room", RoomSchema);

export default Room;
