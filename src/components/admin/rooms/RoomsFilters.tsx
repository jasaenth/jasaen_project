"use client";

import { Search, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  search: string;
  roomType: string;
  setSearch: (value: string) => void;
  setRoomType: (value: string) => void;
}

const RoomsFilters = ({
  search,
  roomType,
  setSearch,
  setRoomType,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
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
            className="w-full pl-12 pr-4 py-3 border border-borderlight rounded-xl"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="px-4 py-3 border border-borderlight rounded-xl"
          >
            <option value="All">All</option>
            <option value="STANDARD">STANDARD</option>
            <option value="DELUXE">DELUXE</option>
            <option value="SUITE">SUITE</option>
            <option value="EXECUTIVE">EXECUTIVE</option>
            <option value="PRESIDENTIAL">PRESIDENTIAL</option>
          </select>

          <Link
            href="/admin/add-room"
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
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