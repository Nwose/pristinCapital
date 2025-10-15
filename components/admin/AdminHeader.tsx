"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Loans", href: "/admin/loans" },
    { name: "Investments", href: "/admin/investments" },
    { name: "KYC", href: "/admin/kyc" },
    { name: "Penalty", href: "/admin/penalty" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50">
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
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            Pristin Capital
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
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
        <div className="flex items-center space-x-3">
          {/* Notification */}
          <Link
            href="/admin/notifications"
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/images/profile.jpg"
              alt="Admin Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-gray-50 border-t border-gray-200 rounded-lg shadow-sm p-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm px-2 py-1 rounded transition ${
                  isActive
                    ? "text-teal-600 font-semibold bg-teal-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
