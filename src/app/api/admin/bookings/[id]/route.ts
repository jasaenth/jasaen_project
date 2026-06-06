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
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const booking =
      await Booking.findById(id)
        .populate(
          "user",
          "name email mobile"
        )
        .populate("room");

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: booking,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch booking",
      },
      { status: 500 }
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
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const {
      status,
      paymentStatus,
    } = await req.json();

    const booking =
      await Booking.findByIdAndUpdate(
        id,
        {
          ...(status && { status }),
          ...(paymentStatus && {
            paymentStatus,
          }),
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "user",
          "name email mobile"
        )
        .populate(
          "room",
          "roomName roomType"
        );

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking updated successfully",
        data: booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update booking",
      },
      { status: 500 }
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
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const booking =
      await Booking.findByIdAndDelete(
        id
      );

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete booking",
      },
      { status: 500 }
    );
  }
}