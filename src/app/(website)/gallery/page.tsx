import PageHero from "@/components/common/PageHero";
import GallerySection from "@/components/website/gallery/GallerySection";
import Amenities from "@/components/website/home/Amenities";
import React from "react";

const page = () => {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments at Jasaen"
        image="/images/gallery.JPG"
        breadcrumb="Gallery"
      />
      <GallerySection />
      <Amenities showTitle={false} />
    </>
  );
};

export default page;
