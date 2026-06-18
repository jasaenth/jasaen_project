// src/app/api/cloudbeds/connect/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.CLOUDBEDS_CLIENT_ID;
  const redirectUri = process.env.CLOUDBEDS_REDIRECT_URI;

  console.log("CLIENT ID:", clientId);
  console.log("REDIRECT URI:", redirectUri);

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error: "Missing Cloudbeds environment variables",
      },
      { status: 500 }
    );
  }

  const authUrl =
    `https://hotels.cloudbeds.com/api/v1.1/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(authUrl);
}