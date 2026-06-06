"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, User, LogOut, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me");

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch {}
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Logged out");

      setUser(null);

      router.push("/");
    } catch {
      toast.error("Logout failed");
    }
  };

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-bgmain backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-7">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={"/logo.png"}
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
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <button className="relative">
                <Bell size={22} className="text-gray-600" />

                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
              </button>
            )}

            {!user ? (
              <button
                onClick={() => router.push("/login")}
                className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 text-xs rounded-sm transition duration-300 shadow-md"
              >
                BOOK NOW
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 hover:bg-secondary px-2 py-1 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="text-white" size={18} />
                  </div>

                  <div className="text-left">
                    <h4 className="font-semibold text-sm">{user.name}</h4>

                    <p className="text-xs text-gray-600">USER</p>
                  </div>

                  <ChevronDown size={18}/>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-65 bg-white rounded-3xl border shadow-xl overflow-hidden">
                    <div className="p-4 flex gap-4 items-center border-b">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <User className="text-white" size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-md">{user.name}</h3>

                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/my-bookings")}
                      className="w-full flex items-center gap-3 px-8 py-4 hover:bg-gray-50 text-sm hover:bg-secondary/20"
                    >
                      <BookOpen size={18}/>
                      My Bookings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-8 pb-4 text-red-600 hover:bg-red-50 text-sm"
                    >
                      <LogOut size={18}/>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
