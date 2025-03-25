import React from "react";
import { Link } from "react-router-dom"; // Import for navigation
import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaSitemap, FaEnvelope } from "react-icons/fa";
import ThemeSelector from "./ThemeSelector"; // Import ThemeSelector component

const Header = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 text-sm py-2 border-b">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left: Site Map & Contact */}
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <FaSitemap />
              <span>Site Map</span>
            </div>
            <Link to="/support/contact" className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <FaEnvelope />
              <span>Contact Us</span>
            </Link>
            <div className="flex items-center space-x-1">
              <FaPhoneAlt />
              <span>01-6633544, 01-6635806</span>
            </div>
          </div>

          {/* Right: Location, Date & Theme Toggle */}
          <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-orange-500" />
              <span>R R Building, Kathmandu Nepal</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-orange-500" />
              <span>{currentDate}</span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
