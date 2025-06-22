import type { Course, Testimonial, GalleryImage, NewsArticle, Resource } from "./types"

export const courses: Course[] = [
  {
    id: "1",
    title: "Computer Hardware & Networking",
    slug: "hardware-networking",
    description:
      "Learn to assemble, maintain, and troubleshoot computer systems and networks. This comprehensive course covers PC components, operating systems, network setup, and security fundamentals.",
    category: "IT",
    duration: "3 months",
    startDate: "May 1, 2025",
    price: 15000,
    image: "/course-hardware.png",
    featured: true,
    prerequisites: ["Basic computer knowledge", "10th grade pass or equivalent"],
    curriculum: [
      {
        title: "Module 1: Computer Fundamentals",
        topics: [
          "Introduction to Computer Systems",
          "Computer Components and Architecture",
          "BIOS and UEFI Configuration",
          "Operating System Installation",
        ],
      },
      {
        title: "Module 2: Hardware Troubleshooting",
        topics: [
          "Identifying Hardware Issues",
          "Component Replacement",
          "Preventive Maintenance",
          "Data Recovery Techniques",
        ],
      },
      {
        title: "Module 3: Networking Fundamentals",
        topics: [
          "Network Topologies and Types",
          "IP Addressing and Subnetting",
          "Router and Switch Configuration",
          "Network Security Basics",
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Electrical House Wiring",
    slug: "house-wiring",
    description:
      "Master residential electrical wiring, installation of fixtures, and safety protocols with hands-on practice. Learn to install, maintain and repair electrical systems in residential buildings.",
    category: "Electrical",
    duration: "2 months",
    startDate: "May 15, 2025",
    price: 12000,
    image: "/course-electrical.png",
    featured: true,
    prerequisites: ["Basic understanding of electricity", "8th grade pass or equivalent"],
    curriculum: [
      {
        title: "Module 1: Electrical Basics",
        topics: [
          "Electrical Theory and Safety",
          "Tools and Materials",
          "Reading Electrical Diagrams",
          "Electrical Codes and Standards",
        ],
      },
      {
        title: "Module 2: Residential Wiring",
        topics: [
          "Circuit Design and Installation",
          "Switch and Outlet Installation",
          "Lighting Fixtures",
          "Distribution Panels",
        ],
      },
      {
        title: "Module 3: Testing and Troubleshooting",
        topics: [
          "Using Multimeters and Testing Equipment",
          "Identifying Electrical Faults",
          "Repair Techniques",
          "Maintenance Procedures",
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Mobile Phone Repair",
    slug: "mobile-repair",
    description:
      "Master smartphone diagnostics, component replacement, and software troubleshooting for various brands. Learn to repair common issues with smartphones and tablets.",
    category: "IT",
    duration: "2 months",
    startDate: "June 1, 2025",
    price: 14000,
    image: "/course-mobile.png",
    featured: true,
    prerequisites: ["Basic knowledge of smartphones", "8th grade pass or equivalent"],
    curriculum: [
      {
        title: "Module 1: Mobile Device Fundamentals",
        topics: ["Smartphone Architecture", "Operating Systems Overview", "Tools and Equipment", "Safety Procedures"],
      },
      {
        title: "Module 2: Hardware Repair",
        topics: ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera and Speaker Fixes"],
      },
      {
        title: "Module 3: Software Troubleshooting",
        topics: [
          "OS Updates and Recovery",
          "Data Backup and Restoration",
          "Performance Optimization",
          "Common Software Issues",
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Professional Cooking",
    slug: "professional-cooking",
    description:
      "Develop culinary skills including food preparation, cooking techniques, and kitchen management. Learn to prepare a variety of dishes and manage a professional kitchen.",
    category: "Hospitality",
    duration: "3 months",
    startDate: "June 15, 2025",
    price: 18000,
    image: "/course-cooking.png",
    featured: false,
    prerequisites: ["Interest in culinary arts", "10th grade pass or equivalent"],
    curriculum: [
      {
        title: "Module 1: Culinary Fundamentals",
        topics: [
          "Kitchen Safety and Sanitation",
          "Knife Skills and Cutting Techniques",
          "Cooking Methods",
          "Food Presentation",
        ],
      },
      {
        title: "Module 2: International Cuisine",
        topics: ["Nepali Cuisine", "Asian Cuisine", "Continental Dishes", "Desserts and Baking"],
      },
      {
        title: "Module 3: Kitchen Management",
        topics: ["Menu Planning", "Inventory Management", "Cost Control", "Team Coordination"],
      },
    ],
  },
  {
    id: "5",
    title: "Plumbing and Pipe Fitting",
    slug: "plumbing",
    description:
      "Learn installation and repair of water supply systems, drainage, and fixtures for residential and commercial buildings. Master the skills needed for professional plumbing work.",
    category: "Mechanical",
    duration: "2 months",
    startDate: "July 1, 2025",
    price: 13000,
    image: "/course-plumbing.png",
    featured: false,
    prerequisites: ["Basic mechanical aptitude", "8th grade pass or equivalent"],
  },
  {
    id: "6",
    title: "Web Development",
    slug: "web-development",
    description:
      "Learn to design and develop responsive websites using HTML, CSS, JavaScript, and popular frameworks. Build a portfolio of web projects and prepare for entry-level web development roles.",
    category: "IT",
    duration: "4 months",
    startDate: "May 10, 2025",
    price: 20000,
    image: "/course-webdev.png",
    featured: false,
    prerequisites: ["Basic computer knowledge", "10th grade pass or equivalent"],
  },
]

export const featuredCourses = courses.filter((course) => course.featured)

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ramesh Tamang",
    position: "Electrical Technician at Nepal Electricity Authority",
    quote:
      "The electrical wiring course at World Link gave me practical skills that helped me secure a job at NEA. The hands-on training was invaluable.",
    image: "/success-story-1.png",
  },
  {
    id: "2",
    name: "Sunita Gurung",
    position: "IT Support Specialist at F1Soft International",
    quote:
      "The computer hardware and networking course prepared me for real-world IT challenges. I now work at one of Nepal's leading IT companies.",
    image: "/success-story-2.png",
  },
  {
    id: "3",
    name: "Bikash Shrestha",
    position: "Sous Chef at Hyatt Regency Kathmandu",
    quote:
      "The culinary arts program gave me a strong foundation in professional cooking techniques. The industry connections helped me land my dream job.",
    image: "/success-story-3.png",
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Computer Lab Training Session",
    category: "Facilities",
    image: "/gallery-computer-lab.png",
  },
  {
    id: "2",
    title: "Electrical Workshop",
    category: "Facilities",
    image: "/gallery-electrical.png",
  },
  {
    id: "3",
    title: "Graduation Ceremony 2024",
    category: "Events",
    image: "/gallery-graduation.png",
  },
  {
    id: "4",
    title: "Industry Visit to Tech Park",
    category: "Field Trips",
    image: "/gallery-industry-visit.png",
  },
  {
    id: "5",
    title: "Culinary Arts Practical Session",
    category: "Training",
    image: "/gallery-culinary.png",
  },
  {
    id: "6",
    title: "Mobile Repair Workshop",
    category: "Training",
    image: "/gallery-mobile-repair.png",
  },
  {
    id: "7",
    title: "Job Fair 2024",
    category: "Events",
    image: "/gallery-job-fair.png",
  },
  {
    id: "8",
    title: "CTEVT Certification Ceremony",
    category: "Events",
    image: "/gallery-certification.png",
  },
  {
    id: "9",
    title: "Student Project Exhibition",
    category: "Events",
    image: "/gallery-exhibition.png",
  },
]

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "New Computer Hardware & Networking Course Batch Starting May 2025",
    slug: "new-hardware-networking-batch-2025",
    excerpt:
      "World Link Technical Training Institute announces a new batch for its popular Computer Hardware & Networking course starting May 1, 2025.",
    content:
      "World Link Technical Training Institute is pleased to announce the commencement of a new batch for our highly sought-after Computer Hardware & Networking course. Starting from May 1, 2025, this comprehensive 3-month program will equip students with essential skills in computer assembly, maintenance, troubleshooting, and networking.\n\nThe course is designed to provide both theoretical knowledge and practical experience, with 70% of the training focused on hands-on practice in our state-of-the-art computer labs. Students will learn about computer components, operating systems, network setup, and security fundamentals.\n\nUpon successful completion, students will receive CTEVT certification, which is recognized by employers throughout Nepal. Our previous graduates have secured positions at leading IT companies and service centers.\n\nEarly bird registration is now open with a special discount for the first 20 students. Don't miss this opportunity to kickstart your career in the IT industry!",
    date: "April 10, 2025",
    image: "/news-hardware-course.png",
    category: "Courses",
  },
  {
    id: "2",
    title: "World Link Technical Training Institute Partners with Industry Leaders for Job Placement",
    slug: "industry-partnership-job-placement",
    excerpt:
      "New partnerships with leading companies in Nepal aim to enhance job placement opportunities for graduates of World Link Technical Training Institute.",
    content:
      'World Link Technical Training Institute has established strategic partnerships with several industry leaders in Nepal to enhance job placement opportunities for our graduates. These partnerships span across various sectors including IT, hospitality, electrical, and mechanical industries.\n\nThe initiative aims to bridge the gap between vocational education and employment by providing direct pathways for skilled graduates to enter the workforce. Partner companies will participate in campus recruitment drives, offer internship opportunities, and provide industry insights to help shape our curriculum.\n\nSome of our key partners include F1Soft International, Nepal Electricity Authority, Hyatt Regency Kathmandu, and CG Electronics. These collaborations will ensure that our training programs remain aligned with industry needs and that our graduates possess the skills employers are looking for.\n\n"This partnership model represents a win-win situation for both our students and the industry partners," said the Director of World Link Technical Training Institute. "Our students gain access to employment opportunities, while companies get access to a pool of skilled workers trained specifically for their industry requirements."',
    date: "March 25, 2025",
    image: "/news-partnership.png",
    category: "Announcements",
  },
  {
    id: "3",
    title: "Scholarship Program Launched for Underprivileged Students",
    slug: "scholarship-program-2025",
    excerpt:
      "World Link Technical Training Institute introduces a scholarship program to provide vocational training opportunities to underprivileged students.",
    content:
      'World Link Technical Training Institute is proud to announce the launch of a comprehensive scholarship program aimed at providing vocational training opportunities to underprivileged students. The initiative, titled "Skills for All," will offer full and partial scholarships to deserving candidates who demonstrate financial need and academic potential.\n\nThe scholarship program will cover a range of courses including Computer Hardware & Networking, Electrical House Wiring, Mobile Phone Repair, and Professional Cooking. A total of 50 scholarships will be awarded for the upcoming academic year, with 20 full scholarships and 30 partial scholarships available.\n\nEligibility criteria include financial need, academic background, and a demonstrated interest in the chosen field of study. Special consideration will be given to candidates from marginalized communities, women, and persons with disabilities.\n\n"Education and skills training should be accessible to all, regardless of their financial background," said the Chairman of World Link Technical Training Institute. "This scholarship program reflects our commitment to social responsibility and our belief in the transformative power of vocational education."\n\nApplications for the scholarship program are now open, with a deadline of April 30, 2025. Interested candidates can obtain application forms from our institute or download them from our website.',
    date: "March 15, 2025",
    image: "/news-scholarship.png",
    category: "Announcements",
  },
]

export const resources: Resource[] = [
  {
    id: "1",
    title: "Annual Training Report 2024",
    description: "Comprehensive report on training outcomes, student performance, and employment statistics for the year 2024.",
    file: "/resources/annual-report-2024.pdf",
    category: "Reports",
    date: "March 15, 2025",
  },
  {
    id: "2",
    title: "CTEVT Curriculum Guidelines",
    description: "Official curriculum guidelines from CTEVT for vocational training programs in Nepal.",
    file: "/resources/ctevt-curriculum-guidelines.pdf",
    category: "Curriculum",
    date: "January 10, 2025",
  },
  {
    id: "3",
    title: "Student Handbook 2025",
    description: "Comprehensive guide for students including rules, regulations, and resources available at the institute.",
    file: "/resources/student-handbook-2025.pdf",
    category: "Publications",
    date: "February 5, 2025",
  },
  {
    id: "4",
    title: "Admission Policy",
    description: "Official policy document outlining admission requirements, procedures, and selection criteria.",
    file: "/resources/admission-policy.pdf",
    category: "Policy",
    date: "December 12, 2024",
  },
  {
    id: "5",
    title: "Computer Hardware & Networking Curriculum",
    description: "Detailed curriculum for the Computer Hardware & Networking course including modules, topics, and assessment criteria.",
    file: "/resources/computer-hardware-networking-curriculum.pdf",
    category: "Curriculum",
    date: "January 25, 2025",
  },
  {
    id: "6",
    title: "Electrical House Wiring Curriculum",
    description: "Detailed curriculum for the Electrical House Wiring course including modules, topics, and assessment criteria.",
    file: "/resources/electrical-house-wiring-curriculum.pdf",
    category: "Curriculum",
    date: "January 25, 2025",
  },
  {
    id: "7",
    title: "Scholarship Policy",
    description: "Guidelines and criteria for scholarship applications and selection process.",
    file: "/resources/scholarship-policy.pdf",
    category: "Policy",
    date: "November 30, 2024",
  },
  {
    id: "8",
    title: "Industry Partnership Report",
    description: "Report on industry partnerships, internship placements, and employment outcomes for graduates.",
    file: "/resources/industry-partnership-report.pdf",
    category: "Reports",
    date: "March 1, 2025",
  },
  {
    id: "9",
    title: "Academic Calendar 2025",
    description: "Calendar of academic activities, holidays, and important dates for the year 2025.",
    file: "/resources/academic-calendar-2025.pdf",
    category: "Publications",
    date: "December 20, 2024",
  },
  {
    id: "10",
    title: "Student Code of Conduct",
    description: "Guidelines for student behavior, disciplinary procedures, and ethical standards.",
    file: "/resources/student-code-of-conduct.pdf",
    category: "Policy",
    date: "January 5, 2025",
  },
]
