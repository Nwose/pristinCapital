"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getLoanApplications,
  getUserLoans,
} from "@/services/loan_application.service";
import { getAllLoanProducts } from "@/services/loan_product.service";
import { toast } from "react-toastify";
import { Loader2, Wallet, CalendarDays, Percent, Banknote } from "lucide-react";

interface LoanApplication {
  id: string;
  purpose: string;
  amount: string | number;
  created_at?: string;
  status: string;
}

interface LoanSummary {
  balance: string;
  debt: string;
  pending: string;
}

interface LoanProduct {
  id: string;
  name: string;
  description: string;
  max_amount: number;
  max_tenure_months: number;
  interest_rate: number;
}

export default function LoansPage() {
  const [loanHistory, setLoanHistory] = useState<LoanApplication[]>([]);
  const [summary, setSummary] = useState<LoanSummary>({
    balance: "0.00",
    debt: "0.00",
    pending: "0.00",
  });
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchLoans();
    fetchLoanProducts();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const loanApps = await getLoanApplications();
      const userLoans = await getUserLoans();

      // ✅ Always treat as array
      const validLoanApps: LoanApplication[] = Array.isArray(loanApps)
        ? loanApps
        : (loanApps as any)?.results && Array.isArray((loanApps as any).results)
        ? (loanApps as any).results
        : [];

      // ✅ Filter out "N/A" and undefined purposes
      const cleanedLoans = validLoanApps.map((item) => ({
        ...item,
        purpose:
          item.purpose && item.purpose !== "N/A"
            ? item.purpose
            : "Personal Loan",
      }));

      setLoanHistory(cleanedLoans);

      // ✅ Handle summary values
      if (
        userLoans &&
        typeof userLoans === "object" &&
        !Array.isArray(userLoans)
      ) {
        setSummary({
          balance: userLoans?.balance?.toString() ?? "0.00",
          debt: userLoans?.debt?.toString() ?? "0.00",
          pending: userLoans?.pending?.toString() ?? "0.00",
        });
      }
    } catch (error: any) {
      console.error("❌ Failed to fetch loans:", error?.message || error);
      toast.error("Failed to load loan data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLoanProducts = async () => {
    try {
      setProductLoading(true);

      const data = await getAllLoanProducts();
      const list: LoanProduct[] = Array.isArray(data)
        ? data
        : (data as any)?.results && Array.isArray((data as any).results)
        ? (data as any).results
        : (data as any)?.data && Array.isArray((data as any).data)
        ? (data as any).data
        : [];

      setLoanProducts(list);
    } catch (err: any) {
      console.error("❌ Failed to fetch loan products:", err);
      toast.error("Failed to load loan products.");
    } finally {
      setProductLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-500";
      case "rejected":
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* SECTION 1: Summary + History */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Loan Summary */}
        <div className="flex-1 max-w-xl">
          <div className="bg-white rounded-2xl border border-[#CCEAE9] p-8 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none select-none">
              <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
                <rect
                  x="30"
                  y="30"
                  width="160"
                  height="60"
                  rx="10"
                  fill="#CCEAE9"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="text-gray-400 text-lg mb-2">
                Current Loan Balance
              </div>
              <div className="text-3xl font-bold text-[#001B2E] mb-6">
                ₦{summary.balance}
              </div>
              <div className="text-gray-400 text-lg mb-2">Loan Debt</div>
              <div className="text-2xl font-bold text-[#001B2E] mb-6">
                ₦{summary.debt}
              </div>
              <div className="text-gray-400 text-lg mb-2">Pending Loan</div>
              <div className="text-2xl font-bold text-[#001B2E] mb-6">
                ₦{summary.pending}
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/admin/loans/request")}
            className="w-full bg-[#019893] hover:bg-[#017C77] text-white py-3 rounded-lg font-semibold text-lg mb-2 transition-all"
          >
            Request for Loan
          </button>
          <div className="text-center text-gray-400 text-xs mb-4">
            Please add your Business Details before you request for a loan
          </div>
          <button
            onClick={() => router.push("/admin/business/add")}
            className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg"
          >
            Add your Business Details
          </button>
        </div>

        {/* Right: Loan History */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold text-[#001B2E]">
              Loan History
            </div>
            <button className="text-[#019893] text-base font-medium hover:underline">
              See All
            </button>
          </div>

          {loading ? (
            <div className="text-gray-500 text-center py-6 flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 text-[#019893]" />{" "}
              Loading...
            </div>
          ) : loanHistory.length > 0 ? (
            <div className="space-y-4">
              {loanHistory.map((item, index) => (
                <div
                  key={item.id || `loan-${index}`}
                  className="flex items-center justify-between bg-white border border-[#CCEAE9] rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1CC5AE] flex items-center justify-center">
                      <Wallet size={24} className="text-[#019893]" />
                    </div>
                    <div>
                      <div className="text-[#001B2E] font-medium text-base">
                        {item.purpose}
                      </div>
                      <div className="text-[#019893] font-bold text-lg">
                        ₦{item.amount}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold text-base capitalize ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-6">
              No loan records found.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Loan Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#001B2E]">
            Available Loan Products
          </h2>
        </div>

        {productLoading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2 text-[#019893]" />
            Loading loan products...
          </div>
        ) : loanProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No loan products available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanProducts.map((loan, idx) => (
              <div
                key={loan.id || `loan-prod-${idx}`}
                className="bg-white border border-[#CCEAE9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="text-[#019893]" size={22} />
                  <h3 className="font-semibold text-lg text-[#001B2E]">
                    {loan.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{loan.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Banknote className="text-[#019893]" size={18} />
                    <span>
                      <strong>Max Amount:</strong> ₦
                      {loan.max_amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-[#019893]" size={18} />
                    <span>
                      <strong>Tenure:</strong> {loan.max_tenure_months} months
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent className="text-[#019893]" size={18} />
                    <span>
                      <strong>Interest:</strong>{" "}
                      {(loan.interest_rate * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    router.push(`/admin/loans/request?product=${loan.id}`)
                  }
                  className="mt-5 w-full bg-[#019893] hover:bg-[#017C77] text-white rounded-lg py-2 font-medium transition-all"
                >
                  Apply for this Loan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
