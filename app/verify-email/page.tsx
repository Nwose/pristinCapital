"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isExpired, setIsExpired] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isSuccess) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [timeLeft, isSuccess]);

  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setIsError(false); // Clear error when user starts typing

      // Auto-focus next input
      if (value && index < 3) {
        setCurrentInputIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        setCurrentInputIndex(index - 1);
      } else {
        setCurrentInputIndex(index);
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setCurrentInputIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle input focus
  const handleFocus = (index: number) => {
    setCurrentInputIndex(index);
  };

  // Check if OTP is complete
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpComplete && !isExpired && !isSubmitting) {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const otpCode = otp.join("");
      // For demo purposes, let's say correct OTP is "1234"
      if (otpCode === "1234") {
        setIsSuccess(true);
      } else {
        setIsError(true);
        setIsSubmitting(false);
      }
    }
  };

  // Handle continue from success screen
  const handleContinue = () => {
    console.log("Navigating to dashboard...");
    // Handle navigation to dashboard
  };

  // Handle resend code
  const handleResendCode = () => {
    setTimeLeft(59);
    setIsExpired(false);
    setOtp(["", "", "", ""]);
    setIsError(false);
    setCurrentInputIndex(0);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/loginImage.png')",
          }}
        >
          {/* Overlay with custom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 10%, #012638 100%)",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between pt-[12px] text-white w-full">
          {/* Logo */}
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

          {/* Main Content - Centered */}
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

      {/* Right Verification Section */}
      <div className="w-full lg:w-2/3 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex justify-between lg:justify-end items-center p-4 lg:p-6 space-x-4 lg:space-x-8 bg-white shadow-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center">
            <div className=" rounded-sm flex items-center justify-center">
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

        {/* Main Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
          <div className="w-full max-w-lg">
            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
              {!isSuccess ? (
                <>
                  {/* Email Icon */}
                  <div className="flex justify-center mb-8">
                    <Image
                      src="/images/email_icon.png"
                      alt="Email verification icon"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                    Verify Your Email
                  </h2>

                  <p className="text-center text-teal-600 mb-8 lg:mb-10 leading-relaxed text-sm sm:text-base px-2">
                    We've sent a 4-digit verification code to your email
                    address. Please check your inbox, then enter the code below
                    to continue.
                  </p>

                  <form
                    className="space-y-6 lg:space-y-8"
                    onSubmit={handleSubmit}
                  >
                    {/* OTP Input */}
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-4 sm:mb-6 text-center">
                        Enter OTP
                      </label>
                      <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={() => handleFocus(index)}
                            className={`w-12 h-12 sm:w-16 sm:h-16 border-2 rounded-lg text-center text-lg sm:text-2xl font-semibold text-gray-700 focus:outline-none transition-all ${
                              isError
                                ? "border-red-500 bg-red-50"
                                : currentInputIndex === index
                                ? "border-white bg-white shadow-lg ring-2 ring-teal-200"
                                : "border-teal-200 bg-teal-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                            }`}
                            maxLength={1}
                          />
                        ))}
                      </div>

                      {/* Error Message */}
                      {isError && (
                        <p className="text-center text-red-500 font-medium mb-4">
                          Incorrect
                        </p>
                      )}

                      {/* Countdown Timer */}
                      <p className="text-center text-gray-600 mb-8">
                        OTP expires in{" "}
                        <span
                          className={`font-semibold ${
                            timeLeft <= 10 ? "text-red-500" : "text-teal-600"
                          }`}
                        >
                          {timeLeft}
                        </span>{" "}
                        seconds
                      </p>
                    </div>

                    {/* Confirm Button */}
                    <button
                      type="submit"
                      disabled={!isOtpComplete || isExpired || isSubmitting}
                      className={`w-full py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg transition-colors shadow-lg ${
                        isOtpComplete && !isExpired && !isSubmitting
                          ? "bg-slate-800 hover:bg-slate-900 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? "Verifying..." : "Confirm"}
                    </button>

                    {/* Divider */}
                    <div className="text-center text-gray-400 font-medium text-sm sm:text-base">
                      or
                    </div>

                    {/* Resend / Login Link */}
                    <div className="text-center space-y-3">
                      {isExpired && (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="text-teal-600 cursor-pointer hover:underline font-semibold block w-full text-sm sm:text-base"
                        >
                          Resend Code
                        </button>
                      )}

                      <p className="text-gray-600 text-sm sm:text-base">
                        Already have an account?{" "}
                        <span className="text-teal-600 cursor-pointer hover:underline font-semibold">
                          Log in
                        </span>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Screen */
                <div className="text-center">
                  {/* Success Icon */}
                  <div className="flex justify-center mb-8">
                    <Image
                      src="/images/contact_icon.png"
                      alt="Success checkmark"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4 sm:mb-6 leading-tight px-2">
                    Your Account has been Successfully Created
                  </h2>

                  <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base px-2">
                    You can now Log In to your Dashboard with your email
                  </p>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg transition-colors shadow-lg"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white text-teal-600 py-4 sm:py-6 text-center shadow-xl">
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4">
            © 2025 FintechApp. All rights reserved.
          </p>
          <div className="flex justify-center space-x-3 sm:space-x-4">
            {/* Instagram */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <svg
                className="w-[16px] h-[16px] text-teal-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            {/* Help */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <svg
                className="w-[16px] h-[16px] text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <svg
                className="w-[16px] h-[16px] text-teal-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
