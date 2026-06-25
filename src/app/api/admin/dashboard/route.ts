import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const today = new Date();

    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "PENDING",
    });

    const inHouse = await Booking.countDocuments({
      status: "IN_HOUSE",
    });

    const arrivals = await Booking.countDocuments({
      status:"CONFIRMED"  
    });

    const departures = await Booking.countDocuments({ 
      status:  "COMPLETED" 
    });

    const revenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "PAID",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        inHouse,
        arrivals,
        departures,
        revenue: revenue[0]?.total || 0,
      },
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}