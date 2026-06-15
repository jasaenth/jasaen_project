import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      {" "}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-4">
        {/* Brand */}{" "}
        <div>
          {" "}
          <div className="mb-8">
            <div
              className="
      w-26.25
      h-18
      bg-ivory
      rounded-2xl
      flex
      items-center
      justify-center
      shadow-soft
    "
            >
              <Image
                src="/logo.png"
                alt="Jasaen Hotel"
                width={90}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ivory/60">
            A boutique sanctuary where heritage craft meets modern comfort —
            curated for travellers who notice the details.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="
              inline-flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-ivory/20
              hover:border-gold
              hover:text-gold
              transition
            "
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>
        {/* Explore */}
        <div>
          <h4 className="font-display text-gold text-lg mb-5">Explore</h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/rooms" className="hover:text-gold transition">
                Rooms & Suites
              </Link>
            </li>

            <li>
              <Link href="/amenities" className="hover:text-gold transition">
                Amenities
              </Link>
            </li>

            <li>
              <Link href="/gallery" className="hover:text-gold transition">
                Gallery
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-gold transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-gold transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h4 className="font-display text-gold text-lg mb-5">Legal</h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-gold transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-gold transition">
                Terms & Conditions
              </Link>
            </li>

            
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-display text-gold text-lg mb-5">Reach Us</h4>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span>
               Charoen Krung 57, Yan Nawa,
                <br />
                 Sathon, Bangkok 10120
              </span>
            </li>

            <li className="flex gap-3">
              <Phone size={16} className="text-gold mt-0.5 shrink-0" />
              <span>+66 94 8082994</span>
            </li>

            <li className="flex gap-3">
              <Mail size={16} className="text-gold mt-0.5 shrink-0" />
              <span>info@jasaen.com , jasaen168@gmail.com </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <span>
            © {new Date().getFullYear()} Jasaen Hotel. All rights reserved.
          </span>

          <span className="tracking-[0.3em] uppercase text-gold/80">
            Crafted With Care
          </span>
        </div>
      </div>
    </footer>
  );
}
