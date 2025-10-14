"use client";

import React from "react";

type Plan = {
  name: string;
  rate: string;
  tenure: string;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Inactive";
  created: string;
};

const plans: Plan[] = [
  {
    name: "Growth Fund",
    rate: "8.5%",
    tenure: "12 months",
    risk: "Medium",
    status: "Active",
    created: "2023-08-15",
  },
  {
    name: "Secure Savings",
    rate: "6.2%",
    tenure: "24 months",
    risk: "Low",
    status: "Active",
    created: "2023-07-20",
  },
  {
    name: "High Yield Bond",
    rate: "10.1%",
    tenure: "6 months",
    risk: "High",
    status: "Inactive",
    created: "2023-06-05",
  },
  {
    name: "Balanced Portfolio",
    rate: "7.8%",
    tenure: "18 months",
    risk: "Medium",
    status: "Active",
    created: "2023-05-12",
  },
  {
    name: "Short Term Deposit",
    rate: "5.5%",
    tenure: "3 months",
    risk: "Low",
    status: "Active",
    created: "2023-04-01",
  },
];

export default function PlanManagementTable({
  onEdit,
}: {
  onEdit: (plan: Plan) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
          <option>Risk</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
          <option>Tenure</option>
          <option>3 months</option>
          <option>6 months</option>
          <option>12 months</option>
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-600 font-medium">
          <tr>
            <th className="py-3 px-4 text-left">Plan Name</th>
            <th className="py-3 px-4 text-left">Rate</th>
            <th className="py-3 px-4 text-left">Tenure</th>
            <th className="py-3 px-4 text-left">Risk Level</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Created Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index} className=" hover:bg-gray-50">
              <td className="py-3 px-4">{plan.name}</td>
              <td className="py-3 px-4">{plan.rate}</td>
              <td className="py-3 px-4">{plan.tenure}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    plan.risk === "High"
                      ? "bg-orange-500"
                      : plan.risk === "Medium"
                      ? "bg-gray-600"
                      : "bg-gray-400"
                  }`}
                >
                  {plan.risk}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    plan.status === "Active" ? "bg-teal-500" : "bg-yellow-500"
                  }`}
                >
                  {plan.status}
                </span>
              </td>
              <td className="py-3 px-4">{plan.created}</td>
              <td
                className="py-3 px-4 text-blue-600 cursor-pointer"
                onClick={() => onEdit(plan)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
