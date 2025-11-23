"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getLoanApplications,
  getUserLoans,
} from "@/services/loan_application.service";
import { getAllLoanProducts } from "@/services/loan_product.service";
import { makeRequest } from "@/services/base";
import { toast } from "react-toastify";
import {
  Loader2,
  Wallet,
  CalendarDays,
  Percent,
  Banknote,
  ArrowLeft,
  Landmark,
  Briefcase,
} from "lucide-react";

/* ------------------ TYPES ------------------ */
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

/* ------------------ MAIN PAGE ------------------ */
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

  /* ----------- MODALS ----------- */
  const [showModal, setShowModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  /* ----------- BANK FORM ----------- */
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [savingBank, setSavingBank] = useState(false);

  /* ----------- BUSINESS FORM ----------- */
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [savingBusiness, setSavingBusiness] = useState(false);

  const router = useRouter();

  /* ------------------ FETCH LOANS ------------------ */
  useEffect(() => {
    fetchLoans();
    fetchLoanProducts();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const loanApps = await getLoanApplications();
      const userLoans = await getUserLoans();

      const validLoanApps: LoanApplication[] = Array.isArray(loanApps)
        ? loanApps
        : (loanApps as any)?.results && Array.isArray((loanApps as any).results)
        ? (loanApps as any).results
        : [];

      const cleanedLoans = validLoanApps.map((item) => ({
        ...item,
        purpose:
          item.purpose && item.purpose !== "N/A"
            ? item.purpose
            : "Personal Loan",
      }));

      setLoanHistory(cleanedLoans);

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

  /* ------------------ FETCH LOAN PRODUCTS ------------------ */
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

  /* ------------------ HELPERS ------------------ */
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

  /* --------------------------------------------------------- */
  /* ------------------- SAVE BANK DETAILS ------------------- */
  /* --------------------------------------------------------- */
  const saveBankDetails = async () => {
    if (!bankName || !accountNumber || !accountName)
      return toast.error("Please fill in all fields");

    try {
      setSavingBank(true);

      await makeRequest("api/v1/bank-details/", "POST", {
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
      });

      toast.success("Bank details saved successfully!");

      // Reset form
      setBankName("");
      setAccountNumber("");
      setAccountName("");

      setShowBankModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save bank details");
    } finally {
      setSavingBank(false);
    }
  };

  /* ------------------------------------------------------------ */
  /* ------------------- SAVE BUSINESS DETAILS ------------------ */
  /* ------------------------------------------------------------ */
  const saveBusinessDetails = async () => {
    if (!businessName || !businessAddress || !businessType)
      return toast.error("Please fill in all fields");

    try {
      setSavingBusiness(true);

      await makeRequest("api/v1/business-details/", "POST", {
        business_name: businessName,
        business_address: businessAddress,
        business_type: businessType,
      });

      toast.success("Business details saved!");

      // Reset form
      setBusinessName("");
      setBusinessAddress("");
      setBusinessType("");

      setShowBusinessModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save business details");
    } finally {
      setSavingBusiness(false);
    }
  };

  /* ---------------------- RETURN UI ---------------------- */
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* ------------------------------------------------------------- */}
      {/*            SECTION 1: SUMMARY + HISTORY                      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT: SUMMARY */}
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

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => router.push("/admin/loans/request")}
              className="w-full bg-[#019893] hover:bg-[#017C77] text-white py-3 rounded-lg font-semibold text-lg transition-all"
            >
              Request for Loan
            </button>

            <div className="text-center text-gray-400 text-xs">
              Please add your Business Details before you request for a loan
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[#019893] hover:bg-[#017C77] text-white py-3 rounded-lg font-semibold text-lg transition-all"
            >
              Add your Business Details
            </button>
          </div>
        </div>

        {/* RIGHT: LOAN HISTORY */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold text-[#001B2E]">
              Loan History
            </div>
            <button
              className="text-[#019893] text-base font-medium hover:underline"
              onClick={() => router.push("/admin/loans/history")}
            >
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

      {/* ------------------------------------------------------------- */}
      {/*                  SECTION 2: LOAN PRODUCTS                    */}
      {/* ------------------------------------------------------------- */}
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

      {/* ------------------------------------------------------------- */}
      {/*                      MAIN DETAIL SELECT MODAL                */}
      {/* ------------------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-600 hover:text-[#019893] transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <h2 className="text-center text-lg font-semibold text-[#001B2E] mb-4">
              Choose Detail Type
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowBankModal(true);
                }}
                className="flex items-center justify-between border border-[#CCEAE9] rounded-lg p-4 hover:bg-[#E6F8F7] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#019893]/10 text-[#019893] p-2 rounded-full">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="text-[#001B2E] font-medium">
                    Add Bank Details
                  </span>
                </div>
                <input type="radio" checked readOnly />
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setShowBusinessModal(true);
                }}
                className="flex items-center justify-between border border-[#CCEAE9] rounded-lg p-4 hover:bg-[#E6F8F7] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#019893]/10 text-[#019893] p-2 rounded-full">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[#001B2E] font-medium">
                    Add Business Details
                  </span>
                </div>
                <input type="radio" readOnly />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/*                       BANK DETAILS MODAL                     */}
      {/* ------------------------------------------------------------- */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowBankModal(false)}
              className="absolute top-3 left-3 text-gray-600 hover:text-[#019893] transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <h2 className="text-center text-lg font-semibold text-[#001B2E] mb-4">
              Add Bank Details
            </h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <button
                type="button"
                onClick={saveBankDetails}
                disabled={savingBank}
                className="mt-3 w-full bg-[#019893] hover:bg-[#017C77] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {savingBank ? "Saving..." : "Save Bank Details"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/*                    BUSINESS DETAILS MODAL                    */}
      {/* ------------------------------------------------------------- */}
      {showBusinessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowBusinessModal(false)}
              className="absolute top-3 left-3 text-gray-600 hover:text-[#019893] transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <h2 className="text-center text-lg font-semibold text-[#001B2E] mb-4">
              Add Business Details
            </h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Business Address"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Business Type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <button
                type="button"
                onClick={saveBusinessDetails}
                disabled={savingBusiness}
                className="mt-3 w-full bg-[#019893] hover:bg-[#017C77] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {savingBusiness ? "Saving..." : "Save Business Details"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
