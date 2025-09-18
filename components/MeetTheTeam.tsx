import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

// Import Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function MeetTheTeam() {
  return (
    <section className="py-20 bg-[#cceae9]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`${montserrat.className} text-5xl font-bold text-gray-900 mb-4`}
          >
            Meet the Team
          </h2>
        </div>

        {/* Team Members */}
        <div className="space-y-12 flex flex-col items-center">
          {/* Member 1 */}
          <div className="flex flex-col md:flex-row items-stretch w-[1088px] h-[698px] bg-white border border-gray-200 rounded-[50px] overflow-hidden shadow">
            {/* Image */}
            <div className="w-full md:w-1/3 h-full relative overflow-hidden rounded-r-[50px] md:rounded-r-[50px] md:rounded-l-none">
              <Image
                src="/images/Folajomi.png"
                alt="Folajomi Adegbulugbe"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div
              className={`${montserrat.className} w-full md:w-2/3 p-12 flex flex-col`}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Folajomi Adegbulugbe (CEO)
              </h3>
              <p className="text-blue-900 font-semibold text-lg mb-6">
                Entrepreneur | Innovator
              </p>
              <p className="text-gray-700 text-lg leading-11">
                Folajomi Adegbulugbe is an accomplished entrepreneur and
                business leader with a proven track record of building and
                scaling ventures across various industries. As Director of Alles
                Charis Gas Limited, he grew the company to over 250 employees
                and 12 LPG retail outlets nationwide. He co-founded Pristin
                Capital, launched successful startups like Jo’s Buffet and
                Gasify, and now leads The Hive Incubator, supporting startups in
                Akure. Armed with dual Master’s degrees in International
                Business and Finance and currently pursuing an MBA at Imperial
                College London, Folajomi brings strategic insight and innovative
                leadership.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col md:flex-row items-stretch w-[1088px] h-[698px] bg-white border border-gray-200 rounded-[50px] overflow-hidden shadow">
            {/* Image */}
            <div className="w-full md:w-1/3 h-full relative overflow-hidden rounded-r-[50px] md:rounded-r-[50px] md:rounded-l-none">
              <Image
                src="/images/Soomon.png"
                alt="Samuel Solomon Uthur"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div
              className={`${montserrat.className} w-full md:w-2/3 p-12 flex flex-col`}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Samuel Solomon Uthur (Investment Associate)
              </h3>
              <p className="text-gray-700 text-lg leading-11">
                An Investment professional versatile in various Investment class
                and Stakeholder engagement. In addition, handling Business
                Analysis and Accounts management for the firm. With a strong
                background in Business Analytics, I’ve supported both private
                equity firms and startups in designing and scaling platforms
                that align with stakeholder priorities, budgets, and user needs.
                My experience spans early-stage mentorship, strategic advisory
                services, and connecting ventures with the right investor
                networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
