"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { GalleryItem } from "@/types/gallery";


const categories = ["ALL", "HOTEL", "ROOMS", "AMENITIES", "SURROUNDINGS"];



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
    <section className="bg-bgmain pt-16 px-6 md:px-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-secondary"></div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
              Our Memories
            </span>
            <div className="w-12 h-[2px] bg-secondary"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            PHOTO GALLERY
          </h2>
          
          <p className="text-textmuted text-md max-w-2xl mx-auto">
            Explore our beautiful hotel through these captured moments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const count = category === "ALL" 
              ? galleryImages.length 
              : galleryImages.filter(img => img.tag === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "bg-white text-textmain hover:bg-secondary/20 border border-borderlight"
                }`}
              >
                {category}
                <span className={`ml-2 text-xs ${
                  activeCategory === category ? "text-white/80" : "text-textmuted"
                }`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Uniform Grid - All images same size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              onClick={() => handleImageClick(image, index)}
            >
              {/* Image Container - Fixed height for uniformity */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.title || `Gallery ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading={index < 8 ? "eager" : "lazy"}
                  quality={85}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-white/80 text-sm mt-1 line-clamp-2">{image.subtitle}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
                  {image.tag}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Image Info - Always visible */}
              <div className="p-4">
                <h3 className="text-textmain font-semibold text-base truncate">{image.title}</h3>
                <p className="text-textmuted text-sm mt-1 line-clamp-2">{image.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Image gallery lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-secondary transition z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div 
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[80vh]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80">{selectedImage.subtitle}</p>
                <p className="text-secondary text-sm mt-2">{selectedImage.tag}</p>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;