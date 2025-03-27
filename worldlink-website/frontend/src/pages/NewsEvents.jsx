import { useState } from "react";

const newsEventsData = [
  { id: 1, title: "Sector Skill Committees Formation", category: "news", image: "/images/news1.jpg" },
  { id: 2, title: "Private Sector Engagement in TVET", category: "events", image: "/images/news2.jpg" },
  { id: 3, title: "National Webinar on Climate Strategies", category: "notice", image: "/images/news3.jpg" },
  { id: 4, title: "NVQS initiatives displayed at Expo", category: "news", image: "/images/news4.jpg" },
  { id: 5, title: "Orientation Program for TVET Officers", category: "events", image: "/images/news5.jpg" },
  { id: 6, title: "Graduation Ceremony for TVET Officers", category: "news", image: "/images/news6.jpg" },
  { id: 7, title: "Quality Assurance Process Guidelines Workshop", category: "notice", image: "/images/news7.jpg" },
  { id: 8, title: "Leaders from Nepal, Bolivia, and Colombia", category: "events", image: "/images/news8.jpg" },
  { id: 9, title: "Tripartite MoU signed in all seven provinces", category: "news", image: "/images/news9.jpg" },
];

export default function NewsEvents() {
  const [filter, setFilter] = useState("all");

  const filteredData = filter === "all" ? newsEventsData : newsEventsData.filter(item => item.category === filter);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">News and Events</h1>
      <div className="flex justify-center gap-4 mb-6">
        <label className="cursor-pointer">
          <input type="radio" name="category" value="all" checked={filter === "all"} onChange={() => setFilter("all")} />
          <span className="ml-2">All</span>
        </label>
        <label className="cursor-pointer">
          <input type="radio" name="category" value="news" checked={filter === "news"} onChange={() => setFilter("news")} />
          <span className="ml-2">News</span>
        </label>
        <label className="cursor-pointer">
          <input type="radio" name="category" value="events" checked={filter === "events"} onChange={() => setFilter("events")} />
          <span className="ml-2">Events</span>
        </label>
        <label className="cursor-pointer">
          <input type="radio" name="category" value="notice" checked={filter === "notice"} onChange={() => setFilter("notice")} />
          <span className="ml-2">Notice</span>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}