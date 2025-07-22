"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full">
      <div className="bg-white border border-[#CCEAE9] rounded-2xl p-10 w-full max-w-6xl mx-auto mt-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="border-r border-[#CCEAE9] pr-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#001B2E]">
              Personal Information
            </h2>
            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-1">Full Name</div>
              <div className="text-[#001B2E] font-medium">
                Samuel Blessing Daudu
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-1">Email</div>
              <a
                href="mailto:Samuel@thehiveincubator.com"
                className="text-[#001B2E] underline"
              >
                Samuel@thehiveincubator.com
              </a>
            </div>
            <div className="mb-6">
              <div className="text-gray-500 text-sm mb-1">Phone Number</div>
              <div className="text-[#001B2E] font-medium">+234-7032022287</div>
            </div>
            <button className="bg-[#012638] text-white px-6 py-2 rounded font-semibold text-base">
              Update Information
            </button>
          </div>

          {/* Notifications */}
          <div className="border-r border-[#CCEAE9] px-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#001B2E]">
              Notifications
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                  className="form-checkbox w-5 h-5 text-[#019893] border-[#CCEAE9] rounded"
                />
                <span className="text-[#001B2E] text-base">
                  Receive email notifications
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={() => setSmsNotif(!smsNotif)}
                  className="form-checkbox w-5 h-5 text-[#019893] border-[#CCEAE9] rounded"
                />
                <span className="text-[#001B2E] text-base">
                  Receive SMS notifications
                </span>
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="pl-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#001B2E]">
              Security
            </h2>
            <div className="flex flex-col gap-4">
              <button className="text-[#001B2E] text-base text-left hover:underline">
                Change Password
              </button>
              <button className="text-[#001B2E] text-base text-left hover:underline">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full bg-[#F6F7FA] py-4 mt-8">
        <div className="text-center text-gray-400 text-base">
          © 2025 Fintech Dashboard
        </div>
      </div>
    </div>
  );
}
