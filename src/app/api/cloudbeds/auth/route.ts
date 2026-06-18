import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.CLOUDBEDS_CLIENT_ID;
  const redirectUri = process.env.CLOUDBEDS_REDIRECT_URI;

  const authUrl =
    `https://hotels.cloudbeds.com/api/v1.1/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri!)}`;

  return NextResponse.redirect(authUrl);
}