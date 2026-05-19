import PageHero from "@/components/common/PageHero";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactInfo from "@/components/website/contact/ContactInfo";
import ImmediateHelp from "@/components/website/contact/ImmediateHelp";
import React from "react";

const page = () => {
  return (
    <>
      <PageHero
        title="CONTACT US"
        subtitle="We are always here to assist you with your stay."
        image="/images/hero/hero-1.JPG"
        breadcrumb="Contact Us"
      />
      <ContactInfo />
      <ContactForm />
      <ImmediateHelp />
    </>
  );
};

export default page;
