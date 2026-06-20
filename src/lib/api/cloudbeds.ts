export async function getDashboard(date?: string) {
  const url = date
    ? `/api/cloudbeds/dashboard?date=${date}`
    : "/api/cloudbeds/dashboard";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}

export async function getGuests(page = 1) {
  const res = await fetch(`/api/cloudbeds/guests?page=${page}`);
  return res.json();
}

export async function getPayments() {
  const res = await fetch("/api/cloudbeds/payments");
  return res.json();
}

export async function getReservations() {
  const res = await fetch("/api/cloudbeds/reservations");
  return res.json();
}

export async function getRooms() {
  const res = await fetch("/api/cloudbeds/rooms");
  return res.json();
}

export async function getUsers() {
  const res = await fetch("/api/cloudbeds/users");
  return res.json();
}
