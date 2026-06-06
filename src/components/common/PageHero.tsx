import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  breadcrumb?: string;
};

const PageHero = ({
  title,
  subtitle,
  image,
  breadcrumb,
}: PageHeroProps) => {
  return (
    <section className="relative h-[500px] w-full overflow-hidden pt-20">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-4 mb-4">
            <div className="w-16 h-[2px] bg-secondary"></div>
            <div className="w-3 h-3 rounded-full border-2 border-secondary"></div>
            <div className="w-16 h-[2px] bg-secondary"></div>
          </div>

          {/* Subtitle */}
          <p className="text-white/90 text-md sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-4 text-lg">
            <Link
              href="/"
              className="text-white hover:text-secondary transition"
            >
              Home
            </Link>

            <span className="text-white/70">›</span>

            <span className="text-secondary font-medium">
              {breadcrumb || title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;