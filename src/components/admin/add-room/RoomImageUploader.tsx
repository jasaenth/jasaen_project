"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";

interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

const RoomImageUploader = ({
  images,
  setImages,
}: Props) => {
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages([...images, ...newImages].slice(0, 10));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">
        Room Images
      </h2>

      <p className="text-textmuted mb-5">
        Upload images of the room
      </p>

      <label className="border-2 border-dashed border-borderlight rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-bgmain transition">
        <Upload
          size={40}
          className="text-primary mb-4"
        />

        <p className="font-medium">
          Drag & drop images here
        </p>

        <p className="text-textmuted my-2">or</p>

        <span className="bg-primary text-white px-5 py-2 rounded-lg">
          Choose Files
        </span>

        <p className="text-sm text-textmuted mt-4 text-center">
          Upload up to 10 images (JPG, PNG — Max 5MB each)
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative h-24 rounded-xl overflow-hidden border"
            >
              <Image
                src={img}
                alt="Room"
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomImageUploader;