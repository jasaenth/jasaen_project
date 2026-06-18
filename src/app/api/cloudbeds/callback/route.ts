import { NextRequest, NextResponse } from "next/server";
import { getCloudbedsToken } from "@/lib/cloudbeds";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");
    const errorDescription = req.nextUrl.searchParams.get("error_description");

    // Handle OAuth error from Cloudbeds
    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
          error_description: errorDescription,
        },
        { status: 400 },
      );
    }

    // Validate authorization code
    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "No authorization code provided",
        },
        { status: 400 },
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await getCloudbedsToken(code);

    if (!tokenResponse.ok || tokenResponse.error) {
      return NextResponse.json(
        {
          success: false,
          error: tokenResponse.error || "Failed to exchange code for token",
          details: tokenResponse.data,
        },
        { status: 400 },
      );
    }

    // TODO: Save the access token to database
    // const accessToken = tokenResponse.data.access_token;
    // const expiresIn = tokenResponse.data.expires_in;
    // await saveCloudbedsToken(accessToken, expiresIn);

    return NextResponse.json({
      success: true,
      message: "Cloudbeds account linked successfully",
      token: tokenResponse.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
