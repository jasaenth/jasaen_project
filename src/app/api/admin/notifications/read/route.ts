import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function PATCH() {
  try {
    await connectDB();

    await Notification.updateMany(
      {
        target: "ADMIN",
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

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