import { Suspense } from "react";
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
          "/images/rooms/room-2.JPG",
          "/images/rooms/room-3.JPG",
        ]}
      />

      <Suspense fallback={null}>
        <RoomsPage />
      </Suspense>
    </>
  );
}