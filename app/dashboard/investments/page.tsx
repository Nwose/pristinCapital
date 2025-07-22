"use client";

import React, { useState } from "react";

const investmentProducts = [
  {
    label: "A",
    title: "Naira Savings Deposit",
    id: "GBA2025",
    rate: "8.5%",
    tenure: "12 mo",
    risk: "Low",
    min: "₦100,000",
  },
  {
    label: "B",
    title: "Dollars Savings Deposit",
    id: "SFB2025",
    rate: "10%",
    tenure: "6 mo",
    risk: "Medium",
    min: "₦500,000",
  },
  {
    label: "C",
    title: "Safe-lock",
    id: "DYG2025",
    rate: "12%",
    tenure: "18 mo",
    risk: "High",
    min: "₦1,000,000",
  },
];

const activeInvestments = [
  {
    title: "Growth Bond Alpha",
    id: "GBA2025",
    earnings: "₦22,000",
    invested: "₦200,500",
    lockin: "11 Aug 2025",
  },
];

const completedInvestments = [
  {
    title: "Secure Fund Beta",
    id: "SFB2025",
    earnings: "₦50,000",
    invested: "₦200,500",
    completed: "04 Mar 2025",
  },
];

export default function InvestmentsPage() {
  const [tab, setTab] = useState<"active" | "completed">("active");

  return (
    <div className="space-y-8">
      {/* Filter Bar and Fund Wallet Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-gray-500 text-base font-medium">Rate</label>
            <select className="border border-[#CCEAE9] rounded px-3 py-2 bg-white text-base">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-500 text-base font-medium">
              Tenure
            </label>
            <select className="border border-[#CCEAE9] rounded px-3 py-2 bg-white text-base">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-500 text-base font-medium">Risk</label>
            <select className="border border-[#CCEAE9] rounded px-3 py-2 bg-white text-base">
              <option>All</option>
            </select>
          </div>
        </div>
        <button className="bg-[#012638] text-white px-8 py-2 rounded-lg font-semibold text-base hover:bg-[#019893] transition-colors">
          Fund Wallet
        </button>
      </div>

      {/* Investment Products Row */}
      <div className="flex flex-col md:flex-row gap-6">
        {investmentProducts.map((inv, idx) => (
          <div
            key={inv.id}
            className="flex-1 bg-white border border-[#CCEAE9] rounded-xl p-6 min-w-[270px] max-w-[350px] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-[#CDEBEB] flex items-center justify-center font-bold text-[#012638]">
                {inv.label}
              </div>
              <span className="text-[#012638] font-semibold text-lg">
                {inv.title}
              </span>
            </div>
            <div className="text-xs text-[#019893] mb-2">ID: {inv.id}</div>
            <div className="flex gap-6 mb-2 text-sm">
              <div>
                Rate{" "}
                <span className="block font-semibold text-[#012638]">
                  {inv.rate}
                </span>
              </div>
              <div>
                Tenure{" "}
                <span className="block font-semibold text-[#012638]">
                  {inv.tenure}
                </span>
              </div>
              <div>
                Risk{" "}
                <span className="block font-semibold text-[#012638]">
                  {inv.risk}
                </span>
              </div>
            </div>
            <div className="text-xs text-[#019893] mb-4">
              Minimum Investment:{" "}
              <span className="font-semibold">{inv.min}</span>
            </div>
            <button className="w-full bg-[#012638] text-white py-2 rounded-lg font-semibold text-base hover:bg-[#019893] transition-colors">
              Invest Now
            </button>
          </div>
        ))}
      </div>

      {/* Investment Tracking Section */}
      <div className="bg-white border border-[#CCEAE9] rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#012638]">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#012638"
                strokeWidth="2"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
            Investment Tracking
          </div>
          <button className="bg-[#012638] text-white px-8 py-2 rounded-lg font-semibold text-base hover:bg-[#019893] transition-colors">
            Withdraw Funds
          </button>
        </div>
        <div className="flex gap-8 mb-6">
          <button
            onClick={() => setTab("active")}
            className={`text-lg font-medium pb-2 border-b-2 transition-all ${
              tab === "active"
                ? "border-[#019893] text-[#012638]"
                : "border-transparent text-gray-400"
            }`}
          >
            Active Investments
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`text-lg font-medium pb-2 border-b-2 transition-all ${
              tab === "completed"
                ? "border-[#019893] text-[#012638]"
                : "border-transparent text-gray-400"
            }`}
          >
            Completed Investments
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {tab === "active"
            ? activeInvestments.map((inv, idx) => (
                <div
                  key={inv.id}
                  className="flex-1 bg-[#F6F8FA] border border-[#CCEAE9] rounded-xl p-6 min-w-[270px] max-w-[350px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#012638] font-semibold text-lg">
                      {inv.title}
                    </span>
                    <span className="text-xs text-[#019893]">ID: {inv.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">
                      Earnings Accrued:
                    </span>
                    <span className="text-[#019893] font-semibold">
                      {inv.earnings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">Invested:</span>
                    <span className="text-[#019893] font-semibold">
                      {inv.invested}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    Lock-in Ends:{" "}
                    <span className="font-medium text-[#012638]">
                      {inv.lockin}
                    </span>
                  </div>
                </div>
              ))
            : completedInvestments.map((inv, idx) => (
                <div
                  key={inv.id}
                  className="flex-1 bg-[#F6F8FA] border border-[#CCEAE9] rounded-xl p-6 min-w-[270px] max-w-[350px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#012638] font-semibold text-lg">
                      {inv.title}
                    </span>
                    <span className="text-xs text-[#019893]">ID: {inv.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">
                      Earnings Accrued:
                    </span>
                    <span className="text-[#019893] font-semibold">
                      {inv.earnings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">Invested:</span>
                    <span className="text-[#019893] font-semibold">
                      {inv.invested}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    Completed:{" "}
                    <span className="font-medium text-[#012638]">
                      {inv.completed}
                    </span>
                  </div>
                </div>
              ))}
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#CCEAE9] rounded-xl p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Total Invested</div>
            <div className="text-2xl font-bold text-[#012638]">₦500,000</div>
          </div>
          <div className="bg-white border border-[#CCEAE9] rounded-xl p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Earnings Accrued</div>
            <div className="text-2xl font-bold text-[#012638]">₦72,000</div>
          </div>
          <div className="bg-white border border-[#CCEAE9] rounded-xl p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Active Investments</div>
            <div className="text-2xl font-bold text-[#012638]">1</div>
          </div>
          <div className="bg-white border border-[#CCEAE9] rounded-xl p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Completed</div>
            <div className="text-2xl font-bold text-[#012638]">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
