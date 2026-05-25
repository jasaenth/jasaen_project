"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/store/slices/authSlice";

export default function AdminRoot() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "/api/admin-auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          dispatch(setUser(data.user));
          router.replace("/admin/dashboard");
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-textmuted">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return null;
}