"use client";

import { useState } from "react";
import BookingFilters from "@/components/admin/bookings/BookingFilters";
import BookingsTable from "@/components/admin/bookings/BookingsTable";
import BookingPagination from "@/components/admin/bookings/BookingPagination";
import BookingViewModal from "@/components/admin/bookings/BookingViewModal";
import BookingEditModal from "@/components/admin/bookings/BookingEditModal";
import {
  bookingsData,
  Booking,
} from "@/components/admin/bookings/bookingsData";

const ITEMS_PER_PAGE = 5;

export default function BookingsPage() {
  const [bookings, setBookings] =
    useState<Booking[]>(bookingsData);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [roomType, setRoomType] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [editBooking, setEditBooking] =
    useState<Booking | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.guestName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || booking.status === status;

    const matchesRoom =
      roomType === "All" || booking.roomType === roomType;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  const totalPages = Math.ceil(
    filteredBookings.length / ITEMS_PER_PAGE
  );

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setBookings((prev) =>
      prev.filter((booking) => booking.id !== id)
    );
  };

  const handleSave = (updatedBooking: Booking) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === updatedBooking.id
          ? updatedBooking
          : booking
      )
    );

    setEditBooking(null);
  };

  const handleExport = () => {
    const csv = filteredBookings
      .map(
        (b) =>
          `${b.id},${b.guestName},${b.email},${b.roomType},${b.amount},${b.status}`
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <BookingFilters
        search={search}
        status={status}
        roomType={roomType}
        setSearch={setSearch}
        setStatus={setStatus}
        setRoomType={setRoomType}
        onExport={handleExport}
      />

      <BookingsTable
        bookings={paginatedBookings}
        onView={setSelectedBooking}
        onEdit={setEditBooking}
        onDelete={handleDelete}
      />

      <BookingPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <BookingViewModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

      <BookingEditModal
        booking={editBooking}
        onClose={() => setEditBooking(null)}
        onSave={handleSave}
      />
    </div>
  );
}