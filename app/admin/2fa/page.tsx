// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Admin2FA() {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [tfaToken, setTfaToken] = useState("");

//   // 🔹 Load tfa_token from localStorage
//   useEffect(() => {
//     const storedToken = localStorage.getItem("tfa_token");
//     if (!storedToken) {
//       toast.error("No 2FA session found. Please login again.");
//       setTimeout(() => (window.location.href = "/admin/login"), 1500);
//       return;
//     }
//     setTfaToken(storedToken);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!tfaToken) {
//       toast.error("Missing temporary token. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://pristin-asxu.onrender.com/api/v1/login/token/2stfactor/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             tfa_token: tfaToken,
//             otp: otp,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.detail || "Invalid OTP");

//       // ✅ Save the final access token
//       if (data.access || data.access_token) {
//         localStorage.setItem("access_token", data.access || data.access_token);
//         toast.success("2FA verification successful!");
//         setTimeout(() => (window.location.href = "/admin/dashboard"), 1500);
//       } else {
//         throw new Error("Unexpected response from server.");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center px-4 py-8">
//       <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
//       <div className="bg-teal-200/50 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-2xl">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Image
//             src="/images/logo_d.png"
//             alt="Pristin Capital"
//             width={60}
//             height={60}
//             className="mx-auto mb-4"
//           />
//         </div>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-slate-800 text-2xl font-bold">
//             Two-Factor Authentication
//           </h1>
//           <p className="text-slate-700 text-sm mt-2">
//             Enter the OTP sent to your registered email or authenticator app.
//           </p>
//         </div>

//         {/* OTP Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="otp"
//               className="block text-slate-700 font-medium mb-2"
//             >
//               2FA Code
//             </label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter your 6-digit code"
//               className="w-full px-4 py-3 bg-teal-300/50 border-none rounded-lg placeholder-slate-600 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors mt-6"
//           >
//             {loading ? "Verifying..." : "Verify 2FA"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin2FA() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tfa_token = localStorage.getItem("tfa_token");
    if (!tfa_token) {
      toast.error("Missing temporary token. Please log in again.");
      return;
    }

    try {
      const res = await fetch(
        "https://pristin-asxu.onrender.com/api/v1/login/token/2stfactor/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tfa_token, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Invalid OTP");

      localStorage.setItem("access_token", data.access);
      toast.success("2FA verification successful!");
      setTimeout(() => (window.location.href = "/admin/dashboard"), 1500);
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const tfa_token = localStorage.getItem("tfa_token");
    if (!tfa_token) {
      toast.error("Missing temporary token. Please log in again.");
      return;
    }

    setResending(true);
    try {
      const res = await fetch(
        "https://pristin-asxu.onrender.com/api/v1/login/token/resend/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tfa_token }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to resend OTP");

      toast.success("OTP resent successfully! Check your email.");
    } catch (err: any) {
      toast.error(err.message || "Could not resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
      <div className="bg-teal-200/50 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <Image
            src="/images/logo_d.png"
            alt="Pristin Capital"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-slate-800 text-2xl font-bold">Enter 2FA Code</h1>
          <p className="text-slate-700 text-sm mt-2">
            Check your email or authenticator app for the code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 bg-teal-300/50 border-none rounded-lg placeholder-slate-600 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors mt-6"
          >
            {loading ? "Verifying..." : "Verify 2FA"}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-sm underline text-slate-800 hover:text-slate-900"
          >
            {resending ? "Resending OTP..." : "Resend OTP"}
          </button>

          <div>
            <button
              type="button"
              onClick={() => (window.location.href = "/admin/login")}
              className="text-sm underline text-slate-700 hover:text-slate-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
