import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";
import Notification from "@/models/Notification";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await Booking.findById(id)
      .populate("user", "name email mobile")
      .populate("room");

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: booking,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      status,
      paymentStatus,
      checkIn,
      checkOut,
      assignedUnit,
      confirmedAt,
      actualCheckIn,
      actualCheckOut,
    } = body;

    const existingBooking = await Booking.findById(id);

    if (!existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        {
          status: 404,
        },
      );
    }

    const updateData: any = {};

    if (status !== undefined) updateData.status = status;

    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;

    if (checkIn !== undefined) updateData.checkIn = checkIn;

    if (checkOut !== undefined) updateData.checkOut = checkOut;

    if (assignedUnit !== undefined) updateData.assignedUnit = assignedUnit;

    if (confirmedAt !== undefined) updateData.confirmedAt = confirmedAt;

    if (actualCheckIn !== undefined) updateData.actualCheckIn = actualCheckIn;

    if (actualCheckOut !== undefined)
      updateData.actualCheckOut = actualCheckOut;

    /*
     * IN HOUSE
     * Mark selected room as BOOKED
     */
    if (status === "IN_HOUSE" && assignedUnit) {
      await Room.updateOne(
        {
          _id: existingBooking.room,
          "units.unitNumber": assignedUnit,
        },
        {
          $set: {
            "units.$.status": "BOOKED",
          },
          $inc: {
            availableUnits: -1,
          },
        },
      );
    }

    /*
     * COMPLETED / CANCELLED
     * Release room back to AVAILABLE
     */
    if (
      ["COMPLETED", "CANCELLED"].includes(status) &&
      existingBooking.assignedUnit
    ) {
      await Room.updateOne(
        {
          _id: existingBooking.room,
          "units.unitNumber": existingBooking.assignedUnit,
        },
        {
          $set: {
            "units.$.status": "AVAILABLE",
          },
          $inc: {
            availableUnits: 1,
          },
        },
      );
    }

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("user", "name email mobile")
      .populate(
        "room",
        `
      roomName
      roomType
      roomSize
      bedType
    `,
      );

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

    // Booking Confirmed
    if (status === "CONFIRMED" && existingBooking.status !== "CONFIRMED") {
      await Notification.create({
        user: booking.user._id,

        title: "Booking Confirmed",

        message:
          "Your booking has been confirmed. We look forward to welcoming you.",
      });
    }

    // Guest Checked In
    if (status === "IN_HOUSE" && existingBooking.status !== "IN_HOUSE") {
      await Notification.create({
        user: booking.user._id,

        title: "Check-In Completed",

        message: `Room ${
          booking.assignedUnit || assignedUnit
        } has been assigned successfully.`,
      });
    }

    // Guest Checked Out
    if (status === "COMPLETED" && existingBooking.status !== "COMPLETED") {
      await Notification.create({
        user: booking.user._id,

        title: "Thank You",

        message:
          "Your stay has been completed. Thank you for choosing Jasaen Hotel.",
      });
    }

    // Booking Cancelled
    if (status === "CANCELLED" && existingBooking.status !== "CANCELLED") {
      await Notification.create({
        user: booking.user._id,

        title: "Booking Cancelled",

        message:
          "Your booking has been cancelled. Please contact us if you need assistance.",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking updated successfully",
        data: booking,
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
        message: "Failed to update booking",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete booking",
      },
      { status: 500 },
    );
  }
}
