"use client";

import { useState } from "react";

export default function UploadGalleryImagePage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-borderlight shadow-sm p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-primary mb-8">
        Upload New Image
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Image Title"
          className="w-full border border-borderlight rounded-xl px-4 py-3"
        />

        <select className="w-full border border-borderlight rounded-xl px-4 py-3">
          <option>Room Images</option>
          <option>Hotel Images</option>
          <option>Amenities Images</option>
        </select>

        <textarea
          rows={4}
          placeholder="Description"
          className="w-full border border-borderlight rounded-xl px-4 py-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-80 object-cover rounded-xl"
          />
        )}

        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold">
          Upload Image
        </button>
      </div>
    </div>
  );
}