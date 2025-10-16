"use client";

import React, { useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WalletPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"fund" | "withdraw">("fund");
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-white rounded-lg border border-[#CCEAE9] p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <div className="text-gray-500 text-sm mb-1">Wallet Balance</div>
          <div className="text-2xl font-bold text-[#001B2E]">₦125,500.00</div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            className={`px-6 py-2 rounded bg-[#001B2E] text-white font-medium transition-colors ${
              tab === "fund" ? "" : "bg-[#CCEAE9] text-[#001B2E]"
            }`}
            onClick={() => setTab("fund")}
          >
            Fund Wallet
          </button>
          <button
            className={`px-6 py-2 rounded bg-[#CCEAE9] text-[#001B2E] font-medium transition-colors ${
              tab === "withdraw" ? "bg-[#001B2E] text-white" : ""
            }`}
            onClick={() => setTab("withdraw")}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-[#CCEAE9] p-8 shadow-sm flex flex-col md:flex-row gap-8">
        {/* Fund Wallet */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Fund Wallet</h2>
          <div className="bg-white border border-[#E5ECEC] rounded-xl p-6 mb-0">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 text-base font-medium">
                Payment Method
              </span>
              <button
                onClick={() =>
                  router.push("/dashboard/wallet/transaction-history")
                }
                className="text-[#019893] text-base font-medium hover:underline"
              >
                Transaction History
              </button>
            </div>
            <button className="flex items-center gap-2 border border-[#CCEAE9] rounded-lg px-4 py-3 mb-6 bg-white text-[#001B2E] font-semibold text-lg">
              <svg
                className="mr-2"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#001B2E"
                  strokeWidth="2"
                  d="M3 10l9-7 9 7M4 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"
                />
              </svg>
              Bank Transfer
            </button>
            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-[#CCEAE9] rounded-lg px-4 py-3 bg-[#F6F8FA] text-base focus:outline-none focus:ring-2 focus:ring-[#CCEAE9]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-500 text-base mb-2">
                Bank Transfer Details
              </label>
              <div className="bg-[#CDEBEB] rounded-lg p-4 mb-6 text-base">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Account Name:</span>{" "}
                  <span className="font-semibold text-[#001B2E]">
                    Samuel Blessing D
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Account No:</span>{" "}
                  <span className="font-semibold text-[#001B2E]">
                    0123456789
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Bank:</span>{" "}
                  <span className="font-semibold text-[#001B2E]">
                    Example Bank
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ref ID:</span>{" "}
                  <span className="font-semibold text-[#001B2E]">
                    LP-2025-001723
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#019893] transition-colors border-2 border-transparent focus:border-[#019893] focus:outline-none">
              Continue
            </button>
          </div>
        </div>

        {/* Withdraw Funds */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Withdraw Funds</h2>
          <div className="bg-white border border-[#E5ECEC] rounded-xl p-6">
            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-[#CCEAE9] rounded-lg px-4 py-3 bg-[#F6F8FA] text-base focus:outline-none focus:ring-2 focus:ring-[#CCEAE9]"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Withdraw To:
              </label>
              <div className="flex items-center gap-2">
                <span className="flex items-center bg-[#CDEBEB] px-4 py-2 rounded-lg text-[#001B2E] font-semibold text-base">
                  GTBank - 0123456789
                  <button
                    className="ml-2 text-[#019893] hover:underline"
                    title="Edit"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="#019893"
                        strokeWidth="2"
                        d="M15.232 5.232a2.5 2.5 0 1 1 3.536 3.536L7.5 20.036l-4 1 1-4 13.732-13.804z"
                      />
                    </svg>
                  </button>
                </span>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#CDEBEB] text-[#019893] text-xl font-bold">
                  +
                </button>
              </div>
            </div>
            <button className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#019893] transition-colors border-2 border-transparent focus:border-[#019893] focus:outline-none">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
