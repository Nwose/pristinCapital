"use client";

import React, { useEffect, useState } from "react";
import { getAllLoanProducts } from "@/services/loan_product.service";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";

interface LoanProduct {
  id: string;
  name: string;
  description: string;
  interest_rate: string;
  min_amount: string;
  max_amount: string;
  max_tenure_months: number;
  risk_level_display?: string;
}

export default function LoansPage() {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getAllLoanProducts();
        setProducts(res);
      } catch (error: any) {
        toast.error("Failed to load loan products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading available loan products...
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">
        No loan products available at the moment.
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full px-4 md:px-0 py-8">
      <h1 className="text-2xl font-bold text-[#001B2E] mb-4">
        Available Loan Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-[#CCEAE9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-[#001B2E] mb-2">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-[#019893]">
                  Interest Rate:
                </span>{" "}
                {Number(product.interest_rate) * 100}%
              </p>
              <p>
                <span className="font-semibold text-[#019893]">
                  Min Amount:
                </span>{" "}
                ₦{Number(product.min_amount).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-[#019893]">
                  Max Amount:
                </span>{" "}
                ₦{Number(product.max_amount).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-[#019893]">Tenure:</span>{" "}
                {product.max_tenure_months} months
              </p>
              {product.risk_level_display && (
                <p>
                  <span className="font-semibold text-[#019893]">Risk:</span>{" "}
                  {product.risk_level_display}
                </p>
              )}
            </div>

            {/* ✅ Fixed link path */}
            <Link href={`/dashboard/loans/apply/${product.id}`}>
              <button className="mt-6 w-full bg-[#019893] text-white py-2 rounded-lg font-semibold hover:bg-[#017e79] transition">
                Apply Now
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
