"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function DepositsWithdrawals() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Chart Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Deposits/Withdrawals</h3>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-2xl font-bold text-gray-900">₦5,643,870</span>
              <span className="text-sm text-green-600 font-medium">+15%</span>
            </div>
            <span className="text-sm text-gray-500">Last 30 Days</span>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Check Full Analytics
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Simple Chart Representation */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center p-4">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path
              d="M 20 180 Q 50 120 80 140 Q 110 100 140 130 Q 170 90 200 110 Q 230 70 260 90 Q 290 50 320 70 Q 350 40 380 60"
              stroke="#14b8a6"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-sm"
            />
            <circle cx="20" cy="180" r="4" fill="#14b8a6" />
            <circle cx="80" cy="140" r="4" fill="#14b8a6" />
            <circle cx="140" cy="130" r="4" fill="#14b8a6" />
            <circle cx="200" cy="110" r="4" fill="#14b8a6" />
            <circle cx="260" cy="90" r="4" fill="#14b8a6" />
            <circle cx="320" cy="70" r="4" fill="#14b8a6" />
            <circle cx="380" cy="60" r="4" fill="#14b8a6" />
          </svg>
        </div>

        {/* Chart Labels */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>Jul 1</span>
          <span>Jul 8</span>
          <span>Jul 15</span>
          <span>Jul 22</span>
          <span>Jul 29</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
          Add User
        </button>
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
          Create Investment Plan
        </button>
      </div>
    </div>
  );
}
