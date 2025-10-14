"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import LoanDetails from "@/components/admin/loans";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LoanDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function LoanDetailsPage({ params }: LoanDetailsPageProps) {
  const { id } = React.use(params);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Row with Title and Back Link */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Loan Details</h1>

          <Link
            href="/admin/loans"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Link>
        </div>

        <LoanDetails loanId={id} />
      </main>
    </div>
  );
}
