"use client";

import Footer from "@/components/Footer";
import LandingNav from "@/components/LandingNav";
import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      <LandingNav />
      <main className=" flex flex-col ">
        {/* Unified Hero + Contact Form Section */}
        <section className="relative flex items-center justify-center min-h-[90vh] px-6 md:px-12 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="/images/contact-us.jpg"
              alt="Contact background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Green gradient overlay */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(1,38,56,0.6) 0%, rgba(1,152,147,0.6) 100%)",
            }}
          />

          {/* Foreground content (Form card) */}
          <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-center text-gray-600 mb-8">
              We’d love to hear from you — let’s get in touch!
            </p>

            <form className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <input
                type="tel"
                placeholder="Your phone number"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none"
              />

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none"
              />

              {/* Message */}
              <textarea
                placeholder="Write your message..."
                rows={6}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none"
              />

              {/* Dropdown */}
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012638] focus:outline-none">
                <option value="">Select an inquiry type</option>
                <option value="support">Customer Support</option>
                <option value="sales">Sales & Partnerships</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#012638] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-emerald-800 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
