"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GalleryImage } from "./galleryData";

interface Props {
  item: GalleryImage | null;
  onClose: () => void;
  onSave: (item: GalleryImage) => void;
}

const GalleryEditModal = ({
  item,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] = useState<GalleryImage | null>(
    item
  );

  useEffect(() => {
    setFormData(item);
  }, [item]);

  if (!formData) return null;

  const handleChange = (
    key: keyof GalleryImage,
    value: string
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Edit Image
        </h2>

        <div className="grid grid-cols-1 gap-5">
          <input
            value={formData.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            placeholder="Image Title"
            className="border border-borderlight rounded-xl px-4 py-3"
          />

          <select
            value={formData.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option>Room Images</option>
            <option>Hotel Images</option>
            <option>Amenities Images</option>
          </select>

          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            placeholder="Description"
            className="border border-borderlight rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(formData)}
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