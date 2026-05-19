"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { GalleryImage } from "./galleryData";

interface Props {
  item: GalleryImage | null;
  onClose: () => void;
}

const GalleryViewModal = ({
  item,
  onClose,
}: Props) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold text-primary">
            {item.title}
          </h2>

          <p className="text-textmuted mt-2">
            {item.category}
          </p>

          <p className="mt-4 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryViewModal;