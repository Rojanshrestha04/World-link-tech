import React from "react";

const Team = () => {
  const teamSections = {
    "Board of Directors": [
      {
        name: "John Doe",
        title: "CEO",
        contact: "john.doe@worldlink.com",
        image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Jane Smith",
        title: "CTO",
        contact: "jane.smith@worldlink.com",
        image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
      },
    ],
    Managers: [
      {
        name: "Emily Johnson",
        title: "Project Manager",
        contact: "emily.johnson@worldlink.com",
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
    ],
    Trainers: [
      {
        name: "Michael Brown",
        title: "Lead Trainer",
        contact: "michael.brown@worldlink.com",
        image: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
      },
    ],
    "Our Staff": [
      {
        name: "Sarah Wilson",
        title: "Support Staff",
        contact: "sarah.wilson@worldlink.com",
        image: "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg",
      },
      {
        name: "David Lee",
        title: "Technical Staff",
        contact: "david.lee@worldlink.com",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdR6J4ZZHHLYKDqG080errvMmq4YNlfwArEApQn-ncw&s&ec=72940543",
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-5">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
        Our Team
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Meet the dedicated professionals behind WorldLink.
      </p>
      {Object.keys(teamSections).map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            {section}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamSections[section].map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={`${member.name}'s profile`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2 text-center group-hover:text-gray-800 transition-colors duration-300">
                  {member.title}
                </p>
                <p className="text-gray-500 text-center group-hover:text-gray-700 transition-colors duration-300">
                  {member.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;