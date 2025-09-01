import React from "react";
import { Shield, Settings, Layers, FileText } from "lucide-react";

export default function WhyTrustPristin() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Why Trust Pristin?
          </h2>
          <p className="text-xl text-gray-500">
            Built with security and reliability at its core
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Bank-Level Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-teal-600 mb-4">
              Bank-Level Security
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Advanced encryption and OTP-secured actions protect your financial data.
            </p>
          </div>

          {/* Automated Workflows */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-teal-600 mb-4">
              Automated Workflows
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Reduce human errors with intelligent automation and smart processes.
            </p>
          </div>

          {/* SME Scalability */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Layers className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-teal-600 mb-4">
              SME Scalability
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Built specifically for small and medium enterprises to scale efficiently.
            </p>
          </div>

          {/* Real-Time Insights */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-teal-600 mb-4">
              Real-Time Insights
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Access live data and comprehensive admin controls for informed decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
