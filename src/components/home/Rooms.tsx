import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    id: 1,
    name: "STANDARD ROOM",
    description: "Cozy & Comfortable",
    price: "START FROM ฿1,200 / NIGHT",
    image: "/images/room/room-1.jpg",
  },
  {
    id: 2,
    name: "SUPERIOR ROOM",
    description: "Urban & Stylish",
    price: "START FROM ฿1,600 / NIGHT",
    image: "/images/room/room-2.JPG",
  },
  {
    id: 3,
    name: "DELUXE ROOM",
    description: "Spacious & Relaxing",
    price: "START FROM ฿2,200 / NIGHT",
    image: "/images/room/room-3.JPG",
  },
];

const Rooms = () => {
  return (
    <section className="bg-bgmain py-16 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading with Animation */}
        <div className="flex items-center justify-center gap-4 mb-14 group">
          <div className="w-16 h-[2px] bg-secondary"></div>
          <h2 className="text-primary text-3xl md:text-4xl font-bold uppercase tracking-wide relative">
            OUR ROOMS
          </h2>
          <div className="w-16 h-[2px] bg-secondary"></div>{" "}
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Room Image with Zoom Effect */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Price Badge that slides in */}
                <div className="absolute -top-12 right-4 bg-secondary text-white px-3 py-1 rounded-lg shadow-lg transform transition-all duration-500 group-hover:top-4">
                  <p className="text-xs font-semibold">BEST RATE</p>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 relative">
                {/* Decorative line that appears on hover */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-secondary transition-all duration-500 group-hover:w-full"></div>

                <h3 className="text-textmain text-xl font-bold uppercase mb-3 transition-all duration-300 group-hover:text-secondary group-hover:translate-x-1">
                  {room.name}
                </h3>

                <p className="text-gray-600 text-md mb-5 flex items-center gap-2">
                  <span className="w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-6"></span>
                  {room.description}
                </p>

                <p className="text-primary font-bold text-md mb-6 transform transition-all duration-300 group-hover:scale-105 group-hover:text-secondary">
                  {room.price}
                </p>

                <Link
                  href={`/rooms/${room.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold uppercase hover:text-secondary transition-all duration-300 group-hover:gap-4"
                >
                  <span>VIEW DETAILS</span>
                  <span className="transform transition-all duration-300 group-hover:translate-x-2 group-hover:rotate-180">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Rooms Button with Animation */}
        <div className="text-center mt-12">
          <Link
            href="/rooms/all"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
          >
            <span>VIEW ALL ROOMS</span>
            <span className="transform transition-all duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
