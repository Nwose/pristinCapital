"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function TransactionHistoryPage() {
  const router = useRouter();

  const transactions = [
    {
      date: "2025-05-21",
      type: "Credit",
      description: "Wallet Funded via Bank Transfer",
      amount: "₦50,000.00",
      status: "Successful",
    },
    {
      date: "2025-05-20",
      type: "Debit",
      description: "Withdrawal to GTBank",
      amount: "₦20,000.00",
      status: "Successful",
    },
    {
      date: "2025-05-18",
      type: "Debit",
      description: "Loan Repayment",
      amount: "₦10,000.00",
      status: "Successful",
    },
    {
      date: "2025-05-15",
      type: "Credit",
      description: "Wallet Funded",
      amount: "₦15,000.00",
      status: "Successful",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Balance Section */}
      <div className="bg-white rounded-lg border border-[#CCEAE9] p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-gray-500 text-sm mb-1">Wallet Balance</div>
          <div className="text-2xl font-bold text-[#001B2E]">₦125,500.00</div>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-6 py-2 rounded bg-[#001B2E] text-white font-medium hover:bg-[#019893] transition-colors">
            Fund Wallet
          </button>
          <button className="px-6 py-2 rounded bg-[#CCEAE9] text-[#001B2E] font-medium hover:bg-[#019893] hover:text-white transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Transaction History Card */}
      <div className="bg-white rounded-2xl border border-[#CCEAE9] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#001B2E] mb-4 md:mb-0">
            Transaction History
          </h2>

          <div className="flex items-center gap-3">
            <select className="border border-[#CCEAE9] rounded-lg px-3 py-2 text-gray-600 text-sm bg-[#F6F8FA] focus:outline-none">
              <option>All Types</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>

            <input
              type="date"
              defaultValue="2025-05-21"
              className="border border-[#CCEAE9] rounded-lg px-3 py-2 text-gray-600 text-sm bg-[#F6F8FA] focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#CCEAE9] bg-[#F6F8FA] text-gray-600 text-sm">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E5ECEC] hover:bg-[#F9FBFB] text-[#001B2E] text-sm"
                >
                  <td className="py-3 px-4">{txn.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        txn.type === "Credit"
                          ? "text-green-600 bg-green-50"
                          : "text-red-600 bg-red-50"
                      } px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{txn.description}</td>
                  <td className="py-3 px-4 font-medium">{txn.amount}</td>
                  <td className="py-3 px-4 text-[#019893] font-semibold">
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Fixed Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/dashboard/wallet")}
          className="px-6 py-2 rounded-lg bg-[#CCEAE9] text-[#001B2E] font-medium hover:bg-[#019893] hover:text-white transition-colors"
        >
          ← Back to Wallet
        </button>
      </div>

      <footer className="text-center text-gray-400 text-sm mt-6">
        © 2025 Fintech Dashboard
      </footer>
    </div>
  );
}
