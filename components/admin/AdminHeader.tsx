"use client";

import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Loans", href: "/admin/loans" },
    { name: "Investments", href: "/admin/investments" },
    { name: "KYC", href: "/admin/kyc" },
    { name: "Penalty", href: "/admin/penalty" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo_d.png"
            alt="Pristin Capital"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-bold text-gray-900">
            Pristin Capital
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          {navLinks.map((link) => {
            // Highlight if current path starts with the link href
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`pb-1 transition ${
                  isActive
                    ? "text-teal-600 font-semibold border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/notifications"
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Admin Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
