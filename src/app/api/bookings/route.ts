import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const user =
      await getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please login first",
        },
        { status: 401 }
      );
    }

    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      paymentId,
    } = await req.json();

    const booking =
      await Booking.create({
        user:
          (
            user as any
          ).userId,
        room: roomId,
        checkIn,
        checkOut,
        guests,
        totalAmount,
        paymentMethod: "STRIPE",
        paymentStatus: "PAID",
        
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking created successfully",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Booking failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const user =
      await getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
        },
        { status: 401 }
      );
    }

    const bookings =
      await Booking.find({
        user:
          (user as any).userId,
      })
        .populate("room")
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}