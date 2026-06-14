import PageSliderHero from "@/components/common/PageSliderHero";
import RoomsPage from "@/components/website/rooms/Rooms";

export default function Page() {
  return (
    <>
      <PageSliderHero
        title="Rooms & Suites"
        eyebrow="Stays"
        subtitle="A collection of 41 spaces — every one a love letter to slow, considered luxury."
        showBookingForm
        slides={[
          "/images/room/roomHeader.JPG",
          "/images/room/room-2.JPG",
          "/images/room/room-3.JPG",
        ]}
      />

      <RoomsPage />
    </>
  );
}