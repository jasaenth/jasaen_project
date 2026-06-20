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
  if (!res.ok) {
    throw new Error("Failed to fetch guests");
  }
  return res.json();
}

export async function getPayments() {
  const res = await fetch("/api/cloudbeds/payments");
  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }
  return res.json();
}

export async function getReservations(page = 1) {
  const res = await fetch(`/api/cloudbeds/reservations?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch reservations");
  }

  return res.json();
}

export async function getRooms(page = 1) {
  const res = await fetch(`/api/cloudbeds/rooms?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return res.json();
}

export async function getUsers() {
  const res = await fetch("/api/cloudbeds/users");
  return res.json();
}
