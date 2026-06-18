import { NextResponse } from "next/server";
import { cloudbedsFetch } from "@/lib/cloudbeds";

export async function GET() {
  try {
    const data = await cloudbedsFetch(
      "/api/v1.1/getReservations"
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}