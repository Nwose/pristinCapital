"use client";

import React from "react";

const customers = [
  {
    id: "CUST12345",
    name: "Ethan Harper",
    email: "ethan.harper@example.com",
    status: "Active",
    dateJoined: "2023-01-15",
    kyc: "View",
  },
  {
    id: "CUST67890",
    name: "Olivia Bennett",
    email: "olivia.bennett@example.com",
    status: "Inactive",
    dateJoined: "2022-11-20",
    kyc: "View",
  },
  {
    id: "CUST99001",
    name: "Sophia Foster",
    email: "sophia.foster@example.com",
    status: "Active",
    dateJoined: "2023-04-12",
    kyc: "Rejected",
  },
];

type StatusBadgeProps = {
  status: "Active" | "Inactive";
};

function StatusBadge({ status }: StatusBadgeProps) {
  const colors =
    status === "Active"
      ? "bg-green-500 text-white"
      : "bg-yellow-500 text-white";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors}`}>
      {status}
    </span>
  );
}

function KYCAction({ kyc }) {
  return (
    <span
      className={`text-sm font-medium ${
        kyc === "Rejected" ? "text-red-500" : "text-blue-600"
      } cursor-pointer`}
    >
      {kyc}
    </span>
  );
}

export default function CustomerTable() {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Search + Filters */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white hover:bg-gray-50">
            Status
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white hover:bg-gray-50">
            Date Joined
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date Joined</th>
              <th className="px-6 py-3">KYC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{cust.name}</td>
                <td className="px-6 py-4 text-blue-600">{cust.email}</td>
                <td className="px-6 py-4">{cust.id}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={cust.status} />
                </td>
                <td className="px-6 py-4">{cust.dateJoined}</td>
                <td className="px-6 py-4">
                  <KYCAction kyc={cust.kyc} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
