import { NextRequest, NextResponse } from "next/server";
import { cloudbedsFetch } from "@/lib/cloudbeds";

export async function GET(
  request: NextRequest
) {
  try {
    const page =
      request.nextUrl.searchParams.get(
        "page"
      ) || "1";

    const endpoint =`/api/v1.3/getGuestList?pageNumber=${page}&pageSize=100`;

    const data =
      await cloudbedsFetch(endpoint);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch guests",
      },
      { status: 500 }
    );
  }
}