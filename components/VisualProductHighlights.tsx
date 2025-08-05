"use client";

import React, { useState } from "react";
import Image from "next/image";

const VisualProductHighlights = () => {
  const [activeTab, setActiveTab] = useState("Investment Calculator");

  const tabs = ["Loan Application", "Investment Calculator", "Wallet Funding"];

  return (
    <section className="py-16 px-4 bg-[#B8D4D1]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C4A47] mb-4">
            Visual Product Highlights
          </h2>
          <p className="text-lg text-[#5A7470] max-w-md mx-auto">
            See how our platform works in action
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#2C4A47] text-white shadow-lg"
                  : "bg-white/70 text-[#2C4A47] hover:bg-white hover:shadow-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Laptop Mockup with Navigation */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#2C4A47] to-[#1E3330] rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              aria-label="Next"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Laptop Image */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/images/laptop.png"
                  alt={`${activeTab} Dashboard Preview`}
                  width={600}
                  height={375}
                  className="max-w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Tab Content Description */}
        {/* <div className="text-center mt-8">
          <div className="max-w-2xl mx-auto">
            {activeTab === "Loan Application" && (
              <p className="text-[#5A7470] text-lg">
                Experience our streamlined loan application process with instant
                approvals and competitive rates.
              </p>
            )}
            {activeTab === "Investment Calculator" && (
              <p className="text-[#5A7470] text-lg">
                Plan your financial future with our advanced investment
                calculator and portfolio management tools.
              </p>
            )}
            {activeTab === "Wallet Funding" && (
              <p className="text-[#5A7470] text-lg">
                Seamlessly fund your wallet with multiple payment options and
                instant transaction processing.
              </p>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default VisualProductHighlights;
