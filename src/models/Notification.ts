import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const NotificationSchema =
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      title: String,

      message: String,

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  models.Notification ||
  model(
    "Notification",
    NotificationSchema
  );