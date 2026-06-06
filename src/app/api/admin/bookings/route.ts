import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { verifyToken } from "@/lib/auth";
import "@/models/user";
import "@/models/Room";
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token",
        },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as {
      userId: string;
      role: "ADMIN" | "STAFF";
    };

    const user = await AdminUser.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const bookings = await Booking.find()
      .populate(
        "user",
        "name email mobile"
      )
      .populate(
        "room",
        "roomName roomType images"
      )
      .sort({
        createdAt: -1,
      });

    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}