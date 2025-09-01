import React from "react";

const activityData = [
  {
    date: "2024-07-26",
    user: "Sophia Clark",
    action: "Loan Application",
    status: "Pending",
    statusColor: "bg-yellow-500"
  },
  {
    date: "2024-07-25",
    user: "Ethan Carter",
    action: "Investment Deposit",
    status: "Completed",
    statusColor: "bg-green-500"
  },
  {
    date: "2024-07-24",
    user: "Olivia Bennett",
    action: "KYC Verification",
    status: "Completed",
    statusColor: "bg-green-500"
  },
  {
    date: "2024-07-23",
    user: "Liam Foster",
    action: "Loan Repayment",
    status: "Completed",
    statusColor: "bg-green-500"
  },
  {
    date: "2024-07-22",
    user: "Ava Harper",
    action: "Investment Withdrawal",
    status: "Failed",
    statusColor: "bg-red-500"
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activityData.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{activity.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{activity.user}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{activity.action}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium text-white ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
