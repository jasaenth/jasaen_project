import {
  FaWifi,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaConciergeBell,
  FaCoffee,
  FaBriefcase,
  FaShower,
  FaParking,
  FaKey,
  FaBath,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { MdBalcony, MdElevator, MdOutlineLocalLaundryService } from "react-icons/md";

export const amenities = [
  {
    name: "FREE WI-FI",
    icon: FaWifi,
    description: "Stay connected with high-speed Wi-Fi throughout the hotel.",
  },
  {
    name: "AIR CONDITIONING",
    icon: FaSnowflake,
    description: "All rooms are equipped with modern air conditioning.",
  },
  {
    name: "SMART TV",
    icon: FaTv,
    description:
      "Enjoy your favorite shows and movies with smart TV in every room.",
  },
  {
    name: "24-HOUR SECURITY",
    icon: FaShieldAlt,
    description: "Your safety is our priority with 24/7 security and CCTV.",
  },
  {
    name: "DAILY HOUSEKEEPING",
    icon: FaConciergeBell,
    description: "Experience a clean and hygienic environment every day.",
  },
  {
    name: "COFFEE CORNER",
    icon: FaCoffee,
    description: "Relish a variety of coffee and beverages anytime.",
  },
  {
    name: "LAUNDRY SERVICE",
    description:
      "Convenient laundry service for a hassle-free stay.",
    icon: MdOutlineLocalLaundryService,
  },
  {
    name: "MINI FRIDGE",
    description:
      "In-room mini fridge to keep your drinks and snacks cool.",
    icon: FaCoffee,
  },
  {
    name: "WORK DESK",
    icon: FaBriefcase,
    description: "A comfortable workspace ideal for business travellers.",
  },
  {
    name: "PRIVATE BALCONY",
    icon: MdBalcony,
    description: "Select rooms with private balconies and beautiful views.",
  },
  {
    name: "PRIVATE BATHROOM",
    icon: FaBath,
    description: "Enjoy a private bathroom with modern amenities.",
  },
  {
    name: "KEY CARD ACCESS",
    icon: FaKey,
    description: "Secure and seamless access to your room with key cards.",
  },
  {
    name: "HOT & COLD SHOWER",
    icon: FaShower,
    description: "Relax and refresh with hot & cold water showers.",
  },
  {
    name: "PARKING FACILITY",
    icon: FaParking,
    description: "Safe and convenient parking space for our guests.",
  },
  {
    name: "LIFT ACCESS",
    icon: MdElevator,
    description: "Easy access to all floors with our modern elevator.",
  },
  {
    name: "TOUR ASSISTANCE",
    icon: FaMapMarkedAlt,
    description: "We help you plan local tours and travel experiences.",
  },
];
