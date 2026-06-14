"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import BookingForm from "@/components/common/BookingForm";

type PageSliderHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  slides: string[];
  showBookingForm?: boolean;
};

export default function PageSliderHero({
  title,
  subtitle,
  eyebrow,
  slides,
  showBookingForm = false,
}: PageSliderHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative">
      {/* Hero Slider */}
      <div className="relative h-[60vh] min-h-125 overflow-hidden hero-clip">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-full shrink-0"
            >
              <Image
                src={image}
                alt={title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 text-white">
          {eyebrow && (
            <span className="white-divider mb-6">
              {eyebrow}
            </span>
          )}

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 max-w-3xl text-lg text-white/85">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Floating Booking Form */}
      {showBookingForm && (
        <div className="relative z-30 -mt-18 px-6">
          <Suspense fallback={null}>
            <BookingForm containerClassName="max-w-6xl mx-auto" />
          </Suspense>
        </div>
      )}
    </section>
  );
}