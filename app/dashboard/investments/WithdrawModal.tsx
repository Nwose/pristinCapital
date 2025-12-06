"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { makeRequest } from "@/services/base";
import { toast } from "react-toastify";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) fetchUserBanks();
  }, [isOpen]);

  const fetchUserBanks = async () => {
    try {
      const res = await makeRequest("/api/v1/bank_account/my_banks/", "GET");
      if (Array.isArray(res) && res.length > 0) {
        setBanks(res);
        setSelectedBank(res[0].id);
      }
    } catch (e) {
      toast.error("Failed to load bank accounts");
    }
  };

  const handleWithdraw = async (type: "partial" | "full") => {
    if (type === "partial" && !amount)
      return toast.error("Please enter amount");

    setLoading(true);
    try {
      const payload =
        type === "full"
          ? { bank_account_id: selectedBank, type: "full" }
          : { bank_account_id: selectedBank, amount, type: "partial" };

      const res = await makeRequest(
        "/api/v1/investment/withdraw/",
        "POST",
        payload
      );

      toast.success(
        type === "full"
          ? "Full withdrawal successful!"
          : "Partial withdrawal successful!"
      );

      onClose();
    } catch (e: any) {
      toast.error(e?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Withdraw Funds</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <label className="block text-sm mb-1">Bank Account</label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.bank_name} - {bank.account_number}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1">Amount (optional for full)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
        />

        <button
          disabled={loading}
          onClick={() => handleWithdraw("partial")}
          className="w-full bg-[#012638] text-white py-2 rounded-lg mb-3"
        >
          {loading ? "Processing..." : "Withdraw Partial Amount"}
        </button>

        <button
          disabled={loading}
          onClick={() => handleWithdraw("full")}
          className="w-full bg-red-600 text-white py-2 rounded-lg"
        >
          {loading ? "Processing..." : "Withdraw Full Amount"}
        </button>
      </div>
    </div>
  );
}
