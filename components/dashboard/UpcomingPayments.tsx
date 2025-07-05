import {
  CalendarCheck,
  TrendingUp,
  Wallet,
  FileStack,
  ChevronRight,
} from "lucide-react";
import { ReactNode } from "react";

const payments: {
  id: number;
  title: string;
  dueDate: string;
  amount: string;
  icon: ReactNode;
}[] = [
  {
    id: 1,
    title: "Loan Repayment",
    dueDate: "Due 2025-06-15",
    amount: "₦420",
    icon: <FileStack className="w-5 h-5 text-[#001B2E]" />,
  },
  {
    id: 2,
    title: "Invest Auto-Debit",
    dueDate: "Due 2025-05-25",
    amount: "₦300",
    icon: <TrendingUp className="w-5 h-5 text-[#001B2E]" />,
  },
  {
    id: 3,
    title: "Wallet Top-up",
    dueDate: "Due 2025-06-04",
    amount: "₦150",
    icon: <Wallet className="w-5 h-5 text-[#001B2E]" />,
  },
];

export default function UpcomingPayments() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-teal-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#001B2E]">
          Upcoming Payments
        </h3>
        <button className="text-[#019893] text-sm font-medium hover:text-teal-700 flex items-center gap-2">
          <CalendarCheck className="w-5 h-5" /> See all
        </button>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div
            key={payment.id}
            className={`flex items-center justify-between pb-4 ${
              index < payments.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 bg-[#CCEAE9] rounded-lg flex items-center justify-center mr-4`}
              >
                {payment.icon}
              </div>
              <div>
                <p className="font-medium text-[#001B2E]">{payment.title}</p>
                <p className="text-sm text-gray-500">{payment.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 mr-2">
                {payment.amount}
              </span>
              <ChevronRight className="text-gray-400 w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
