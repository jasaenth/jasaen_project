// components/admin/layout/AdminNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon,
  User,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/slices/authSlice";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": { 
    title: "Dashboard", 
    subtitle: "Welcome back, Admin! Here's what's happening today." 
  },
  "/admin/bookings": { 
    title: "Bookings", 
    subtitle: "Manage and track all your hotel reservations." 
  },
  "/admin/rooms": { 
    title: "Rooms", 
    subtitle: "View and manage all room types and availability." 
  },
  "/admin/amenities": { 
    title: "Amenities", 
    subtitle: "Manage hotel amenities and facilities." 
  },
  "/admin/gallery": { 
    title: "Gallery", 
    subtitle: "Manage hotel photos and media gallery." 
  },
  "/admin/add-room": { 
    title: "Add New Room", 
    subtitle: "Add a new room to your hotel inventory." 
  },
  "/admin/users": { 
    title: "Users", 
    subtitle: "Manage system users and permissions." 
  },
  "/admin/cloudbeds": { 
    title: "Cloudbeds", 
    subtitle: "Integrated channel management settings." 
  },
};

interface AdminNavbarProps {
  onMenuClick?: () => void;
  isMobileMenuOpen?: boolean;
}

const AdminNavbar = ({ onMenuClick, isMobileMenuOpen }: AdminNavbarProps) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const pageInfo = pageTitles[pathname] || { 
    title: "Admin Panel", 
    subtitle: "Manage your hotel efficiently." 
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileOpen) setIsProfileOpen(false);
      if (isNotificationsOpen) setIsNotificationsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen, isNotificationsOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const notifications = [
    { id: 1, title: "New Booking", message: "John Doe booked a Deluxe Room", time: "5 min ago", read: false, icon: "📅" },
    { id: 2, title: "Payment Received", message: "Payment of ฿2,500 received", time: "1 hour ago", read: false, icon: "💰" },
    { id: 3, title: "Room Review", message: "New 5-star review", time: "3 hours ago", read: true, icon: "⭐" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(clearUser());

      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-30 bg-bgmain  transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-400"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Page Title - Desktop */}
            <div className="hidden lg:block flex-1 min-w-0">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary  truncate">
                {pageInfo.title}
              </h1>
              <p className="text-sm text-textmuted  mt-1">
                {pageInfo.subtitle}
              </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 lg:flex-none justify-end">
              

              

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
                  className="relative p-2 rounded-lg hover:bg-primary  transition"
                >
                  <Bell className="w-5 h-5 text-gray-600 " />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-bgmain  rounded-2xl shadow-xl border border-gray-200  overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-200 ">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 ">Notifications</h3>
                        <button className="text-xs text-primary  transition">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 border-b border-gray-100  hover:bg-secondary/50 transition cursor-pointer}`}>
                          <div className="flex gap-3">
                            <div className="text-2xl">{notif.icon}</div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800 ">{notif.title}</p>
                              <p className="text-xs text-gray-500  mt-0.5">{notif.message}</p>
                              <p className="text-xs text-gray-400  mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && <div className="w-2 h-2 bg-blue-300 rounded-full mt-2"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-200 ">
                      <button className="text-sm text-primary transition">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary  transition"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800 ">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 ">{user?.role}</p>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white  rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-200 ">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 ">{user?.fullName}</p>
                          <p className="text-xs text-gray-500 ">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                      <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50  w-full transition">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Title - Mobile */}
          <div className="lg:hidden py-3 border-t border-gray-100 dark:border-gray-800 mt-2">
            <h1 className="text-xl font-bold text-primary dark:text-white">
              {pageInfo.title}
            </h1>
            <p className="text-xs text-textmuted dark:text-gray-400 mt-1">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>
      </header>

      
    </>
  );
};

export default AdminNavbar;