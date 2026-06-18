import {
  Reservation,
  Guest,
  Room,
  Payment,
  Revenue,
  Report,
  Notification,
} from "@/types/cloudbeds";

export const reservations: Reservation[] = [
  {
    id: "RSV-001",
    guest: "John Smith",
    room: "Deluxe Double",
    checkIn: "2025-07-10",
    checkOut: "2025-07-12",
    status: "Confirmed",
  },
  {
    id: "RSV-002",
    guest: "Sarah Lee",
    room: "Executive Suite",
    checkIn: "2025-07-14",
    checkOut: "2025-07-16",
    status: "Checked In",
  },
];

export const guests: Guest[] = [
  {
    id: "GST-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+66 888888888",
    stays: 4,
  },
  {
    id: "GST-002",
    name: "Sarah Lee",
    email: "sarah@example.com",
    phone: "+66 999999999",
    stays: 7,
  },
];

export const rooms: Room[] = [
  {
    id: "RM-001",
    name: "Deluxe Double",
    total: 10,
    occupied: 8,
    available: 2,
  },
  {
    id: "RM-002",
    name: "Executive Suite",
    total: 5,
    occupied: 3,
    available: 2,
  },
];

export const payments: Payment[] = [
  {
    id: "PAY-001",
    guest: "John Smith",
    amount: "฿8,500",
    status: "Paid",
    date: "2025-07-10",
  },
];

export const revenues: Revenue[] = [
  {
    month: "January",
    amount: "฿145,000",
  },
  {
    month: "February",
    amount: "฿180,000",
  },
];

export const reports: Report[] = [
  {
    id: "REP-001",
    title: "Revenue Report",
    generatedAt: "July 2025",
  },
  {
    id: "REP-002",
    title: "Occupancy Report",
    generatedAt: "July 2025",
  },
];

export const notifications: Notification[] = [
  {
    id: "NOT-001",
    title: "New Reservation",
    message: "John Smith booked Deluxe Double",
    time: "2 mins ago",
  },
  {
    id: "NOT-002",
    title: "Payment Received",
    message: "฿8,500 payment confirmed",
    time: "10 mins ago",
  },
];