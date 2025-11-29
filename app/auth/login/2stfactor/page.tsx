"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-toastify/dist/components/ToastContainer";
import { toast as toastFn } from "react-toastify";
import OtpVerifier, { OtpResult } from "@/components/auth/OTPVerifier";
import { api } from "@/lib/api/ApiClient"; // adjust as needed
import { BackendRoutes } from "@/lib/api/BackendRoutes"; // adjust as needed

const DEFAULT_TIMER = 59;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("last_registration_user") : null;
      const parsed = stored ? JSON.parse(stored) : null;
      setEmail(parsed?.email ?? null);

      // Note: we don't auto-send here; OtpVerifier can auto-send via autoSendOnMount if you want.
    } catch (err) {
      console.warn("Failed reading last_registration_user", err);
      setEmail(null);
    }
  }, []);

  // Handler to call backend — using new api client
  const handleSend = async (): Promise<OtpResult> => {
    try {
      const last = typeof window !== "undefined" ? window.localStorage.getItem("last_registration_user") : null;
      const parsed = last ? JSON.parse(last) : null;
      const emailToSend = email || parsed?.email || "";

      if (!emailToSend) {
        toastFn.error("No email available to send OTP to.");
        return { ok: false };
      }

      // POST to backend route for sending email OTP (adjust route name in BackendRoutes)
      // If BackendRoutes.sendEmailOTP exists use it; else fall back to "/auth/send-email-otp"
      const route = (BackendRoutes && (BackendRoutes as any).sendEmailOTP) ?? "/auth/send-email-otp";
      const response = await api.post(route, { email: emailToSend });

      // axios style response: response.data
      const data = response?.data;
      if (response?.status >= 200 && response?.status < 300) {
        toastFn.success("Verification code sent to your email.");
        return { ok: true, data };
      } else {
        toastFn.error(data?.message || "Failed to send verification code.");
        return { ok: false, data };
      }
    } catch (err: any) {
      console.error("[VerifyEmail] send error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send verification code. Try again.";
      toastFn.error(String(msg));
      return { ok: false, data: err?.response?.data ?? err };
    }
  };

  // Handler to verify OTP
  const handleVerify = async (code: string): Promise<OtpResult> => {
    try {
      const last = typeof window !== "undefined" ? window.localStorage.getItem("last_registration_user") : null;
      const parsed = last ? JSON.parse(last) : null;
      const emailToVerify = email || parsed?.email || "";

      if (!emailToVerify) {
        return { ok: false, data: { message: "No email available to verify." } };
      }

      const route = (BackendRoutes && (BackendRoutes as any).verifyEmailOTP) ?? "/auth/verify-email-otp";
      const response = await api.post(route, { email: emailToVerify, code });

      const data = response?.data;

      if (response?.status >= 200 && response?.status < 300) {
        // success — return data so caller can decide next step
        return { ok: true, data };
      } else {
        return { ok: false, data };
      }
    } catch (err: any) {
      console.error("[VerifyEmail] verify error:", err);
      const data = err?.response?.data ?? err;
      return { ok: false, data };
    }
  };

  // onSuccess handler: same flow as your original code
  const onSuccess = (data?: any) => {
    const needsPhone = data?.need_phone_verification ?? data?.needs_phone_verification ?? false;

    if (needsPhone) {
      toastFn.success("Your email has been verified. Please verify your phone number.");
      setTimeout(() => router.push("/verify-phone"), 1200);
    } else {
      toastFn.success("Your email has been verified.");
      setTimeout(() => router.push("/login"), 1200);
    }

    // update last_registration_user in storage if present
    try {
      const last = typeof window !== "undefined" ? window.localStorage.getItem("last_registration_user") : null;
      if (last) {
        const parsed = JSON.parse(last);
        parsed.is_email_verified = true;
        window.localStorage.setItem("last_registration_user", JSON.stringify(parsed));
      }
    } catch (err) {
      // ignore storage errors
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left hero section kept minimal to preserve your UI */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/loginImage.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-[#012638]"></div>
        </div>
        <div className="relative z-20 flex flex-col justify-between pt-[12px] text-white w-full">
          <div className="flex items-center justify-center">
            <Image src="/images/logo_1.png" alt="Logo" width={200} height={60} priority />
          </div>
          <div className="flex-2 flex items-start justify-start pl-[27px] pt-8">
            <Image src="/images/loginFrame.png" alt="frame" width={184} height={278} priority />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-2/3 flex flex-col bg-gray-50">
        <div className="flex justify-between lg:justify-end items-center p-4 lg:p-6 space-x-4 lg:space-x-8 bg-white shadow-sm">
          <div className="lg:hidden flex items-center">
            <div className="rounded-sm flex items-center justify-center">
              <Image src="/images/logo_1.png" alt="Logo" width={100} height={30} priority />
            </div>
          </div>
          <div className="flex space-x-4 lg:space-x-8">
            <button className="text-gray-600 hover:text-teal-600 font-medium text-sm lg:text-base">About</button>
            <button className="text-gray-600 hover:text-teal-600 font-medium text-sm lg:text-base">Help</button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
              {/* Use the OtpVerifier component */}
              <OtpVerifier
                length={6}
                initialTarget={email}
                timeBeforeResend={DEFAULT_TIMER}
                autoSendOnMount={true}
                heading="Verify Your Email"
                description="We've sent a 6-digit verification code to your email address. Please check your inbox and enter the code."
                onResend={handleSend}
                onSubmit={handleVerify}
                onSuccess={onSuccess}
              />

              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-teal-600 hover:underline font-semibold">
                    Log in
                  </Link>
                </p>

                <div className="mt-4">
                  <Link href="/verify-phone" className="text-teal-600 hover:underline font-semibold">
                    Verify Phone
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-teal-600 py-4 sm:py-6 text-center shadow-xl">
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4">© 2025 FintechApp. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
