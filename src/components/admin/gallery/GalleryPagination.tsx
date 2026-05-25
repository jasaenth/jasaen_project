"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const GalleryPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(
      totalPages,
      currentPage + 2
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-end items-center gap-2">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* First page */}
      {currentPage > 3 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className="w-10 h-10 rounded-lg border hover:bg-gray-50"
          >
            1
          </button>

          {currentPage > 4 && (
            <span className="px-2 text-gray-500">
              ...
            </span>
          )}
        </>
      )}

      {/* Dynamic pages */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() =>
            setCurrentPage(page)
          }
          className={`w-10 h-10 rounded-lg transition ${
            currentPage === page
              ? "bg-primary text-white"
              : "border hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="px-2 text-gray-500">
              ...
            </span>
          )}

          <button
            onClick={() =>
              setCurrentPage(totalPages)
            }
            className="w-10 h-10 rounded-lg border hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default GalleryPagination;