import React from "react";

const MissionVision = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-4 md:mx-8 lg:mx-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Worldlink Technical Training Institute
        </h1>

        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed text-lg">
              WLTTI Pvt. Ltd. emerged with a mission to deliver an expertise and professional services and inputs in the field of innovative skill enhancement training keeping view on environment friendly infrastructure and social development for the enhancement of rural livelihoods. 
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-gray-300 w-full h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Mission Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Our Vision</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed text-lg">
              Environment friendly local and natural resources should be utilized to improve the livelihood and socio-economic activities of the people of the country. To improve the livelihood skill is most for which market oriented skill training either short term or long term shall go to the rural communities. With improved skills in hand rural population can work on their own that helps to enhance local economic activities, which subsequently improves rural livelihood.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-gray-300 w-full h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Vision Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed text-lg">
            <li>Integrity and transparency in all our actions.</li>
            <li>Commitment to innovation and continuous improvement.</li>
            <li>Customer-centric approach in everything we do.</li>
            <li>Fostering a culture of learning and growth.</li>
          </ul>
        </div>

        {/* Objectives Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Our Objectives</h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed text-lg">
            <li>To provide innovative and practical skill enhancement trainings to the unemployed population such that they become skilled or semi-skilled work force (agriculture, mason, carpenter, painter, etc.) in different discipline.</li>
            <li>To conduct trainings through the highly skilled trainers in electrification, house wiring, installation and maintenance of electrical and electronics devices,</li>
            <li>Provide trainings required for construction activities such as scaffolding, steel fixtures, welders, etc.</li>
            <li>Provide training and internship for electrical, mechanical, architecture, and civil diploma student.</li>
            <li>Infrastructure Analysis, feasibility studies, designs and conduct trainings related in the field of social development, infrastructure and other appropriate technology.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;