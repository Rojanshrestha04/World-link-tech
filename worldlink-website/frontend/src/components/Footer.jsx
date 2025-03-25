import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 text-sm">
      <div className="container mx-auto px-6 flex flex-wrap justify-between gap-4">
        {/* About Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold mb-2">About</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Organization</a></li>
            <li><a href="#" className="hover:underline">Career</a></li>
            <li><a href="#" className="hover:underline">Why WorldLink?</a></li>
            <li><a href="#" className="hover:underline">Calendar</a></li>
            <li><a href="#" className="hover:underline">Branch Locator</a></li>
          </ul>
        </div>
        
        {/* Updates Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold mb-2">Updates</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Blogs</a></li>
            <li><a href="#" className="hover:underline">News</a></li>
            <li><a href="#" className="hover:underline">Our Core Areas</a></li>
            <li><a href="#" className="hover:underline">Newsletter</a></li>
            <li><a href="#" className="hover:underline">Join our Affiliate Program</a></li>
          </ul>
        </div>
        
        {/* Quick Links Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">myWorldLink App</a></li>
            <li><a href="#" className="hover:underline">Renew my Internet</a></li>
            <li><a href="#" className="hover:underline">Refer Offer</a></li>
            <li><a href="#" className="hover:underline">Bank Accounts Detail</a></li>
          </ul>
        </div>
        
        {/* For Sales and Support Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold mb-2">For Sales and Support</h3>
          <p>📞 <a href="tel:+9779801523051" className="hover:underline">+977-9801523051 (Ncell)</a></p>
          <p>📞 <a href="tel:+977015970050" className="hover:underline">+977-01-5970050 (NTC)</a></p>
          <p>✉️ <a href="mailto:support@worldlink.com.np" className="hover:underline">support@worldlink.com.np</a></p>
        </div>
      </div>
      
      {/* Social Media Section */}
      <div className="container mx-auto px-6 text-center my-6">
        <h3 className="font-bold mb-2">Social Media</h3>
        <div className="flex justify-center space-x-3">
          <a href="https://www.facebook.com/worldlink" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /></a>
          <a href="https://www.instagram.com/worldlink" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>
          <a href="https://twitter.com/worldlink" target="_blank" rel="noopener noreferrer"><FaTwitter size={20} /></a>
          <a href="https://www.youtube.com/worldlink" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a>
          <a href="https://www.linkedin.com/company/worldlink" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className="text-center mt-4 border-t border-gray-400 pt-4">
        <p>&copy; 1996 to 2025 WorldLink Communications Ltd. All rights reserved. <a href="#" className="hover:underline">Terms & Conditions</a> | <a href="#" className="hover:underline">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;