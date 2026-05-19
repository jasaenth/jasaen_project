"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { GalleryImage } from "./galleryData";

interface Props {
  item: GalleryImage;
  onView: (item: GalleryImage) => void;
  onEdit: (item: GalleryImage) => void;
  onDelete: (id: string) => void;
}

const GalleryMobileCard = ({
  item,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-4 shadow-sm">
      <div className="relative h-52 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-textmuted text-sm mt-1">
          {item.category}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onView(item)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <Eye size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default GalleryMobileCard;