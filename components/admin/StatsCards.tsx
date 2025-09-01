import React from "react";

const statsData = [
  {
    title: "Total Users",
    value: "12,345",
    bgColor: "bg-gray-100"
  },
  {
    title: "Active Loans",
    value: "5,678",
    bgColor: "bg-gray-100"
  },
  {
    title: "Investment Volume",
    value: "₦1,234,567",
    bgColor: "bg-gray-100"
  },
  {
    title: "Pending KYC",
    value: "123",
    bgColor: "bg-gray-100"
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-6`}>
          <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
