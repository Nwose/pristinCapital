import React from "react";
import LandingNav from "@/components/LandingNav";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import VisualProductHighlights from "@/components/VisualProductHighlights";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <Hero />
      <FeaturesSection />
      <VisualProductHighlights />
      <HowItWorks />
    </div>
  );
}
