import type { Metadata } from "next";
import "./globals.css";

import { Playfair_Display, Inter } from "next/font/google";
import ReduxProvider from "@/store/provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jasaen Hotel",
  description: "Luxury Hotel Booking Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} min-h-screen`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
        
      </body>
    </html>
  );
}