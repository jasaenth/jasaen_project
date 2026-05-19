// components/Story.jsx
"use client";
import Image from "next/image";

const Story = () => {
  return (
    <section className="py-16 md:py-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-64">
                <Image
                  src="/images/hero/hero-1.JPG"
                  alt="Hotel Interior"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-48">
                <Image
                  src="/images/hero/hero-2.JPG"
                  alt="Hotel Reception"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative rounded-xl overflow-hidden h-48">
                <Image
                  src="/images/hero/hero-3.JPG"
                  alt="Hotel Room"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-64">
                <Image
                  src="/images/hero/hero-1.JPG"
                  alt="Hotel Lobby"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            {/* Section Title */}
            <div>
            
              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                OUR STORY
              </h2>
            </div>

            {/* Description - Exact text from your image */}
            <div className="space-y-4">
              <p className="text-textmain text-lg leading-relaxed">
                Jasaen Hotel is a boutique hotel that blends
                <br />
                local charm with modern comfort.
              </p>
              <p className="text-textmain text-lg leading-relaxed">
                Our mission is to make every stay
                <br />
                memorable.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-secondary">50+</p>
                <p className="text-textmuted text-sm">Luxury Rooms</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">24/7</p>
                <p className="text-textmuted text-sm">Concierge Service</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">4.8⭐</p>
                <p className="text-textmuted text-sm">Guest Rating</p>
              </div>
            </div>

            {/* Discover More Button */}
            <button className="bg-secondary hover:bg-primary text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 group">
              DISCOVER MORE
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Signature or Quote */}
            <div className="pt-6 border-t border-borderlight">
              <p className="text-textmuted italic">
                "Where every guest becomes family"
              </p>
              <p className="text-primary font-semibold mt-2">
                - Jasaen Hotel Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;