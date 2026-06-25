import { NextResponse } from "next/server";
import Notification from "@/models/Notification";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      },
    );
  }

  const notifications = await Notification.find({
    user: (user as any).userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(4);

  return NextResponse.json({
    success: true,
    data: notifications,
  });
}
