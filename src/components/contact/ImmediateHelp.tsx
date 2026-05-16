import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const ImmediateHelp = () => {
  return (
    <section className="pt-12 bg-bgmain">
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero/hero-1.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 px-8 md:px-50 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* Icon */}
              <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-secondary text-3xl" />
              </div>

              {/* Text */}
              <div>
                <h2 className="heading-font text-xl md:text-2xl font-bold text-secondary uppercase mb-2">
                  NEED IMMEDIATE ASSISTANCE?
                </h2>

                <p className="text-white text-md md:text-lg  max-w-2xl">
                  Call us directly and our team will be happy to <br />
                  assist you right away.
                </p>
              </div>
            </div>

            {/* Button */}
            <Link
              href="tel:+66123456789"
              className="inline-flex items-center gap-4 border-2 border-secondary text-white hover:bg-secondary hover:text-primary px-7 py-3 rounded-xl font-semibold uppercase text-md transition duration-300 shrink-0"
            >
              <FaPhoneAlt />
              CALL NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmediateHelp;