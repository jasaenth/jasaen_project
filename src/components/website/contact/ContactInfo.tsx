import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const contactItems = [
  {
    title: "Phone",
    icon: FaPhoneAlt,
    details: "+66 94 8082994",
    subtext: "Available for reservations & inquiries",
  },
  {
    title: "Email",
    icon: FaEnvelope,
    details: "info@jasaen.com , jasaen168@gmail.com ",
    subtext: "We typically reply within 24 hours",
  },
  {
    title: "Address",
    icon: FaMapMarkerAlt,
    details: "Charoen Krung 57, Yan Nawa, Sathon, Bangkok 10120",
    subtext: "Located in the heart of Bangkok",
  },
  {
    title: "Reception",
    icon: FaClock,
    details: "24 Hours Daily",
    subtext: "Guest support around the clock",
  },
];

const ContactInfo = () => {
  return (
    <section className="py-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="gold-divider justify-center mb-5">
            Get In Touch
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-maroon leading-tight">
            Contact Information
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-textmuted leading-relaxed">
            Whether you're planning your next stay, have a question about our
            rooms, or simply need assistance, our team is always happy to help.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  border
                  border-borderlight
                  shadow-soft
                  hover:shadow-luxe
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  text-center
                  group
                "
              >
                {/* Icon */}
                <div className="
                  w-18
                  h-18
                  mx-auto
                  rounded-full
                  bg-gold/10
                  flex
                  items-center
                  justify-center
                  mb-6
                  group-hover:bg-gold/20
                  transition
                ">
                  <Icon className="text-maroon text-3xl" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-maroon mb-3">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-px bg-gold mx-auto mb-5" />

                {/* Main Content */}
                <p className="font-medium text-charcoal leading-relaxed mb-3">
                  {item.details}
                </p>

                {/* Subtext */}
                <p className="text-sm text-textmuted leading-6">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;