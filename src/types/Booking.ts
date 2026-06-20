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
    roomSize?: string;
    bedType?: string;

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
    | "IN_HOUSE"
    | "COMPLETED"
    | "CANCELLED";

  paymentMethod?: string;

  paymentId?: string;

  assignedUnit?: string | null;

  confirmedAt?: string | null;

  actualCheckIn?: string | null;

  actualCheckOut?: string | null;

  createdAt: string;

  updatedAt?: string;
}