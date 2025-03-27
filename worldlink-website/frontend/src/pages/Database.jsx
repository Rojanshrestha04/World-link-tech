import React from "react";

export default function DatabaseLinks() {
  const data = [
    { id: 1, name: "EVENT II Database", link: "#" },
    { id: 2, name: "ENSSURE Project", link: "#" },
    { id: 3, name: "SAMRIDDHI Project", link: "#" },
    { id: 4, name: "EFSR Project", link: "#" },
    { id: 5, name: "MEDPA Database", link: "#" },
    { id: 6, name: "NSTB Database", link: "#" },
    { id: 7, name: "CTEVT Training Information Portal", link: "#" },
    { id: 8, name: "Bolpatra EGP", link: "#" },
    { id: 9, name: "ADB CMS", link: "#" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Database Links
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Donor/System Name</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-blue-100 transition ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-center text-gray-700">{item.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={item.link}
                    className="text-blue-500 font-semibold hover:underline transition"
                  >
                    Click here
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
