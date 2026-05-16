import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-white/10 pb-1">
          {/* Logo Section */}
          <div>
            <Link href="/">
              <Image
                src="/logowhite.png"
                alt="JASAEN Hotel"
                width={220}
                height={120}
                className="object-contain"
                priority
              />
            </Link>

            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Experience the perfect blend of tradition, comfort, and warm
              hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">
              Quick Links
            </h3>

            <ul className="space-y-1 text-white/80">
              <li>
                <Link href="/" className="hover:text-secondary transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/rooms" className="hover:text-secondary transition">
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/amenities"
                  className="hover:text-secondary transition"
                >
                  Amenities
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="hover:text-secondary transition"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-secondary transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-5">Contact Us</h3>

            <div className="space-y-4 text-white/80">
              {/* Phone */}
              <a
                href="tel:+66123456789"
                className="flex items-start gap-3 hover:text-secondary transition"
              >
                <Phone size={18} className="text-secondary mt-1" />
                <span>+66 123 456 789</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@jasaenhotel.com"
                className="flex items-start gap-3 hover:text-secondary transition"
              >
                <Mail size={18} className="text-secondary mt-1" />
                <span>info@jasaenhotel.com</span>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/?q=168 Thanon Prachathipat, Bangkhlo 10200, Thailand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-secondary transition"
              >
                <MapPin size={18} className="text-secondary mt-1" />
                <span>
                  168 Thanon Prachathipat,
                  <br />
                  Bangkhlo 10200, Thailand
                </span>
              </a>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-5">Follow Us</h3>

            <div className="flex gap-4">
              <Link
                href="#"
                className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-black transition"
              >
                <FaInstagram size={20} />
              </Link>

              <Link
                href="#"
                className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-black transition"
              >
                <FaFacebook size={20} />
              </Link>

              <Link
                href="#"
                className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-black transition"
              >
                <MapPin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-2 text-white/70 text-sm">
          © 2026 Jasaen Hotel. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
