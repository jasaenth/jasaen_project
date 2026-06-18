// components/admin/layout/AdminSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  Gift,
  ImageIcon,
  PlusSquare,
  Users,
  Cloud,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarDays, badge: 12 },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Add New Room", href: "/admin/add-room", icon: PlusSquare },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Cloudbeds", href: "/admin/cloudbeds", icon: Cloud },
];

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const AdminSidebar = ({ isMobileOpen, onMobileClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#18181B] text-white">
      {/* Logo Section */}
      <div className="px-8 py-8 border-b border-white/10 ">
        <Link href="/admin/dashboard" className="flex flex-col items-center">
          <div className="flex items-center justify-between gap-6">
            <div className="w-26.25 h-18 bg-ivory rounded-2xl flex items-center justify-center shadow-soft">
              <Image
                src="/logo.png"
                alt="Jasaen Hotel"
                width={90}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onMobileClose?.()}
                className={`
flex
items-center
gap-4
mx-5
px-4
py-3
rounded-full
transition-all
duration-300

${
  isActive
    ? "bg-[#D8B24A] text-black"
    : "text-white/70 hover:text-white hover:bg-white/5"
}
`}
              >
                <Icon size={22} strokeWidth={1.8} />

                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div
      className={`hidden lg:block fixed left-0 top-0 h-full bg-linear-to-b from-[#2B0000] to-[#1a0000] shadow-2xl transition-all duration-300 z-30 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <SidebarContent />

      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 bg-secondary text-white p-1 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      />
      <div
        className={`fixed left-0 top-0 h-full w-72 z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default AdminSidebar;
