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
    quote: "This platform cut our funding process in half. What used to take weeks now happens in days."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Investor",
    avatar: "/images/t2.png",
    quote: "I check my ROI daily without calling anyone. The transparency is incredible."
  },
  {
    id: 3,
    name: "Aisha Okafor",
    role: "Business Owner",
    avatar: "/images/t3.png",
    quote: "The automated verification saved us countless hours. Now we focus on growing our business."
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Financial Advisor",
    avatar: "/images/t4.png",
    quote: "Real-time insights help me make better investment decisions for my clients."
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, testimonials.length - 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, testimonials.length - 1)) % Math.max(1, testimonials.length - 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 2);
  if (visibleTestimonials.length === 1 && currentIndex === 0 && testimonials.length > 1) {
    visibleTestimonials.push(testimonials[1]);
  }

  return (
    <section className="py-20 bg-[#cceae9]">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-500">
            Real feedback from early adopters
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            disabled={testimonials.length <= 2}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            disabled={testimonials.length <= 2}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mx-12">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${index}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow"
              >
                {/* User Info */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-100">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {testimonials.length > 2 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(1, testimonials.length - 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
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
