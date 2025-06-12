-- Insert courses data
INSERT INTO courses (title, slug, description, category, duration, start_date, price, image, featured, prerequisites, curriculum) VALUES
('Computer Hardware & Networking', 'hardware-networking', 'Learn to assemble, maintain, and troubleshoot computer systems and networks. This comprehensive course covers PC components, operating systems, network setup, and security fundamentals.', 'IT', '3 months', 'May 1, 2025', 15000, '/course-hardware.png', true, 
'["Basic computer knowledge", "10th grade pass or equivalent"]',
'[{"title": "Module 1: Computer Fundamentals", "topics": ["Introduction to Computer Systems", "Computer Components and Architecture", "BIOS and UEFI Configuration", "Operating System Installation"]}, {"title": "Module 2: Hardware Troubleshooting", "topics": ["Identifying Hardware Issues", "Component Replacement", "Preventive Maintenance", "Data Recovery Techniques"]}, {"title": "Module 3: Networking Fundamentals", "topics": ["Network Topologies and Types", "IP Addressing and Subnetting", "Router and Switch Configuration", "Network Security Basics"]}]'),

('Electrical House Wiring', 'house-wiring', 'Master residential electrical wiring, installation of fixtures, and safety protocols with hands-on practice. Learn to install, maintain and repair electrical systems in residential buildings.', 'Electrical', '2 months', 'May 15, 2025', 12000, '/course-electrical.png', true,
'["Basic understanding of electricity", "8th grade pass or equivalent"]',
'[{"title": "Module 1: Electrical Basics", "topics": ["Electrical Theory and Safety", "Tools and Materials", "Reading Electrical Diagrams", "Electrical Codes and Standards"]}, {"title": "Module 2: Residential Wiring", "topics": ["Circuit Design and Installation", "Switch and Outlet Installation", "Lighting Fixtures", "Distribution Panels"]}, {"title": "Module 3: Testing and Troubleshooting", "topics": ["Using Multimeters and Testing Equipment", "Identifying Electrical Faults", "Repair Techniques", "Maintenance Procedures"]}]'),

('Mobile Phone Repair', 'mobile-repair', 'Master smartphone diagnostics, component replacement, and software troubleshooting for various brands. Learn to repair common issues with smartphones and tablets.', 'IT', '2 months', 'June 1, 2025', 14000, '/course-mobile.png', true,
'["Basic knowledge of smartphones", "8th grade pass or equivalent"]',
'[{"title": "Module 1: Mobile Device Fundamentals", "topics": ["Smartphone Architecture", "Operating Systems Overview", "Tools and Equipment", "Safety Procedures"]}, {"title": "Module 2: Hardware Repair", "topics": ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera and Speaker Fixes"]}, {"title": "Module 3: Software Troubleshooting", "topics": ["OS Updates and Recovery", "Data Backup and Restoration", "Performance Optimization", "Common Software Issues"]}]'),

('Professional Cooking', 'professional-cooking', 'Develop culinary skills including food preparation, cooking techniques, and kitchen management. Learn to prepare a variety of dishes and manage a professional kitchen.', 'Hospitality', '3 months', 'June 15, 2025', 18000, '/course-cooking.png', false,
'["Interest in culinary arts", "10th grade pass or equivalent"]',
'[{"title": "Module 1: Culinary Fundamentals", "topics": ["Kitchen Safety and Sanitation", "Knife Skills and Cutting Techniques", "Cooking Methods", "Food Presentation"]}, {"title": "Module 2: International Cuisine", "topics": ["Nepali Cuisine", "Asian Cuisine", "Continental Dishes", "Desserts and Baking"]}, {"title": "Module 3: Kitchen Management", "topics": ["Menu Planning", "Inventory Management", "Cost Control", "Team Coordination"]}]'),

('Plumbing and Pipe Fitting', 'plumbing', 'Learn installation and repair of water supply systems, drainage, and fixtures for residential and commercial buildings. Master the skills needed for professional plumbing work.', 'Mechanical', '2 months', 'July 1, 2025', 13000, '/course-plumbing.png', false,
'["Basic mechanical aptitude", "8th grade pass or equivalent"]', NULL),

