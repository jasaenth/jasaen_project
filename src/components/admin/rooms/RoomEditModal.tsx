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
    }[]
  ) => void;
}

const MAX_IMAGES = 5;
const MAX_SIZE = 2 * 1024 * 1024;

const ROOM_TYPES = [
  "STANDARD",
  "DELUXE",
  "SUITE",
  "EXECUTIVE",
  "PRESIDENTIAL",
];

const RoomEditModal = ({
  room,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] =
    useState<RoomData | null>(null);

  const [existingImages, setExistingImages] =
    useState<RoomData["images"]>([]);

  const [newImages, setNewImages] =
    useState<File[]>([]);

  useEffect(() => {
    if (!room) return;

    setFormData(room);
    setExistingImages(room.images || []);
    setNewImages([]);
  }, [room]);

  if (!formData) return null;

  const handleChange = (
    key: keyof RoomData,
    value:
      | string
      | number
      | boolean
      | string[]
  ) => {
    setFormData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const toggleAmenity = (
    amenityId: string
  ) => {
    const exists =
      formData.amenities.includes(
        amenityId
      );

    if (exists) {
      handleChange(
        "amenities",
        formData.amenities.filter(
          (a) => a !== amenityId
        )
      );
    } else {
      handleChange("amenities", [
        ...formData.amenities,
        amenityId,
      ]);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    const selected =
      Array.from(files);

    if (
      existingImages.length +
        newImages.length +
        selected.length >
      MAX_IMAGES
    ) {
      toast.error(
        "Maximum 5 images allowed"
      );
      return;
    }

    const oversized =
      selected.find(
        (file) =>
          file.size > MAX_SIZE
      );

    if (oversized) {
      toast.error(
        "Each image must be less than 2MB"
      );
      return;
    }

    setNewImages((prev) => [
      ...prev,
      ...selected,
    ]);

    e.target.value = "";
  };

  const removeExistingImage = (
    publicId: string
  ) => {
    setExistingImages((prev) =>
      prev.filter(
        (img) =>
          img.publicId !== publicId
      )
    );
  };

  const removeNewImage = (
    index: number
  ) => {
    setNewImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[95vh] shadow-2xl flex flex-col overflow-hidden relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 bg-white rounded-full p-2 shadow"
        >
          <X size={22} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-bold text-primary mb-8">
            Edit Room
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="space-y-5">
              <input
                value={formData.roomName}
                onChange={(e) =>
                  handleChange(
                    "roomName",
                    e.target.value
                  )
                }
                placeholder="Room Name"
                className="w-full border rounded-xl px-4 py-3"
              />

              <select
                value={formData.roomType}
                onChange={(e) =>
                  handleChange(
                    "roomType",
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                {ROOM_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              <textarea
                rows={3}
                value={
                  formData.shortDescription
                }
                onChange={(e) =>
                  handleChange(
                    "shortDescription",
                    e.target.value
                  )
                }
                placeholder="Short Description"
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                className="w-full border rounded-xl px-4 py-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={
                    formData.pricePerNight
                  }
                  onChange={(e) =>
                    handleChange(
                      "pricePerNight",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Price"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={
                    formData.discountPrice || 0
                  }
                  onChange={(e) =>
                    handleChange(
                      "discountPrice",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Discount"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={formData.maxAdults}
                  onChange={(e) =>
                    handleChange(
                      "maxAdults",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Adults"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={
                    formData.maxChildren
                  }
                  onChange={(e) =>
                    handleChange(
                      "maxChildren",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Children"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  value={formData.bedType}
                  onChange={(e) =>
                    handleChange(
                      "bedType",
                      e.target.value
                    )
                  }
                  placeholder="Bed Type"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={formData.roomSize}
                  onChange={(e) =>
                    handleChange(
                      "roomSize",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Room Size"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={
                    formData.totalUnits
                  }
                  onChange={(e) =>
                    handleChange(
                      "totalUnits",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Total Units"
                  className="border rounded-xl px-4 py-3"
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    formData.isFeatured
                  }
                  onChange={(e) =>
                    handleChange(
                      "isFeatured",
                      e.target.checked
                    )
                  }
                />
                Featured Room
              </label>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <h3 className="font-bold mb-4">
                Amenities
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {amenitiesList.map(
                  (amenity) => {
                    const selected =
                      formData.amenities.includes(
                        amenity.id
                      );

                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() =>
                          toggleAmenity(
                            amenity.id
                          )
                        }
                        className={`px-4 py-3 rounded-xl border ${
                          selected
                            ? "bg-primary text-white border-primary"
                            : "border-borderlight"
                        }`}
                      >
                        {amenity.name}
                      </button>
                    );
                  }
                )}
              </div>

              <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer">
                <Upload size={32} />
                <p className="mt-3">
                  Upload New Images
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={
                    handleImageUpload
                  }
                />
              </label>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {existingImages.map(
                  (img) => (
                    <div
                      key={img.publicId}
                      className="relative h-28 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt="Room"
                        fill
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(
                            img.publicId
                          )
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )
                )}

                {newImages.map(
                  (file, index) => (
                    <div
                      key={index}
                      className="relative h-28 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={URL.createObjectURL(
                          file
                        )}
                        alt="New Room"
                        fill
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(
                            index
                          )
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t p-6 flex justify-end gap-4 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!formData) return;

              onSave(
                formData,
                newImages,
                existingImages
              );
            }}
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomEditModal;