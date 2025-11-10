"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getLoanProductById } from "@/services/loan_product.service";
import { applyForLoan } from "@/services/loan_application.service";

export default function LoanApplicationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    tenure: "",
    purpose: "",
  });

  // ---- Fetch product ----
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const res = await getLoanProductById(id as string);
        setProduct(res);
      } catch (err) {
        console.error("Failed to load product:", err);
        toast.error("Failed to load loan product details");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ---- Helpers ----
  const parseNumber = (v: string | number) => {
    const n = typeof v === "string" ? v.replace(/,/g, "") : v;
    const num = Number(n);
    return Number.isFinite(num) ? num : 0;
  };

  const formatCurrency = (n: number) => "₦" + Math.round(n).toLocaleString();

  // interest_rate is stored as 0.12 for 12%
  const interestRate = useMemo(() => {
    const r = Number(product?.interest_rate ?? 0);
    return Number.isFinite(r) ? r : 0;
  }, [product]);

  // Derived loan summary calculations
  const summary = useMemo(() => {
    const principal = parseNumber(form.amount);
    const tenureMonths = Math.max(
      0,
      parseInt(String(form.tenure || "0"), 10) || 0
    );

    const years = tenureMonths / 12;
    const totalInterest = principal * interestRate * years;
    const totalRepayment = principal + totalInterest;
    const monthlyRepayment =
      tenureMonths > 0 ? totalRepayment / tenureMonths : 0;

    return {
      principal,
      tenureMonths,
      totalInterest,
      totalRepayment,
      monthlyRepayment,
    };
  }, [form.amount, form.tenure, interestRate]);

  // ---- Validation helpers ----
  const validateBeforeSubmit = () => {
    if (!product) return "Product missing";
    const { principal, tenureMonths } = summary;
    if (principal <= 0) return "Enter a valid loan amount";
    const min = Number(product?.min_amount ?? 0);
    const max = Number(product?.max_amount ?? Infinity);
    if (principal < min) return `Minimum amount is ${formatCurrency(min)}`;
    if (principal > max) return `Maximum amount is ${formatCurrency(max)}`;
    const maxTenure = Number(product?.max_tenure_months ?? 0);
    if (tenureMonths <= 0) return "Enter a valid tenure (months)";
    if (maxTenure > 0 && tenureMonths > maxTenure)
      return `Maximum tenure is ${maxTenure} months`;
    if (!form.purpose || form.purpose.trim().length < 5)
      return "Please provide a short purpose (min 5 characters)";
    return null;
  };

  // ---- Submit handler ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateBeforeSubmit();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await applyForLoan({
        product_id: id as string, // ✅ Correct field name
        amount_requested: parseFloat(form.amount),
        tenure_months: parseInt(form.tenure),
        purpose: form.purpose,
      });

      toast.success("Loan application submitted successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard/loans");
      }, 2500);
    } catch (err: any) {
      console.error("Loan submission error:", err);
      const message =
        (err && err.message) || "Failed to apply for loan. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading loan details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center text-gray-500 mt-10">
        Loan product not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Top header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001B2E]">
          Applying for: <span className="text-[#019893]">{product.name}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Product summary card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#CCEAE9] rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[#001B2E] mb-3">
            Loan Summary
          </h2>

          <div className="text-sm text-gray-700 space-y-3">
            <div>
              <div className="font-semibold text-[#019893]">Interest Rate</div>
              <div>{(interestRate * 100).toFixed(2)}% per year</div>
            </div>

            <div>
              <div className="font-semibold text-[#019893]">Min / Max</div>
              <div>
                {formatCurrency(Number(product.min_amount))} -{" "}
                {formatCurrency(Number(product.max_amount))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#019893]">Max Tenure</div>
              <div>{product.max_tenure_months} months</div>
            </div>

            {/* live summary */}
            <div className="mt-4 pt-3 border-t border-dashed border-gray-100">
              <div className="font-semibold text-[#019893] mb-2">
                Your Estimates
              </div>

              <div className="flex items-center justify-between text-sm mb-1">
                <div className="text-gray-600">Entered amount</div>
                <div className="font-medium">
                  {formatCurrency(summary.principal)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-1">
                <div className="text-gray-600">Tenure</div>
                <div className="font-medium">{summary.tenureMonths} months</div>
              </div>

              <div className="flex items-center justify-between text-sm mb-1">
                <div className="text-gray-600">Estimated interest</div>
                <div className="font-medium">
                  {formatCurrency(summary.totalInterest)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Total repayment</div>
                <div className="font-medium">
                  {formatCurrency(summary.totalRepayment)}
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Estimates use simple interest: principal × rate × years.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Application form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#CCEAE9] rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[#001B2E] mb-4">
            Application Form
          </h2>

          <div className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-[#019893] mb-1">
                Loan Amount
              </label>
              <input
                type="number"
                min={Number(product?.min_amount || 0)}
                max={Number(product?.max_amount || 999999999)}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder={`Between ${formatCurrency(
                  Number(product.min_amount)
                )} and ${formatCurrency(Number(product.max_amount))}`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#019893]"
                required
              />
            </div>

            {/* Tenure */}
            <div>
              <label className="block text-sm font-semibold text-[#019893] mb-1">
                Tenure (months)
              </label>
              <input
                type="number"
                min={1}
                max={Number(product?.max_tenure_months || 120)}
                value={form.tenure}
                onChange={(e) => setForm({ ...form, tenure: e.target.value })}
                placeholder={`Up to ${product?.max_tenure_months} months`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#019893]"
                required
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-semibold text-[#019893] mb-1">
                Purpose of Loan
              </label>
              <textarea
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                placeholder="Describe why you need this loan"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#019893]"
                rows={4}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard/loans")}
                className="flex-1 border border-gray-300 rounded-lg py-2 font-medium text-gray-700 hover:bg-gray-50 transition"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#019893] text-white py-2 rounded-lg font-semibold hover:bg-[#017e79] transition disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm & Apply"}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
