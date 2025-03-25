import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Contact Info Section */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-4 shadow-lg rounded-lg bg-white">
          <FaMapMarkerAlt className="text-blue-600 text-3xl mx-auto mb-2" />
          <h3 className="font-bold text-lg">Address</h3>
          <p>R R Building, Kathmandu, Nepal</p>
        </div>
        <div className="p-4 shadow-lg rounded-lg bg-white">
          <FaPhoneAlt className="text-blue-600 text-3xl mx-auto mb-2" />
          <h3 className="font-bold text-lg">Contact Address</h3>
          <p>Mobile: 9851154054, 9841170700</p>
          <p>Tel: 01-6633544, 01-6635806</p>
        </div>
        <div className="p-4 shadow-lg rounded-lg bg-white">
          <FaEnvelope className="text-blue-600 text-3xl mx-auto mb-2" />
          <h3 className="font-bold text-lg">Email Address</h3>
          <p>Email: info@worldlink.org</p>
        </div>
      </div>

      {/* Google Map */}
      {/* <div className="my-6">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.060948470047!2d85.3253063!3d27.71540439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19aba82b2443%3A0x7e9413d8ea9e5541!2sWorldLink%20Communications%20Ltd.!5e0!3m2!1sen!2snp!4v1742364094758!5m2!1sen!2snp"
          className="w-full h-64 rounded-lg shadow-lg">
          allowFullScreen
        </iframe>
      </div> */}
      <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d441.4221395802619!2d85.314502!3d27.736512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19276dac2185%3A0x4800dee085861da6!2sWorld%20Link%20Technical%20Training%20Institute%20P.%20Ltd!5e0!3m2!1sen!2sus!4v1742709599967!5m2!1sen!2sus" 
      className="w-full h-64 rounded-lg shadow-lg"
      allowFullScreen>
      </iframe>

      {/* Contact Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start">

  {/* Form Section - 2/3 Width */}
  <div className="w-full md:w-2/3 p-6">
    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
    <form>
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Name" className="border p-2 w-full rounded-lg" required />
        <input type="email" placeholder="Email" className="border p-2 w-full rounded-lg" required />
      </div>
      <input type="text" placeholder="Phone" className="border p-2 w-full rounded-lg my-4" required />
      <textarea placeholder="Message" className="border p-2 w-full rounded-lg" rows="4" required></textarea>
      <div className="flex items-center space-x-2 my-2">
        <input type="checkbox" />
        <span>I'm not a robot</span>
      </div>
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Submit</button>
    </form>
  </div>

    {/* Image Section - 1/3 Width */}
    <div className="w-full md:w-1/3 flex justify-center items-center p-4">
    <img 
      src="your-image-url.jpg" 
      alt="Contact Illustration" 
      className="w-full h-full object-cover rounded-lg shadow-md"
    />
  </div>
</div>


      {/* Footer Section */}
      <div className="mt-6 bg-blue-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold">Worldlink</h3>
        <p>R R Building, Kathmandu, Nepal</p>
        <p>Tel: 01-6633544, 01-6635806</p>
        <p>Email: info@worldlink.org</p>
        <div className="mt-4">
          <h4 className="font-bold">Important Links</h4>
          <ul className="list-disc pl-5">
            <li>Ministry of Education, Science & Technology</li>
            <li>National Examinations Board</li>
            <li>Council for Technical Education & Vocational Training</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
