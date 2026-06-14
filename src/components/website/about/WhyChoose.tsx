"use client";

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
    title: "Boutique Experience",
    description:
      "A cozy and personalized stay with attention to every detail.",
    icon: FaBuilding,
  },
  {
    title: "Prime Location",
    description:
      "Located in the heart of Bangkok, close to major attractions and transport links.",
    icon: FaMapMarkerAlt,
  },
  {
    title: "Warm Hospitality",
    description:
      "Our friendly team is always here to make every guest feel at home.",
    icon: FaConciergeBell,
  },
  {
    title: "Modern Comfort",
    description:
      "Enjoy thoughtfully designed rooms and amenities for a relaxing stay.",
    icon: FaCouch,
  },
  {
    title: "Local Charm",
    description:
      "Experience authentic Bangkok culture blended with contemporary comfort.",
    icon: FaLeaf,
  },
];

const galleryImages = [
  "/images/whyChoose/whyChoose1.JPG",
  "/images/whyChoose/whyChoose2.JPG",
  "/images/whyChoose/whyChoose3.JPG",
  "/images/whyChoose/whyChoose4.JPG",
  "/images/whyChoose/whyChoose5.JPG",
  "/images/whyChoose/whyChoose6.JPG",
];

const WhyChoose = () => {
  return (
    <section className="pb-24 bg-bgmain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          

          <h2 className="font-display text-5xl lg:text-6xl text-maroon leading-tight">
            Why Choose Jasaen
            
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  border
                  border-borderlight
                  shadow-soft
                  hover:shadow-luxe
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  text-center
                  group
                "
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition">
                  <Icon className="text-maroon text-3xl" />
                </div>

                <h3 className="font-display text-xl text-maroon mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-textmuted leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Gallery */}
        <div>
          

          <div className="overflow-hidden rounded-4xl">
            <div className="image-scroll-track">
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div
                  key={index}
                  className="
                    relative
                    min-w-95
                    h-75
                    rounded-3xl
                    overflow-hidden
                    mx-2
                    shrink-0
                    group
                  "
                >
                  <Image
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;