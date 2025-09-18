"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LandingNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 w-full bg-[#CDEBEB] flex items-center justify-between px-8 md:px-24 h-20 md:h-24">
      {/* Logo */}
      <div className="flex items-center h-full">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/images/PristinLogo.svg"
            alt="Pristin Capital"
            width={0} // allow Next.js to auto-scale
            height={0}
            sizes="100vw"
            className="h-full w-auto object-contain"
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
              pathname === "/" ? "border-b-4 border-[#012638] pb-1" : ""
            }`}
            style={{ lineHeight: "1.2" }}
          >
            Home
          </Link>

          <Link
            href="/contact"
            className={`text-[#012638] font-bold text-lg ${
              pathname === "/contact" ? "border-b-4 border-[#012638] pb-1" : ""
            }`}
          >
            Contact Us
          </Link>

          <Link
            href="/about"
            className={`text-[#012638] font-bold text-lg ${
              pathname === "/about" ? "border-b-4 border-[#012638] pb-1" : ""
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
