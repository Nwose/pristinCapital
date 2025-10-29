"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function EvidencePage() {
  const router = useRouter();

  // Example mock data
  const evidence = {
    fullName: "Adebayo Salami",
    dob: "1985-08-15",
    country: "United States",
    address: "123 Alaye Street, Alagbaka, Akure, Ondo State",
    email: "sophia.carter@email.com",
    phone: "+234-70555-123-456",
    accountId: "AC12345678",
    registrationDate: "2025-06-10",
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Top title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Evidence Overview
          </h1>
        </div>

        {/* Overview description */}
        <p className="text-gray-700 mb-8">
          This section provides a quick overview of the submitted KYC evidence
          before diving into the detailed tabs.
        </p>

        {/* Evidence Info Section */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 border-b border-gray-200 pb-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-gray-800 font-medium">{evidence.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account ID</p>
              <p className="text-gray-800 font-medium">{evidence.accountId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-gray-800 font-medium">{evidence.dob}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="text-gray-800 font-medium">{evidence.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-800 font-medium">{evidence.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-teal-600 font-medium hover:underline cursor-pointer">
                {evidence.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-gray-800 font-medium">{evidence.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="text-gray-800 font-medium">
                {evidence.registrationDate}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
