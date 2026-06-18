import { NextResponse } from "next/server";
import { getCloudbedsToken } from "@/lib/cloudbeds";

export async function GET() {
  const result = await getCloudbedsToken();

  return NextResponse.json(result);
}