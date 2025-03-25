import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const newsData = [
  {
    title: "Graduation Ceremony for TVET Trainee Officers",
    description: "On 24th March 2024, the Swiss Embassy hosted the graduation ceremony...",
    image: "image1.jpg",
  },
  {
    title: "Graduation Ceremony for TVET Trainee Officers",
    description: "On 24th March 2024, the Swiss Embassy hosted the graduation ceremony...",
    image: "image1.jpg",
  },
  {
    title: "Graduation Ceremony for TVET Trainee Officers",
    description: "On 24th March 2024, the Swiss Embassy hosted the graduation ceremony...",
    image: "image1.jpg",
  },
  {
    title: "NVQS P-II hosts Orientation Program",
    description: "The NVQS P-II recently conducted an extensive three-day orientation...",
    image: "image2.jpg",
  },
  {
    title: "NVQS initiatives displayed at Women’s Trade Expo 2024",
    description: "The event facilitated connections with private sector entities...",
    image: "image3.jpg",
  },
  {
    title: "National Webinar on Climate Change & TVET Greening",
    description: "A National Webinar on Climate Change Mainstreaming was held...",
    image: "image4.jpg",
  },
];

const NewsAndEvents = () => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoScrolling) {
        scrollNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        setTimeout(() => {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }, 2000);
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">News and Events</h2>
      <div
        className="relative flex overflow-hidden group"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {/* Left Scroll Button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hidden group-hover:block"
          onClick={scrollPrev}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Horizontal Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth space-x-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {newsData.map((news, index) => (
            <div
              key={index}
              className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{news.title}</h3>
              <p className="text-gray-600 text-sm">{news.description}</p>
            </div>
          ))}

          {/* View All Section */}
          <div
            className="min-w-[300px] flex-shrink-0 flex items-center justify-center bg-blue-600 text-white text-lg font-bold cursor-pointer rounded-lg p-4"
            onClick={() => window.location.href = "/news-and-events"}
          >
            View All →
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hidden group-hover:block"
          onClick={scrollNext}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default NewsAndEvents;