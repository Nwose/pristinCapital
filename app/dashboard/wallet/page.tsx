"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddBankModal from "@/components/banks/AddBankModal";
import WalletService, { Wallet } from "@/lib/api/services/Wallet.Service";
import BankService, { BankAccount, BankAccountList } from "@/lib/api/services/Bank.Service";
import { useAuth } from "@/lib/api/auth/authContext";
import { toast } from "react-toastify";
import { Check, Copy, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function WalletPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [tab, setTab] = useState<"fund" | "withdraw">("fund");

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [banks, setBanks] = useState<BankAccountList>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Modal state
  const [showAddBankModal, setShowAddBankModal] = useState(false);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadMyBanks = () => {
    BankService.getBanks().then((banks) => {
      if (banks) {
        setBanks(banks);
        if (banks.length > 0 && !selectedBank) {
          setSelectedBank(banks[0].id);
        }
      }
    });
  };

  const loadWalletData = async () => {
    try {
      const mainWallet = await WalletService.getMainWallet();
      if (mainWallet) {
        setWallet(mainWallet);
      }
      loadMyBanks();
    } catch (error) {
      toast.error("Failed to load wallet data");
    }
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const formatAmountFeedback = (amount: string) => {
    const num = Number(amount.replace(/,/g, ""));
    if (isNaN(num) || num === 0) return "";
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)} Million Naira`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)} Thousand Naira`;
    } else if (num >= 100) {
      return `${num.toLocaleString()} Naira`;
    }
    return `${num.toLocaleString()} Naira`;
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, "");
    setWithdrawAmount(cleaned);
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount.replace(/,/g, ""));
    
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      toast.warn("Enter a valid amount.");
      return;
    }

    if (wallet && amount > Number(wallet.balance)) {
      toast.error("Insufficient balance");
      return;
    }

    if (!selectedBank) {
      toast.warn("Please select a bank account.");
      return;
    }

    if (!password) {
      toast.warn("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      await WalletService.withdraw({
        amount: withdrawAmount,
        dest_bank_id: selectedBank,
        password: password,
      });
      toast.success("Withdrawal successful!");
      setWithdrawAmount("");
      setPassword("");
      loadWalletData();
    } catch (error: any) {
      console.error("Withdraw failed:", error);
      const errorMessage = error?.response?.data?.message || "Failed to withdraw funds.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formattedBalance = wallet ? Number(wallet.balance).toLocaleString() : "0.00";
  const amountFeedback = formatAmountFeedback(withdrawAmount);
  const numericAmount = Number(withdrawAmount.replace(/,/g, ""));

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-[#012638] to-[#019893] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-white/80 text-sm mb-2 flex items-center gap-2">
              <span>Available Balance</span>
              {wallet?.status === "active" && (
                <span className="px-2 py-0.5 bg-green-500/20 rounded-full text-xs">Active</span>
              )}
            </div>
            <div className="text-4xl font-bold mb-2">₦{formattedBalance}</div>
            <button
              onClick={() => router.push("/dashboard/wallet/transaction-history")}
              className="text-sm text-white/90 hover:text-white flex items-center gap-1 mt-2"
            >
              View Transaction History
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                tab === "fund"
                  ? "bg-white text-[#012638] shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setTab("fund")}
            >
              <ArrowDownLeft className="w-4 h-4" />
              Fund Wallet
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                tab === "withdraw"
                  ? "bg-white text-[#012638] shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setTab("withdraw")}
            >
              <ArrowUpRight className="w-4 h-4" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-[#CCEAE9] shadow-sm overflow-hidden">
        {tab === "fund" ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#012638]">Fund Your Wallet</h2>
            
            {/* DVA Account Details */}
            {user?.paystack_dva_account_number && (
              <div className="bg-gradient-to-br from-[#F6F8FA] to-[#CCEAE9]/30 rounded-xl p-6 border-2 border-[#CCEAE9] mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#012638] mb-1">
                      Your Dedicated Account
                    </h3>
                    <p className="text-sm text-gray-600">
                      Transfer to this account to fund your wallet instantly
                    </p>
                  </div>
                  <div className="bg-[#019893]/10 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#019893]">
                      {user.paystack_dva_bank_name}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Account Number */}
                  <div className="bg-white rounded-lg p-4 border border-[#CCEAE9]">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Account Number
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#012638] tracking-wider">
                        {user.paystack_dva_account_number}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(user.paystack_dva_account_number!, "Account Number")
                        }
                        className="p-2 hover:bg-[#CCEAE9] rounded-lg transition-colors"
                      >
                        {copiedField === "Account Number" ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-[#019893]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Name */}
                  <div className="bg-white rounded-lg p-4 border border-[#CCEAE9]">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Account Name
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#012638]">
                        {user.paystack_dva_account_name}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(user.paystack_dva_account_name!, "Account Name")
                        }
                        className="p-2 hover:bg-[#CCEAE9] rounded-lg transition-colors"
                      >
                        {copiedField === "Account Name" ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-[#019893]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="bg-white rounded-lg p-4 border border-[#CCEAE9]">
                    <label className="text-xs text-gray-500 mb-1 block">Bank Name</label>
                    <span className="text-lg font-semibold text-[#012638]">
                      {user.paystack_dva_bank_name}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Instant Credit</p>
                    <p>
                      Transfers to this account are credited to your wallet instantly. Use
                      this account for all deposits.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#012638]">Withdraw Funds</h2>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Amount to Withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                    ₦
                  </span>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="w-full border-2 border-[#CCEAE9] rounded-xl pl-10 pr-4 py-4 bg-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#019893] focus:border-transparent transition-all"
                    value={withdrawAmount ? Number(withdrawAmount).toLocaleString() : ""}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                {amountFeedback && (
                  <p className="mt-2 text-sm text-[#019893] font-medium">{amountFeedback}</p>
                )}
                {wallet && numericAmount > Number(wallet.balance) && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Insufficient balance
                  </p>
                )}
              </div>

              {/* Bank Selection */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Withdraw To
                </label>
                {banks.length === 0 ? (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                    <p className="text-amber-800 font-semibold mb-2">
                      No Bank Account Linked
                    </p>
                    <p className="text-sm text-amber-700 mb-4">
                      Add a bank account to withdraw funds
                    </p>
                    <button
                      onClick={() => setShowAddBankModal(true)}
                      className="bg-[#019893] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#017a76] transition-colors"
                    >
                      + Add Bank Account
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full border-2 border-[#CCEAE9] rounded-xl px-4 py-4 bg-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#019893] focus:border-transparent"
                    >
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.bank_name} - {bank.account_number} ({bank.account_name})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowAddBankModal(true)}
                      className="mt-3 text-[#019893] font-semibold hover:underline text-sm flex items-center gap-1"
                    >
                      + Add Another Bank Account
                    </button>
                  </>
                )}
              </div>

              {/* Password Input */}
              {banks.length > 0 && (
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border-2 border-[#CCEAE9] rounded-xl px-4 py-4 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#019893] focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {/* Withdraw Button */}
              {banks.length > 0 && (
                <button
                  disabled={
                    loading ||
                    !withdrawAmount ||
                    !selectedBank ||
                    !password ||
                    numericAmount > Number(wallet?.balance || 0)
                  }
                  onClick={handleWithdraw}
                  className="w-full bg-[#012638] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#019893] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? "Processing Withdrawal..." : "Withdraw Funds"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Bank Modal */}
      {showAddBankModal && (
        <AddBankModal
          setShowAddBankModal={setShowAddBankModal}
          onBankAdded={() => {
            loadMyBanks();
          }}
        />
      )}
    </div>
  );
}