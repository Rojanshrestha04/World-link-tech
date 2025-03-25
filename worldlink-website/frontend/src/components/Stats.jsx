import React from "react";
import { FaUserCheck, FaUsers, FaCertificate, FaTools } from "react-icons/fa";

const Stats = () => {
  const statsData = [
    { icon: <FaUserCheck size={40} />, number: "713,246", label: "Applied" }, // Icon for user applications
    { icon: <FaUsers size={40} />, number: "673,441", label: "Appeared" }, // Icon for group participation
    { icon: <FaCertificate size={40} />, number: "489,117", label: "Certified" }, // Icon for certifications
    { icon: <FaTools size={40} />, number: "314", label: "Skill Standards" }, // Icon for tools/skills
  ];

  return (
    <div className="my-12 mx-auto max-w-7xl p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border-b border-r border-gray-300 last:border-r-0 md:last:border-b-0 bg-blue-600 text-white"
          >
            <div className="mb-4">{stat.icon}</div>
            <h2 className="text-4xl font-extrabold">{stat.number}</h2>
            <span className="text-lg mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;