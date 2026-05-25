"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { GalleryItem } from "@/types/gallery";

interface Props {
  item: GalleryItem;
  onView: (item: GalleryItem) => void;
  onEdit: (item: GalleryItem) => void;
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
        <h3 className="font-semibold text-lg">
          {item.title}
        </h3>

        <p className="text-textmuted text-sm mt-1">
          {item.tag}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {item.subtitle}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onView(item)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          <Eye size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg hover:bg-yellow-200 transition"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default GalleryMobileCard;