('Web Development', 'web-development', 'Learn to design and develop responsive websites using HTML, CSS, JavaScript, and popular frameworks. Build a portfolio of web projects and prepare for entry-level web development roles.', 'IT', '4 months', 'May 10, 2025', 20000, '/course-webdev.png', false,
'["Basic computer knowledge", "10th grade pass or equivalent"]', NULL);

-- Insert testimonials data
INSERT INTO testimonials (name, position, quote, image) VALUES
('Ramesh Tamang', 'Electrical Technician at Nepal Electricity Authority', 'The electrical wiring course at World Link gave me practical skills that helped me secure a job at NEA. The hands-on training was invaluable.', '/success-story-1.png'),
('Sunita Gurung', 'IT Support Specialist at F1Soft International', 'The computer hardware and networking course prepared me for real-world IT challenges. I now work at one of Nepal''s leading IT companies.', '/success-story-2.png'),
('Bikash Shrestha', 'Sous Chef at Hyatt Regency Kathmandu', 'The culinary arts program gave me a strong foundation in professional cooking techniques. The industry connections helped me land my dream job.', '/success-story-3.png');

-- Insert gallery images data
INSERT INTO gallery_images (title, category, image) VALUES
('Computer Lab Training Session', 'Facilities', '/gallery-computer-lab.png'),
('Electrical Workshop', 'Facilities', '/gallery-electrical.png'),
('Graduation Ceremony 2024', 'Events', '/gallery-graduation.png'),
('Industry Visit to Tech Park', 'Field Trips', '/gallery-industry-visit.png'),
('Culinary Arts Practical Session', 'Training', '/gallery-culinary.png'),
('Mobile Repair Workshop', 'Training', '/gallery-mobile-repair.png'),
('Job Fair 2024', 'Events', '/gallery-job-fair.png'),
('CTEVT Certification Ceremony', 'Events', '/gallery-certification.png'),
('Student Project Exhibition', 'Events', '/gallery-exhibition.png');

