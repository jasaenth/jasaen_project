import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const {
      name,
      email,
      mobile,
      password,
      confirmPassword,
    } = await req.json();

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Passwords do not match",
        },
        { status: 400 }
      );
    }

    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { mobile },
        ],
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        mobile,
        password:
          hashedPassword,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Registration failed",
      },
      { status: 500 }
    );
  }
}