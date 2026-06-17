"use client";

import { useEffect, useState } from "react";
import RoomsFilters from "@/components/admin/rooms/RoomsFilters";
import RoomsTable from "@/components/admin/rooms/RoomsTable";
import RoomViewModal from "@/components/admin/rooms/RoomViewModal";
import RoomEditModal from "@/components/admin/rooms/RoomEditModal";
import RoomsPagination from "@/components/admin/rooms/RoomsPagination";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import { RoomData } from "@/types/room";

const ITEMS_PER_PAGE = 9;

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [editRoom, setEditRoom] = useState<RoomData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/rooms");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch rooms");
        return;
      }

      setRooms(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomName.toLowerCase().includes(search.toLowerCase()) ||
      room.roomType.toLowerCase().includes(search.toLowerCase());

    const matchesType = roomType === "All" || room.roomType === roomType;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async () => {
    if (!deleteRoomId) return;

    try {
      setDeleteLoading(true);

      const res = await fetch(`/api/rooms/${deleteRoomId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      setRooms((prev) => prev.filter((room) => room._id !== deleteRoomId));

      toast.success("Room deleted successfully");

      setDeleteRoomId(null);
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSave = async (
    updatedRoom: RoomData,
    newImages: File[],
    existingImages: {
      url: string;
      publicId: string;
    }[],
    roomNumbers: string[],
  ) => {
    try {
      const uploadedImages = await Promise.all(
        newImages.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const response = await fetch("/api/uploads/room-images", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Image upload failed");
          }

          return data.data as { url: string; publicId: string };
        }),
      );

      const formData = new FormData();

      formData.append("roomName", updatedRoom.roomName);

      formData.append("roomType", updatedRoom.roomType);

      formData.append("description", updatedRoom.description);

      formData.append("shortDescription", updatedRoom.shortDescription);

      formData.append("pricePerNight", String(updatedRoom.pricePerNight));

      formData.append("discountPrice", String(updatedRoom.discountPrice || 0));

      formData.append("maxAdults", String(updatedRoom.maxAdults));

      formData.append("maxChildren", String(updatedRoom.maxChildren));

      formData.append("bedType", updatedRoom.bedType);

      formData.append("roomSize", String(updatedRoom.roomSize));

      formData.append("totalUnits", String(updatedRoom.totalUnits));

      formData.append("roomNumbers", JSON.stringify(roomNumbers));

      formData.append("amenities", JSON.stringify(updatedRoom.amenities));

      formData.append("existingImages", JSON.stringify(existingImages));
      formData.append("uploadedImages", JSON.stringify(uploadedImages));

      const res = await fetch(`/api/rooms/${updatedRoom._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      setRooms((prev) =>
        prev.map((room) => (room._id === updatedRoom._id ? data.data : room)),
      );

      toast.success("Room updated successfully");

      // CLOSE POPUP
      setEditRoom(null);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <RoomsFilters
        search={search}
        roomType={roomType}
        setSearch={setSearch}
        setRoomType={setRoomType}
      />

      {loading ? (
        <div className="text-center py-20">Loading rooms...</div>
      ) : (
        <>
          <RoomsTable
            rooms={paginatedRooms}
            onView={setSelectedRoom}
            onEdit={setEditRoom}
            onDelete={setDeleteRoomId}
          />

          <RoomsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      <RoomViewModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />

      <RoomEditModal
        room={editRoom}
        onClose={() => setEditRoom(null)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={!!deleteRoomId}
        title="Delete Room"
        message="Are you sure you want to delete this room? This action cannot be undone."
        onClose={() => setDeleteRoomId(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
