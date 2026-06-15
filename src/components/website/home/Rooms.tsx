import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rooms = [
  {
    id: 1,
    category: "Standard",
    name: "Standard Room",
    description: "Cozy & Comfortable",
    price: "1200",
    image: "/images/rooms/room-1.jpg",
  },
  {
    id: 2,
    category: "Superior",
    name: "Superior Room",
    description: "Urban & Stylish",
    price: "1600",
    image: "/images/rooms/room-2.JPG",
  },
  {
    id: 3,
    category: "Deluxe",
    name: "Deluxe Room",
    description: "Spacious & Relaxing",
    price: "2200",
    image: "/images/rooms/room-3.JPG",
  },
];

const Rooms = () => {
  return (
    <section className="pb-28 pt-12 bg-secondary/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center">
          <span className="gold-divider mb-2">
            Suites & Residences
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-maroon">
            Rooms designed to linger in
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href="/rooms"
              className="group"
            >
              <div
                className="
                  overflow-hidden
                  rounded-4xl
                  bg-white
                  shadow-soft
                  hover:shadow-luxe
                  transition-all
                  duration-500
                "
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <span
                    className="
                      absolute
                      top-4
                      left-4
                      rounded-full
                      bg-white/95
                      text-charcoal
                      text-xs
                      px-3
                      py-1
                      tracking-wide
                      shadow-sm
                    "
                  >
                    {room.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-display text-3xl text-maroon">
                    {room.name}
                  </h3>

                  <p className="text-textmuted mt-2">
                    {room.description}
                  </p>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <span className="font-playfair text-2xl text-charcoal">
                        ฿{room.price}
                      </span>

                      <span className="text-textmuted text-sm">
                        {" "}
                        / night
                      </span>
                    </div>

                    <span
                      className="
                        text-gold
                        transition
                        group-hover:translate-x-1
                      "
                    >
                      <ArrowRight size={22} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/rooms"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-maroon
              px-8
              py-4
              text-ivory
              shadow-luxe
              hover:bg-maroon-deep
              transition
            "
          >
            View All Rooms
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;