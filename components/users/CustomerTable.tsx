"use client";

import React, { useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  dateJoined: string;
  kyc: "View" | "Rejected";
};

const customers: Customer[] = [
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

type KYCActionProps = {
  kyc: "View" | "Rejected";
};

function KYCAction({ kyc }: KYCActionProps) {
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
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mx-auto mt-6 p-4">
      {/* Search Input */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search by name, email, or ID"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500"
        />

        {/* Dropdown Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Date Joined Dropdown */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Filter by Date Joined</option>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-5">
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

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4  text-sm text-gray-600">
        <p>Showing 1–3 of 3 customers</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Prev
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
