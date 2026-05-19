import AboutStory from "@/components/website/about/AboutStory";
import Commitment from "@/components/website/about/Commitment";
import WhyChoose from "@/components/website/about/WhyChoose";
import PageHero from "@/components/common/PageHero";

const page = () => {
  return (
    <>
      <PageHero
        title="ABOUT US"
        subtitle="Experience the perfect blend of tradition, comfort, and warm hospitality."
        image="/images/hero/hero-1.JPG"
        breadcrumb="About Us"
      />
      <AboutStory />
      <WhyChoose />
      <Commitment />
    </>
  );
};

export default page;
