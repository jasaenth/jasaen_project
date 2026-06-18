// src/types/cloudbeds.ts

// ============ API Response Types ============

export interface CloudbedsResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// ============ Property Types ============

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  currency: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Guest Types ============

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  totalStays: number;
  totalSpent: number;
  preferences: string[];
  lastStay?: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
  createdAt: string;
  updatedAt: string;
}

export interface GuestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  preferences?: string[];
}

// ============ Room Types ============

export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  description: string;
  capacity: number;
  bedType: string;
  size: number;
  amenities: string[];
  images: string[];
  floor?: number;
  roomNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoomFormData {
  name: string;
  type: string;
  price: number;
  description: string;
  capacity: number;
  bedType: string;
  size: number;
  amenities: string[];
  images: string[];
  status: 'Active' | 'Inactive' | 'Maintenance';
}

// ============ Reservation Types ============

export interface Reservation {
  id: string;
  confirmationNumber: string;
  guest: Guest;
  guestId: string;
  roomId: string;
  roomType: string;
  room?: Room;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled' | 'NoShow';
  notes?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationFormData {
  guestId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  notes?: string;
  source?: string;
}

export interface ReservationFilters {
  startDate?: string;
  endDate?: string;
  status?: Reservation['status'];
  guestId?: string;
  roomId?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// ============ Payment Types ============

export interface Payment {
  id: string;
  transactionId: string;
  reservationId: string;
  reservation?: Reservation;
  guestId: string;
  guestName: string;
  amount: number;
  paymentMethod: 'Card' | 'Cash' | 'BankTransfer' | 'Online' | 'Other';
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  startDate?: string;
  endDate?: string;
  status?: Payment['status'];
  paymentMethod?: Payment['paymentMethod'];
  page?: number;
  limit?: number;
}

// ============ Revenue Types ============

export interface RevenueReport {
  totalRevenue: number;
  averageDailyRate: number;
  occupancyRate: number;
  revenuePerAvailableRoom: number;
  dailyData: RevenueDataPoint[];
  weeklyData: RevenueDataPoint[];
  monthlyData: RevenueDataPoint[];
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  bookings: number;
  occupancy: number;
}

// ============ Channel Types ============

export interface ChannelDistribution {
  name: string;
  bookings: number;
  revenue: number;
  percentage: number;
  color: string;
}

// ============ Activity Types ============

export interface Activity {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon: string;
  read: boolean;
}

// ============ Notification Types ============

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

// ============ API Request/Response Types ============

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}