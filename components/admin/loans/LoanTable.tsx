"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type LoanStatus = "Pending" | "Approved" | "Rejected";

interface Loan {
  id: number;
  user: string;
  amount: string;
  tenure: string;
  purpose: string;
  status: LoanStatus;
  appliedDate: string;
}

const loans: Loan[] = [
  {
    id: 1,
    user: "Sophia Clark",
    amount: "₦5,000",
    tenure: "12 months",
    purpose: "Home Improvement",
    status: "Pending",
    appliedDate: "2024-07-20",
  },
  {
    id: 2,
    user: "Ethan Bennett",
    amount: "₦10,000",
    tenure: "24 months",
    purpose: "Debt Consolidation",
    status: "Approved",
    appliedDate: "2024-07-15",
  },
  {
    id: 3,
    user: "Olivia Carter",
    amount: "₦2,500",
    tenure: "6 months",
    purpose: "Personal Expenses",
    status: "Rejected",
    appliedDate: "2024-07-10",
  },
  {
    id: 4,
    user: "Liam Harper",
    amount: "₦7,500",
    tenure: "18 months",
    purpose: "Business Startup",
    status: "Pending",
    appliedDate: "2024-07-05",
  },
  {
    id: 5,
    user: "Ava Foster",
    amount: "₦12,000",
    tenure: "36 months",
    purpose: "Vehicle Purchase",
    status: "Approved",
    appliedDate: "2024-07-01",
  },
];

export default function LoanTable() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const statusColor = (status: LoanStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400/90 text-black";
      case "Approved":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  return (
    <section>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 relative z-10">
        {[
          {
            key: "status",
            label: "Status",
            options: ["All", "Pending", "Approved", "Rejected"],
          },
          {
            key: "date",
            label: "Date Range",
            options: ["Last 7 days", "Last 30 days", "This Year"],
          },
          {
            key: "amount",
            label: "Amount Range",
            options: ["₦0 - ₦5,000", "₦5,001 - ₦10,000", "₦10,001+"],
          },
        ].map((filter) => (
          <div key={filter.key} className="relative">
            <button
              onClick={() => toggleDropdown(filter.key)}
              className="flex items-center justify-between w-44 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              {filter.label}
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  openDropdown === filter.key ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === filter.key && (
              <div className="absolute left-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-fade-in">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="py-3 px-6 font-medium">User</th>
              <th className="py-3 px-6 font-medium">Amount</th>
              <th className="py-3 px-6 font-medium">Tenure</th>
              <th className="py-3 px-6 font-medium">Purpose</th>
              <th className="py-3 px-6 font-medium">Status</th>
              <th className="py-3 px-6 font-medium">Applied Date</th>
              <th className="py-3 px-6 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr
                key={loan.id}
                className={`text-gray-800 text-sm ${
                  i !== loans.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50 transition`}
              >
                <td className="py-4 px-6">{loan.user}</td>
                <td className="py-4 px-6">{loan.amount}</td>
                <td className="py-4 px-6">{loan.tenure}</td>
                <td className="py-4 px-6">{loan.purpose}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-md ${statusColor(
                      loan.status
                    )}`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className="py-4 px-6">{loan.appliedDate}</td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/admin/loans/${loan.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fade animation for dropdowns */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-in-out;
        }
      `}</style>
    </section>
  );
}
