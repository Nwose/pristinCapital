"use client";

import React from "react";

type UserInvestment = {
  user: string;
  plan: string;
  amount: string;
  startDate: string;
  maturityDate: string;
  earnings: string;
};

const userInvestments: UserInvestment[] = [
  {
    user: "Liam Carter",
    plan: "Growth Fund",
    amount: "₦10,000",
    startDate: "2023-09-01",
    maturityDate: "2024-09-01",
    earnings: "$850",
  },
  {
    user: "Olivia Bennett",
    plan: "Secure Savings",
    amount: "₦5,000",
    startDate: "2023-08-15",
    maturityDate: "2025-08-15",
    earnings: "$620",
  },
  {
    user: "Ethan Harper",
    plan: "Balanced Portfolio",
    amount: "₦7,500",
    startDate: "2023-07-20",
    maturityDate: "2025-01-20",
    earnings: "$780",
  },
  {
    user: "Ava Morgan",
    plan: "Growth Fund",
    amount: "₦12,000",
    startDate: "2023-06-05",
    maturityDate: "2024-06-05",
    earnings: "$1,020",
  },
  {
    user: "Noah Foster",
    plan: "Short Term Deposit",
    amount: "₦2,000",
    startDate: "2023-05-12",
    maturityDate: "2023-08-12",
    earnings: "$110",
  },
];

export default function UserInvestmentsTable() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          User Investments
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-100 text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left font-medium">
            <tr>
              <th className="px-6 py-3 border-b">User</th>
              <th className="px-6 py-3 border-b">Plan</th>
              <th className="px-6 py-3 border-b">Amount</th>
              <th className="px-6 py-3 border-b">Start Date</th>
              <th className="px-6 py-3 border-b">Maturity Date</th>
              <th className="px-6 py-3 border-b">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {userInvestments.map((inv, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-800">
                  {inv.user}
                </td>
                <td className="px-6 py-3 text-gray-700">{inv.plan}</td>
                <td className="px-6 py-3 text-gray-700">{inv.amount}</td>
                <td className="px-6 py-3 text-gray-700">{inv.startDate}</td>
                <td className="px-6 py-3 text-gray-700">{inv.maturityDate}</td>
                <td className="px-6 py-3 text-gray-700">{inv.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-5">
        <button className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white hover:bg-gray-50">
          Export Data (CSV)
        </button>
        <button className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white hover:bg-gray-50">
          Export Data (Excel)
        </button>
      </div>
    </div>
  );
}
