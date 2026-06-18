export async function getCloudbedsToken() {
  const response = await fetch(
    "https://api.cloudbeds.com/api/v1.3/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type:
          "urn:ietf:params:oauth:grant-type:api-key",
        client_id:
          process.env.CLOUDBEDS_CLIENT_ID!,
        client_secret:
          process.env.CLOUDBEDS_CLIENT_SECRET!,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get token");
  }

  return response.json();
}