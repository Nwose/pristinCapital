"use client";

import React from "react";

type MaturityInvestment = {
  user: string;
  plan: string;
  maturityDate: string;
};

const nearingMaturity: MaturityInvestment[] = [
  {
    user: "Noah Foster",
    plan: "Short Term Deposit",
    maturityDate: "2023-08-12",
  },
  {
    user: "Liam Carter",
    plan: "Growth Fund",
    maturityDate: "2024-09-01",
  },
];

export default function MaturityTable() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Investments Nearing Maturity
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left font-medium">
            <tr>
              <th className="px-6 py-3 border-b">User</th>
              <th className="px-6 py-3 border-b">Plan</th>
              <th className="px-6 py-3 border-b">Maturity Date</th>
              <th className="px-6 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {nearingMaturity.map((inv, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-800">
                  {inv.user}
                </td>
                <td className="px-6 py-3 text-gray-700">{inv.plan}</td>
                <td className="px-6 py-3 text-gray-700">{inv.maturityDate}</td>
                <td className="px-6 py-3">
                  <button className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-700 transition">
                    Notify User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
