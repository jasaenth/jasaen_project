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

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const publicRoutes = ["/admin/login"];

  const isPublicPage =
    publicRoutes.includes(pathname);

  // Detect Mobile
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

  // Auth Check
  useEffect(() => {
    if (isPublicPage) {
      setCheckingAuth(false);
      return;
    }

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

          router.replace(
            "/admin/login"
          );

          return;
        }

        const data = await res.json();

        dispatch(
          setUser(data.user)
        );
      } catch {
        dispatch(clearUser());

        router.replace(
          "/admin/login"
        );
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchMe();
  }, [
    dispatch,
    router,
    pathname,
    isPublicPage,
  ]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Login page
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Loading screen
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-bgmain flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              h-12
              w-12
              mx-auto
              rounded-full
              border-2
              border-secondary
              border-t-transparent
              animate-spin
            "
          />

          <h3 className="mt-6 text-xl font-semibold text-primary">
            Loading Dashboard
          </h3>

          <p className="mt-2 text-textmuted">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgmain min-h-screen">
      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1a1a1a",
            borderRadius: "18px",
            border:
              "1px solid #e5e7eb",
            padding: "14px 16px",
          },
        }}
      />

      {/* Sidebar */}
      <AdminSidebar
        isMobileOpen={
          isMobileMenuOpen
        }
        onMobileClose={() =>
          setIsMobileMenuOpen(false)
        }
      />

      {/* Content */}
      <div
        className={`
          transition-all
          duration-300
          ${
            !isMobile
              ? "lg:ml-72"
              : "ml-0"
          }
        `}
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

        <main className="px-6 py-8 lg:px-10 lg:py-10">
          <div className="max-w-400 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}