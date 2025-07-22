"use client";

import React from "react";

const loanHistory = [
  {
    title: "For Business Purpose",
    amount: "70,000",
    date: "4th Aug 2020 at 6:30pm",
    status: "Approved",
    statusColor: "text-[#10B981]",
    iconBg: "bg-[#1CC5AE]",
  },
  {
    title: "For House Rent",
    amount: "70,000",
    date: "4th Aug 2020 at 6:30pm",
    status: "Pending",
    statusColor: "text-[#F59E42]",
    iconBg: "bg-[#1CC5AE]",
  },
  {
    title: "School Fees",
    amount: "70,000",
    date: "4th Aug 2020 at 6:30pm",
    status: "Approved",
    statusColor: "text-[#10B981]",
    iconBg: "bg-[#1CC5AE]",
  },
  {
    title: "For Business",
    amount: "70,000",
    date: "4th Aug 2020 at 6:30pm",
    status: "Approved",
    statusColor: "text-[#10B981]",
    iconBg: "bg-[#1CC5AE]",
  },
  {
    title: "For Rent",
    amount: "70,000",
    date: "4th Aug 2020 at 6:30pm",
    status: "failed",
    statusColor: "text-[#F43F5E]",
    iconBg: "bg-[#1CC5AE]",
  },
];

export default function LoansPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Left: Loan Summary and Actions */}
      <div className="flex-1 max-w-xl">
        <div className="bg-white rounded-2xl border border-[#CCEAE9] p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none select-none">
            <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
              <rect
                x="30"
                y="30"
                width="160"
                height="60"
                rx="10"
                fill="#CCEAE9"
              />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="text-gray-400 text-lg mb-2">
              Current Loan Balance
            </div>
            <div className="text-3xl font-bold text-[#001B2E] mb-6">
              ₦600,000.00
            </div>
            <div className="text-gray-400 text-lg mb-2">Loan Debt</div>
            <div className="text-2xl font-bold text-[#001B2E] mb-6">
              ₦50,000.00
            </div>
            <div className="text-gray-400 text-lg mb-2">Pending Loan</div>
            <div className="text-2xl font-bold text-[#001B2E] mb-6">₦0.00</div>
          </div>
        </div>
        <button className="w-full bg-[#444] text-white py-3 rounded-lg font-semibold text-lg mb-2">
          Request for Loan
        </button>
        <div className="text-center text-gray-400 text-xs mb-4">
          Please add your Business Details before you request for loan
        </div>
        <button className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg">
          Add your Business Details
        </button>
      </div>

      {/* Right: Loan History */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold text-[#001B2E]">
            Loan History
          </div>
          <button className="text-[#019893] text-base font-medium hover:underline">
            SeeAll
          </button>
        </div>
        <div className="space-y-4">
          {loanHistory.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white border border-[#CCEAE9] rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${item.iconBg}`}
                >
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#fff" />
                    <path
                      d="M12 8v4l3 2"
                      stroke="#019893"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[#001B2E] font-medium text-base">
                    {item.title}
                  </div>
                  <div className="text-[#019893] font-bold text-lg">
                    {item.amount}
                  </div>
                  <div className="text-gray-400 text-xs">{item.date}</div>
                </div>
              </div>
              <div
                className={`font-semibold text-base capitalize ${item.statusColor}`}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
