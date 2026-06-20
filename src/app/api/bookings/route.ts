import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        {
          status: 401,
        },
      );
    }

    const { roomId, checkIn, checkOut, guests, totalAmount, paymentId } =
      await req.json();

    const booking = await Booking.create({
      user: (user as any).userId,

      room: roomId,

      checkIn,

      checkOut,

      guests,

      totalAmount,

      paymentId,

      paymentMethod: "STRIPE",

      paymentStatus: "PAID",

      status: "PENDING",

      confirmedAt: null,

      actualCheckIn: null,

      actualCheckOut: null,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate(
        "room",
        `
          roomName
          roomType
          images
        `,
      )
      .populate(
        "user",
        `
          name
          email
          mobile
        `,
      );

    return NextResponse.json(
      {
        success: true,

        message: "Booking created successfully",

        data: populatedBooking,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: "Booking failed",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,

          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const bookings = await Booking.find({
      user: (user as any).userId,
    })
      .populate(
        "room",
        `
          roomName
          roomType
          roomSize
          images
          pricePerNight
        `,
      )
      .sort({
        createdAt: -1,
      });

    const stats = {
      total: bookings.length,

      pending: bookings.filter((b) => b.status === "PENDING").length,

      confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,

      inHouse: bookings.filter((b) => b.status === "IN_HOUSE").length,

      completed: bookings.filter((b) => b.status === "COMPLETED").length,

      cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
    };

    return NextResponse.json(
      {
        success: true,

        stats,

        data: bookings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to load bookings",
      },
      {
        status: 500,
      },
    );
  }
}
