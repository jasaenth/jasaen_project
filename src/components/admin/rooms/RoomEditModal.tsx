"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { amenitiesList } from "../add-room/addRoomData";
import { RoomData } from "@/types/room";

interface Props {
  room: RoomData | null;
  onClose: () => void;
  onSave: (
    room: RoomData,
    newImages: File[],
    existingImages: {
      url: string;
      publicId: string;
    }[],
    roomNumbers: string[],
  ) => Promise<void>;
}

const MAX_IMAGES = 5;
const MAX_SIZE = 2 * 1024 * 1024;

const ROOM_TYPES = ["STANDARD", "DELUXE", "DORMITORY", "SUITE"];

const RoomEditModal = ({ room, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<RoomData | null>(null);
  const [saving, setSaving] = useState(false);
  const [existingImages, setExistingImages] = useState<RoomData["images"]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);

  useEffect(() => {
    if (!room) {
      setFormData(null);
      setExistingImages([]);
      setNewImages([]);
      setRoomNumbers([]);
      return;
    }

    setFormData(room);
    setExistingImages(room.images || []);
    setNewImages([]);
    setRoomNumbers(
      room.units?.length
        ? room.units.map((unit) => unit.unitNumber)
        : Array.from({ length: room.totalUnits }, () => ""),
    );
  }, [room]);

  useEffect(() => {
    if (!formData) return;

    const targetLength = Number(formData.totalUnits) || 0;

    setRoomNumbers((prev) => {
      if (targetLength <= 0) return [];
      if (prev.length === targetLength) return prev;

      return Array.from(
        { length: targetLength },
        (_, index) => prev[index] || "",
      );
    });
  }, [formData?.totalUnits]);

  if (!room) return null;

  const handleChange = (
    key: keyof RoomData,
    value: string | number | boolean | string[],
  ) => {
    setFormData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const toggleAmenity = (amenityId: string) => {
    const exists = formData?.amenities?.includes(amenityId);

    if (exists) {
      handleChange(
        "amenities",
        (formData?.amenities || []).filter((a) => a !== amenityId),
      );
    } else {
      handleChange("amenities", [...(formData?.amenities || []), amenityId]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const selected = Array.from(files);

    if (
      existingImages.length + newImages.length + selected.length >
      MAX_IMAGES
    ) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const oversized = selected.find((file) => file.size > MAX_SIZE);

    if (oversized) {
      toast.error("Each image must be less than 2MB");
      return;
    }

    setNewImages((prev) => [...prev, ...selected]);

    e.target.value = "";
  };

  const removeExistingImage = (publicId: string) => {
    setExistingImages((prev) =>
      prev.filter((img) => img.publicId !== publicId),
    );
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRoomNumberChange = (index: number, value: string) => {
    setRoomNumbers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };

  const handleSaveClick = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      await onSave(formData, newImages, existingImages, roomNumbers);
      // Modal will close after successful save
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-6xl h-[95vh] shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={saving}
          className="absolute top-5 right-5 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={22} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-bold text-primary mb-8">Edit Room</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Name
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Enter the name of the room (e.g., Deluxe Suite, Standard Room)
                </p>
                <input
                  value={formData?.roomName}
                  onChange={(e) => handleChange("roomName", e.target.value)}
                  placeholder="Room Name"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Type
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Select the category of the room
                </p>
                <select
                  value={formData?.roomType}
                  onChange={(e) => handleChange("roomType", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {ROOM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Brief summary of the room (50-100 characters) for listings
                </p>
                <textarea
                  rows={3}
                  value={formData?.shortDescription}
                  onChange={(e) =>
                    handleChange("shortDescription", e.target.value)
                  }
                  placeholder="Short Description"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Detailed description of the room, amenities, and features
                </p>
                <textarea
                  rows={6}
                  value={formData?.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Description"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Per Night
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Base price charged per night
                  </p>
                  <input
                    type="number"
                    value={formData?.pricePerNight}
                    onChange={(e) =>
                      handleChange("pricePerNight", Number(e.target.value))
                    }
                    placeholder="Price"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Price
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Discounted price (if any)
                  </p>
                  <input
                    type="number"
                    value={formData?.discountPrice || 0}
                    onChange={(e) =>
                      handleChange("discountPrice", Number(e.target.value))
                    }
                    placeholder="Discount"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Adults
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Maximum number of adults allowed
                  </p>
                  <input
                    type="number"
                    value={formData?.maxAdults}
                    onChange={(e) =>
                      handleChange("maxAdults", Number(e.target.value))
                    }
                    placeholder="Adults"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Children
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Maximum number of children allowed
                  </p>
                  <input
                    type="number"
                    value={formData?.maxChildren}
                    onChange={(e) =>
                      handleChange("maxChildren", Number(e.target.value))
                    }
                    placeholder="Children"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bed Type
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Type of bed(s) in the room
                  </p>
                  <input
                    value={formData?.bedType}
                    onChange={(e) => handleChange("bedType", e.target.value)}
                    placeholder="Bed Type"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Size
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Total room area (e.g., 250 sq ft)
                  </p>
                  <input
                    type="text"
                    value={formData?.roomSize}
                    onChange={(e) => handleChange("roomSize", e.target.value)}
                    placeholder="Room Size (e.g. 250 sq ft)"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Units
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Number of rooms of this type available
                  </p>
                  <input
                    type="number"
                    value={formData?.totalUnits}
                    onChange={(e) =>
                      handleChange("totalUnits", Number(e.target.value))
                    }
                    placeholder="Total Units"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-sm">Room Numbers</h3>

                <div className="grid grid-cols-2 gap-3">
                  {roomNumbers.map((roomNumber, index) => (
                    <div key={index} className="space-y-1">
                      <label className="text-xs text-gray-500">
                        Room {index + 1}
                      </label>

                      <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) =>
                          handleRoomNumberChange(index, e.target.value)
                        }
                        placeholder={`Enter room ${index + 1} number`}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <h3 className="font-bold mb-4">Amenities</h3>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {amenitiesList.map((amenity) => {
                  const selected = formData?.amenities?.includes(amenity.id);

                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`px-4 py-3 rounded-xl border transition ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      {amenity.name}
                    </button>
                  );
                })}
              </div>

              <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-primary/50 transition">
                <Upload size={32} className="text-gray-400" />
                <p className="mt-3 text-sm text-gray-600">Upload New Images</p>
                <p className="text-xs text-gray-400 mt-1">
                  Max 5 images, 2MB each
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {existingImages.map((img) => (
                  <div
                    key={img.publicId}
                    className="relative h-28 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={img.url}
                      alt="Room"
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.publicId)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {newImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative h-28 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="New Room"
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t p-6 flex justify-end gap-4 bg-white">
          <button
            onClick={handleClose}
            disabled={saving}
            className="px-6 py-3 border rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSaveClick}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomEditModal;
