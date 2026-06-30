"use client";

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface Props {
  onClose: () => void;
  onSave: (data: {
    title: string;
    subtitle: string;
    images: File[];
    tag: string;
  }) => Promise<void>;
}

const GalleryAddModal = ({ onClose, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tag, setTag] = useState("HOTEL");

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
    }

    setError("");

    setImages(files);

    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async () => {
    if (!title || !subtitle || !tag || images.length === 0) {
      setError("Please fill all fields and select images");
      return;
    }

    try {
      setUploading(true);

      setError("");

      await onSave({
        title,
        subtitle,
        images,
        tag,
      });
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={uploading}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">Upload Images</h2>

        <div className="grid gap-5">
          <input
            value={title}
            disabled={uploading}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image Title"
            className="border border-borderlight rounded-xl px-4 py-3"
          />

          <select
            value={tag}
            disabled={uploading}
            onChange={(e) => setTag(e.target.value)}
            className="border border-borderlight rounded-xl px-4 py-3"
          >
            <option value="HOTEL">HOTEL</option>
            <option value="ROOM">ROOM</option>
            <option value="AMENITIES">AMENITIES</option>
            <option value="SURROUNDINGS">SURROUNDINGS</option>
          </select>

          <textarea
            rows={4}
            value={subtitle}
            disabled={uploading}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
            className="border border-borderlight rounded-xl px-4 py-3"
          />

          <label className="border-2 border-dashed border-borderlight rounded-xl p-8 text-center cursor-pointer hover:bg-bgmain transition">
            {previews.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative h-40 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  {images.length} image(s) selected. Click to change.
                </p>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto mb-3 text-primary" />

                <p className="font-medium">Click to upload multiple images</p>

                <p className="text-sm text-gray-500 mt-2">
                  Select one or more images (Max 5MB each)
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={uploading}
              onChange={handleImageChange}
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {uploading && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Loader2 className="animate-spin text-blue-600" />

              <span className="text-blue-700 font-medium">
                Uploading {images.length} image(s)...
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-6 py-3 border rounded-xl disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-3 bg-primary text-white rounded-xl flex items-center gap-2 disabled:opacity-50"
          >
            {uploading && <Loader2 className="animate-spin" size={18} />}

            {uploading
              ? `Uploading ${images.length} Images...`
              : "Upload Images"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryAddModal;
