export interface IBooking {
  _id: string;

  user: {
    _id: string;
    name: string;
    email: string;
    mobile: string;
  };

  room: {
    _id: string;
    roomName: string;
    roomType: string;
    images?: {
      url: string;
    }[];
  };

  checkIn: string;
  checkOut: string;

  guests: number;

  totalAmount: number;

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  status:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

  createdAt: string;
}