import AmenitiesGrid from "@/components/website/amenities/AmenitiesGrid";
import AmenitiesHelp from "@/components/website/amenities/AmenitiesHelp";
import PageHero from "@/components/common/PageHero";
import React from "react";

const page = () => {
  return (
    <>
      <PageHero
      eyebrow="Indulgences"
        title="OUR AMENITIES"
        subtitle="Considered rituals for body, palate and pause."
        image="/images/aminities.JPG"
        breadcrumb="amenities"
      />
      <AmenitiesGrid />
      <AmenitiesHelp />
    </>
  );
};

export default page;
