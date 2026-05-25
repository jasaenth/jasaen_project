import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { generateToken } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const validationResult = adminLoginSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = "Invalid input.";
      return NextResponse.json(
        {
          success: false,
          message: firstError,
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;

    const user = await AdminUser.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    if (user.role !== "ADMIN" && user.role !== "STAFF") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is inactive",
        },
        { status: 403 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const token = generateToken(user._id.toString(), user.role);

    const cookie = serialize("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });

    response.headers.set("Set-Cookie", cookie);
    console.log("[LOGIN API] Set-Cookie:", cookie);
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 },
    );
  }
}
