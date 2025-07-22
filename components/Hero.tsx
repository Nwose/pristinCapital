import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(1,38,56,0.9) 0%, rgba(1,152,147,0.9) 100%)",
          }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8 py-16 gap-8">
        {/* Left: Hero Text */}
        <div className="flex-1 max-w-2xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-white">
            <span className="text-[#1CC5AE]">Pristin</span>, Your Financial
            <br />
            Growth Platform — Built
            <br />
            for Speed, Trust, and
            <br />
            Control
          </h1>
          <p className="text-xl text-white/80 mb-10 font-medium">
            Simplify deposits, loans, and investments on a secure
            <br />
            and transparent digital platform.
          </p>
          <div className="flex gap-6">
            <button className="bg-[#012638] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow hover:bg-[#019893] transition-colors">
              Get Started Now &rarr;
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg bg-transparent hover:bg-white hover:text-[#012638] transition-colors">
              Watch How It Works
            </button>
          </div>
        </div>
        {/* Right: Hero Image */}
        <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0 min-w-[400px]">
          <div className="bg-[#012638] rounded-3xl p-8 relative w-[500px] h-[350px] flex items-center justify-center">
            <Image
              src="/images/laptop.png"
              alt="Dashboard Preview"
              width={420}
              height={260}
              className="rounded-xl shadow-lg object-contain"
              priority
            />
            {/* Live Dashboard Badge */}
            <div className="absolute top-8 right-8 bg-white px-6 py-3 rounded-lg shadow flex items-center gap-3">
              <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
              <span className="text-[#012638] font-medium text-lg">
                Live Dashboard
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
