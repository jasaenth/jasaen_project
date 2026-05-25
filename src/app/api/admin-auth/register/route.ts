import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { adminRegisterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const validatedData = adminRegisterSchema.parse(body);

    const {
      fullName,
      email,
      phone,
      password,
      role,
    } = validatedData;

    // Check email
    const existingEmail = await AdminUser.findOne({ email });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    // Check phone
    const existingPhone = await AdminUser.findOne({ phone });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number already exists",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const newUser = await AdminUser.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      status: "ACTIVE",
    });

    return NextResponse.json(
      {
        success: true,
        message: `${role} account created successfully`,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          status: newUser.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0].message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}