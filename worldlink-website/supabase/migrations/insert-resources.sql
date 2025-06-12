-- Insert resources data (parent records) with proper UUIDs
INSERT INTO resources (id, title, description, file, category, date) VALUES
-- Publications
(gen_random_uuid(), 'Student Handbook 2025', 'Comprehensive guide for students including rules, regulations, and resources available at the institute.', '/resources/student-handbook-2025.pdf', 'Publications', 'February 5, 2025'),
(gen_random_uuid(), 'Academic Calendar 2025', 'Calendar of academic activities, holidays, and important dates for the year 2025.', '/resources/academic-calendar-2025.pdf', 'Publications', 'December 20, 2024'),
(gen_random_uuid(), 'Institute Newsletter - March 2025', 'Monthly newsletter featuring student achievements, upcoming events, and institute updates.', '/resources/newsletter-march-2025.pdf', 'Publications', 'March 1, 2025'),

-- Insert publications data (make sure resources exist first)
INSERT INTO publications (resource_id, publication_type, version, language)
SELECT r.id, 'handbook', '2025.1', 'English'
FROM resources r WHERE r.title = 'Student Handbook 2025' AND r.category = 'Publications'
UNION ALL
SELECT r.id, 'calendar', '2025', 'English'
FROM resources r WHERE r.title = 'Academic Calendar 2025' AND r.category = 'Publications'
UNION ALL
SELECT r.id, 'newsletter', 'March 2025', 'English'
FROM resources r WHERE r.title = 'Institute Newsletter - March 2025' AND r.category = 'Publications';

-- Insert policies data
INSERT INTO policies (resource_id, policy_type, effective_date, review_date, approved_by, version)
SELECT r.id, 'admission', '2025-01-01'::date, '2025-12-31'::date, 'Academic Board', 'v2.1'
FROM resources r WHERE r.title = 'Admission Policy' AND r.category = 'Policy'
UNION ALL
SELECT r.id, 'scholarship', '2024-12-01'::date, '2025-11-30'::date, 'Management Committee', 'v1.3'
FROM resources r WHERE r.title = 'Scholarship Policy' AND r.category = 'Policy'
UNION ALL
SELECT r.id, 'conduct', '2025-01-15'::date, '2026-01-15'::date, 'Disciplinary Committee', 'v3.0'
FROM resources r WHERE r.title = 'Student Code of Conduct' AND r.category = 'Policy';

-- Insert reports data
INSERT INTO reports (resource_id, report_type, reporting_period, fiscal_year, prepared_by, approved_by)
SELECT r.id, 'annual', '2024-01-01 to 2024-12-31', '2024-25', 'Academic Department', 'Director'
FROM resources r WHERE r.title = 'Annual Training Report 2024' AND r.category = 'Reports'
UNION ALL
SELECT r.id, 'partnership', '2024-01-01 to 2024-12-31', '2024-25', 'Industry Relations Team', 'Director'
FROM resources r WHERE r.title = 'Industry Partnership Report' AND r.category = 'Reports'
UNION ALL
SELECT r.id, 'financial', '2024-01-01 to 2024-12-31', '2024-25', 'Finance Department', 'Management Board'
FROM resources r WHERE r.title = 'Financial Performance Report 2024' AND r.category = 'Reports';

-- Insert curriculums data
INSERT INTO curriculums (resource_id, occupation, type, developed_by, curriculum_type, course_category, duration, credit_hours, prerequisites, learning_outcomes, assessment_methods, approved_date, status)
SELECT r.id, 'Computer Hardware Technician', 'Level 2', 'CTEVT', 'Curriculum', 'IT', '3 months', 240, 
 ARRAY['Basic computer knowledge', '10th grade pass or equivalent'], 
 ARRAY['Assemble computer systems', 'Troubleshoot hardware issues', 'Configure networks', 'Maintain computer systems'],
 ARRAY['Practical assessment', 'Written examination', 'Project work'], '2025-01-15'::date, 'active'
FROM resources r WHERE r.title = 'Computer Hardware & Networking Curriculum' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Electrical Technician', 'Level 1', 'CTEVT', 'Curriculum', 'Electrical', '2 months', 160,
 ARRAY['Basic understanding of electricity', '8th grade pass or equivalent'],
 ARRAY['Install electrical wiring', 'Read electrical diagrams', 'Follow safety protocols', 'Troubleshoot electrical faults'],
 ARRAY['Practical demonstration', 'Safety assessment', 'Written test'], '2025-01-20'::date, 'active'
FROM resources r WHERE r.title = 'Electrical House Wiring Curriculum' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Mobile Repair Technician', 'Level 1', 'CTEVT', 'Curriculum', 'IT', '2 months', 120,
 ARRAY['Basic knowledge of smartphones', '8th grade pass or equivalent'],
 ARRAY['Diagnose mobile issues', 'Replace components', 'Software troubleshooting', 'Customer service'],
 ARRAY['Hands-on repair test', 'Component identification', 'Customer interaction assessment'], '2025-02-01'::date, 'active'
FROM resources r WHERE r.title = 'Mobile Phone Repair Curriculum' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Web Developer', 'Level 3', 'Industry Experts', 'OP', 'IT', '4 months', 320,
 ARRAY['Basic computer knowledge', '10th grade pass or equivalent'],
 ARRAY['Develop responsive websites', 'Use modern frameworks', 'Database integration', 'Deploy applications'],
 ARRAY['Portfolio project', 'Code review', 'Technical interview'], '2025-02-20'::date, 'active'
FROM resources r WHERE r.title = 'Web Development Occupational Profile' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Professional Cook', 'Level 2', 'Hospitality Industry Association', 'OP', 'Hospitality', '3 months', 240,
 ARRAY['Interest in culinary arts', '10th grade pass or equivalent'],
 ARRAY['Food preparation techniques', 'Kitchen management', 'Menu planning', 'Food safety compliance'],
 ARRAY['Practical cooking test', 'Menu presentation', 'Food safety certification'], '2025-02-10'::date, 'active'
FROM resources r WHERE r.title = 'Professional Cooking Occupational Profile' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Plumber', 'Level 1', 'National Skill Testing Board', 'OSS/NOSS', 'Mechanical', '2 months', 160,
 ARRAY['Basic mechanical aptitude', '8th grade pass or equivalent'],
 ARRAY['Install plumbing systems', 'Repair pipe fittings', 'Water system maintenance', 'Safety procedures'],
 ARRAY['Practical installation test', 'Safety compliance check', 'Problem-solving assessment'], '2025-01-25'::date, 'active'
FROM resources r WHERE r.title = 'Plumbing NOSS Standard' AND r.category = 'Curriculum'
UNION ALL
SELECT r.id, 'Welder', 'Level 2', 'CTEVT', 'OSS/NOSS', 'Mechanical', '3 months', 200,
 ARRAY['Basic mechanical knowledge', '8th grade pass or equivalent'],
 ARRAY['Various welding techniques', 'Metal fabrication', 'Safety protocols', 'Quality control'],
 ARRAY['Welding practical test', 'Safety assessment', 'Quality inspection'], '2025-03-01'::date, 'active'
FROM resources r WHERE r.title = 'Welding OSS Standard' AND r.category = 'Curriculum';