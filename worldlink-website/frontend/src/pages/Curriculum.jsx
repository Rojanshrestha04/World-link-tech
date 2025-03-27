import { useState } from "react";

const data = [
  { id: 1, occupation: "Assistant Plumber", level: 1, type: "Curriculum", Developed_by: "CSTVT" },
  { id: 2, occupation: "Building Electrician", level: 1, type: "Curriculum", Developed_by: "CSTVT" },
  { id: 3, occupation: "Assistant Beautician", level: 1, type: "Curriculum", Developed_by: "CSTVT" },
  { id: 4, occupation: "Tailoring", level: 1, type: "OP", Developed_by: "NSTB" },
  { id: 5, occupation: "Shuttering Carpenter", level: 1, type: "OP", Developed_by: "NSTB" },
  { id: 6, occupation: "Mason", level: 1, type: "OP", Developed_by: "CSTVT" },
  { id: 7, occupation: "Assistant Welder", level: 1, type: "OSS/NOSS", Developed_by: "NSTB" },
  { id: 8, occupation: "Waiter / Waitress", level: 1, type: "OSS/NOSS", Developed_by: "CSTVT" },
  { id: 9, occupation: "Light Vehicle Driver", level: 1, type: "OSS/NOSS", Developed_by: "NSTB" },
  { id: 10, occupation: "Off Season Vegetable Producer", level: 1, type: "OSS/NOSS", Developed_by: "CSTVT" }
];

const typeColors = {
  "Curriculum": "bg-blue-100 text-blue-700",
  "OP": "bg-yellow-100 text-yellow-700",
  "OSS/NOSS": "bg-green-100 text-green-700"
};

export default function Curriculum() {
  const [filterType, setFilterType] = useState("All");

  const filteredData = data.filter(
    (item) => filterType === "All" || item.type === filterType
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Download Curriculums</h2>
      <div className="flex justify-center gap-6 mb-6">
        {["All", "Curriculum", "OP", "OSS/NOSS"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value={type}
              checked={filterType === type}
              onChange={(e) => setFilterType(e.target.value)}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filterType === type
                  ? `${typeColors[type] || "bg-gray-400 text-white"} shadow-md`
                  : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {type}
            </span>
          </label>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Occupation</th>
              <th className="p-3">Level</th>
              <th className="p-3">Type</th>
              <th className="p-3">Developed By</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3 text-gray-700">{item.id}</td>
                  <td className="p-3 text-gray-800 font-medium">{item.occupation}</td>
                  <td className="p-3 text-gray-700">{item.level}</td>
                  <td className="p-3">
                    <div className={`px-2 py-1 rounded-lg font-semibold inline-block ${typeColors[item.type] || "bg-gray-100 text-gray-700"}`}>
                      {item.type}
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{item.Developed_by}</td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">Download</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
