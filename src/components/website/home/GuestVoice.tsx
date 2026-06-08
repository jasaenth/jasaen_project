"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aisha Verma",
    location: "London, UK",
    quote:
      "Every corridor felt cinematic. The staff remembered my coffee order on day two — that's the Jasaen magic.",
  },
  {
    name: "Daniel Okafor",
    location: "New York, USA",
    quote:
      "The kind of place where you slow down on purpose. The café and co-working lounge alone deserve a return visit.",
  },
  {
    name: "Mira Tanaka",
    location: "Tokyo, Japan",
    quote:
      "A boutique hotel with soul. The location near the river and BTS made exploring Bangkok effortless.",
  },
];

export default function GuestVoices() {
  return (
    <section className="pb-28 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <span className="gold-divider justify-center mb-5">
            Guest Voices
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-maroon">
            Why Our Guests Return
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-textmuted">
            Genuine experiences shared by travelers who have made
            Jasaen Boutique Hotel part of their Bangkok journey.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3 mt-16">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="
                bg-white
                rounded-[2rem]
                p-8
                shadow-soft
                border
                border-borderlight
                hover:shadow-luxe
                transition-all
                duration-300
              "
            >
              {/* Stars */}
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="
                  mt-6
                  font-display
                  text-xl
                  leading-relaxed
                  italic
                  text-charcoal
                "
              >
                "{item.quote}"
              </p>

              {/* Footer */}
              <div className="mt-8 pt-5 border-t border-borderlight">
                <h4 className="font-medium text-charcoal">
                  {item.name}
                </h4>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-textmuted
                    mt-2
                  "
                >
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}