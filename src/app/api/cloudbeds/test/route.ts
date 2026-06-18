import { NextResponse } from "next/server";
import { getCloudbedsToken } from "@/lib/cloudbeds";

export async function GET() {
  try {
    const tokenData =
      await getCloudbedsToken();

    return NextResponse.json(tokenData);
  } catch (error: any) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error?.message,
      stack: error?.stack,
    },
    { status: 500 }
  );
}
}