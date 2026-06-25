"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "@/components/website/layout/Footer";
import Navbar from "@/components/website/layout/Navbar";
import { Toaster } from "react-hot-toast";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="grow">
          {children}
          <Toaster position="top-right" />
        </main>

        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}