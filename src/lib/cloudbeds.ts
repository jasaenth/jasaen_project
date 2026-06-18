export async function getCloudbedsToken(authCode?: string) {
  try {
    // If authCode is provided, exchange it for an access token
    if (authCode) {
      const response = await fetch(
        "https://api.cloudbeds.com/api/v1.3/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.CLOUDBEDS_CLIENT_ID || "",
            client_secret: process.env.CLOUDBEDS_CLIENT_SECRET || "",
            code: authCode,
            redirect_uri: process.env.CLOUDBEDS_REDIRECT_URI || "",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          status: response.status,
          ok: false,
          error: data.error || "Failed to exchange code for token",
          data,
        };
      }

      return {
        status: response.status,
        ok: response.ok,
        data,
      };
    }

    // Otherwise, use API key grant type for token refresh
    const response = await fetch(
      "https://api.cloudbeds.com/api/v1.3/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:api-key",
          client_id: process.env.CLOUDBEDS_CLIENT_ID || "",
          client_secret: process.env.CLOUDBEDS_CLIENT_SECRET || "",
        }),
      },
    );

    const data = await response.json();

    return {
      status: response.status,
      ok: response.ok,
      data,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
