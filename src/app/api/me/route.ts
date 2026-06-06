
import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const authUser = await getUser();

    if (!authUser) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        { status: 401 }
      );
    }

    const user = await User.findById(
      (authUser as any).userId
    ).select("-password");

    return NextResponse.json({
      success: true,
      user,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        user: null,
      },
      { status: 500 }
    );
  }
}