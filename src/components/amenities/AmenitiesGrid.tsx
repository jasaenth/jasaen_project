import {
  FaWifi,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaConciergeBell,
  FaCoffee,
  FaKey,
  FaShower,
  FaParking,
  FaUtensils,
  FaMapMarkedAlt,
} from "react-icons/fa";

import {
  MdBalcony,
  MdElevator,
  MdOutlineLocalLaundryService,
  MdWorkOutline,
} from "react-icons/md";

import { amenities } from "@/data/amenities";

const AmenitiesGrid = () => {
  return (
    <section className="bg-bgmain pt-20 px-6 md:px-12 lg:px-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="w-20 h-[2px] bg-secondary"></div>

          <h2 className="heading-font text-2xl md:text-4xl font-bold text-primary uppercase text-center">
            EXPERIENCE COMFORT & CONVENIENCE
          </h2>

          <div className="w-20 h-[2px] bg-secondary"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className=" border border-borderlight rounded-xl p-8 text-center hover:shadow-lg transition duration-300"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <Icon className="text-primary text-5xl" />
                </div>

                {/* Title */}
                <h3 className="text-textmain text-xl font-semibold uppercase mb-4">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-textmuted text-base leading-8 min-h-[120px]">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="w-10 h-[2px] bg-secondary mx-auto mt-6"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesGrid;