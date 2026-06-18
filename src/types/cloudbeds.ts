export interface Reservation {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  stays: number;
}

export interface Room {
  id: string;
  name: string;
  total: number;
  occupied: number;
  available: number;
}

export interface Payment {
  id: string;
  guest: string;
  amount: string;
  status: string;
  date: string;
}

export interface Revenue {
  month: string;
  amount: string;
}

export interface Report {
  id: string;
  title: string;
  generatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}