"use client";

import Image from "next/image";
import { useState } from "react";
import {
  loginFirstFactor,
  loginSecondFactor,
  send2FA_OTP,
} from "@/services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [tfaToken, setTfaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) return;

    setIsSubmitting(true);

    try {
      // ✅ loginFirstFactor already returns JSON
      const data = await loginFirstFactor(email, password);

      if (data?.tfa_token) {
        setTfaToken(data.tfa_token);

        // Auto-send 2FA OTP
        await send2FA_OTP(data.tfa_token);
      } else if (data?.access) {
        // Some backends skip 2FA in dev mode
        localStorage.setItem("access_token", data.access);
        window.location.href = "/dashboard";
      } else {
        setLoginError(data?.detail || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !tfaToken) return;

    setIsSubmitting(true);
    setLoginError("");

    try {
      const data = await loginSecondFactor(tfaToken, otp);

      if (data?.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        window.location.href = "/dashboard";
      } else {
        setLoginError(data?.detail || "Invalid or expired OTP");
      }
    } catch (error: any) {
      console.error("2FA verification error:", error);
      setLoginError(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (loginError) setLoginError("");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/loginImage.png')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 10%, #012638 100%)",
            }}
          ></div>
        </div>

        <div className="relative z-20 flex flex-col justify-between pt-[12px] text-white w-full">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo_1.png"
              alt="Pristin Capital Logo"
              width={200}
              height={60}
              className="max-w-xs"
              priority
            />
          </div>

          <div className="flex-2 flex items-start justify-start pl-[27px] pt-8">
            <Image
              src="/images/loginFrame.png"
              alt="Access. Loans. Grow Wealth. All in One App."
              width={184}
              height={278}
              className="max-w-sm"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-2/3 flex flex-col bg-gray-50">
        <div className="flex justify-between lg:justify-end items-center p-4 lg:p-6 space-x-4 lg:space-x-8 bg-white shadow-sm">
          <div className="lg:hidden flex items-center">
            <div className="rounded-sm flex items-center justify-center">
              <Image
                src="/images/logo_1.png"
                alt="Pristin Capital Logo"
                width={100}
                height={30}
                className="max-w-xs"
                priority
              />
            </div>
          </div>
          <div className="flex space-x-4 lg:space-x-8">
            <button className="text-gray-600 hover:text-teal-600 transition-colors font-medium text-sm lg:text-base">
              About
            </button>
            <button className="text-gray-600 hover:text-teal-600 transition-colors font-medium text-sm lg:text-base">
              Help
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
              <div className="flex justify-center mb-8">
                <Image
                  src="/images/logo_2.jpg"
                  alt="Pristin Capital Logo"
                  width={120}
                  height={40}
                  className="h-10"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3">
                {tfaToken ? "Two-Factor Authentication" : "Welcome Back"}
              </h2>

              <p className="text-center text-teal-600 mb-8 lg:mb-10 text-sm sm:text-base">
                {tfaToken
                  ? "Enter the OTP from your Authenticator App or email"
                  : "Sign up or log in to your account"}
              </p>

              {!tfaToken ? (
                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3"
                    >
                      Email or Phone Number
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Samuel@thehiveincubator.com"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-500 outline-none transition-all text-gray-700 placeholder-gray-400 bg-gray-50 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3"
                    >
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-lg focus:ring-2 focus:ring-teal-200 outline-none transition-all text-gray-700 bg-gray-50 text-sm sm:text-base ${
                        loginError
                          ? "border-red-500 focus:border-red-500"
                          : "border-teal-500 focus:border-teal-500"
                      }`}
                    />
                    {loginError && (
                      <p className="text-red-500 text-sm mt-2">{loginError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg transition-colors shadow-lg ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-500"
                        : "bg-slate-800 hover:bg-slate-900 text-white"
                    }`}
                  >
                    {isSubmitting ? "Logging In..." : "Log In"}
                  </button>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleVerifyOTP}>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-500 outline-none transition-all text-gray-700 bg-gray-50"
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-500 text-sm">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg transition-colors shadow-lg ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-500"
                        : "bg-slate-800 hover:bg-slate-900 text-white"
                    }`}
                  >
                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white text-teal-600 py-4 sm:py-6 text-center shadow-xl">
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4">
            © 2025 FintechApp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
