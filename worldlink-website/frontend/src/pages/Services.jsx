import { useState, useEffect } from "react";

const images = [
  "/images/training1.jpg",
  "/images/training2.jpg",
  "/images/training3.jpg",
  "/images/training4.jpg"
];

const data = [
  { sector: "Electrical and Electronics", occupation: "Building Electrician Level 1 & 2" },
  { sector: "Electrical and Electronics", occupation: "Mobile Phone Repairer Level 1 & 2" },
  { sector: "Electrical and Electronics", occupation: "Industrial Electrician" },
  { sector: "Electrical and Electronics", occupation: "Telecom Technician" },
  { sector: "Electrical and Electronics", occupation: "Solar PV Technician" },
  { sector: "Construction", occupation: "Plumber" },
  { sector: "Construction", occupation: "Furniture Maker" },
  { sector: "Construction", occupation: "Mason" },
  { sector: "Construction", occupation: "Bar Bender/Steel Fixture" },
  { sector: "Construction", occupation: "Shuttering Carpenter" },
  { sector: "Construction", occupation: "Scaffolder" },
  { sector: "Construction", occupation: "Junior House Painter" },
  { sector: "Garment", occupation: "Tailor Master" },
  { sector: "Garment", occupation: "Tailor Level 2" },
  { sector: "Garment", occupation: "Hand Embroider" },
  { sector: "Education", occupation: "Montessorian" },
  { sector: "Health", occupation: "Assistant Beautician" },
  { sector: "Health", occupation: "Beautician Level 2" },
  { sector: "Hospitality", occupation: "General Cook" },
  { sector: "Hospitality", occupation: "Waiter/Waitress" },
  { sector: "Hospitality", occupation: "General Cook (Commis II) Level 2" },
  { sector: "Hospitality", occupation: "Commercial Cooking/Baking" },
  { sector: "Hospitality", occupation: "Room Attendant" },
  { sector: "Agriculture", occupation: "Off Season Vegetable Producer" },
  { sector: "Agriculture", occupation: "Community Livestock Assistant Technician Level 2" },
  { sector: "Mechanical", occupation: "Assistant Welder" },
  { sector: "Mechanical", occupation: "Aluminum Fabricator" },
  { sector: "Mechanical", occupation: "Aluminum Fabricator Level 2" }
];

export default function Services() {
  const [sector, setSector] = useState("All");
  const [search, setSearch] = useState("");

  const filteredData = data.filter(item =>
    (sector === "All" || item.sector === sector) &&
    item.occupation.toLowerCase().includes(search.toLowerCase())
  );

  const sectors = ["All", ...new Set(data.map(item => item.sector))];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-8 items-center">
      {/* Program Description */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Programs</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          World Link Technical Training Institute Pvt. Ltd. has been providing short-term training since its establishment in 2064 BS (2007 AD). 
          WLTTI is affiliated with CTEVT in 33 different occupations and focuses primarily on short-term (390 hours) training to cater to market demand. 
          Currently, WLTTI provides both center-based and mobile-based training ranging from 5 days to 10 months. Working with various donors and clients, we have covered 50 districts of Nepal. 
          We provide skill training in the following occupations as per CTEVT standards.
        </p>
      </div>
      
      {/* Image Carousel */}
      <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg shadow-md">
        <img 
          src={images[currentImageIndex]} 
          alt="Training Program" 
          className="w-full h-80 object-cover transition-opacity duration-1000 ease-in-out" 
        />
      </div>
    </div>
    
      <div className="mb-4 flex gap-4 justify-center">
        <select
          className="p-3 border rounded-lg w-1/3 bg-gray-100 text-gray-700 shadow-sm"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          {sectors.map((sec, index) => (
            <option key={index} value={sec}>{sec}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Occupation..."
          className="p-3 border rounded-lg w-2/3 bg-gray-100 text-gray-700 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Sector</th>
              <th className="p-3">Occupation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 text-gray-700">{item.sector}</td>
                <td className="p-3 text-gray-800 font-medium">{item.occupation}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}