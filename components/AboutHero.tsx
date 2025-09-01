import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <h1 className="text-5xl font-bold mb-8">
              About Us
            </h1>
            <h2 className="text-2xl font-semibold mb-6">
              Empowering financial freedom through smart, secure technology.
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              FinTech Co is a leading provider of innovative financial solutions, dedicated to simplifying and securing financial transactions for individuals and businesses. We leverage cutting-edge technology to address complex financial challenges, ensuring our users can achieve their financial goals with confidence.
            </p>
            <p className="text-lg leading-relaxed">
              Our commitment to transparency and customer satisfaction sets us apart in the industry.
            </p>
          </div>

          {/* Right Side - Office Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/laptop.png"
                alt="FinTech office team working together"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute top-4 right-4 bg-white text-teal-600 px-4 py-2 rounded-lg font-bold shadow-lg">
              FINTECH
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
