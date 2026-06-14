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
  setSearch,
  setStatus,
}: BookingFiltersProps) => {
  <div className="p-6 border-b">
  <div className="flex items-center justify-between gap-6">
    <div className="relative max-w-xl w-full">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search guest or booking ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          h-14
          rounded-full
          bg-[#f6f2ea]
          pl-12
          pr-4
          outline-none
        "
      />
    </div>

    <div className="flex gap-3 flex-wrap">
      {[
        "All",
        "CONFIRMED",
        "PENDING",
        "CHECKED_IN",
        "CANCELLED",
      ].map((item) => (
        <button
          key={item}
          onClick={() => setStatus(item)}
          className={`
            px-5
            h-11
            rounded-full
            border

            ${
              status === item
                ? "bg-maroon text-white border-maroon"
                : "bg-white"
            }
          `}
        >
          {item.replace("_", "-")}
        </button>
      ))}
    </div>
  </div>
</div>
};

export default BookingFilters;