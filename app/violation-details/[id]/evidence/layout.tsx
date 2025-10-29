"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

export default function EvidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const id = params?.id;

  const tabs = [
    {
      name: "User Details",
      href: `/admin/kyc/violation-details/${id}/evidence/user-details`,
    },
    {
      name: "KYC Documents",
      href: `/admin/kyc/violation-details/${id}/evidence/documents`,
    },
    {
      name: "Review History",
      href: `/admin/kyc/violation-details/${id}/evidence/review-history`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Review KYC Submission
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-10 text-sm font-medium">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`pb-3 border-b-2 transition-all ${
                  isActive
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
