import React from "react";

interface QueueItem {
  user: string;
  amount: string;
  approvedDate: string;
}

interface DisbursementQueueProps {
  queue: QueueItem[];
}

const DisbursementQueue: React.FC<DisbursementQueueProps> = ({ queue }) => {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Disbursement Queue
      </h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-6 font-medium">User</th>
              <th className="py-3 px-6 font-medium">Amount</th>
              <th className="py-3 px-6 font-medium">Approved Date</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item, i) => (
              <tr
                key={i}
                className={`text-sm text-gray-800 ${
                  i !== queue.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50 transition`}
              >
                <td className="py-3 px-6">{item.user}</td>
                <td className="py-3 px-6">{item.amount}</td>
                <td className="py-3 px-6">{item.approvedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition mb-4">
        Disburse Selected
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          OTP
        </label>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </section>
  );
};

export default DisbursementQueue;
