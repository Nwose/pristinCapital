"use client";

import { useEffect, useState } from "react";
import { X, Wallet } from "lucide-react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState(
    "Growth Bond Alpha (Eligible)"
  );

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop (click to close) */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white w-[92%] max-w-md rounded-xl shadow-lg p-6 z-10"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click when interacting inside modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-[#012638]" />
          <h2 className="text-lg font-semibold text-[#012638]">
            Withdraw Funds
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Select Investment */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Investment
            </label>
            <select
              value={selectedInvestment}
              onChange={(e) => setSelectedInvestment(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-100"
            >
              <option>Growth Bond Alpha (Eligible)</option>
              <option>Secure Fund Beta</option>
              <option>Dynamic Yield Gamma</option>
            </select>
          </div>

          {/* Withdrawal Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Withdrawal Amount (₦)
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 200,000"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="flex-1 bg-[#012638] text-white py-2 rounded-md hover:bg-[#019893] transition"
              onClick={() => {
                // placeholder: hook into withdraw-partial logic
                console.log("Withdraw Partial", { selectedInvestment, amount });
                onClose();
              }}
            >
              Withdraw Partial
            </button>

            <button
              type="button"
              className="flex-1 bg-[#012638] text-white py-2 rounded-md hover:bg-[#019893] transition"
              onClick={() => {
                // placeholder: hook into withdraw-full logic
                console.log("Withdraw Full", { selectedInvestment });
                onClose();
              }}
            >
              Withdraw Full
            </button>
          </div>

          {/* Note text (exact wording included) */}
          <p className="text-xs text-gray-500 mt-2">
            Withdrawals can be made only after the investment lock-in period.
            Processing may take up to 2 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
