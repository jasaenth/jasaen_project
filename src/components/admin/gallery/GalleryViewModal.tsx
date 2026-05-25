"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { GalleryItem } from "@/types/gallery";

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

const GalleryViewModal = ({
  item,
  onClose,
}: Props) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-white rounded-full p-2 shadow"
        >
          <X size={22} />
        </button>

        <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-5">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {item.title}
          </h2>

          <p className="text-textmuted mt-2 font-medium">
            {item.tag}
          </p>

          <p className="mt-4 leading-relaxed text-gray-700">
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryViewModal;