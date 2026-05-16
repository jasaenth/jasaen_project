"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ROOMS", href: "/rooms" },
    { name: "AMENITIES", href: "/amenities" },
    { name: "GALLERY", href: "/gallery" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-bgmain/40 backdrop-blur-md`
          
          }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-7">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={ "/logo.png"}
              alt="Jasaen Hotel Logo"
              width={160}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium uppercase tracking-wide text-sm transition duration-300 ${
                    isActive
                      ? "text-primary underline underline-offset-4 decoration-2"
                      : isHomePage
                      ? "text-textmain hover:text-primary"
                      : "text-textmain hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 text-xs rounded-sm transition duration-300 shadow-md">
              BOOK NOW
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isHomePage ? "text-black" : "text-textmain"}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 mb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-textmain font-medium uppercase text-sm"
                >
                  {link.name}
                </Link>
              ))}

              <button className="bg-primary text-white py-3 rounded-lg font-semibold">
                BOOK NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;