"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const UsersPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  return (
    <div className="flex justify-end items-center gap-3">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className="p-2 border rounded-lg disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === i + 1
              ? "bg-primary text-white"
              : "border"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className="p-2 border rounded-lg disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default UsersPagination;