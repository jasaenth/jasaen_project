import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAdminUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "ADMIN" | "STAFF";
  status: "ACTIVE" | "INACTIVE";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "STAFF"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const AdminUser =
  models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;