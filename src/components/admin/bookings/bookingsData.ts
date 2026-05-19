export interface Booking {
  id: string;
  guestName: string;
  email: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: "Confirmed" | "Pending" | "Canceled";
}

export const bookingsData: Booking[] = [
  {
    id: "#BK1252",
    guestName: "Rohit Sharma",
    email: "rohit@gmail.com",
    roomType: "Deluxe Room",
    checkIn: "May 31, 2024",
    checkOut: "Jun 03, 2024",
    guests: 2,
    amount: 9000,
    status: "Confirmed",
  },
  {
    id: "#BK1251",
    guestName: "Ananya Patel",
    email: "ananya@gmail.com",
    roomType: "Suite Room",
    checkIn: "May 31, 2024",
    checkOut: "Jun 03, 2024",
    guests: 2,
    amount: 16000,
    status: "Confirmed",
  },
  {
    id: "#BK1250",
    guestName: "Vikram Singh",
    email: "vikram@gmail.com",
    roomType: "Standard Room",
    checkIn: "May 30, 2024",
    checkOut: "Jun 01, 2024",
    guests: 1,
    amount: 3000,
    status: "Pending",
  },
  {
    id: "#BK1249",
    guestName: "Neha Gupta",
    email: "neha@gmail.com",
    roomType: "Deluxe Room",
    checkIn: "May 30, 2024",
    checkOut: "Jun 01, 2024",
    guests: 2,
    amount: 9000,
    status: "Confirmed",
  },
  {
    id: "#BK1248",
    guestName: "Arjun Mehta",
    email: "arjun@gmail.com",
    roomType: "Suite Room",
    checkIn: "May 29, 2024",
    checkOut: "May 30, 2024",
    guests: 2,
    amount: 10000,
    status: "Canceled",
  },
  {
    id: "#BK1247",
    guestName: "Sneha Iyer",
    email: "sneha@gmail.com",
    roomType: "Executive Room",
    checkIn: "May 29, 2024",
    checkOut: "Jun 02, 2024",
    guests: 2,
    amount: 12000,
    status: "Confirmed",
  },
  {
    id: "#BK1246",
    guestName: "Karan Verma",
    email: "karan@gmail.com",
    roomType: "Family Room",
    checkIn: "May 28, 2024",
    checkOut: "May 31, 2024",
    guests: 4,
    amount: 14000,
    status: "Confirmed",
  },
  {
    id: "#BK1245",
    guestName: "Pooja Nair",
    email: "pooja@gmail.com",
    roomType: "Deluxe Room",
    checkIn: "May 28, 2024",
    checkOut: "May 29, 2024",
    guests: 2,
    amount: 9000,
    status: "Confirmed",
  },
];