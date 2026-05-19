import AmenitiesGrid from "@/components/website/amenities/AmenitiesGrid";
import AmenitiesHelp from "@/components/website/amenities/AmenitiesHelp";
import PageHero from "@/components/common/PageHero";
import React from "react";

const page = () => {
  return (
    <>
      <PageHero
        title="OUR AMENITIES"
        subtitle="Thoughtful amenities for comfortable and memorable stays."
        image="/images/hero/hero-1.JPG"
        breadcrumb="amenities"
      />
      <AmenitiesGrid />
      <AmenitiesHelp />
    </>
  );
};

export default page;
