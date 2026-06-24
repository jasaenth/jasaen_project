"use client";

import { Search, Download } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  checkInFrom: string;
  setCheckInFrom: (value: string) => void;

  checkInTo: string;
  setCheckInTo: (value: string) => void;

  checkOutFrom: string;
  setCheckOutFrom: (value: string) => void;

  checkOutTo: string;
  setCheckOutTo: (value: string) => void;

  sourceId: string;
  setSourceId: (value: string) => void;

  sources: {
    id: string;
    name: string;
  }[];

  onExport: () => void;
}

export default function ReservationFilters({
  search,
  setSearch,

  checkInFrom,
  setCheckInFrom,

  checkInTo,
  setCheckInTo,

  checkOutFrom,
  setCheckOutFrom,

  checkOutTo,
  setCheckOutTo,

  sources,

  onExport,

  sourceId,
  setSourceId,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Search */}

      <div className="relative">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          value={search}
          placeholder="Search reservation..."
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Filters */}


      <div className="border-t pt-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Filter Reservations
        </p>

        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-3">
          {/* Check In From */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Check-In From
            </label>

            <input
              type="date"
              value={checkInFrom}
              onChange={(e) => setCheckInFrom(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Check In To */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Check-In To
            </label>

            <input
              type="date"
              value={checkInTo}
              onChange={(e) => setCheckInTo(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Check Out From */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Check-Out From
            </label>

            <input
              type="date"
              value={checkOutFrom}
              onChange={(e) => setCheckOutFrom(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Check Out To */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Check-Out To
            </label>

            <input
              type="date"
              value={checkOutTo}
              onChange={(e) => setCheckOutTo(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        

          {/* Clear Filters */}

          <div className="flex items-end">
            <button
              onClick={() => {
                setCheckInFrom("");
                setCheckInTo("");
                setCheckOutFrom("");
                setCheckOutTo("");
                setSourceId("");
              }}
              className="
          w-full
          border
          rounded-xl
          px-5
          py-3
          hover:bg-gray-50
        "
            >
              Clear
            </button>
          </div>

          {/* Export */}

          <div className="flex items-end">
            <button
              onClick={onExport}
              className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-black
          text-white
          rounded-xl
          px-5
          py-3
          hover:bg-gray-800
        "
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
