-- Create courses table from scratch
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_weeks INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  instructor_name TEXT NOT NULL,
  instructor_bio TEXT,
  max_students INTEGER DEFAULT 20,
  start_date DATE NOT NULL,
  end_date DATE,
  schedule TEXT,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  learning_outcomes JSONB DEFAULT '[]'::jsonb,
  course_materials JSONB DEFAULT '[]'::jsonb,
  curriculum JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  syllabus_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_is_active ON courses(is_active);
CREATE INDEX idx_courses_is_featured ON courses(is_featured);
CREATE INDEX idx_courses_start_date ON courses(start_date);
CREATE INDEX idx_courses_created_at ON courses(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert courses data with correct field mapping
INSERT INTO courses (
  title, slug, description, category, level, duration_weeks, start_date, 
  price, image_url, is_featured, prerequisites, curriculum, instructor_name,
  instructor_bio, max_students, is_active
) VALUES
(
  'Computer Hardware & Networking', 
  'hardware-networking', 
  'Learn to assemble, maintain, and troubleshoot computer systems and networks. This comprehensive course covers PC components, operating systems, network setup, and security fundamentals.', 
  'IT', 
  'intermediate',
  12, -- 3 months = ~12 weeks
  '2025-05-01', 
  15000, 
  '/course-hardware.png', 
  true, 
  '["Basic computer knowledge", "10th grade pass or equivalent"]'::jsonb,
  '[{"title": "Module 1: Computer Fundamentals", "topics": ["Introduction to Computer Systems", "Computer Components and Architecture", "BIOS and UEFI Configuration", "Operating System Installation"]}, {"title": "Module 2: Hardware Troubleshooting", "topics": ["Identifying Hardware Issues", "Component Replacement", "Preventive Maintenance", "Data Recovery Techniques"]}, {"title": "Module 3: Networking Fundamentals", "topics": ["Network Topologies and Types", "IP Addressing and Subnetting", "Router and Switch Configuration", "Network Security Basics"]}]'::jsonb,
  'Tech Institute Faculty',
  'Experienced IT professionals with industry certifications.',
  25,
  true
),
(
  'Electrical House Wiring', 
  'house-wiring', 
  'Master residential electrical wiring, installation of fixtures, and safety protocols with hands-on practice. Learn to install, maintain and repair electrical systems in residential buildings.', 
  'Electrical', 
  'intermediate',
  8, -- 2 months = ~8 weeks
  '2025-05-15', 
  12000, 
  '/course-electrical.png', 
  true,
  '["Basic understanding of electricity", "8th grade pass or equivalent"]'::jsonb,
  '[{"title": "Module 1: Electrical Basics", "topics": ["Electrical Theory and Safety", "Tools and Materials", "Reading Electrical Diagrams", "Electrical Codes and Standards"]}, {"title": "Module 2: Residential Wiring", "topics": ["Circuit Design and Installation", "Switch and Outlet Installation", "Lighting Fixtures", "Distribution Panels"]}, {"title": "Module 3: Testing and Troubleshooting", "topics": ["Using Multimeters and Testing Equipment", "Identifying Electrical Faults", "Repair Techniques", "Maintenance Procedures"]}]'::jsonb,
  'Electrical Department Faculty',
  'Licensed electricians with years of field experience.',
  20,
  true
),
(
  'Mobile Phone Repair', 
  'mobile-repair', 
  'Master smartphone diagnostics, component replacement, and software troubleshooting for various brands. Learn to repair common issues with smartphones and tablets.', 
  'IT', 
  'beginner',
  8, -- 2 months = ~8 weeks
  '2025-06-01', 
  14000, 
  '/course-mobile.png', 
  true,
  '["Basic knowledge of smartphones", "8th grade pass or equivalent"]'::jsonb,
  '[{"title": "Module 1: Mobile Device Fundamentals", "topics": ["Smartphone Architecture", "Operating Systems Overview", "Tools and Equipment", "Safety Procedures"]}, {"title": "Module 2: Hardware Repair", "topics": ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera and Speaker Fixes"]}, {"title": "Module 3: Software Troubleshooting", "topics": ["OS Updates and Recovery", "Data Backup and Restoration", "Performance Optimization", "Common Software Issues"]}]'::jsonb,
  'Mobile Repair Specialists',
  'Certified mobile device repair technicians.',
  15,
  true
),
(
  'Professional Cooking', 
  'professional-cooking', 
  'Develop culinary skills including food preparation, cooking techniques, and kitchen management. Learn to prepare a variety of dishes and manage a professional kitchen.', 
  'Hospitality', 
  'intermediate',
  12, -- 3 months = ~12 weeks
  '2025-06-15', 
  18000, 
  '/course-cooking.png', 
  false,
  '["Interest in culinary arts", "10th grade pass or equivalent"]'::jsonb,
  '[{"title": "Module 1: Culinary Fundamentals", "topics": ["Kitchen Safety and Sanitation", "Knife Skills and Cutting Techniques", "Cooking Methods", "Food Presentation"]}, {"title": "Module 2: International Cuisine", "topics": ["Nepali Cuisine", "Asian Cuisine", "Continental Dishes", "Desserts and Baking"]}, {"title": "Module 3: Kitchen Management", "topics": ["Menu Planning", "Inventory Management", "Cost Control", "Team Coordination"]}]'::jsonb,
  'Chef Instructors',
  'Professional chefs with hotel and restaurant experience.',
  20,
  true
),
(
  'Plumbing and Pipe Fitting', 
  'plumbing', 
  'Learn installation and repair of water supply systems, drainage, and fixtures for residential and commercial buildings. Master the skills needed for professional plumbing work.', 
  'Mechanical', 
  'beginner',
  8, -- 2 months = ~8 weeks
  '2025-07-01', 
  13000, 
  '/course-plumbing.png', 
  false,
  '["Basic mechanical aptitude", "8th grade pass or equivalent"]'::jsonb,
  '[]'::jsonb, -- Empty curriculum for now
  'Plumbing Department Faculty',
  'Licensed plumbers with commercial and residential experience.',
  18,
  true
),
(
  'Web Development', 
  'web-development', 
  'Learn to design and develop responsive websites using HTML, CSS, JavaScript, and popular frameworks. Build a portfolio of web projects and prepare for entry-level web development roles.', 
  'IT', 
  'beginner',
  16, -- 4 months = ~16 weeks
  '2025-05-10', 
  20000, 
  '/course-webdev.png', 
  false,
  '["Basic computer knowledge", "10th grade pass or equivalent"]'::jsonb,
  '[]'::jsonb, -- Empty curriculum for now
  'Web Development Faculty',
  'Full-stack developers with industry experience.',
  25,
  true
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON courses FOR SELECT USING (true);


