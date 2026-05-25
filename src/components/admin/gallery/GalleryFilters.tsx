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
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="px-4 py-3 border border-borderlight rounded-xl min-w-[220px] focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} />
            Upload New Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;