// components/auth/OTPVerifier.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

export interface OtpResult {
  ok: boolean;
  data?: any;
}

export interface OtpVerifierProps {
  length?: number; // digits, default 6
  initialTarget?: string | null; // e.g. email or phone display
  timeBeforeResend?: number; // seconds, default 59
  autoSendOnMount?: boolean; // call onResend automatically on mount
  onSubmit: (code: string) => Promise<OtpResult>; // called when user submits code
  onResend: () => Promise<OtpResult | void>; // called to resend code
  heading?: string;
  description?: string;
  onSuccess?: (data?: any) => void; // called when a successful verification occurs
  className?: string;
}

export const OtpVerifier: React.FC<OtpVerifierProps> = ({
  length = 6,
  initialTarget = null,
  timeBeforeResend = 59,
  autoSendOnMount = false,
  onSubmit,
  onResend,
  heading = "Verify Code",
  description = "We've sent a verification code. Enter it below.",
  onSuccess,
  className,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timeLeft, setTimeLeft] = useState<number>(timeBeforeResend);
  const [isExpired, setIsExpired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  // Auto-send on mount if required
  useEffect(() => {
    if (autoSendOnMount) {
      handleResend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isSuccess) {
      const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(id);
    } else if (timeLeft <= 0) {
      setIsExpired(true);
    }
  }, [timeLeft, isSuccess]);

  const isOtpComplete = otp.every((d) => d !== "");

  const focusIndex = (index: number) => {
    setCurrentInputIndex(index);
    inputRefs.current[index]?.focus();
  };

  const handleOtpChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "").slice(0, 1);
    if (value === "" && otp[index] === "") {
      // nothing
      setOtp((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    setIsError(false);
    setServerMessage(null);

    if (value && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleFocus = (index: number) => {
    setCurrentInputIndex(index);
    inputRefs.current[index]?.select();
  };

  const resetInputsForResend = () => {
    setOtp(Array(length).fill(""));
    setIsError(false);
    setIsSuccess(false);
    setServerMessage(null);
    setCurrentInputIndex(0);
    inputRefs.current[0]?.focus();
  };

  const handleResend = async () => {
    try {
      setTimeLeft(timeBeforeResend);
      setIsExpired(false);
      resetInputsForResend();
      await onResend();
    } catch (err) {
      // onResend may return errors via thrown or via returned payload
      // We let the caller display toast/messages; nothing else to do here.
      // If onResend thrown, ignore here.
      // You can surface error by returning a structured payload from onResend.
      // Keep UI responsive.
      console.error("[OtpVerifier] resend failed:", err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (!isOtpComplete || isExpired || isSubmitting) return;

    setIsSubmitting(true);
    setIsError(false);
    setServerMessage(null);

    const code = otp.join("");

    try {
      const result = await onSubmit(code);

      if (result?.ok) {
        setIsSuccess(true);
        setIsError(false);
        setServerMessage(typeof result.data?.message === "string" ? result.data.message : null);
        if (onSuccess) onSuccess(result.data);
      } else {
        // treat as error
        setIsError(true);
        const fallback =
          result?.data?.message ||
          (typeof result?.data === "string" ? result.data : null) ||
          "Verification failed";
        setServerMessage(fallback);
      }
    } catch (err: any) {
      setIsError(true);
      // try to extract message
      const m =
        (err && (err.message || err?.response?.data?.message || err?.response?.data?.detail)) ||
        "Verification failed";
      setServerMessage(String(m));
      console.error("[OtpVerifier] submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render
  return (
    <div className={className}>
      <div className="flex justify-center mb-8">
        {/* Caller can pass a custom header/description; keep simple here */}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3">{heading}</h2>

      <p className="text-center text-teal-600 mb-8 lg:mb-10 text-sm sm:text-base px-2">
        {initialTarget ? (
          <>
            {description} <br />
            <strong className="text-gray-700">{initialTarget}</strong>
          </>
        ) : (
          description
        )}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-4 sm:mb-6 text-center">
            Enter OTP
          </label>

          <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            {Array.from({ length }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp[idx] ?? ""}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onFocus={() => handleFocus(idx)}
                aria-label={`OTP digit ${idx + 1}`}
                maxLength={1}
                className={`w-10 h-12 sm:w-14 sm:h-14 border-2 rounded-lg text-center text-lg sm:text-xl font-semibold text-gray-700 focus:outline-none transition-all ${
                  isError
                    ? "border-red-500 bg-red-50"
                    : currentInputIndex === idx
                    ? "border-white bg-white shadow-lg ring-2 ring-teal-200"
                    : "border-teal-200 bg-teal-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                }`}
              />
            ))}
          </div>

          {isError && serverMessage && (
            <p className="text-center text-red-500 font-medium mb-4">{serverMessage}</p>
          )}

          {isSuccess && serverMessage && (
            <p className="text-center text-green-600 font-medium mb-4">{serverMessage}</p>
          )}

          {timeLeft > 0 && !isSuccess && (
            <p className="text-center text-gray-600 mb-8">
              OTP expires in{" "}
              <span className={`font-semibold ${timeLeft <= 10 ? "text-red-500" : "text-teal-600"}`}>
                {timeLeft}
              </span>{" "}
              seconds
            </p>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={!isOtpComplete || isExpired || isSubmitting}
            className={`w-full py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg shadow-lg ${
              isOtpComplete && !isExpired && !isSubmitting
                ? "bg-slate-800 hover:bg-slate-900 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Confirm"}
          </button>

          <div className="text-center text-gray-400 font-medium text-sm sm:text-base">or</div>

          <div className="text-center space-y-3">
            {isExpired ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-teal-600 hover:underline font-semibold block w-full text-sm sm:text-base"
              >
                Resend Code
              </button>
            ) : (
              <div className="text-sm text-gray-500">You can resend when the timer expires</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpVerifier;