-- Insert news articles data
INSERT INTO news_articles (title, slug, excerpt, content, date, image, category) VALUES
('New Computer Hardware & Networking Course Batch Starting May 2025', 'new-hardware-networking-batch-2025', 'World Link Technical Training Institute announces a new batch for its popular Computer Hardware & Networking course starting May 1, 2025.', 'World Link Technical Training Institute is pleased to announce the commencement of a new batch for our highly sought-after Computer Hardware & Networking course. Starting from May 1, 2025, this comprehensive 3-month program will equip students with essential skills in computer assembly, maintenance, troubleshooting, and networking.

The course is designed to provide both theoretical knowledge and practical experience, with 70% of the training focused on hands-on practice in our state-of-the-art computer labs. Students will learn about computer components, operating systems, network setup, and security fundamentals.

Upon successful completion, students will receive CTEVT certification, which is recognized by employers throughout Nepal. Our previous graduates have secured positions at leading IT companies and service centers.

Early bird registration is now open with a special discount for the first 20 students. Don''t miss this opportunity to kickstart your career in the IT industry!', 'April 10, 2025', '/news-hardware-course.png', 'Courses'),

('World Link Technical Training Institute Partners with Industry Leaders for Job Placement', 'industry-partnership-job-placement', 'New partnerships with leading companies in Nepal aim to enhance job placement opportunities for graduates of World Link Technical Training Institute.', 'World Link Technical Training Institute has established strategic partnerships with several industry leaders in Nepal to enhance job placement opportunities for our graduates. These partnerships span across various sectors including IT, hospitality, electrical, and mechanical industries.

The initiative aims to bridge the gap between vocational education and employment by providing direct pathways for skilled graduates to enter the workforce. Partner companies will participate in campus recruitment drives, offer internship opportunities, and provide industry insights to help shape our curriculum.

Some of our key partners include F1Soft International, Nepal Electricity Authority, Hyatt Regency Kathmandu, and CG Electronics. These collaborations will ensure that our training programs remain aligned with industry needs and that our graduates possess the skills employers are looking for.

"This partnership model represents a win-win situation for both our students and the industry partners," said the Director of World Link Technical Training Institute. "Our students gain access to employment opportunities, while companies get access to a pool of skilled workers trained specifically for their industry requirements."', 'March 25, 2025', '/news-partnership.png', 'Announcements'),

('Scholarship Program Launched for Underprivileged Students', 'scholarship-program-2025', 'World Link Technical Training Institute introduces a scholarship program to provide vocational training opportunities to underprivileged students.', 'World Link Technical Training Institute is proud to announce the launch of a comprehensive scholarship program aimed at providing vocational training opportunities to underprivileged students. The initiative, titled "Skills for All," will offer full and partial scholarships to deserving candidates who demonstrate financial need and academic potential.

The scholarship program will cover a range of courses including Computer Hardware & Networking, Electrical House Wiring, Mobile Phone Repair, and Professional Cooking. A total of 50 scholarships will be awarded for the upcoming academic year, with 20 full scholarships and 30 partial scholarships available.

Eligibility criteria include financial need, academic background, and a demonstrated interest in the chosen field of study. Special consideration will be given to candidates from marginalized communities, women, and persons with disabilities.

"Education and skills training should be accessible to all, regardless of their financial background," said the Chairman of World Link Technical Training Institute. "This scholarship program reflects our commitment to social responsibility and our belief in the transformative power of vocational education."

Applications for the scholarship program are now open, with a deadline of April 30, 2025. Interested candidates can obtain application forms from our institute or download them from our website.', 'March 15, 2025', '/news-scholarship.png', 'Announcements');


-- Insert sample careers data
INSERT INTO careers (title, slug, company, location, job_type, experience_level, salary_range, description, requirements, responsibilities, benefits, skills_required, application_deadline, contact_email, contact_phone, status, featured, remote_work) VALUES

('Junior Network Technician', 'junior-network-technician', 'TechCorp Nepal', 'Kathmandu', 'full-time', 'entry', 'Rs. 25,000 - 35,000', 
'We are looking for a motivated Junior Network Technician to join our IT support team. This role is perfect for recent graduates from technical training institutes.',
'["Diploma/Certificate in Computer Hardware & Networking", "Basic understanding of networking concepts", "Good communication skills", "Willingness to learn"]',
'["Install and configure network equipment", "Troubleshoot network connectivity issues", "Maintain network documentation", "Provide technical support to users", "Assist senior technicians in complex tasks"]',
'["Health insurance", "Performance bonus", "Training opportunities", "Career growth path"]',
'["TCP/IP", "Router Configuration", "Switch Configuration", "Network Troubleshooting", "Windows/Linux"]',
'2025-05-15', 'hr@techcorp.com.np', '01-4567890', 'active', true, false),

('Electrical Technician', 'electrical-technician', 'Nepal Electricity Authority', 'Pokhara', 'full-time', 'entry', 'Rs. 30,000 - 40,000',
'Join NEA as an Electrical Technician and contribute to Nepal''s power infrastructure development. We welcome fresh graduates with proper training.',
'["Certificate in Electrical House Wiring", "Knowledge of electrical safety protocols", "Ability to read electrical diagrams", "Physical fitness for field work"]',
'["Install and maintain electrical systems", "Conduct electrical inspections", "Repair electrical faults", "Follow safety procedures", "Maintain equipment records"]',
'["Government job security", "Provident fund", "Medical benefits", "Training programs"]',
'["Electrical Wiring", "Multimeter Usage", "Electrical Safety", "Circuit Analysis", "Maintenance"]',
'2025-06-01', 'recruitment@nea.org.np', '061-567890', 'active', true, false),

('Mobile Repair Technician', 'mobile-repair-technician', 'Mobile Care Center', 'Kathmandu', 'full-time', 'entry', 'Rs. 20,000 - 30,000',
'Seeking skilled mobile repair technicians to join our growing service center chain across Nepal.',
'["Training in Mobile Phone Repair", "Experience with smartphone hardware", "Customer service skills", "Attention to detail"]',
'["Diagnose mobile device issues", "Repair smartphones and tablets", "Replace components", "Provide customer support", "Maintain repair logs"]',
'["Commission on repairs", "Skill development training", "Flexible working hours"]',
'["Mobile Hardware", "Software Troubleshooting", "Component Replacement", "Customer Service"]',
'2025-05-30', 'jobs@mobilecare.com.np', '01-4445566', 'active', false, false),

('Junior Chef', 'junior-chef', 'Hyatt Regency Kathmandu', 'Kathmandu', 'full-time', 'entry', 'Rs. 35,000 - 45,000',
'Excellent opportunity for culinary arts graduates to start their career in a 5-star hotel environment.',
'["Certificate in Professional Cooking", "Knowledge of food safety", "Creativity in food presentation", "Team player attitude"]',
'["Assist in food preparation", "Maintain kitchen cleanliness", "Follow recipes and standards", "Support senior chefs", "Learn new cooking techniques"]',
'["International hotel experience", "Career advancement", "Staff meals", "Training programs"]',
'["Culinary Skills", "Food Safety", "Kitchen Management", "Menu Planning", "International Cuisine"]',
'2025-05-20', 'hr@hyatt.com', '01-4491234', 'active', true, false),

('Web Developer Intern', 'web-developer-intern', 'F1Soft International', 'Kathmandu', 'internship', 'entry', 'Rs. 15,000 - 20,000',
'6-month internship program for web development course graduates with potential for full-time employment.',
'["Training in Web Development", "Knowledge of HTML, CSS, JavaScript", "Basic understanding of frameworks", "Portfolio of projects"]',
'["Develop web applications", "Debug and test code", "Collaborate with team", "Learn new technologies", "Participate in code reviews"]',
'["Mentorship program", "Real project experience", "Potential full-time offer", "Learning opportunities"]',
'["HTML/CSS", "JavaScript", "React/Vue", "Node.js", "Database basics"]',
'2025-05-10', 'internship@f1soft.com', '01-4567123', 'active', false, true);


-- Insert sample inquiries data
INSERT INTO inquiries (inquiry_id, name, email, phone, subject, message, inquiry_type, status, priority, source) VALUES

('INQ-1001', 'Ramesh Sharma', 'ramesh.sharma@example.com', '9801234567', 'Course Information Request', 
'I would like to know more about the Computer Hardware & Networking course. What are the prerequisites and job opportunities after completion?', 
'general', 'new', 'normal', 'website'),

('INQ-1002', 'Sunita Gurung', 'sunita.gurung@example.com', '9807654321', 'Admission Process Query', 
'Can you please explain the admission process for Web Development course? What documents are required and when is the next batch starting?', 
'admission', 'responded', 'normal', 'phone'),

('INQ-1003', 'Bikash Thapa', 'bikash.thapa@example.com', '9812345678', 'Fee Structure Information', 
'What is the fee structure for Electrical House Wiring course? Are there any installment options available? Do you provide any discounts?', 
'fees', 'in-progress', 'normal', 'website'),

('INQ-1004', 'Anita Rai', 'anita.rai@example.com', '9854321098', 'Job Placement Assistance', 
'Do you provide job placement assistance after course completion? What is the success rate and which companies do you have partnerships with?', 
'job', 'responded', 'high', 'email'),

('INQ-1005', 'Dipesh Maharjan', 'dipesh.maharjan@example.com', '9876543210', 'Scholarship Information', 
'Are there any scholarship programs available for the Professional Cooking course? I come from a low-income family and need financial assistance.', 
'scholarship', 'new', 'high', 'website'),

('INQ-1006', 'Sita Tamang', 'sita.tamang@example.com', '9845123456', 'Technical Support', 
'I am having trouble accessing the online application form. The page keeps loading but doesn''t submit my application. Please help.', 
'technical', 'new', 'urgent', 'website'),

('INQ-1007', 'Kiran Shrestha', 'kiran.shrestha@example.com', '9834567890', 'Career Guidance', 
'I have completed my SLC and am confused about which technical course to choose. Can someone guide me based on current job market trends?', 
'career', 'new', 'normal', 'phone'),

('INQ-1008', 'Maya Poudel', 'maya.poudel@example.com', '9823456789', 'Course Duration Query', 
'I work part-time and want to know if you have evening or weekend batches for the Mobile Phone Repair course. What are the timings?', 
'general', 'responded', 'normal', 'social-media'),

('INQ-1009', 'Ravi Adhikari', 'ravi.adhikari@example.com', '9856789012', 'Certification Validity', 
'Are the certificates provided by your institute recognized by CTEVT? Will it be valid for government job applications?', 
'general', 'in-progress', 'normal', 'referral'),

('INQ-1010', 'Priya Karki', 'priya.karki@example.com', '9867890123', 'Hostel Facilities', 
'I am from outside Kathmandu. Do you provide hostel facilities for students? What are the charges and facilities available?', 
'admission', 'new', 'normal', 'website');