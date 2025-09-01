"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
    // Redirect to admin dashboard
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center px-4 py-8">
      <div className="bg-teal-200/50 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo_d.png"
            alt="Pristin Capital"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-slate-800 text-2xl font-bold">
            Create Account
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-slate-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="dadudusamuel2000@gmail.com"
              className="w-full px-4 py-3 bg-teal-300/50 border-none rounded-lg placeholder-slate-600 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-slate-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Samuel2025"
              className="w-full px-4 py-3 bg-teal-300/50 border-none rounded-lg placeholder-slate-600 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-slate-800 bg-transparent border-2 border-slate-600 rounded focus:ring-slate-800 focus:ring-2"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-700">
                Remember me
              </label>
            </div>
            <Link href="/admin/forgot-password" className="text-sm text-slate-700 hover:text-slate-800 underline">
              Forgotten Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors mt-6"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-slate-700 text-sm">
            Don't have an account?{" "}
            <Link href="/admin/signup" className="underline hover:text-slate-800 font-medium">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
