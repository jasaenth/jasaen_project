"use client";

import { Search, Plus, Link } from "lucide-react";

interface Props {
  search: string;
  roomType: string;
  setSearch: (value: string) => void;
  setRoomType: (value: string) => void;
  onAddRoom: () => void;
}

const RoomsFilters = ({
  search,
  roomType,
  setSearch,
  setRoomType,
  onAddRoom,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-textmuted"
          />

          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-borderlight rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter */}
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="px-4 py-3 border border-borderlight rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>All</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
            <option>Executive</option>
            <option>Family</option>
          </select>

          {/* Add Room */}
          <Link
            href="/admin/add-room"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomsFilters;
