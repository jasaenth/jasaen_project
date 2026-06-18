const API_KEY = process.env.CLOUDBEDS_API_KEY!;

export async function cloudbedsFetch(endpoint: string) {
  const response = await fetch(
    `https://api.cloudbeds.com${endpoint}`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Cloudbeds API Error");
  }

  return response.json();
}