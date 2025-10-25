// ("use client");
"use client";

console.log("✅ Summary page mounted!");

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestLoanAmountPage() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [purpose, setPurpose] = useState("");

  // Calculate loan details
  const amount = parseFloat(loanAmount) || 0;
  const months = parseInt(tenure) || 6;
  const interestRate = amount * 0.1; // 10% interest
  const monthlyInstallment = months > 0 ? (amount + interestRate) / months : 0;

  const handleNext = () => {
    if (!loanAmount || !tenure || !purpose) {
      alert("Please fill in all fields.");
      return;
    }

    const loanData = {
      amount,
      tenure: months,
      purpose,
      monthlyInstallment,
      interestRate,
      repaymentAmount: amount + interestRate,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("loanData", JSON.stringify(loanData));
    }

    console.log("Navigating to summary page...");
    router.push("/dashboard/loans/request-loan/summary");
  };

  // helper: compute whether the form is valid (all fields filled)
  const isFormValid = loanAmount !== "" && tenure !== "" && purpose !== "";
  console.log({ loanAmount, tenure, purpose, isFormValid });

  return (
    <div className="min-h-screen max-7-xl bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {/* Step 1 - Active */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <span className="text-gray-900 font-medium">Amount</span>
            </div>
          </div>

          <div className="w-24 h-0.5 bg-gray-300"></div>

          {/* Step 2 - Inactive */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
                2
              </div>
              <span className="text-gray-500 font-medium">Summary</span>
            </div>
          </div>

          <div className="w-24 h-0.5 bg-gray-300"></div>

          {/* Step 3 - Inactive */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="text-gray-500 font-medium">Confirm</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Loan Amount
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter amount in ₦"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Tenure (months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Purpose
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Type your Purpose here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Cards */}
          <div className="space-y-6">
            {/* Loan Calculator Card */}
            <div className="bg-[#001B2E] rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-6">Loan Calculator</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Repayment Amount</span>
                  <span className="font-semibold">
                    ₦{(amount + interestRate).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Installment</span>
                  <span className="font-semibold">{months} Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Interest Rate</span>
                  <span className="font-semibold">
                    ₦{interestRate.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Auto Credit Scoring Card */}
            <div className="bg-[#C7E9E8] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Auto Credit Scoring
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">📋</span>
                  <span>KYC Status: Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">💰</span>
                  <span>Deposit History: Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🔄</span>
                  <span>Prior Loans: 2</span>
                </div>
                <div className="mt-4 pt-4 border-t border-teal-700">
                  <span className="font-semibold text-gray-900">
                    Eligibility:{" "}
                  </span>
                  <span className="text-gray-700">Preliminary Qualified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className="px-8 py-3 bg-[#001B2E] text-white rounded-lg font-medium hover:bg-[#003049] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
