"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  activeTab: string;
  selectedCategory: string;
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (category: string) => void;
}

const tabs = [
  "All Images",
  "Room Images",
  "Hotel Images",
  "Amenities Images",
];

const GalleryFilters = ({
  activeTab,
  selectedCategory,
  setActiveTab,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl font-medium transition ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "border border-borderlight bg-white hover:bg-bgmain"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="px-4 py-3 border border-borderlight rounded-xl"
          >
            <option>All Categories</option>
            <option>Room Images</option>
            <option>Hotel Images</option>
            <option>Amenities Images</option>
          </select>

          <Link
            href="/admin/gallery/upload"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Upload New Image
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;