"use client";

import { amenities } from "@/data/amenities";

type ShowTitle = {
  showTitle?: boolean;
};

export default function Amenities({ showTitle = true }: ShowTitle) {
  const duplicatedAmenities = [...amenities, ...amenities];

  return (
    <section className="py-28 bg-bgmain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {showTitle && (
          <div className="text-center mb-16">
            <span className="gold-divider justify-center mb-5">
              Hotel Experiences
            </span>

            <h2 className="font-display text-5xl lg:text-6xl text-maroon">
              Amenities Crafted For Comfort
            </h2>
          </div>
        )}

        {/* Infinite Slider */}
        <div className="overflow-hidden relative">
          <div className="marquee-track py-4">
            {duplicatedAmenities.map((item, index) => (
              <div
                key={index}
                className="
                  min-w-65
                  bg-white
                  rounded-4xl
                  border
                  border-borderlight
                  shadow-soft
                  p-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-luxe
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-gold/10
                    flex
                    items-center
                    justify-center
                    text-maroon
                    mb-5
                  "
                >
                  <item.icon size={28} />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-maroon">
                  {item.name}
                </h3>

                {/* Small decorative line */}
                <div className="w-12 h-px bg-gold mt-4 mb-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
