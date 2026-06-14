"use client";

import Link from "next/link";
import { BellRing, ArrowRight } from "lucide-react";

const AmenitiesHelp = () => {
  return (
    <section className="py-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2.5rem]
            shadow-luxe
          "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/hero/hero2.JPG')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Luxury Overlay */}
          <div className="absolute inset-0 bg-charcoal/85" />

          {/* Gold Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon/30 via-transparent to-gold/10" />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              
              {/* Left Side */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                
                {/* Icon */}
                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    border
                    border-gold/40
                    bg-gold/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <BellRing
                    size={34}
                    className="text-gold"
                  />
                </div>

                {/* Text */}
                <div>
                  <h2
                    className="
                      font-display
                      text-4xl
                      md:text-5xl
                      text-ivory
                      leading-tight
                    "
                  >
                    Need Something Else?
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-lg
                      text-ivory/80
                      leading-relaxed
                    "
                  >
                    Our friendly team is available around the clock to
                    assist with transportation, recommendations,
                    special requests, and anything you need to make
                    your stay truly exceptional.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-gold
                  px-8
                  py-4
                  text-charcoal
                  font-medium
                  shadow-soft
                  hover:bg-gold-soft
                  transition-all
                  duration-300
                  hover:scale-105
                  shrink-0
                "
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesHelp;