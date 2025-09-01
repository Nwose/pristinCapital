"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      message: ""
    });
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-500">
            Contact our Customer Care
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/cuate.png"
                alt="Customer support team illustration"
                width={500}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gray-100 rounded-lg opacity-60"></div>
            <div className="absolute top-16 right-12 w-12 h-12 bg-gray-200 rounded-lg opacity-40"></div>
            <div className="absolute bottom-16 left-16 w-20 h-8 bg-gray-100 rounded-lg opacity-50"></div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  placeholder="Write something..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-gray-700 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#4DB5A5"
          />
        </svg>
      </div>
    </section>
  );
}
