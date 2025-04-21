import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaFileAlt, FaBook, FaUser } from 'react-icons/fa';

const pdfData = [
  { title: 'PDF Document 1', file: '/path/to/pdf1.pdf' },
  { title: 'PDF Document 2', file: '/path/to/pdf2.pdf' },
  { title: 'PDF Document 3', file: '/path/to/pdf3.pdf' },
  { title: 'PDF Document 4', file: '/path/to/pdf4.pdf' },
];

const Resources = () => {
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
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 2000);
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <section className="resources-section p-8 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Div for PDF files */}
        <div className="resources-pdfs flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available PDFs</h2>
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
              style={{ scrollBehavior: 'smooth' }}
            >
              {pdfData.map((pdf, index) => (
                <div
                  key={index}
                  className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-4"
                >
                  <a
                    href={pdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    <h3 className="text-lg font-bold">{pdf.title}</h3>
                  </a>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hidden group-hover:block"
              onClick={scrollNext}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Div for icons */}
        <div className="resources-icons flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Resources</h2>
          <div className="icon-container grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Link
              to="/policies"
              className="resource-icon flex flex-col items-center text-center text-gray-800 hover:text-blue-600 transition"
            >
              <FaFileAlt className="w-20 h-20 mb-2 text-blue-600" />
              <p className="text-lg font-medium">Policies</p>
            </Link>
            <Link
              to="/tutorials"
              className="resource-icon flex flex-col items-center text-center text-gray-800 hover:text-blue-600 transition"
            >
              <FaBook className="w-20 h-20 mb-2 text-blue-600" />
              <p className="text-lg font-medium">Tutorials</p>
            </Link>
            <Link
              to="/usermanuals"
              className="resource-icon flex flex-col items-center text-center text-gray-800 hover:text-blue-600 transition"
            >
              <FaUser className="w-20 h-20 mb-2 text-blue-600" />
              <p className="text-lg font-medium">User Manuals</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;