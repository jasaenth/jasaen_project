import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://hotels.cloudbeds.com/api/v1.3/reservations",
      {
        headers: {
          "x-api-key": process.env.CLOUDBEDS_API_KEY!,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}