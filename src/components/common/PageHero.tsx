import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/common/BookingForm";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  eyebrow?: string;
  breadcrumb?: string;
  showBookingForm?: boolean;
};

const PageHero = ({
  title,
  subtitle,
  image,
  eyebrow,
  showBookingForm = false,
}: PageHeroProps) => {
  return (
    <section className="relative">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[480px] overflow-hidden hero-clip">
        <Image src={image} alt={title} fill priority className="object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <span className="white-divider mb-6">{eyebrow}</span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold ">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg text-white/80">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Floating Booking Form */}
      {showBookingForm && (
        <div className="relative z-30 -mt-18 px-6">
          <BookingForm containerClassName="max-w-6xl mx-auto" />
        </div>
      )}
    </section>
  );
};

export default PageHero;
