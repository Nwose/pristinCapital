"use client";

import React, { useState, useEffect } from "react";

type PlanForm = {
  name: string;
  rate: string;
  tenure: string;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Inactive";
};

export default function CreateEditPlanForm({
  selectedPlan,
  onClear,
}: {
  selectedPlan: PlanForm | null;
  onClear: () => void;
}) {
  const [form, setForm] = useState<PlanForm>({
    name: "",
    rate: "",
    tenure: "",
    risk: "Low",
    status: "Active",
  });

  useEffect(() => {
    if (selectedPlan) setForm(selectedPlan);
  }, [selectedPlan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving plan:", form);
    onClear();
    setForm({ name: "", rate: "", tenure: "", risk: "Low", status: "Active" });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {selectedPlan ? "Edit Plan" : "Create New Plan"}
      </h3>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        {/* Plan Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Plan Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Growth Fund"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Rate */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Interest Rate (%)
          </label>
          <input
            type="text"
            name="rate"
            value={form.rate}
            onChange={handleChange}
            placeholder="e.g. 8.5"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Tenure */}
        <div>
          <label className="text-sm font-medium text-gray-700">Tenure</label>
          <input
            type="text"
            name="tenure"
            value={form.tenure}
            onChange={handleChange}
            placeholder="e.g. 12 months"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Risk Level */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Risk Level
          </label>
          <select
            name="risk"
            value={form.risk}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </form>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-teal-500 text-white px-5 py-2 rounded-md text-sm hover:bg-teal-600"
        >
          {selectedPlan ? "Update Plan" : "Save Plan"}
        </button>

        {selectedPlan && (
          <button
            type="button"
            onClick={onClear}
            className="border border-gray-300 px-5 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
