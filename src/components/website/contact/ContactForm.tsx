"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPaperPlane, FaCar, FaTrain } from "react-icons/fa";

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

    const phoneNumber = "7007458210"; // your whatsapp number

    const message = `
Hello Jasaen Hotel,

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-bgmain px-6 md:px-12 lg:px-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Form */}
          <div className=" border border-borderlight rounded-xl p-8 shadow-sm">
            <h2 className="heading-font text-2xl font-bold text-primary uppercase mb-4">
              SEND US A MESSAGE
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-secondary"></div>
              <div className="w-2 h-2 rounded-full border border-secondary"></div>
              <div className="w-10 h-[2px] bg-secondary"></div>
            </div>

            <p className="text-textmuted text-md leading-6 mb-6">
              Fill out the form below and our team will get back to you as soon
              as possible.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message *"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition"
              >
                SEND MESSAGE
                <FaPaperPlane />
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className=" border border-borderlight rounded-xl overflow-hidden shadow-sm">
            <div className="h-[350px] w-full">
              <iframe
                src="https://www.google.com/maps?q=Jasaen+Hotel+Bangkok&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jasaen Hotel Location"
                className="w-full h-full"
              />
            </div>

            <div className="pt-4 px-6 pb-8">
              <h3 className="heading-font text-2xl font-bold text-primary uppercase mb-4">
                HOW TO FIND US
              </h3>

              <div className="w-14 h-[2px] bg-secondary mb-4"></div>

              <p className="text-textmuted text-md leading-6 mb-4">
                We are located in the heart of the city, close to major
                attractions and public transport.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-textmain">
                  <FaCar className="text-primary " />
                  <span className="text-sm">
                    <span className="font-semibold">By Car:</span> Parking
                    available at the hotel
                  </span>
                </div>

                <div className="flex items-center gap-3 text-textmain">
                  <FaTrain className="text-primary" />
                  <span className="text-sm">
                    <span className="font-semibold">By BTS/MRT:</span> Near Bang
                    Pho MRT Station (Exit 2)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
