import React, { useState } from "react";
import backgroundImage from "../image/1.jpg";
import { useHistory } from "react-router-dom";
import Stats from "../components/Stats";
import OurPartners from "../components/OurPartners";
import NewsAndEvents from "../components/NewsAndEvents";
import Resources from "../pages/Resources/resources";
import logo from "../image/logo (2).png"; 

const Home = () => {
  const history = useHistory();

  const handleContactUsClick = () => {
    history.push("/contact-us");
  };

  const [showNotices, setShowNotices] = useState(false);

  const notices = [
    { date: "March 20, 2025", title: "System Maintenance on March 25" },
    { date: "March 18, 2025", title: "New Service Plans Available Now" },
    { date: "March 15, 2025", title: "Scheduled Downtime Notification" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
  {/* Background Image Section */}
  <div
    className="relative w-full flex items-end text-white text-right p-12"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "75vh",
    }}
  >
    <div className="absolute top-8 left-8 flex items-center space-x-4">
      {/* Company Logo */}
      <img
        src={logo}
        alt="Company Logo"
        className="w-16 h-16 object-contain"
      />
      {/* Company Name */}
      <h1 className="text-2xl font-bold text-white">
        WORLD LINK TECHNICAL TRAINING INSTITUTE
      </h1>
    </div>
    <div className="bg-white bg-opacity-50 p-6 rounded-lg max-w-md ml-auto">
      <h1 className="text-xl font-bold">Empowering Skills, Shaping Futures</h1>
      <p className="text-xs mt-2">Join us in building a skilled workforce for Nepal.</p>
    </div>
  </div>

      {/* Notice Section */}
      <div
        className="bg-blue-600 text-white py-4 px-6 text-center cursor-pointer hover:bg-blue-700"
        onClick={() => setShowNotices(!showNotices)}
      >
        <span className="font-semibold text-lg">📢 Notice: </span>
        <span>Click to view recent updates</span>

        {showNotices && (
          <div className="bg-white text-gray-800 mt-2 p-4 rounded-lg shadow-md text-left">
            <h3 className="text-lg font-bold border-b pb-2 mb-2">Recent Notices</h3>
            <ul>
              {notices.map((notice, index) => (
                <li key={index} className="py-2 border-b">
                  <strong>{notice.date}</strong> - {notice.title}
                </li>
              ))}
            </ul>
            {/* Read More Button */}
            <div className="text-center mt-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={() => history.push("/news-and-events")}
              >
                Read More →
              </button>
            </div>
          </div>
        )}
      </div>


      {/* About Section */}
      <section className="container mx-auto py-12 px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            We provide vocational training and certification to recognize and uplift skills across Nepal.
            Our mission is to create a competent workforce with industry-standard qualifications.
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => window.location.href = "/about"}
          >
            Read More
          </button>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrFZA3nEzxHsCENU37vLOu5WgMi9FmiAe_h2JyXSs1qg&s&ec=72940543"
            alt="About Us"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </section>

      
      {/* Stats Section */}
      <div>
        <Stats />
      </div>


      {/* New Video & Facebook Section */}
      <section className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "95vh",
              }}>
        {/* YouTube Video */}
        <div className="col-span-2 w-full h-[650px] md:h-[750px]">
          <iframe 
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/8ylJ1E2kEMg" 
          title="The Benefits of Vocational Training" 
          frameborder="0" 
          allowfullscreen>
          </iframe>
        </div>

        {/* Facebook Page Embed */}
        <div className="w-full h-[650px] md:h-[750px] bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us on Facebook</h2>
          <div className="overflow-hidden h-full">
            <iframe
              className="w-full h-full"
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/wltti&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              title="Facebook Page"
              frameBorder="0"
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </section>


      {/* News And Events Section */}
      <div>
        <NewsAndEvents />
      </div>


      {/* Resources Section */}
      <div>
        <Resources />
      </div>


      {/* Our Partners Section */}
      <div>
        <OurPartners />
      </div>

      {/* Contact Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-2">Have questions? Contact us for more information.</p>
        <button
          className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={handleContactUsClick}
        >
          Contact Us
        </button>
      </section>
      
    </div>
  );
};

export default Home;
