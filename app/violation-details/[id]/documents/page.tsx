"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";

interface Props {
  params: { id: string };
}

export default function KYCDocumentsPage({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Review KYC Submission
          </h1>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-10 text-sm font-medium">
          <button
            onClick={() => router.push(`/admin/kyc/violation-details/${id}`)}
            className="pb-3 text-gray-500 hover:text-gray-800"
          >
            User Details
          </button>
          <button className="pb-3 border-b-2 border-gray-900 text-gray-900">
            KYC Documents
          </button>
          <button
            onClick={() =>
              router.push(`/admin/kyc/violation-details/${id}/review-history`)
            }
            className="pb-3 text-gray-500 hover:text-gray-800"
          >
            Review History
          </button>
        </div>

        {/* KYC Documents Section */}
        <section className="bg-white shadow-md rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - User Info */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border">
                <Image
                  src="/images/avatar-placeholder.png"
                  alt="User Avatar"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  John Doe
                </h2>
                <p className="text-gray-500 text-sm">User ID: {id}</p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Status</span>
                  <select className="text-gray-800 font-medium bg-gray-100 px-3 py-1 rounded-md outline-none">
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Date Joined</span>
                  <span className="font-medium text-gray-800">2025-05-18</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Email</span>
                  <span className="font-medium text-gray-800">
                    johndoe@email.com
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Uploaded Documents */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Uploaded Documents
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "ID Front", type: "image" },
                  { title: "ID Back", type: "image" },
                  { title: "Proof of Address", type: "file" },
                  { title: "Selfie Verification", type: "image" },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:shadow-lg transition"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-3">
                      {doc.type === "image" ? (
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <FileText className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    <h4 className="text-gray-800 font-medium text-sm mb-2">
                      {doc.title}
                    </h4>

                    <button className="text-blue-600 text-sm font-medium hover:underline">
                      View Document
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
              Reject
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Approve
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
