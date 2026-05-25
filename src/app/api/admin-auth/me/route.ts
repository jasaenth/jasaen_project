import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { verifyToken } from "@/lib/auth";

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

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
}