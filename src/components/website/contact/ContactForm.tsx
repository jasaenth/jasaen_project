"use client";

import { useState } from "react";
import {
  FaPaperPlane,
  FaCar,
  FaTrain,
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "7007458210";

    const message = `
Hello Jasaen Hotel,

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="py-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-4xl p-8 md:p-10 border border-borderlight shadow-soft">
            <span className="gold-divider mb-5">
              Contact Us
            </span>

            <h2 className="font-display text-5xl text-maroon leading-tight">
              Send Us
              <br />
              A Message
            </h2>

            <p className="mt-5 text-textmuted leading-relaxed">
              We'd love to hear from you. Whether you have a question about
              reservations, amenities, or your upcoming stay, our team is here
              to assist.
            </p>

            <form
              onSubmit={handleWhatsAppSubmit}
              className="space-y-5 mt-8"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    border
                    border-borderlight
                    bg-bgmain
                    focus:outline-none
                    focus:border-gold
                    transition
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    border
                    border-borderlight
                    bg-bgmain
                    focus:outline-none
                    focus:border-gold
                  "
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    border
                    border-borderlight
                    bg-bgmain
                    focus:outline-none
                    focus:border-gold
                  "
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    border
                    border-borderlight
                    bg-bgmain
                    focus:outline-none
                    focus:border-gold
                  "
                />
              </div>

              <textarea
                rows={6}
                name="message"
                placeholder="Your Message *"
                required
                value={formData.message}
                onChange={handleChange}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-xl
                  border
                  border-borderlight
                  bg-bgmain
                  resize-none
                  focus:outline-none
                  focus:border-gold
                "
              />

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-maroon
                  hover:bg-maroon-deep
                  px-8
                  py-4
                  text-ivory
                  font-medium
                  transition
                  shadow-soft
                "
              >
                Send Message
                <FaPaperPlane />
              </button>
            </form>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-4xl overflow-hidden border border-borderlight shadow-soft">
            {/* Map */}
            <div className="h-95">
              <iframe
                src="https://www.google.com/maps?q=Jasaen+Hotel+Bangkok&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title="Jasaen Hotel Location"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="gold-divider mb-4">
                Location
              </span>

              <h3 className="font-display text-4xl text-maroon">
                How To Find Us
              </h3>

              <p className="mt-5 text-textmuted leading-relaxed">
                Located in Bangkok's historic Sathorn district, Jasaen Boutique
                Hotel offers convenient access to BTS, ferry services, local
                markets, and the city's most iconic attractions.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <FaCar className="text-maroon" />
                  </div>

                  <div>
                    <h4 className="font-medium text-charcoal">
                      By Car
                    </h4>

                    <p className="text-sm text-textmuted mt-1">
                      Parking facilities available for hotel guests.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <FaTrain className="text-maroon" />
                  </div>

                  <div>
                    <h4 className="font-medium text-charcoal">
                      By BTS & Ferry
                    </h4>

                    <p className="text-sm text-textmuted mt-1">
                      Only minutes from Saphan Taksin BTS Station and Sathorn
                      Pier.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-8 bg-bgmain rounded-2xl p-5 border-l-4 border-gold">
                <p className="italic text-textmuted">
                  "Perfectly positioned for exploring Bangkok while enjoying
                  the comfort of a quiet boutique retreat."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;