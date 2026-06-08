import PageHero from "@/components/common/PageHero";
import RoomsPage from "@/components/website/rooms/Rooms";
import React from "react";

const page = () => {
  return (
    <>
      <PageHero
        title="Rooms & Suites"
        eyebrow="Stays"
        subtitle="A collection of 42 spaces — every one a love letter to slow, considered luxury."
        image="/images/room/roomHeader.JPG"
        showBookingForm
      />
      <RoomsPage />
    </>
  );
};

export default page;
