"use client";

import { X, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
  loading = false,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-red-600">
            {title}
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2
              size={22}
              className="text-red-600"
            />
          </div>

          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 border rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;