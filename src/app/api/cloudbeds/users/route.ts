import { NextResponse } from "next/server";
import { cloudbedsFetch } from "@/lib/cloudbeds";

export async function GET() {
  try {
    const data = await cloudbedsFetch(
      "/api/v1.3/getUsers"
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}