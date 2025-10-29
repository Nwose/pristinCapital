"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as auth from "@/services/auth";
import { toast } from 'react-toastify';

const TIME_BEFORE_RESEND = 45; // seconds

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(TIME_BEFORE_RESEND);
  const [isExpired, setIsExpired] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  let hasSentInitialOTP = false;

  // get email from signup (client-only)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("last_registration_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          // console.log("last_registration_user bro", parsed);
          setEmail(parsed?.email ?? null);
        }
      }
    } catch (e) {
      console.warn("Failed to read last_registration_user from localStorage", e);
      setEmail(null);
    }
    if (!hasSentInitialOTP) {
      handleResendCode();
      hasSentInitialOTP = true;
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isSuccess) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [timeLeft, isSuccess]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setIsError(false);

      if (value && index < 5) {
        setCurrentInputIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        setCurrentInputIndex(index - 1);
      } else {
        setCurrentInputIndex(index);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setCurrentInputIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setCurrentInputIndex(index);
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpComplete && !isExpired && !isSubmitting) {
      setIsSubmitting(true);

      const otpCode = otp.join("");

      try {
        const res = await auth.verifyEmailOTP(email || "", otpCode);

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          console.warn("No JSON response from server");
        }

        if (res.ok) {
          setIsSuccess(true);

          const needs_phone_verification = data.need_phone_verification;
          if (needs_phone_verification) {
            console.log("User needs phone verification, proceeding to phone verification page");
            toast.success('Your email has been verified. Please verify your phone number.');
            setTimeout(
              () => router.push("/verify-phone"),
              3000
            );
          } else {
            toast.success('Your email has been verified.');
            setTimeout(
              () => router.push("/login"),
              3000
            );
          }

        } else {
          setIsError(true);
          setIsSubmitting(false);
          console.warn("Verification failed:", data);
          // alert("data from server:" + JSON.stringify(data));
          // const isAlreadyVerified = String(data?.error)
          //   .toLowerCase()
          //   .includes("already verified");
          // if (isAlreadyVerified) {
          //   console.log("User already verified, proceeding to success state");
          //   setIsSuccess(true);
          // }
        }
      } catch (err) {
        console.error("Verification error:", err);
        setIsError(true);
        setIsSubmitting(false);
      }
    }
  };

  const handleContinue = () => {
    router.push("/verify-phone");
  };

  const handleResendCode = async () => {
    setTimeLeft(59);
    setIsExpired(false);
    setOtp(["", "", "", "", "", ""]);
    setIsError(false);
    setCurrentInputIndex(0);
    inputRefs.current[0]?.focus();

    const last_registration_user = window.localStorage.getItem("last_registration_user");
    const parsed = last_registration_user ? JSON.parse(last_registration_user) : null;

    const email_to_send = email || parsed?.email || "";

    try {
      const res = await auth.sendEmailOTP(email_to_send);
      const data = await res.json();
      if (res.ok) {
        console.log("Resend email OTP success:", data);
      } else {
        console.error("Resend email OTP failed:", data);
        if (data.error && data.error.includes("already verified")) {
          console.error("Resend failed because email is already verified");

          if (!last_registration_user) {
            toast.success('Your email has already been verified.');
            setTimeout(
              () => router.push("/login"),
              3000
            );
          }

          // check if there is a need for phone verification
          if (last_registration_user) {
            parsed.is_email_verified = true;
            window.localStorage.setItem("last_registration_user", JSON.stringify(parsed));

            const is_phone_number_verified = parsed.is_phone_number_verified;
            if (!is_phone_number_verified) {
              console.log("User needs phone verification, proceeding to phone verification page");
              toast.success('Your email has already been verified. Please verify your phone number.');
              setTimeout(
                () => router.push("/verify-phone"),
                3000
              );
            } else {
              toast.success('Your email has already been verified.');
              setTimeout(
                () => router.push("/login"),
                3000
              );
            }
          } else {
            toast.success('Your email has already been verified.');
            setTimeout(
              () => router.push("/login"),
              3000
            );
          }
        }
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Hero Section */}
      < div className="hidden lg:flex lg:w-1/3 relative overflow-hidden" >
        <div className="absolute inset-0 bg-[url('/images/loginImage.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-[#012638]"></div>
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
      </div >

      {/* Right Section */}
      < div className="w-full lg:w-2/3 flex flex-col bg-gray-50" >
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
              {!isSuccess ? (
                <>
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
                    We've sent a 6-digit verification code to your email
                    address. Please check your inbox, then enter the code below
                    to continue.
                  </p>

                  <form
                    className="space-y-6 lg:space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-4 sm:mb-6 text-center">
                        Enter OTP
                      </label>
                      <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
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
                            aria-label={`Email OTP digit ${index + 1}`}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            className={`w-10 h-12 sm:w-14 sm:h-14 border-2 rounded-lg text-center text-lg sm:text-xl font-semibold text-gray-700 focus:outline-none transition-all ${isError
                              ? "border-red-500 bg-red-50"
                              : currentInputIndex === index
                                ? "border-white bg-white shadow-lg ring-2 ring-teal-200"
                                : "border-teal-200 bg-teal-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                              }`}
                            maxLength={1}
                          />
                        ))}
                      </div>

                      {isError && (
                        <p className="text-center text-red-500 font-medium mb-4">
                          Incorrect OTP
                        </p>
                      )}

                      {
                        timeLeft > 0 && (
                          <p className="text-center text-gray-600 mb-8">
                            OTP expires in{" "}
                            <span
                              className={`font-semibold ${timeLeft <= 10 ? "text-red-500" : "text-teal-600"
                                }`}
                            >
                              {timeLeft}
                            </span>{" "}
                            seconds
                          </p>
                        )
                      }
                    </div>

                    <button
                      type="submit"
                      disabled={!isOtpComplete || isExpired || isSubmitting}
                      className={`w-full py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg shadow-lg ${isOtpComplete && !isExpired && !isSubmitting
                        ? "bg-slate-800 hover:bg-slate-900 text-white cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      {isSubmitting ? "Verifying..." : "Confirm"}
                    </button>

                    <div className="text-center text-gray-400 font-medium text-sm sm:text-base">
                      or
                    </div>

                    <div className="text-center space-y-3">
                      {isExpired && (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="text-teal-600 hover:underline font-semibold block w-full text-sm sm:text-base"
                        >
                          Resend Code
                        </button>
                      )}

                      <p className="text-gray-600 text-sm sm:text-base">
                        Already have an account?{" "}
                        <span className="text-teal-600 hover:underline font-semibold">
                          Log in
                        </span>
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <Link
                        href="/verify-phone"
                        className="text-teal-600 hover:underline font-semibold"
                      >
                        Verify Phone
                      </Link>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center">
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
                    Your email has been Successfully Verified
                  </h2>
                  <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base px-2">
                    You need to verify your phone number as well to continue.
                  </p>
                  <Link
                    href={"/verify-phone"}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg shadow-lg"
                  >
                    Verify Phone Number
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white text-teal-600 py-4 sm:py-6 text-center shadow-xl">
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4">
            © 2025 FintechApp. All rights reserved.
          </p>
        </div>
      </div >
    </div >
  );
}
