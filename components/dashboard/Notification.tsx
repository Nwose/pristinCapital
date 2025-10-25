"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCw, DollarSign, Shield } from "lucide-react";

type Category = "loan" | "investment" | "system";

type Notification = {
  id: string;
  title: string;
  message: string;
  category: Category;
  date: string;
  isRead: boolean;
};

const MOCK_DATA: Notification[] = [
  {
    id: "n1",
    title: "Investment Maturity",
    message:
      "Your Fixed Income Investment #INV-9412 has reached maturity. Please review your payout options.",
    category: "investment",
    date: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "n2",
    title: "System Alert",
    message:
      "We will be undergoing scheduled maintenance on 12 Jun 2025, 01:00–03:00 UTC. Some services may be unavailable.",
    category: "system",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n3",
    title: "Repayment Reminder",
    message:
      "Your next loan repayment for Loan #45231 is due on 30 May 2025. Please ensure sufficient balance.",
    category: "loan",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n4",
    title: "Document Required",
    message:
      "Please upload your proof of address document to complete verification for Investment #INV-9412.",
    category: "system",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

const formatDate = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86400000;
  if (diff < day) return "Today";
  if (diff < 2 * day) return "Yesterday";
  return `${Math.floor(diff / day)} days ago`;
};

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | Category>("all");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNotifications(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter((n) => n.category === activeTab);
  }, [notifications, activeTab]);

  const visible = filtered.slice(0, visibleCount);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#0F2A33]">
          Notifications Center
        </h1>
        <button
          onClick={markAllAsRead}
          className="text-sm text-[#009688] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#D7EEEA] p-6">
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["all", "loan", "investment", "system"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm rounded-md border ${
                activeTab === tab
                  ? "bg-[#E6F6F4] border-[#C7EDE9] text-[#0F2A33] font-medium"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab === "loan"
                ? "Loan Updates"
                : tab === "investment"
                ? "Investments"
                : "System"}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : visible.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            No notifications found
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 p-4 border rounded-lg ${
                  n.isRead
                    ? "border-gray-100 bg-white"
                    : "border-[#E3F4F1] bg-white"
                }`}
              >
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                  {n.category === "investment" ? (
                    <DollarSign size={20} className="text-[#0F9A86]" />
                  ) : n.category === "loan" ? (
                    <RefreshCw size={20} className="text-[#0F9A86]" />
                  ) : (
                    <Shield size={20} className="text-[#F6B83A]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-[#0F2A33]">
                      {n.title}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{n.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more */}
        {filtered.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 4)}
              className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
