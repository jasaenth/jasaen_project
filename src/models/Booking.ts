import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    assignedUnit: {
      type: String,
      default: null,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    // Stripe Payment ID
    paymentId: {
      type: String,
      default: null,
    },

    // Payment Method
    paymentMethod: {
      type: String,
      default: "STRIPE",
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "IN_HOUSE", "COMPLETED", "CANCELLED"],
      default: "CONFIRMED",
    },

    confirmedAt: {
      type: Date,
      default: null,
    },

    actualCheckIn: {
      type: Date,
      default: null,
    },

    actualCheckOut: {
      type: Date,
      default: null,
    },
    countryCode: {
      type: String,
      default: "TH",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
