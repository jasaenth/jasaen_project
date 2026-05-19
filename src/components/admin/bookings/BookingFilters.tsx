"use client";

import { Search, Filter, Download } from "lucide-react";

interface BookingFiltersProps {
  search: string;
  status: string;
  roomType: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setRoomType: (value: string) => void;
  onExport: () => void;
}

const BookingFilters = ({
  search,
  status,
  roomType,
  setSearch,
  setStatus,
  setRoomType,
  onExport,
}: BookingFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col xl:flex-row gap-4 justify-between">
        
        {/* Search */}
        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-textmuted"
          />

          <input
            type="text"
            placeholder="Search by booking ID, guest name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-borderlight rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option value="All">All Room Types</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Suite Room">Suite Room</option>
            <option value="Executive Room">Executive Room</option>
            <option value="Family Room">Family Room</option>
          </select>

          <button className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition">
            <Filter size={18} />
            Filter
          </button>

          <button
            onClick={onExport}
            className="border border-borderlight px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-bgmain transition"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;