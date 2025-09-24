"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "SME Owner",
    avatar: "/images/t1.png",
    quote:
      "This platform cut our funding process in half. What used to take weeks now happens in days.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Investor",
    avatar: "/images/t2.png",
    quote:
      "I check my ROI daily without calling anyone. The transparency is incredible.",
  },
  {
    id: 3,
    name: "Aisha Okafor",
    role: "Business Owner",
    avatar: "/images/t3.png",
    quote:
      "The automated verification saved us countless hours. Now we focus on growing our business.",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Financial Advisor",
    avatar: "/images/t4.png",
    quote:
      "Real-time insights help me make better investment decisions for my clients.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Show 1 card on mobile, 2 on md+
  const visibleTestimonials =
    typeof window !== "undefined" && window.innerWidth < 768
      ? [testimonials[currentIndex]]
      : testimonials.slice(currentIndex, currentIndex + 2);

  return (
    <section className="py-20 bg-[#cceae9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">
            Real feedback from early adopters
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mx-0 sm:mx-12">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${index}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-lg transition-shadow"
              >
                {/* User Info */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 bg-gray-100">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-teal-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
