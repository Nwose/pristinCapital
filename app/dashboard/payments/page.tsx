"use client";

import React, { useRef } from "react";

export default function PaymentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="bg-white border border-[#CCEAE9] rounded-2xl p-10 max-w-xl w-full mx-auto mt-8 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-[#001B2E]">
            Repay Your Loan
          </h2>
          <button className="text-[#019893] text-base font-medium hover:underline">
            Repayment History
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          To repay your loan, transfer the repayment amount to our company's
          account using your local bank. After payment, upload your proof of
          payment below.
        </p>
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Outstanding Amount</span>
            <span className="font-bold text-lg text-[#001B2E]">₦44,800.90</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Due Date</span>
            <span className="text-[#001B2E]">15 June 2025</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Loan ID</span>
            <span className="text-[#001B2E]">LN-5520198</span>
          </div>
        </div>
        <div className="bg-[#F6F8FA] border border-[#CCEAE9] rounded-lg p-5 mb-6">
          <div className="flex items-center mb-3 font-semibold text-[#001B2E]">
            <svg
              className="mr-2"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#001B2E"
                strokeWidth="2"
                d="M3 10l9-7 9 7M4 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"
              />
            </svg>
            Company's Bank Account Details
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Account Name</span>{" "}
              <span className="font-semibold text-[#001B2E]">LoanEase Ltd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account Number</span>{" "}
              <span className="font-bold text-[#001B2E] text-lg">
                1234567890
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bank Name</span>{" "}
              <span className="font-semibold text-[#001B2E]">
                First National Bank
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bank Branch</span>{" "}
              <span className="font-semibold text-[#001B2E]">
                Victoria Island
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Proof of Payment
          </label>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#CCEAE9] rounded-lg w-40 h-20 bg-[#F6F8FA] cursor-pointer">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16V8m0 0l-3.5 3.5M12 8l3.5 3.5"
                  stroke="#019893"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="4"
                  stroke="#CCEAE9"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-xs text-gray-400 mt-1">Upload Area</span>
            </div>
            <button
              className="bg-[#012638] text-white px-4 py-2 rounded-lg font-medium text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Accepted: PDF, JPG, PNG (max 5MB)
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Whatsapp image 2025-06-03 01.30.56_aghfogi6
          </div>
        </div>
        <button className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#019893] transition-colors">
          Submit Repayment
        </button>
      </div>
    </div>
  );
}
