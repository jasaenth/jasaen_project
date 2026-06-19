import { NextRequest, NextResponse } from "next/server";
import { cloudbedsFetch } from "@/lib/cloudbeds";

export async function GET(
  request: NextRequest
) {
  try {
    const date =
      request.nextUrl.searchParams.get(
        "date"
      );

    let endpoint =
      "/api/v1.3/getDashboard";

    if (date) {
      endpoint += `?date=${date}`;
    }

    const data =
      await cloudbedsFetch(endpoint);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Dashboard error",
      },
      {
        status: 500,
      }
    );
  }
}