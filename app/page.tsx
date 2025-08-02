import React from "react";
import LandingNav from "@/components/LandingNav";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <Hero />
      <FeaturesSection />
    </div>
  );
}
