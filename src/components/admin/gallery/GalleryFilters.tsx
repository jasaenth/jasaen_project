"use client";

import { Plus } from "lucide-react";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onOpenAddModal: () => void;
}

const GalleryFilters = ({
  selectedCategory,
  setSelectedCategory,
  onOpenAddModal,
}: Props) => {
  return (
    <div className="
  bg-white
  rounded-3xl
  border
  border-slate-200
  p-5
">
  <div className="flex flex-col lg:flex-row gap-4 justify-between">
    
    <select
      value={selectedCategory}
      onChange={(e) =>
        setSelectedCategory(e.target.value)
      }
      className="
        h-12
        px-4
        rounded-xl
        border
        border-slate-200
      "
    >
      <option value="All Categories">
        All Categories
      </option>

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

    <button
      onClick={onOpenAddModal}
      className="
        h-12
        px-6
        rounded-xl
        bg-[#7A1C1C]
        text-white
        font-medium
        flex
        items-center
        gap-2
      "
    >
      <Plus size={18} />
      Upload Image
    </button>
  </div>
</div>
  );
};

export default GalleryFilters;