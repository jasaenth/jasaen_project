"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut, BookOpen, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    fetchUser();

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        !target.closest(".profile-menu") &&
        !target.closest(".notification-menu")
      ) {
        setProfileOpen(false);
        setNotificationOpen(false);
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", onScroll);

      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setOpen(false);

    setProfileOpen(false);

    setNotificationOpen(false);
  }, [pathname]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        fetchNotifications();
      }
    } catch {}
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");

      const data = await res.json();

      if (data.success) {
        setNotifications(data.data.slice(0, 4));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

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
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const forceSolidPages = ["/login"];

  const solid = scrolled || forceSolidPages.includes(pathname);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        solid
          ? "bg-background/95 backdrop-blur-md shadow-soft text-charcoal"
          : "bg-transparent text-ivory",
      ].join(" ")}
    >
      {" "}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}{" "}
        <Link href="/">
          <Image
            src={solid ? "/logo.png" : "/logowhite.png"}
            alt="Jasaen Hotel"
            width={135}
            height={55}
            priority
          />{" "}
        </Link>
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative text-sm tracking-wide transition-colors",
                  active
                    ? solid
                      ? "text-maroon"
                      : "text-gold"
                    : solid
                      ? "text-foreground hover:text-maroon"
                      : "text-ivory/90 hover:text-gold",
                ].join(" ")}
              >
                {link.label}

                {active && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-6 bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Notification */}

              <div className="relative hidden md:block notification-menu">
                <button
                  onClick={async (e) => {
                    e.stopPropagation();

                    const nextState = !notificationOpen;

                    setNotificationOpen(nextState);

                    if (nextState && unreadCount > 0) {
                      await fetch("/api/notifications/read-all", {
                        method: "PATCH",
                      });

                      setNotifications((prev) =>
                        prev.map((n) => ({
                          ...n,
                          isRead: true,
                        })),
                      );
                    }
                  }}
                  className={[
                    "relative p-2 rounded-full border transition",
                    solid
                      ? "border-border text-charcoal hover:border-gold"
                      : "border-ivory/40 text-ivory hover:border-gold",
                  ].join(" ")}
                >
                  <Bell size={18} />

                  {unreadCount > 0 && (
                    <span
                      className="
              absolute
              -top-1
              -right-1
              w-5
              h-5
              bg-red-500
              text-white
              text-[10px]
              rounded-full
              flex
              items-center
              justify-center
            "
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="
            absolute
            right-0
            mt-2
            w-96
            rounded-2xl
            bg-white
            border
            shadow-xl
            overflow-hidden
            text-charcoal
          "
                  >
                    <div className="px-4 py-3 border-b font-semibold">
                      Notifications
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`
                    px-4
                    py-3
                    border-b
                    hover:bg-gray-50
                    ${!notification.isRead ? "bg-blue-50" : ""}
                  `}
                          >
                            <p className="font-medium">{notification.title}</p>

                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(
                                notification.createdAt,
                              ).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}

              <div className="relative hidden md:block profile-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((v) => !v);
                  }}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition",
                    solid
                      ? "border-border hover:border-gold text-charcoal"
                      : "border-ivory/40 hover:border-gold text-ivory",
                  ].join(" ")}
                >
                  <span className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-maroon text-ivory text-xs font-medium">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </span>

                  <span className="max-w-25 truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-luxe overflow-hidden text-charcoal">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="text-sm font-medium truncate">
                        {user.name}
                      </div>

                      <div className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        router.push("/my-bookings");
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary text-left"
                    >
                      <BookOpen size={14} />
                      My Bookings
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary text-left"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={[
                "hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                solid
                  ? "text-charcoal hover:text-maroon"
                  : "text-ivory/90 hover:text-gold",
              ].join(" ")}
            >
              <User size={15} />
              Sign In
            </Link>
          )}

          <Link
            href="/rooms"
            className="
          hidden md:inline-flex
          items-center
          justify-center
          rounded-full
          bg-gold
          px-6
          py-2.5
          text-sm
          font-medium
          text-charcoal
          hover:bg-gold-soft
          transition-colors
          shadow-soft
        "
          >
            Book Now
          </Link>

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className={[
              "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border",
              solid
                ? "border-charcoal/20 text-charcoal"
                : "border-ivory/40 text-ivory",
            ].join(" ")}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-ivory text-charcoal border-t border-border shadow-soft">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium hover:text-maroon"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  className="text-base font-medium hover:text-maroon"
                >
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-base font-medium text-left hover:text-maroon"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-base font-medium hover:text-maroon"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/rooms"
              className="
            mt-3
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-maroon
            px-6
            py-3
            text-sm
            font-medium
            text-ivory
          "
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
