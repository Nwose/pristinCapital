"use client";

import React, { useState } from "react";

import MaturityTable from "./MaturityTable";
import PlanManagementTable from "./PlanMangementTable";
import CreateEditPlanForm from "./CreateEditplanForm";
import InterestCalculator from "./InterestCalculator";
import UserInvestmentsTable from "./userInvestmentsTable";

export default function InvestmentManagement() {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    const formSection = document.getElementById("plan-form");
    if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="space-y-10 max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Plan Management
        </h2>
        <button className="bg-teal-500 text-white px-5 py-2 rounded-md text-sm hover:bg-teal-600">
          Create Plan
        </button>
      </div>

      {/* Plan Management Section */}
      <PlanManagementTable onEdit={handleEditPlan} />

      {/* Create / Edit Form */}
      <div id="plan-form">
        <CreateEditPlanForm
          selectedPlan={selectedPlan}
          onClear={() => setSelectedPlan(null)}
        />
      </div>

      {/* Other Sections */}
      <InterestCalculator />
      <UserInvestmentsTable />
      <MaturityTable />
    </section>
  );
}
