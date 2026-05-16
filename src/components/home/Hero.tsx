"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BookingForm from "../common/BookingForm";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/images/hero/hero-1.JPG",
      title: "TRADITION MEETS COMFORT",
      subtitle: "A unique stay in the heart of the city",
    },
    {
      image: "/images/hero/hero-2.JPG",
      title: "EXPERIENCE TIMELESS LUXURY",
      subtitle: "Relax in elegance and comfort",
    },
    {
      image: "/images/hero/hero-3.JPG",
      title: "CREATE UNFORGETTABLE MEMORIES",
      subtitle: "Your perfect stay begins here",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-full shrink-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}
      </div>

      {/* Hero Overlay Content */}
      <div className="absolute inset-0 z-10">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-10">
          {/* Hero Text */}
          <div className="pt-32 md:pt-36 max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {slides[currentIndex].title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mt-6 mb-8">
              {slides[currentIndex].subtitle}
            </p>

            <button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
              BOOK YOUR STAY
            </button>
          </div>

          {/* Booking Form */}
          <BookingForm
            className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-full px-4 z-20"
            containerClassName="max-w-6xl mx-auto"
          />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "bg-secondary w-8 h-2"
                : "bg-white/50 hover:bg-white/80 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
