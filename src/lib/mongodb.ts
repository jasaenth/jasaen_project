import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  throw new Error("DATABASE_URI is missing in .env");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(DATABASE_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};