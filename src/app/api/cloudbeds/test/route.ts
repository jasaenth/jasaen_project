import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiKeyExists:
      !!process.env.CLOUDBEDS_API_KEY,
  });
}