"use client";

import { useState } from "react";
import GalleryFilters from "@/components/admin/gallery/GalleryFilters";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";
import GalleryPagination from "@/components/admin/gallery/GalleryPagination";
import GalleryViewModal from "@/components/admin/gallery/GalleryViewModal";
import GalleryEditModal from "@/components/admin/gallery/GalleryEditModal";
import {
  galleryData,
  GalleryImage,
} from "@/components/admin/gallery/galleryData";

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const [images, setImages] =
    useState<GalleryImage[]>(galleryData);

  const [activeTab, setActiveTab] =
    useState("All Images");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const [editImage, setEditImage] =
    useState<GalleryImage | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = images.filter((img) => {
    const matchesTab =
      activeTab === "All Images" ||
      img.category === activeTab;

    const matchesCategory =
      selectedCategory === "All Categories" ||
      img.category === selectedCategory;

    return matchesTab && matchesCategory;
  });

  const totalPages = Math.ceil(
    filteredImages.length / ITEMS_PER_PAGE
  );

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setImages((prev) =>
      prev.filter((img) => img.id !== id)
    );
  };

  const handleSave = (updatedImage: GalleryImage) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === updatedImage.id
          ? updatedImage
          : img
      )
    );

    setEditImage(null);
  };

  return (
    <div className="space-y-6">
      <GalleryFilters
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
      />

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

      <GalleryViewModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <GalleryEditModal
        item={editImage}
        onClose={() => setEditImage(null)}
        onSave={handleSave}
      />
    </div>
  );
}