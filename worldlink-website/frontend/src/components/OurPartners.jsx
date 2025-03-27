import { useRef } from "react";
import { useEffect } from "react";

const partners = [
  { logo: "https://via.placeholder.com/150", link: "https://partner1.com" },
  { logo: "https://via.placeholder.com/150", link: "https://partner2.com" },
  { logo: "https://via.placeholder.com/150", link: "https://partner3.com" },
  { logo: "https://via.placeholder.com/150", link: "https://partner4.com" },
  { logo: "https://via.placeholder.com/150", link: "https://partner5.com" }
];

export default function OurPartner() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    let animationId;

    const animate = () => {
      if (ticker) {
        ticker.scrollLeft += 1;
        if (ticker.scrollLeft >= ticker.scrollWidth / 2) {
          ticker.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="overflow-hidden relative bg-gray-100 p-4">
      <div
        className="flex gap-6 w-max whitespace-nowrap"
        ref={tickerRef}
        style={{ display: "flex", overflow: "hidden" }}
      >
        {[...partners, ...partners].map((partner, index) => (
          <a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={partner.logo}
              alt="Partner Logo"
              className="w-32 h-32 object-contain hover:scale-110 transition-transform"
            />
          </a>
        ))}
      </div>
    </div>
  );
}