import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Folajomi",
    role: "CEO",
    avatar: "/images/t1.png",
    bgColor: "bg-white"
  },
  {
    id: 2,
    name: "Sophia Bennett",
    role: "CTO",
    avatar: "/images/t2.png",
    bgColor: "bg-orange-100"
  },
  {
    id: 3,
    name: "Uthur Solomon",
    role: "Head of Product",
    avatar: "/images/t3.png",
    bgColor: "bg-amber-100"
  },
  {
    id: 4,
    name: "Olivia Foster",
    role: "Head of Marketing",
    avatar: "/images/t4.png",
    bgColor: "bg-orange-100"
  },
  {
    id: 5,
    name: "Noah Clark",
    role: "Lead Engineer",
    avatar: "/images/t1.png",
    bgColor: "bg-amber-100"
  },
  {
    id: 6,
    name: "Ava Turner",
    role: "Customer Success Manager",
    avatar: "/images/t2.png",
    bgColor: "bg-green-100"
  }
];

export default function MeetTheTeam() {
  return (
    <section className="py-20 bg-[#cceae9]">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meet the Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              {/* Avatar */}
              <div className={`w-32 h-32 rounded-full ${member.bgColor} overflow-hidden mx-auto mb-4 flex items-center justify-center`}>
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Name and Role */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
