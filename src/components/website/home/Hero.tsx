"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "../../common/BookingForm";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "/images/hero/hero1.jpg",
    "/images/hero/hero2.JPG",
    "/images/hero/hero3.JPG",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="relative h-screen min-h-[750px] overflow-visible hero-clip">
        {/* Background Slider */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((image, index) => (
            <div
              key={index}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={image}
                alt="Jasaen Hotel"
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/35 to-charcoal/65" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
          <div className="max-w-5xl text-ivory">
            

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] font-light text-balance">
              An ode to{" "}
              <span className="text-gold">
                timeless
              </span>
              <br />
              hospitality
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-ivory/85 leading-relaxed">
              Discover Jasaen — where every corridor tells a story
              and every stay becomes a memory worth returning to.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/rooms"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gold
                  px-8
                  py-4
                  text-charcoal
                  font-medium
                  shadow-luxe
                  hover:bg-gold-soft
                  transition
                "
              >
                Reserve a Stay →
              </Link>

              <Link
                href="/about"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-ivory/40
                  px-8
                  py-4
                  text-ivory
                  hover:bg-ivory/10
                  transition
                "
              >
                Discover Jasaen
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Booking Form */}
        <div className="absolute bottom-0 left-1/2 z-30 w-full max-w-7xl -translate-x-1/2 translate-y-1/2 px-6">
  <BookingForm
    containerClassName="mx-auto max-w-6xl"
  />
</div>
      </section>

      {/* Spacer because booking form floats outside hero */}
      <div className="h-60 md:h-48" />
    </>
  );
};

export default Hero;