"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  "/images/hero/hero-1.jpeg",
  "/images/hero/hero-2.jpeg",
  "/images/hero/hero-3.jpeg",
];

export default function StayBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[320px] md:h-[360px] overflow-hidden">
      {/* Background Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((image, index) => (
          <div key={index} className="relative w-full h-full shrink-0 ">
            <Image
              src={image}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Overlay */}
            <div className="absolute inset-0 " />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h2 className="text-white text-2xl md:text-4xl font-bold uppercase leading-tight">
            A STAY THAT STAYS WITH YOU
          </h2>

          <p className="text-white/90 text-lg md:text-2xl mt-4 leading-relaxed">
            Relax, unwind, and enjoy the comfort
            <br />
            that feels just like home.
          </p>

          <Link
            href="/about"
            className="inline-block mt-8 bg-primary hover:bg-secondary text-white font-semibold px-8 py-3 rounded-md transition duration-300"
          >
            EXPLORE MORE
          </Link>
        </div>
      </div>
    </section>
  );
}