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
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <div
      key={item._id}
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      overflow-hidden
      hover:shadow-xl
      transition-all
      duration-300
    "
    >
      <div className="relative h-60">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />

        <div className="absolute top-3 left-3">
          <span className="
            bg-white/90
            backdrop-blur
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
          ">
            {item.tag}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-1">
          {item.title}
        </h3>

        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {item.subtitle}
        </p>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onView(item)}
            className="
              flex-1
              h-10
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
            "
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(item)}
            className="
              flex-1
              h-10
              rounded-xl
              bg-amber-50
              text-amber-600
              flex
              items-center
              justify-center
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="
              flex-1
              h-10
              rounded-xl
              bg-red-50
              text-red-600
              flex
              items-center
              justify-center
            "
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