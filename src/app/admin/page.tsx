// app/admin/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRoot() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in (you can add your auth logic)
    const isLoggedIn = localStorage.getItem("adminUser");
    
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-textmuted">Redirecting...</p>
      </div>
    </div>
  );
}