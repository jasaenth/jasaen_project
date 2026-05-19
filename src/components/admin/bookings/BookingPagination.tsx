"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const BookingPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: BookingPaginationProps) => {
  return (
    <div className="flex justify-end items-center gap-2 mt-6 flex-wrap">
      
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === index + 1
              ? "bg-primary text-white"
              : "border hover:bg-bgmain"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default BookingPagination;