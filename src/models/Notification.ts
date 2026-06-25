import mongoose, { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: String,

    message: String,

    target: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Notification || model("Notification", NotificationSchema);
