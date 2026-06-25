import { NextRequest, NextResponse } from "next/server";
import { cloudbedsFetch } from "@/lib/cloudbeds";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = params.get("page") || "1";

    const checkInFrom = params.get("checkInFrom");
    const checkInTo = params.get("checkInTo");

    const checkOutFrom = params.get("checkOutFrom");
    const checkOutTo = params.get("checkOutTo");
    const sourceId = params.get("sourceId");

    const query = new URLSearchParams({
      pageNumber: page,
      pageSize: "100",
    });

    if (checkInFrom) query.append("checkInFrom", checkInFrom);

    if (checkInTo) query.append("checkInTo", checkInTo);

    if (checkOutFrom) query.append("checkOutFrom", checkOutFrom);

    if (checkOutTo) query.append("checkOutTo", checkOutTo);
    if (sourceId) query.append("sourceId", sourceId);

    const endpoint = `/api/v1.3/getReservations?${query.toString()}`;

    console.log("sourceId =", sourceId);
    console.log("endpoint =", endpoint);

    const data = await cloudbedsFetch(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reservations API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch reservations",
      },
      { status: 500 },
    );
  }
}
