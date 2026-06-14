"use client";

import { useState } from "react";
import BookingFilters from "@/components/admin/bookings/BookingFilters";
import BookingsTable from "@/components/admin/bookings/BookingsTable";
import BookingPagination from "@/components/admin/bookings/BookingPagination";
import BookingViewModal from "@/components/admin/bookings/BookingViewModal";
import BookingEditModal from "@/components/admin/bookings/BookingEditModal";
import { IBooking } from "@/types/Booking";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [roomType, setRoomType] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const [editBooking, setEditBooking] = useState<IBooking | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking._id.toLowerCase().includes(search.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || booking.status === status;

    const matchesRoom =
      roomType === "All" || booking.room.roomType === roomType;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete booking?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Booking deleted");

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSave = async (updatedBooking: IBooking) => {
    try {
      const res = await fetch(`/api/admin/bookings/${updatedBooking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updatedBooking.status,
          paymentStatus: updatedBooking.paymentStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Booking updated successfully");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === updatedBooking._id ? data.data : booking,
        ),
      );

      setEditBooking(null);
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleExport = () => {
    const csv = filteredBookings
      .map(
        (b) =>
          `${b._id},${b.user.name},${b.user.email},${b.room.roomType},${b.totalAmount},${b.status}`,
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/bookings");

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setBookings(data.data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl text-maroon">Bookings</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <StatCard
          title="TOTAL BOOKINGS"
          value={bookings.length}
          subtitle="All time"
        />

        <StatCard
          title="CONFIRMED"
          value={bookings.filter((b) => b.status === "CONFIRMED").length}
          subtitle="Ready to host"
        />

        <StatCard
          title="PENDING"
          value={bookings.filter((b) => b.status === "PENDING").length}
          subtitle="Need review"
        />

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] border overflow-hidden">
        <BookingFilters
  search={search}
  status={status}
  setSearch={setSearch}
  setStatus={setStatus}
/>

        <BookingsTable
          bookings={paginatedBookings}
          onView={setSelectedBooking}
          onEdit={setEditBooking}
          onDelete={handleDelete}
        />
      </div>

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

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      <p className="tracking-[0.25em] text-xs text-muted-foreground">{title}</p>

      <h3 className="text-2xl font-playfair mt-2">{value}</h3>

      <p className="mt-1 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
