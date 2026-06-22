"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { GalleryItem } from "@/types/gallery";


interface Props {
  item: GalleryItem | null;
  onClose: () => void;
  onSave: (
    item: GalleryItem,
    imageFile?: File | null
  ) => void;
}

const GalleryEditModal = ({
  item,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] =
    useState<GalleryItem | null>(item);

  const [newImage, setNewImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    setFormData(item);
    setNewImage(null);
    setPreview(item?.image || "");
  }, [item]);

  if (!formData) return null;

  const handleChange = (
    key: keyof GalleryItem,
    value: string
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] || null;

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Edit Image
        </h2>

        <div className="grid gap-5">
          {/* Preview */}
          <div className="relative h-60 rounded-xl overflow-hidden border">
            <Image
              src={preview}
              alt={formData.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Title */}
          <input
            value={formData.title}
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
            placeholder="Image Title"
            className="border border-borderlight rounded-xl px-4 py-3"
          />

          {/* Tag */}
          <select
            value={formData.tag}
            onChange={(e) =>
              handleChange(
                "tag",
                e.target.value
              )
            }
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option value="HOTEL">
              HOTEL
            </option>
            <option value="ROOM">
              ROOM
            </option>
            <option value="AMENITIES">
              AMENITIES
            </option>
            <option value="SURROUNDINGS">
              SURROUNDINGS
            </option>
          </select>

          {/* Subtitle */}
          <textarea
            rows={4}
            value={formData.subtitle}
            onChange={(e) =>
              handleChange(
                "subtitle",
                e.target.value
              )
            }
            placeholder="Subtitle"
            className="border border-borderlight rounded-xl px-4 py-3"
          />

          {/* Image Upload */}
          <label className="border-2 border-dashed border-borderlight rounded-xl p-6 text-center cursor-pointer hover:bg-bgmain transition">
            <Upload
              size={28}
              className="mx-auto mb-3 text-primary"
            />

            <p className="font-medium">
              Replace Image
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Max 5MB
            </p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(
                formData,
                newImage
              )
            }
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditModal;