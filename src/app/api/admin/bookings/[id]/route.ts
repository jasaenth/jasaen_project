import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

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

    console.log("UPDATE DATA:", updateData);

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
