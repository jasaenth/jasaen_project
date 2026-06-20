import PageHero from "@/components/common/PageHero";
import MyBookings from "@/components/website/bookings/MyBookings";

export default function Page() {
  return (
    <>
      <PageHero
        title="MY BOOKINGS"
        subtitle="Manage Your Reservations"
        image="/images/hero/hero2.JPG"
        breadcrumb="My Bookings"
      />
      <MyBookings />;
    </>
  );
}
