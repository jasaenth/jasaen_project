"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import GalleryMobileCard from "./GalleryMobileCard";
import { GalleryItem } from "@/types/gallery";

interface Props {
  items: GalleryItem[];
  onView: (item: GalleryItem) => void;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

const GalleryGrid = ({
  items,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-borderlight shadow-sm overflow-hidden"
          >
            <div className="relative h-52">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-textmuted text-sm mt-1">
                {item.tag}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => onView(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => onEdit(item)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {items.map((item) => (
          <GalleryMobileCard
            key={item._id}
            item={item}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default GalleryGrid;