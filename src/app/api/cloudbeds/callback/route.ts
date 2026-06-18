import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get("code");

  console.log("Cloudbeds Code:", code);

  return NextResponse.json({
    success: true,
    code,
  });
}