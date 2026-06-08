import AboutStory from "@/components/website/about/AboutStory";
import Commitment from "@/components/website/about/Commitment";
import WhyChoose from "@/components/website/about/WhyChoose";
import PageHero from "@/components/common/PageHero";

const page = () => {
  return (
    <>
      <PageHero
        eyebrow="Our House"
        title="About Jasaen"
        subtitle="A boutique sanctuary born of craft, care and quiet ambition."
        image="/images/hero/hero1.JPG"
        breadcrumb="About Us"
      />
      <AboutStory />
      <WhyChoose />
      <Commitment />
    </>
  );
};

export default page;
