"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddBankModal from "@/components/banks/AddBankModal";
import {
  getUserWallets,
  getUserBanks,
  withdrawFunds,
  fundWallet,
  addBankAccount,
  getAllBanks,
} from "@/services/wallet.service";
import WalletService, {
  Wallet, 
  WalletList
} from "@/lib/api/services/Wallet.Service";
import BankService, {
  BankAccount,
  BankAccountList,
  SuppportedBankList,
} from "@/lib/api/services/Bank.Service";
import { useAuth } from "@/lib/api/auth/authContext";
import { toast } from "react-toastify";

export default function WalletPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"fund" | "withdraw">("fund");

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [banks, setBanks] = useState<BankAccountList>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Modal state
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newBankCode, setNewBankCode] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [addingBank, setAddingBank] = useState(false);

  // Load wallet + banks on mount
  useEffect(() => {
    loadWalletData();
  }, []);
  const loadMyBanks = ()=>{
    BankService.getBanks().then((banks)=>{
      if (banks){
        setBanks(banks);
      }
    })
  }
  const loadWalletData = async () => {
    WalletService.getMainWallet().then((mainWallet)=>{
      if (mainWallet){
        setWallet(mainWallet);
      }
    })
    loadMyBanks();
    // try {
    //   setLoading(true);
    //   const wallets = await getUserWallets();
    //   const userBanks = await getUserBanks();
    //   setWallet(wallets[0] || null);
    //   setBanks(userBanks);
    //   if (userBanks.length > 0) {
    //     setSelectedBank(userBanks[0].id);
    //   }
    // } catch (error: any) {
    //   console.error("Error loading wallet:", error);
    //   toast.error("Failed to load wallet info.");
    // } finally {
    //   setLoading(false);
    // }
  };

  // 🔹 Fund wallet
  const handleFundWallet = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.warn("Enter a valid amount.");
      return;
    }
    try {
      setLoading(true);
      await fundWallet({
        amount: Number(amount),
        payment_method: "bank_transfer",
      });
      toast.success("Wallet funding initiated successfully!");
      setAmount("");
      loadWalletData();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fund wallet.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Withdraw funds
  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      toast.warn("Enter a valid amount.");
      return;
    }
    if (!selectedBank) {
      toast.warn("Please select a bank to withdraw to.");
      return;
    }

    try {
      setLoading(true);
      await withdrawFunds({
        amount: Number(withdrawAmount),
        bank_account_id: selectedBank,
      });
      toast.success("Withdrawal request submitted!");
      setWithdrawAmount("");
      loadWalletData();
    } catch (error: any) {
      console.error("Withdraw failed:", error);
      toast.error("Failed to withdraw funds.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add bank account
  const handleAddBank = async () => {
    if (!newBankCode || !newAccountNumber) {
      toast.warn("Enter both bank and account number.");
      return;
    }
    try {
      setAddingBank(true);
      await addBankAccount({
        bank_code: newBankCode,
        account_number: newAccountNumber,
      });
      toast.success("Bank added successfully!");
      setShowAddBankModal(false);
      setNewBankCode("");
      setNewAccountNumber("");
      loadWalletData();
    } catch (error) {
      console.error("Error adding bank:", error);
      toast.error("Failed to add bank.");
    } finally {
      setAddingBank(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-white rounded-lg border border-[#CCEAE9] p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <div className="text-gray-500 text-sm mb-1">Wallet Balance</div>
          <div className="text-2xl font-bold text-[#001B2E]">
            ₦{wallet ? Number(wallet.balance).toLocaleString() : "0.00"}
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            className={`px-6 py-2 rounded font-medium transition-colors ${
              tab === "fund"
                ? "bg-[#001B2E] text-white"
                : "bg-[#CCEAE9] text-[#001B2E]"
            }`}
            onClick={() => setTab("fund")}
          >
            Fund Wallet
          </button>
          <button
            className={`px-6 py-2 rounded font-medium transition-colors ${
              tab === "withdraw"
                ? "bg-[#001B2E] text-white"
                : "bg-[#CCEAE9] text-[#001B2E]"
            }`}
            onClick={() => setTab("withdraw")}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-[#CCEAE9] p-8 shadow-sm flex flex-col md:flex-row gap-8">
        {/* Fund Wallet */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Fund Wallet</h2>
          <div className="bg-white border border-[#E5ECEC] rounded-xl p-6 mb-0">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 text-base font-medium">
                Payment Method
              </span>
              <button
                onClick={() =>
                  router.push("/dashboard/wallet/transaction-history")
                }
                className="text-[#019893] text-base font-medium hover:underline"
              >
                Transaction History
              </button>
            </div>
            <button className="flex items-center gap-2 border border-[#CCEAE9] rounded-lg px-4 py-3 mb-6 bg-white text-[#001B2E] font-semibold text-lg">
              Bank Transfer
            </button>

            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-[#CCEAE9] rounded-lg px-4 py-3 bg-[#F6F8FA] text-base focus:outline-none focus:ring-2 focus:ring-[#CCEAE9]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              onClick={handleFundWallet}
              className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#019893] transition-colors disabled:opacity-60"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>

        {/* Withdraw Funds */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Withdraw Funds</h2>
          <div className="bg-white border border-[#E5ECEC] rounded-xl p-6">
            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-[#CCEAE9] rounded-lg px-4 py-3 bg-[#F6F8FA] text-base focus:outline-none focus:ring-2 focus:ring-[#CCEAE9]"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 text-base mb-2">
                Withdraw To:
              </label>
              {banks.length === 0 ? (
                <div className="bg-[#CDEBEB] p-3 rounded-lg text-[#001B2E]">
                  <p className="text-sm">No bank accounts linked yet.</p>
                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className="mt-2 bg-[#019893] text-white px-4 py-2 rounded-md text-sm"
                  >
                    + Add Bank
                  </button>
                </div>
              ) : (
                <>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full border border-[#CCEAE9] rounded-lg px-4 py-3 bg-[#F6F8FA] text-base focus:outline-none focus:ring-2 focus:ring-[#CCEAE9]"
                  >
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bank_name} - {bank.account_number} / {bank.account_name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className="mt-3 text-[#019893] font-medium hover:underline text-sm"
                  >
                    + Add another bank
                  </button>
                </>
              )}
            </div>

            <button
              disabled={loading}
              onClick={handleWithdraw}
              className="w-full bg-[#012638] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#019893] transition-colors disabled:opacity-60"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>
      </div>

      {/* Add Bank Modal */}
      {showAddBankModal && (
        <AddBankModal 
          setShowAddBankModal={setShowAddBankModal}
          onBankAdded={()=>{
            loadMyBanks();
          }}
        />
      )}
    </div>
  );
}
