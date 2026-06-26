import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { generateUserToken } from "@/lib/userAuth";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    await connectDB();

    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        {
          success: false,
          message: "Google credential missing",
        },
        {
          status: 400,
        }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Google token",
        },
        {
          status: 401,
        }
      );
    }

    const {
      sub,
      email,
      name,
      picture,
    } = payload;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        password: null,
        role: "USER",
      });
    }

    const token = generateUserToken(
      user._id.toString(),
      user.role
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
  console.error("GOOGLE LOGIN ERROR");
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    {
      status: 500,
    }
  );
}
}