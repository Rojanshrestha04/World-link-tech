-- =====================================================
-- WORLDLINK WEBSITE - INSERT VALUES
-- =====================================================
-- This file contains all INSERT statements for initial data

-- =====================================================
-- 1. INSERT GENERAL SETTINGS
-- =====================================================
INSERT INTO public.general_settings (
    site_name, 
    site_description, 
    contact_email, 
    contact_phone, 
    address,
    social_facebook,
    social_linkedin
) VALUES (
    'World Link Technical Training Institute',
    'Empowering through quality technical education and training',
    'info@worldlink.edu.np',
    '+977-1-4567890',
    'Kathmandu, Nepal',
    'https://facebook.com/worldlinktechnical',
    'https://linkedin.com/company/worldlinktechnical'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. INSERT SAMPLE COURSES
-- =====================================================
INSERT INTO public.courses (title, slug, description, category, level, duration, price, is_featured, is_active) VALUES
('Computer Hardware & Networking', 'computer-hardware-networking', 'Comprehensive course covering computer assembly, troubleshooting, and network configuration.', 'IT & Computing', 'Beginner', '6 months', 25000.00, true, true),
('Mobile Phone Repair', 'mobile-phone-repair', 'Learn to diagnose and repair various mobile phone issues including hardware and software problems.', 'IT & Computing', 'Beginner', '3 months', 15000.00, true, true),
('Web Development', 'web-development', 'Full-stack web development course covering HTML, CSS, JavaScript, and modern frameworks.', 'IT & Computing', 'Intermediate', '8 months', 35000.00, true, true),
('Electrical Wiring', 'electrical-wiring', 'Complete electrical installation and wiring course following national safety standards.', 'Electrical', 'Beginner', '4 months', 20000.00, true, true),
('Solar Panel Installation', 'solar-panel-installation', 'Learn to design and install solar power systems for residential and commercial use.', 'Electrical', 'Intermediate', '3 months', 18000.00, false, true),
('Motorcycle Repair', 'motorcycle-repair', 'Comprehensive motorcycle maintenance and repair training.', 'Mechanical', 'Beginner', '5 months', 22000.00, true, true),
('Welding Technology', 'welding-technology', 'Professional welding course covering various welding techniques and safety procedures.', 'Mechanical', 'Beginner', '4 months', 20000.00, false, true),
('Hotel Management', 'hotel-management', 'Complete hospitality management course covering front office, housekeeping, and food service.', 'Hospitality', 'Intermediate', '12 months', 45000.00, true, true),
('Cooking & Culinary Arts', 'cooking-culinary-arts', 'Professional cooking course covering local and international cuisine.', 'Hospitality', 'Beginner', '6 months', 28000.00, true, true),
('Digital Marketing', 'digital-marketing', 'Modern digital marketing strategies including SEO, social media, and online advertising.', 'IT & Computing', 'Intermediate', '4 months', 24000.00, false, true)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 3. INSERT TESTIMONIALS
-- =====================================================
INSERT INTO public.testimonials (name, position, quote, is_featured, is_active) VALUES
('Ramesh Tamang', 'Electrical Technician at Nepal Electricity Authority', 'The electrical wiring course at World Link changed my life. I got a job immediately after completing the course and now I have a stable income for my family.', true, true),
('Sita Sharma', 'Web Developer at Tech Solutions Pvt. Ltd.', 'The web development course was comprehensive and practical. The instructors were knowledgeable and always ready to help. I highly recommend World Link to anyone looking to start a career in IT.', true, true),
('Bikash Thapa', 'Mobile Repair Shop Owner', 'After completing the mobile repair course, I started my own repair shop. The skills I learned here helped me build a successful business. Thank you World Link!', true, true),
('Anita Gurung', 'Hotel Supervisor at Himalayan Hotel', 'The hotel management course provided me with all the skills needed to work in the hospitality industry. The practical training was excellent and prepared me well for my current job.', true, true),
('Suresh Rai', 'Motorcycle Mechanic', 'The motorcycle repair course was hands-on and very informative. I learned everything from basic maintenance to complex engine repairs. Now I work at a reputed service center.', false, true),
('Maya Shrestha', 'Digital Marketing Specialist', 'The digital marketing course was up-to-date with current industry trends. I learned practical skills that I use every day in my job. Great investment in my career!', false, true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. INSERT SAMPLE NEWS ARTICLES
-- =====================================================
INSERT INTO public.news_articles (title, slug, content, excerpt, category, is_published, published_at) VALUES
('New Computer Lab Inaugurated', 'new-computer-lab-inaugurated', 'World Link Technical Training Institute has inaugurated a state-of-the-art computer lab equipped with the latest hardware and software. The lab will enhance the learning experience for students enrolled in IT courses.', 'New computer lab with latest technology inaugurated at World Link.', 'Infrastructure', true, NOW() - INTERVAL '7 days'),
('Partnership with Local Industries', 'partnership-local-industries', 'We are proud to announce partnerships with several local industries to provide internship and job placement opportunities for our students. This initiative will bridge the gap between education and employment.', 'World Link partners with local industries for student placements.', 'Partnerships', true, NOW() - INTERVAL '14 days'),
('Annual Graduation Ceremony 2024', 'annual-graduation-ceremony-2024', 'The annual graduation ceremony was held with great enthusiasm. Over 200 students graduated from various technical courses and many have already secured employment in their respective fields.', 'Over 200 students graduated in the annual ceremony.', 'Events', true, NOW() - INTERVAL '30 days')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 5. INSERT SAMPLE GALLERY IMAGES
-- =====================================================
INSERT INTO public.gallery_images (title, description, image_url, category, is_featured) VALUES
('Computer Lab', 'Students working in our modern computer laboratory', '/images/gallery/computer-lab.jpg', 'Facilities', true),
('Electrical Workshop', 'Hands-on electrical training in progress', '/images/gallery/electrical-workshop.jpg', 'Training', true),
('Graduation Ceremony', 'Annual graduation ceremony celebration', '/images/gallery/graduation.jpg', 'Events', true),
('Mobile Repair Class', 'Students learning mobile phone repair techniques', '/images/gallery/mobile-repair.jpg', 'Training', false),
('Welding Workshop', 'Professional welding training session', '/images/gallery/welding.jpg', 'Training', false),
('Campus Building', 'Main campus building exterior view', '/images/gallery/campus.jpg', 'Facilities', false)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 6. INSERT SAMPLE CAREERS
-- =====================================================
INSERT INTO public.careers (title, department, location, employment_type, description, requirements, salary_range, is_active, application_deadline) VALUES
('Technical Instructor - IT', 'Academic', 'Kathmandu', 'Full-time', 'We are looking for an experienced IT instructor to teach computer hardware, networking, and programming courses.', 'Bachelor''s degree in IT/Computer Science, 3+ years teaching experience, Strong communication skills', 'Rs. 40,000 - 60,000', true, CURRENT_DATE + INTERVAL '30 days'),
('Lab Assistant', 'Technical', 'Kathmandu', 'Part-time', 'Assist students in laboratory sessions and maintain equipment in good working condition.', 'Diploma in relevant technical field, Basic computer skills, Ability to work with students', 'Rs. 20,000 - 30,000', true, CURRENT_DATE + INTERVAL '45 days'),
('Administrative Officer', 'Administration', 'Kathmandu', 'Full-time', 'Handle administrative tasks including student admissions, record keeping, and general office management.', 'Bachelor''s degree, 2+ years office experience, Good organizational skills', 'Rs. 35,000 - 50,000', true, CURRENT_DATE + INTERVAL '60 days')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 7. INSERT ADMIN USER (OPTIONAL - UNCOMMENT TO USE)
-- =====================================================
/*
-- Insert admin user if auth user exists
DO $$
DECLARE
    auth_user_id UUID;
BEGIN
    -- Replace 'admin@worldlink.edu.np' with your actual admin email
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'admin@worldlink.edu.np';

    IF auth_user_id IS NOT NULL THEN
        INSERT INTO public.users (id, email, full_name, role)
        VALUES (auth_user_id, 'admin@worldlink.edu.np', 'Admin User', 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', full_name = 'Admin User';
    END IF;
END $$;
*/
