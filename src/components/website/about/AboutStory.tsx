import Image from "next/image";
import Link from "next/link";

const AboutStory = () => {
  return (
    <section className="bg-bgmain py-20 px-6 md:px-12 lg:px-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Content */}
          <div>
            {/* Small Label */}
            <p className="text-secondary uppercase font-semibold tracking-wide text-sm mb-4">
              OUR STORY
            </p>

            {/* Heading */}
            <h2 className="heading-font text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
              ROOTED IN TRADITION,
              <br />
              FOCUSED ON YOU
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-[2px] bg-secondary"></div>
              <div className="w-2 h-2 rounded-full border border-secondary"></div>
              <div className="w-14 h-[2px] bg-secondary"></div>
            </div>

            {/* Description */}
            <p className="text-textmuted text-lg leading-8 mb-6 max-w-xl">
              Jasaen Hotel is a boutique hotel that blends local charm with
              modern comfort in the heart of the city.
            </p>

            <p className="text-textmuted text-lg leading-8 mb-10 max-w-xl">
              Inspired by the rich heritage of Bangkok, our hotel is designed
              to offer a warm and inviting atmosphere where every guest feels at
              home. Whether you are here for business or leisure, we are
              dedicated to making your stay memorable.
            </p>

            {/* Button */}
            <Link
              href="/rooms"
              className="inline-flex items-center gap-3 border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold uppercase transition duration-300"
            >
              DISCOVER OUR ROOMS
              <span>→</span>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero/hero-2.JPG"
              alt="Jasaen Hotel Story"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;