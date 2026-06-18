import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  console.log("Cloudbeds Auth Code:", code);

  return NextResponse.redirect(
    new URL("/admin/cloudbeds", req.url)
  );
}