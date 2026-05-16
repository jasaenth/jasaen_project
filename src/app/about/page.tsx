import AboutStory from "@/components/about/AboutStory";
import Commitment from "@/components/about/Commitment";
import WhyChoose from "@/components/about/WhyChoose";
import PageHero from "@/components/common/PageHero";

const page = () => {
  return (
    <>
      <PageHero
        title="ABOUT US"
        subtitle="Experience the perfect blend of tradition, comfort, and warm hospitality."
        image="/images/hero/hero-1.JPG"
        breadcrumb='About Us'
      />
      <AboutStory />
      <WhyChoose />
      <Commitment />
    </>
  );
};

export default page;
