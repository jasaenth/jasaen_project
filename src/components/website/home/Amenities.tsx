"use client";

import { amenities } from "@/data/amenities";

type ShowTitle = {
  showTitle?: boolean;
};

export default function Amenities({ showTitle = true }: ShowTitle) {
  const duplicatedAmenities = [...amenities, ...amenities];
  
  return (
    <section className="bg-[#F8F3F0] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {showTitle && (
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-[2px] bg-secondary"></div>

          <h2 className="text-primary text-3xl md:text-4xl font-bold uppercase">
            OUR AMENITIES
          </h2>

          <div className="w-16 h-[2px] bg-secondary"></div>
        </div>)}

        {/* Slider */}
        <div className="overflow-hidden relative">
          <div className="marquee-track">
            {duplicatedAmenities.map((item, index) => (
              <div
                key={index}
                className="min-w-[220px] bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center px-6 py-8"
              >
                <div className="text-primary text-4xl mb-4">
                  <item.icon />
                </div>

                <p className="text-textmain text-sm font-semibold uppercase text-center">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}