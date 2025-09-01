import React from "react";
import { CheckCircle, Eye, Users, Calendar } from "lucide-react";

export default function CoreValues() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals and businesses with innovative financial tools.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Eye className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To be the global leader in secure and accessible financial technology.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Values
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Trust, Innovation, Simplicity, Customer-Centricity
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Milestones
            </h3>
            <p className="text-gray-600 leading-relaxed">
              2018: Founded, 2020: Launched first product, 2022: Reached 1M users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
