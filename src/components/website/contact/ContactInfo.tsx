import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const contactItems = [
  {
    title: "PHONE",
    icon: FaPhoneAlt,
    details: "+66 123 456 789",
    subtext: "We reply within 24 hours",
  },
  {
    title: "EMAIL",
    icon: FaEnvelope,
    details: "info@jasaenhotel.com",
    subtext: "We reply within 24 hours",
  },
  {
    title: "ADDRESS",
    icon: FaMapMarkerAlt,
    details: "168 Thanon Prachathipat, Bangkhlo 10200, Thailand",
    subtext: "24 Hours",
  },
  {
    title: "WORKING HOURS",
    icon: FaClock,
    details: "Monday - Sunday",
    subtext: "08:00 AM - 10:00 PM",
  },
];

const ContactInfo = () => {
  return (
    <section className="bg-bgmain pt-20 pb-10 px-6 md:px-12 lg:px-30">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[2px] bg-secondary"></div>

            <h2 className="heading-font text-2xl md:text-4xl font-bold text-primary uppercase">
              CONTACT INFORMATION
            </h2>

            <div className="w-16 h-[2px] bg-secondary"></div>
          </div>

          <p className="text-textmuted text-md leading-6 max-w-2xl mx-auto">
            We&apos;re always happy to assist you.
            <br />
            Reach out to us through any of the following channels.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className=" border border-borderlight rounded-xl p-8 text-center shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-3">
                  <Icon className="text-white text-3xl" />
                </div>

                {/* Title */}
                <h3 className="text-textmain text-lg font-semibold uppercase mb-2">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="w-14 h-[2px] bg-secondary mx-auto mb-4"></div>

                {/* Content */}
                <div className="space-y-2">
                  <p className="text-primary font-semibold">
                    {item.details}
                  </p>
                  <p className="text-textmuted text-sm leading-4">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
