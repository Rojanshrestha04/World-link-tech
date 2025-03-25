import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  return (
    <nav className="bg-blue-800 text-white py-2 relative z-50">
      <div className="container mx-auto flex justify-between">
        <ul className="flex space-x-4 relative">
          <li><Link to="/">Home</Link></li>
          <li className="relative" onMouseEnter={() => handleMouseEnter("about-worldlink")} onMouseLeave={handleMouseLeave}>
            <button className="focus:outline-none flex items-center">
              About WorldLink <FaChevronDown className="ml-2" />
            </button>
            {dropdown === "about-worldlink" && (
              <ul className="bg-blue-700 p-2 absolute top-full left-0 w-48 shadow-lg z-50">
                <li><Link to="/about-worldlink/introduction">Introduction</Link></li>
                <li><Link to="/about-worldlink/company-profile">Company Profile</Link></li>
                <li><Link to="/about-worldlink/mission-vision">Mission & Vision</Link></li>
                <li><Link to="/about-worldlink/team">Our Team</Link></li>
              </ul>
            )}
          </li>
          <li className="relative" onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave}>
            <button className="focus:outline-none flex items-center">
              Services <FaChevronDown className="ml-2" />
            </button>
            {dropdown === "services" && (
              <ul className="bg-blue-700 p-2 absolute top-full left-0 w-48 shadow-lg z-50">
                <li><Link to="/services/internet">Internet</Link></li>
                <li><Link to="/services/iptv">IPTV</Link></li>
                <li><Link to="/services/enterprise">Enterprise Solutions</Link></li>
              </ul>
            )}
          </li>
          <li className="relative" onMouseEnter={() => handleMouseEnter("training")} onMouseLeave={handleMouseLeave}>
            <button className="focus:outline-none flex items-center">
              Training Programs <FaChevronDown className="ml-2" />
            </button>
            {dropdown === "training" && (
              <ul className="bg-blue-700 p-2 absolute top-full left-0 w-48 shadow-lg z-50">
                <li><Link to="/training/technical">Technical Training</Link></li>
                <li><Link to="/training/certifications">Certifications</Link></li>
                <li><Link to="/training/internship">Internship Programs</Link></li>
              </ul>
            )}
          </li>
          <li className="relative" onMouseEnter={() => handleMouseEnter("support")} onMouseLeave={handleMouseLeave}>
            <button className="focus:outline-none flex items-center">
              Support <FaChevronDown className="ml-2" />
            </button>
            {dropdown === "support" && (
              <ul className="bg-blue-700 p-2 absolute top-full left-0 w-48 shadow-lg z-50">
                <li><Link to="/support/contact">Contact Support</Link></li>
                <li><Link to="/support/faqs">FAQs</Link></li>
                <li><Link to="/support/troubleshooting">Troubleshooting</Link></li>
              </ul>
            )}
          </li>
          <li className="relative" onMouseEnter={() => handleMouseEnter("resources")} onMouseLeave={handleMouseLeave}>
            <button className="focus:outline-none flex items-center">
              Resources <FaChevronDown className="ml-2" />
            </button>
            {dropdown === "resources" && (
              <ul className="bg-blue-700 p-2 absolute top-full left-0 w-48 shadow-lg z-50">
                <li><Link to="/resources/user-manuals">User Manuals</Link></li>
                <li><Link to="/resources/tutorials">Tutorials</Link></li>
                <li><Link to="/resources/policies">Policies</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/news-and-events">News & Events</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
