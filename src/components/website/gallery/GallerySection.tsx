"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { GalleryItem } from "@/types/gallery";


const categories = ["ALL", "HOTEL", "ROOM", "AMENITIES", "SURROUNDINGS"];



const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);

  const filteredImages =
    activeCategory === "ALL"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.tag === activeCategory
        );

  // Handle image click for lightbox
  const handleImageClick = useCallback((image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  // Navigate through images
  const navigateImage = useCallback((direction: "prev" | "next") => {
    const newIndex = direction === "next" 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [currentIndex, filteredImages]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
  }, [closeLightbox, navigateImage]);


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

      setGalleryImages(data.data);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };


  return (
  <section className="bg-bgmain py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">

      

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-5 py-2.5 rounded-full text-sm border transition
              ${
                activeCategory === category
                  ? "bg-maroon text-white border-maroon"
                  : "bg-white border-borderlight hover:border-gold"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(image, index)}
            className={`
              group
              relative
              overflow-hidden
              rounded-4xl
              ${
                index % 5 === 0
                  ? "md:row-span-2 md:h-105"
                  : "h-52 md:h-64"
              }
            `}
          >
            <Image
              src={image.image}
              alt={image.title || `Gallery ${index + 1}`}
              fill
              className="
                object-cover
                group-hover:scale-105
                transition
                duration-700
              "
              sizes="(max-width:768px) 100vw, 25vw"
            />

            {/* Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-charcoal/0
                group-hover:bg-charcoal/30
                transition
                duration-500
              "
            />

            {/* Category */}
            <div className="absolute top-4 left-4">
              <span className="
                bg-white/95
                text-charcoal
                text-xs
                px-3
                py-1
                rounded-full
                tracking-wide
              ">
                {image.tag}
              </span>
            </div>

            {/* Title */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
                translate-y-full
                group-hover:translate-y-0
                transition
                duration-500
                bg-linear-to-t
                from-black/70
                to-transparent
              "
            >
              <h3 className="text-white font-medium text-lg">
                {image.title}
              </h3>

              <p className="text-white/70 text-sm mt-1">
                {image.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredImages.length === 0 && (
        <div className="text-center py-24">
          <h3 className="font-display text-3xl text-maroon">
            No Images Found
          </h3>

          <p className="mt-3 text-textmuted">
            No gallery items available in this category.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-24">
          <div className="inline-block h-10 w-10 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-charcoal/95
            flex
            items-center
            justify-center
            p-6
          "
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="
              absolute
              top-6
              right-6
              h-12
              w-12
              rounded-full
              bg-white/10
              backdrop-blur
              flex
              items-center
              justify-center
              text-white
              hover:bg-white/20
              transition
            "
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="
              absolute
              left-6
              h-12
              w-12
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
            "
          >
            <ChevronLeft />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="
              absolute
              right-6
              h-12
              w-12
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
            "
          >
            <ChevronRight />
          </button>

          {/* Image */}
          <div
            className="
              relative
              w-full
              max-w-6xl
              h-[85vh]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="
                object-contain
                rounded-4xl
              "
              priority
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-8
                bg-linear-to-t
                from-black/80
                to-transparent
              "
            >
              <h3 className="font-display text-3xl text-white">
                {selectedImage.title}
              </h3>

              <p className="text-white/70 mt-2">
                {selectedImage.subtitle}
              </p>

              <p className="text-gold mt-3 text-sm tracking-[0.2em] uppercase">
                {selectedImage.tag}
              </p>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm">
            {currentIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  </section>
);
};

export default GallerySection;