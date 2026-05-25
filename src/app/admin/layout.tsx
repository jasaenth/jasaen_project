"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";

import { useAppDispatch } from "@/hooks/redux";
import { setUser, clearUser } from "@/store/slices/authSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const publicRoutes = [
    "/admin/login",
    "/admin/register",
  ];

  const isPublicPage =
    publicRoutes.includes(pathname);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );
  }, []);

  useEffect(() => {
    if (isPublicPage) return;

    const fetchMe = async () => {
      try {
        const res = await fetch(
          "/api/admin-auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          dispatch(clearUser());
          router.replace("/admin/login");
          return;
        }

        const data = await res.json();

        dispatch(setUser(data.user));
      } catch {
        dispatch(clearUser());
        router.replace("/admin/login");
      }
    };

    fetchMe();
  }, [
    dispatch,
    router,
    pathname,
    isPublicPage,
  ]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-white min-h-screen">
      <Toaster position="top-right" />
      <AdminSidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() =>
          setIsMobileMenuOpen(false)
        }
      />

      <div
        className={`transition-all duration-300 ${
          !isMobile ? "lg:ml-72" : "ml-0"
        }`}
      >
        <AdminNavbar
          onMenuClick={() =>
            setIsMobileMenuOpen(
              !isMobileMenuOpen
            )
          }
          isMobileMenuOpen={
            isMobileMenuOpen
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}