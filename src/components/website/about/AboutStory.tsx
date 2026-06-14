"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutStory = () => {
  return (
    <section className="py-24 bg-bgmain">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 items-center">

          {/* Image */}
          <div className="relative">
            {/* Background Accent */}
            <div className="absolute -inset-4 bg-gold/10 rounded-[2rem] rotate-[-2deg]" />

            <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
              <Image
                src="/images/about.JPG"
                alt="Jasaen Hotel Story"
                width={900}
                height={700}
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
  <span className="gold-divider mb-5">
    About Us
  </span>

  <h2 className="font-display text-5xl lg:text-6xl text-maroon leading-tight">
    A Boutique Stay
    <br />
    Unlike Any Other
  </h2>

  <p className="mt-6 text-textmuted text-lg leading-relaxed">
    Located in Bangkok's vibrant Sathorn district, Jasaen Boutique Hotel
    is a charming 3-star boutique property offering a perfect blend of
    unique design, modern comfort, and exceptional value.
  </p>

  <p className="mt-5 text-textmuted text-lg leading-relaxed">
    Nestled within Bangkok's historic Sathorn and Bangrak neighborhood,
    Jasaen is far from a conventional city hotel. We believe accommodation
    should be more than just a place to sleep—it should become an
    unforgettable part of your travel story.
  </p>

  <p className="mt-5 text-textmuted text-lg leading-relaxed">
    Step through our doors on Charoen Krung 57 and discover an eclectic,
    visually captivating world where industrial-inspired architecture
    blends seamlessly with vintage charm. From our signature manual
    vintage-style elevator to our thoughtfully curated communal spaces,
    every corner of Jasaen is designed to inspire curiosity and create
    memorable experiences.
  </p>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-6 mt-10">
    <div>
      <div className="font-playfair text-4xl text-maroon">
        32
      </div>

      <div className="text-xs uppercase tracking-[0.2em] text-textmuted mt-2">
        Unique Rooms
      </div>
    </div>

    <div>
      <div className="font-playfair text-4xl text-maroon">
        BTS
      </div>

      <div className="text-xs uppercase tracking-[0.2em] text-textmuted mt-2">
        Nearby Access
      </div>
    </div>

    <div>
      <div className="font-playfair text-4xl text-maroon">
        24/7
      </div>

      <div className="text-xs uppercase tracking-[0.2em] text-textmuted mt-2">
        Guest Support
      </div>
    </div>
  </div>

  {/* Highlights */}
  <div className="mt-10 border-t border-borderlight pt-6 space-y-4">
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-gold mt-2" />
      <p className="text-textmain">
        Spacious café, communal lounge, and co-working friendly spaces.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-gold mt-2" />
      <p className="text-textmain">
        Conveniently located near local markets, street food, BTS, and river transport.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-gold mt-2" />
      <p className="text-textmain">
        Safe, clean, and memorable accommodation for leisure, business, and creative travelers.
      </p>
    </div>
  </div>

  {/* Quote */}
  <div className="mt-8">
    <p className="italic text-textmuted text-lg leading-relaxed">
      "Come for the design, stay for the warmth, and experience Bangkok
      from a completely unique perspective."
    </p>

    <p className="text-maroon font-medium mt-3">
      — Jasaen Boutique Hotel
    </p>
  </div>

  <Link
    href="/rooms"
    className="
      mt-10
      inline-flex
      items-center
      gap-2
      text-maroon
      font-medium
      hover:text-gold
      transition
    "
  >
    Discover Our Rooms
    <ArrowRight size={16} />
  </Link>
</div>

        </div>
      </div>
    </section>
  );
};

export default AboutStory;