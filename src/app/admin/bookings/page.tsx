"use client";

import { useState, useEffect } from "react";
import BookingFilters from "@/components/admin/bookings/BookingFilters";
import BookingsTable from "@/components/admin/bookings/BookingsTable";
import BookingPagination from "@/components/admin/bookings/BookingPagination";
import BookingViewModal from "@/components/admin/bookings/BookingViewModal";
import BookingEditModal from "@/components/admin/bookings/BookingEditModal";
import { IBooking } from "@/types/Booking";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<
    "PENDING" | "CONFIRMED" | "IN_HOUSE" | "COMPLETED" | "CANCELLED"
  >("PENDING");

  const [roomType, setRoomType] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const [editBooking, setEditBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;

  const inHouseCount = bookings.filter((b) => b.status === "IN_HOUSE").length;

  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  const cancelledCount = bookings.filter(
    (b) => b.status === "CANCELLED",
  ).length;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking._id.toLowerCase().includes(search.toLowerCase()) ||
      booking.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = booking.status === activeTab;

    const matchesRoom =
      roomType === "All" || booking.room?.roomType === roomType;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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

          checkIn: updatedBooking.checkIn,

          checkOut: updatedBooking.checkOut,

          assignedUnit: updatedBooking.assignedUnit,

          confirmedAt: updatedBooking.confirmedAt,

          actualCheckIn: updatedBooking.actualCheckIn,

          actualCheckOut: updatedBooking.actualCheckOut,
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

  const handleStatusChange = async (
    id: string,
    status: "CONFIRMED" | "IN_HOUSE" | "COMPLETED" | "CANCELLED",
  ) => {
    try {
      const payload: any = {
        status,
      };

      if (status === "CONFIRMED") {
        payload.confirmedAt = new Date();
      }

      if (status === "IN_HOUSE") {
        payload.actualCheckIn = new Date();
      }

      if (status === "COMPLETED") {
        payload.actualCheckOut = new Date();
      }

      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);

        return;
      }

      setBookings((prev) =>
        prev.map((booking) => (booking._id === id ? data.data : booking)),
      );

      toast.success(`Booking moved to ${status}`);
    } catch {
      toast.error("Failed to update booking");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl text-maroon">Bookings</h1>
      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-5 gap-4">
        <StatCard
          title="PENDING"
          value={pendingCount}
          subtitle="Awaiting approval"
        />

        <StatCard
          title="CONFIRMED"
          value={confirmedCount}
          subtitle="Ready for arrival"
        />

        <StatCard
          title="IN HOUSE"
          value={inHouseCount}
          subtitle="Currently staying"
        />

        <StatCard
          title="COMPLETED"
          value={completedCount}
          subtitle="Checked out"
        />

        <StatCard
          title="CANCELLED"
          value={cancelledCount}
          subtitle="Cancelled bookings"
        />
      </div>

      {/* Tabs */}

      <div className="bg-white rounded-2xl border p-2">
        <div className="flex flex-wrap gap-2">
          {[
            ["PENDING", pendingCount, "bg-yellow-500"],

            ["CONFIRMED", confirmedCount, "bg-blue-500"],

            ["IN_HOUSE", inHouseCount, "bg-green-500"],

            ["COMPLETED", completedCount, "bg-purple-500"],

            ["CANCELLED", cancelledCount, "bg-red-500"],
          ].map(([status, count, color]) => (
            <button
              key={status}
              onClick={() => setActiveTab(status as any)}
              className={`
                  px-5 py-3 rounded-xl text-sm font-medium
                  ${
                    activeTab === status ? `${color} text-white` : "bg-gray-100"
                  }
                `}
            >
              {status} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-4xl border overflow-hidden">
        <BookingsTable
          bookings={paginatedBookings}
          onView={setSelectedBooking}
          onEdit={setEditBooking}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
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
