"use client";

import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";

export default function AdminHeader() {
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
          <span className="text-xl font-bold text-gray-900">Pristin Capital</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <a href="/admin/dashboard" className="text-teal-600 font-semibold border-b-2 border-teal-600 pb-1">
            Dashboard
          </a>
          <a href="/admin/users" className="text-gray-600 hover:text-gray-900">
            Users
          </a>
          <a href="/admin/loans" className="text-gray-600 hover:text-gray-900">
            Loans
          </a>
          <a href="/admin/investments" className="text-gray-600 hover:text-gray-900">
            Investments
          </a>
          <a href="/admin/kyc" className="text-gray-600 hover:text-gray-900">
            KYC
          </a>
          <a href="/admin/penalty" className="text-gray-600 hover:text-gray-900">
            Penalty
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
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
