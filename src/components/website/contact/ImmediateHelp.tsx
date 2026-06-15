import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const ImmediateHelp = () => {
  return (
    <section className="py-12 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-4xl shadow-luxe"
          style={{
            backgroundImage: "url('/images/hero/hero2.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-charcoal/80" />

          <div className="relative z-10 px-8 md:px-12 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-gold text-xl" />
                </div>

                <div>
                  <span className="text-gold text-xs uppercase tracking-[0.3em]">
                    Guest Assistance
                  </span>

                  <h2 className="font-display text-3xl md:text-4xl text-ivory mt-2">
                    Need Immediate Assistance?
                  </h2>

                  <p className="text-ivory/75 mt-2 text-sm md:text-base">
                    Our team is available to assist with reservations,
                    transportation, and any questions regarding your stay.
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-right">
                  
                </div>

                <Link
                  href="tel:+66948082994"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-gold
                    hover:bg-gold-soft
                    px-7
                    py-3.5
                    text-charcoal
                    font-medium
                    transition-all
                    duration-300
                    shadow-soft
                  "
                >
                  <FaPhoneAlt />
                  Call Now
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmediateHelp;