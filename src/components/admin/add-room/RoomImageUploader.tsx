"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
  images: File[];
  setImages: (images: File[]) => void;
}

const MAX_IMAGES = 5;
const MAX_SIZE = 2 * 1024 * 1024;

const RoomImageUploader = ({
  images,
  setImages,
}: Props) => {
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    const selectedFiles =
      Array.from(files);

    if (
      images.length +
        selectedFiles.length >
      MAX_IMAGES
    ) {
      toast.error(
        "Maximum 5 images allowed"
      );
      return;
    }

    const oversized =
      selectedFiles.find(
        (file) =>
          file.size > MAX_SIZE
      );

    if (oversized) {
      toast.error(
        "Each image must be less than 2MB"
      );
      return;
    }

    setImages([
      ...images,
      ...selectedFiles,
    ]);

    e.target.value = "";
  };

  const removeImage = (
    index: number
  ) => {
    setImages(
      images.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">
        Room Images
      </h2>

      <p className="text-textmuted mb-5">
        Upload up to 5 images
      </p>

      <label className="border-2 border-dashed border-borderlight rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-bgmain transition">
        <Upload
          size={40}
          className="text-primary mb-4"
        />

        <p className="font-medium">
          Choose room images
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={
            handleImageUpload
          }
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
          {images.map(
            (file, index) => (
              <div
                key={index}
                className="relative h-24 rounded-xl overflow-hidden border"
              >
                <Image
                  src={URL.createObjectURL(
                    file
                  )}
                  alt="Room"
                  fill
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(
                      index
                    )
                  }
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default RoomImageUploader;