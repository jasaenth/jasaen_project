import Navbar from "@/components/website/layout/Navbar";
import Footer from "@/components/website/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        {children}
        <Toaster position="top-right" />
      </main>

      <Footer />
    </div>
  );
}