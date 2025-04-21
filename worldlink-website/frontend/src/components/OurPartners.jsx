import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const partners = [
  { logo: "https://worldlink.org.np/images/enssure.png", link: "https://partner3.com" },
  { logo: "https://worldlink.org.np/images/cwin.png", link: "https://partner4.com" },
  { logo: "https://worldlink.org.np/images/Unwomen.png", link: "https://partner5.com" },
  { logo: "https://worldlink.org.np/images/ADB.png", link: "https://partner6.com" },
  { logo: "https://worldlink.org.np/images/Helvetas.png", link: "https://partner7.com" },
  { logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsynGz-mx4S1r4bqejQEl0h23zlLSypy2AOd8o14KY4A&s&ec=72940543", link: "https://partner7.com" },
];

export default function OurPartner() {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoScrolling) {
        scrollNext();
      }
    }, 2000); // Decreased interval time for faster scrolling

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
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          }
        }, 1000);
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
      <h2 className="text-3xl font-bold text-center mb-6">Our Partners</h2>
      <div
        className="relative flex overflow-hidden group"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hidden group-hover:block"
          onClick={scrollPrev}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Scrollable Partner Logos */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth space-x-6 px-4"
          style={{
            scrollBehavior: "smooth",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-4 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={partner.logo}
                alt="Partner Logo"
                className="w-62 h-62 object-contain"
              />
            </a>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hidden group-hover:block"
          onClick={scrollNext}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}