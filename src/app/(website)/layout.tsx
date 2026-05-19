import Navbar from "@/components/website/layout/Navbar";
import Footer from "@/components/website/layout/Footer";

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
      </main>

      <Footer />
    </div>
  );
}