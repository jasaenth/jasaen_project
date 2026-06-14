"use client";

import { amenities } from "@/data/amenities";

const AmenitiesGrid = () => {
  return (
    <section className="bg-bgmain pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl text-maroon">
            Experience Comfort & Convenience
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white
                  rounded-4xl
                  p-8
                  border
                  border-borderlight
                  shadow-soft
                  hover:shadow-luxe
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gold/10
                    flex
                    items-center
                    justify-center
                    mb-6
                    transition
                    duration-500
                    group-hover:bg-gold/20
                  "
                >
                  <Icon className="text-maroon text-3xl" />
                </div>

                {/* Title */}
                <h3
                  className="
                  font-display
                  text-2xl
                  text-maroon
                  mb-4
                "
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                  className="
                  text-textmuted
                  leading-relaxed
                  text-sm
                  min-h-27.5
                "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesGrid;
