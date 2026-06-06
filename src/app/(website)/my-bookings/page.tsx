import PageHero from "@/components/common/PageHero";
import MyBookings from "@/components/website/bookings/MyBookings";

export default function Page() {
  return (
    <>
      <PageHero
        title="MY BOOKINGS"
        subtitle="Manage Your Reservations"
        image="/images/hero/hero-2.jpeg"
        breadcrumb="My Bookings"
      />
      <MyBookings />;
    </>
  );
}
