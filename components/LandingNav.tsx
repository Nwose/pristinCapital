"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LandingNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 w-full bg-[#CDEBEB] flex items-center justify-between px-8 md:px-24 py-1">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/images/logo_d.png"
            alt="Pristin Capital"
            width={60.89}
            height={63}
          />
        </Link>
      </div>

      {/* Right side container for Nav Links and Buttons */}
      <div className="flex items-center gap-8">
        {/* Nav Links */}
        <div className="flex items-end gap-10">
          <Link
            href="/"
            className={`text-[#012638] font-bold text-lg ${
              pathname === "/" 
                ? "border-b-4 border-[#012638] pb-1" 
                : ""
            }`}
            style={{ lineHeight: "1.2" }}
          >
            Home
          </Link>
          <a href="#contact" className="text-[#012638] font-bold text-lg">
            Contact Us
          </a>
          <Link
            href="/about"
            className={`text-[#012638] font-bold text-lg ${
              pathname === "/about" 
                ? "border-b-4 border-[#012638] pb-1" 
                : ""
            }`}
          >
            About Us
          </Link>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#get-started"
            className="bg-[#012638] text-white px-8 py-2 rounded font-semibold text-lg hover:bg-[#019893] transition-colors"
            style={{ boxShadow: "none" }}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
