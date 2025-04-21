import React, { useEffect, useRef } from "react";
import { FaUserCheck, FaUsers, FaCertificate, FaTools } from "react-icons/fa";

const stats = [
  { icon: <FaUserCheck size={40} />, number: 713246, label: "Applied" },
  { icon: <FaUsers size={40} />, number: 673441, label: "Appeared" },
  { icon: <FaCertificate size={40} />, number: 489117, label: "Certified" },
  { icon: <FaTools size={40} />, number: 314, label: "Skill Standards" },
];

const Stats = () => {
  const numberRefs = useRef([]);

  useEffect(() => {
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const index = el.getAttribute("data-index");
            const { number } = stats[index];
            animateValue(el, 0, number, 2000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    numberRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-12 mx-auto w-full p-6 bg-blue-600 shadow-lg border border-blue-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-blue-600 text-white"
          >
            <div className="mb-4">{stat.icon}</div>
            <h2
              className="text-4xl font-extrabold"
              ref={(el) => (numberRefs.current[index] = el)}
              data-index={index}
            >
              0
            </h2>
            <span className="text-lg mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;