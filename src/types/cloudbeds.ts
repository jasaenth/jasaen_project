export interface Reservation {
  reservationID: string;
  guestName: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  roomName: string;
}

export interface Guest {
  guestID: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Room {
  roomID: string;
  roomName: string;
  roomType?: string;
  status: string;
}

export interface Payment {
  paymentID: string;
  amount: number;
  date: string;
  method?: string;
}

export interface Revenue {
  id: string;
  date: string;
  amount: number;
}

export interface Report {
  id: string;
  title: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}