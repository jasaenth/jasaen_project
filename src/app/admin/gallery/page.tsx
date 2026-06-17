"use client";

import { useEffect, useState } from "react";
import GalleryFilters from "@/components/admin/gallery/GalleryFilters";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";
import GalleryPagination from "@/components/admin/gallery/GalleryPagination";
import GalleryViewModal from "@/components/admin/gallery/GalleryViewModal";
import GalleryEditModal from "@/components/admin/gallery/GalleryEditModal";
import GalleryAddModal from "@/components/admin/gallery/GalleryAddModal";
import toast, { Toaster } from "react-hot-toast";
import { GalleryItem } from "@/types/gallery";

const ITEMS_PER_PAGE = 16;

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [editImage, setEditImage] = useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/gallery");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setImages(data.data);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter((img) => {
    return (
      selectedCategory === "All Categories" || img.tag === selectedCategory
    );
  });

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setImages((prev) => prev.filter((img) => img._id !== id));

      toast.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleSave = async (updatedImage: GalleryItem, file?: File | null) => {
    try {
      let uploadedImage = null;

      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        const uploadRes = await fetch("/api/uploads/gallery-images", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          toast.error(uploadData.message || "Image upload failed");
          return;
        }

        uploadedImage = uploadData.data;
      }

      const formData = new FormData();

      formData.append("title", updatedImage.title);
      formData.append("subtitle", updatedImage.subtitle);
      formData.append("tag", updatedImage.tag);

      if (uploadedImage) {
        formData.append("uploadedImage", JSON.stringify(uploadedImage));
      }

      const res = await fetch(`/api/gallery/${updatedImage._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setImages((prev) =>
        prev.map((img) => (img._id === updatedImage._id ? data.data : img)),
      );

      setEditImage(null);

      toast.success("Updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  const handleAddImage = async (data: {
    title: string;
    subtitle: string;
    image: File | null;
    tag: string;
  }) => {
    try {
      if (!data.image) {
        toast.error("Please select image");
        return;
      }

      const uploadFormData = new FormData();
      uploadFormData.append("image", data.image);

      const uploadRes = await fetch("/api/uploads/gallery-images", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        toast.error(uploadData.message || "Image upload failed");
        return;
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("tag", data.tag);
      formData.append("uploadedImage", JSON.stringify(uploadData.data));

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      setImages((prev) => [result.data, ...prev]);

      setCurrentPage(1);
      setShowAddModal(false);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <GalleryFilters
        onOpenAddModal={() => setShowAddModal(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <div className="text-center py-20">Loading gallery...</div>
      ) : (
        <>
          <GalleryGrid
            items={paginatedImages}
            onView={setSelectedImage}
            onEdit={setEditImage}
            onDelete={handleDelete}
          />

          <GalleryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      <GalleryViewModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <GalleryEditModal
        item={editImage}
        onClose={() => setEditImage(null)}
        onSave={handleSave}
      />

      {showAddModal && (
        <GalleryAddModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddImage}
        />
      )}
    </div>
  );
}
