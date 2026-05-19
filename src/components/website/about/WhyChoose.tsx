import Image from "next/image";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaConciergeBell,
  FaCouch,
  FaLeaf,
} from "react-icons/fa";

const features = [
  {
    title: "BOUTIQUE EXPERIENCE",
    description: "A cozy and personalized stay with attention to every detail.",
    icon: FaBuilding,
  },
  {
    title: "PRIME LOCATION",
    description:
      "Located in the heart of the city, close to major attractions.",
    icon: FaMapMarkerAlt,
  },
  {
    title: "WARM HOSPITALITY",
    description: "Our friendly team is always here to make you feel at home.",
    icon: FaConciergeBell,
  },
  {
    title: "MODERN COMFORT",
    description: "Enjoy well-designed rooms and amenities for a relaxing stay.",
    icon: FaCouch,
  },
  {
    title: "LOCAL CHARM",
    description:
      "Experience the beauty of local culture and authentic hospitality.",
    icon: FaLeaf,
  },
];

const galleryImages = [
  "/images/hero/hero-1.JPG",
  "/images/hero/hero-2.JPG",
  "/images/hero/hero-3.JPG",
  "/images/hero/hero-2.JPG",
];

const WhyChoose = () => {
  return (
    <section className="bg-bgmain py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-20 h-[2px] bg-secondary"></div>

          <h2 className="heading-font text-3xl md:text-4xl font-bold text-primary uppercase">
            WHY CHOOSE JASAEN HOTEL
          </h2>

          <div className="w-20 h-[2px] bg-secondary"></div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`text-center px-6 py-10 ${
                  index !== features.length - 1
                    ? "border-r border-borderlight"
                    : ""
                }`}
              >
                <div className="flex justify-center mb-6">
                  <Icon className="text-primary text-5xl" />
                </div>

                <h3 className="text-textmain font-semibold text-lg uppercase mb-2 inline-block">
                  {feature.title}
                </h3>

                <p className="text-textmuted text-sm ">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Images */}
        <div className="overflow-hidden w-full">
          <div className="image-scroll-track">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={index}
                className="relative min-w-[320px] h-[260px] shrink-0"
              >
                <Image
                  src={image}
                  alt={`Hotel Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
