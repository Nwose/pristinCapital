"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as auth from "@/services/auth";
import { interpretServerError } from "@/lib/utils";

export default function SignUp() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTermsTooltip, setShowTermsTooltip] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isEmailFilled = email.length > 0;

  const hasUpperAndLower = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 3;
  const isPasswordValid =
    hasUpperAndLower && hasNumber && hasSpecialChar && hasMinLength;

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isTermsChecked &&
    firstName &&
    lastName &&
    phoneNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiErrors([]);
    setSuccess(false);

    if (!isEmailFilled || !isEmailValid) {
      setShowEmailError(true);
      setTimeout(() => setShowEmailError(false), 3000);
    }

    if (!isPasswordValid) {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }

    if (!isTermsChecked) {
      setShowTermsTooltip(true);
      setTimeout(() => setShowTermsTooltip(false), 3000);
    }

    if (isFormValid) {
      setLoading(true);
      try {
        const response = await auth.register(
          email,
          password,
          firstName,
          lastName,
          phoneNumber
        );

        // please DO NOT put the password in the local storage
        localStorage.setItem(
          "last_registration_user",
          JSON.stringify({
            email,
            firstName,
            lastName,
            phoneNumber,
          })
        );

        const data = await response.json();

        if (response.ok) {
          const otpResponse = await auth.sendEmailOTP(email);

          if (otpResponse.ok) {
            setSuccess(true);
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setIsTermsChecked(false);
            router.push("/verify-email");
          } else {
            setApiErrors([
              "Failed to send verification email.",
              ...interpretServerError(await otpResponse.json()),
            ]);
          }
        } else {
          setApiErrors(interpretServerError(data) || ["Registration failed."]);
        }
      } catch (error) {
        setApiErrors(["Network Error. Please try again."]);
      } finally {
        setLoading(false);
      }
    }
  };

  const ValidationItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div className="flex items-center space-x-2 text-xs sm:text-sm">
      <div
        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
          isValid ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isValid ? (
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span
        className={`${
          isValid ? "text-green-600" : "text-red-500"
        } text-xs sm:text-sm`}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/loginImage.png')" }}
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

      <div className="w-full lg:w-2/3 flex flex-col bg-gray-50">
        <div className="flex justify-between lg:justify-end items-center p-4 lg:p-6 space-x-4 lg:space-x-8 bg-white shadow-sm">
          <div className="lg:hidden flex items-center">
            <Image
              src="/images/logo_1.png"
              alt="Pristin Capital Logo"
              width={100}
              height={30}
              className="max-w-xs"
              priority
            />
          </div>
          <div className="flex space-x-4 lg:space-x-8">
            <button className="text-gray-600 hover:text-teal-600 font-medium text-sm lg:text-base">
              About
            </button>
            <button className="text-gray-600 hover:text-teal-600 font-medium text-sm lg:text-base">
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
                  width={188}
                  height={58}
                  className="rounded-sm"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3">
                Welcome
              </h2>
              <p className="text-center text-gray-600 mb-8 lg:mb-10 text-sm sm:text-base">
                <span className="text-teal-600 cursor-pointer hover:underline font-medium">
                  Sign In
                </span>
                <span className="mx-2">or</span>
                <span className="text-teal-600 cursor-pointer hover:underline font-medium">
                  Create an account
                </span>
              </p>

              <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className={`w-full px-6 py-4 border rounded-lg bg-gray-50 focus:ring-2 focus:border-transparent outline-none ${
                        isEmailFilled && isEmailValid
                          ? "border-green-500 focus:ring-green-500"
                          : isEmailFilled && !isEmailValid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-teal-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className={`w-full px-6 py-4 border rounded-lg bg-gray-50 focus:ring-2 focus:border-transparent outline-none ${
                        isEmailFilled && isEmailValid
                          ? "border-green-500 focus:ring-green-500"
                          : isEmailFilled && !isEmailValid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-teal-500"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234 812 345 6789"
                    className={`w-full px-6 py-4 border rounded-lg bg-gray-50 focus:ring-2 focus:border-transparent outline-none ${
                      isEmailFilled && isEmailValid
                        ? "border-green-500 focus:ring-green-500"
                        : isEmailFilled && !isEmailValid
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-teal-500"
                    }`}
                  />
                </div>

                <div className="relative">
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className={`w-full px-6 py-4 border rounded-lg bg-gray-50 focus:ring-2 focus:border-transparent outline-none ${
                      isEmailFilled && isEmailValid
                        ? "border-green-500 focus:ring-green-500"
                        : isEmailFilled && !isEmailValid
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-teal-500"
                    }`}
                  />
                  {showEmailError && (
                    <div className="absolute -top-12 left-0 bg-red-500 text-white text-sm px-3 py-2 rounded-lg">
                      Please enter a valid email address
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-6 py-4 border rounded-lg bg-gray-50 focus:ring-2 focus:border-transparent outline-none ${
                        password && isPasswordValid
                          ? "border-green-500 focus:ring-green-500"
                          : password && !isPasswordValid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-teal-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <ValidationItem
                        isValid={hasUpperAndLower}
                        text="Capital + lowercase"
                      />
                      <ValidationItem isValid={hasNumber} text="Number" />
                      <ValidationItem
                        isValid={hasSpecialChar}
                        text="Special character"
                      />
                      <ValidationItem
                        isValid={hasMinLength}
                        text="Min 3 characters"
                      />
                    </div>
                  )}
                  {showPasswordError && (
                    <div className="absolute -top-12 left-0 bg-red-500 text-white text-sm px-3 py-2 rounded-lg">
                      Please complete all password requirements
                    </div>
                  )}
                </div>

                <div className="relative flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={isTermsChecked}
                    onChange={(e) => setIsTermsChecked(e.target.checked)}
                    className="mt-1.5 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label className="text-base text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <span className="text-teal-600 cursor-pointer hover:underline font-medium">
                      Terms and Conditions
                    </span>
                  </label>
                  {showTermsTooltip && (
                    <div className="absolute -top-12 left-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg">
                      To proceed, please accept Terms & Conditions
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-4 rounded-sm font-semibold text-lg shadow-lg ${
                    isFormValid && !loading
                      ? "bg-slate-800 hover:bg-slate-900 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {!!apiErrors.length &&
                  apiErrors.map((error, index) => (
                    <div className="text-center text-red-500 font-medium mt-2">
                      {error}
                    </div>
                  ))}
                {success && (
                  <div className="text-center text-green-600 font-medium mt-2">
                    Account created successfully!
                  </div>
                )}

                <div className="text-center text-gray-400 font-medium">or</div>
                <p className="text-center text-gray-600 text-base">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-teal-600 cursor-pointer hover:underline font-semibold"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

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
