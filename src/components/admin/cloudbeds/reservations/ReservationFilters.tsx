"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function ReservationFilters({
  search,
  setSearch,
}: Props) {
  return (
    
      <div className="relative max-w-md bg-white">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          placeholder="Search reservation..."
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            pl-11
            pr-4
            py-3
            border
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>
    
  );
}