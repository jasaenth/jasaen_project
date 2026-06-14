"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Story = () => {
  return (
    <section className="py-28 bg-bgmain relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="absolute -inset-5 bg-gold/15 rounded-4xl -rotate-3" />

            <div className="relative overflow-hidden rounded-4xl shadow-luxe group">
              <Image
                src="/images/ourstory.JPG"
                alt="Jasaen Boutique Hotel"
                width={800}
                height={1000}
                className="
                  w-full
                  h-162.5
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Luxury Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="gold-divider mb-6">Our Story</span>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight text-maroon">
              Where
              <span className="text-gold"> Character</span>,
              <br />
              Comfort &
              <br />
              Bangkok Culture Meet
            </h2>

            {/* Intro */}
            <p className="mt-8 text-lg text-textmain leading-relaxed max-w-xl">
              Jasaen Boutique Hotel stands apart with its distinctive
              industrial-vintage design, thoughtfully themed accommodations, and
              warm hospitality in the heart of Bangkok.
            </p>

            {/* Highlights Grid */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display text-2xl text-maroon mb-2">
                  Distinctive Design
                </h4>

                <p className="text-textmuted leading-relaxed">
                  From our iconic vintage manual elevator to character-filled
                  interiors, every corner of the hotel tells a story.
                </p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-maroon mb-2">
                  Unique Rooms
                </h4>

                <p className="text-textmuted leading-relaxed">
                  32 individually designed rooms cater to solo travelers,
                  couples, and families seeking comfort with personality.
                </p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-maroon mb-2">
                  Café & Lounge
                </h4>

                <p className="text-textmuted leading-relaxed">
                  Relax, work remotely, or meet fellow travelers in our
                  welcoming café and co-working spaces.
                </p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-maroon mb-2">
                  Prime Location
                </h4>

                <p className="text-textmuted leading-relaxed">
                  Minutes from BTS Saphan Taksin and Sathorn Pier with easy
                  access to Bangkok's riverside attractions.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-12 py-8 border-y border-borderlight">
              <div>
                <h3 className="font-playfair text-4xl text-maroon">32</h3>

                <p className="text-xs uppercase tracking-[0.25em] text-textmuted mt-2">
                  Unique Rooms
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-4xl text-maroon">7–10</h3>

                <p className="text-xs uppercase tracking-[0.25em] text-textmuted mt-2">
                  Minutes To BTS
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-4xl text-maroon">4.8</h3>

                <p className="text-xs uppercase tracking-[0.25em] text-textmuted mt-2">
                  Guest Rating
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mt-10 pl-6 border-l-2 border-gold">
              <p className="italic text-lg text-textmuted leading-relaxed">
                "At Jasaen Boutique Hotel, we combine character, convenience,
                and comfort to create a stay that feels authentically local
                while providing everything today's traveler needs."
              </p>

              <footer className="mt-3 text-maroon font-medium">
                — Jasaen Boutique Hotel
              </footer>
            </blockquote>

            {/* CTA */}
            <Link
              href="/about"
              className="
      mt-10
      inline-flex
      items-center
      gap-3
      text-maroon
      font-medium
      hover:text-gold
      transition
    "
            >
              Discover Our Story
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
