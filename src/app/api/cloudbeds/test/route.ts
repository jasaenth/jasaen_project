import { NextResponse } from "next/server";
import { getCloudbedsToken } from "@/lib/cloudbeds";

export async function GET() {
  try {
    const tokenData =
      await getCloudbedsToken();

    return NextResponse.json(tokenData);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}