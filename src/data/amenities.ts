import {
  FaWifi,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaConciergeBell,
  FaCoffee,
  FaBriefcase,
  FaShower,
  FaKey,
  FaBath,
  FaMapMarkedAlt,
  FaCamera,
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
    name: "TV",
    icon: FaTv,
    description:
      "Enjoy your favorite shows and movies with TV in every room.",
  },
  {
    name: "24-HOUR FRONT DESK",
    icon: FaShieldAlt,
    description: "Your safety is our priority with 24/7 front desk and CCTV.",
  },
  {
    name: "CCTV SURVEILLANCE",
    icon: FaCamera,
    description: "Ensuring your safety with round-the-clock CCTV monitoring.",
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
    name: "LAUNDRY VENDING MACHINE",
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
    name: "MEETING WORK PLACE",
    icon: FaBriefcase,
    description: "A dedicated space for business meetings and work-related activities.",
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
