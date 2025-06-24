-- =====================================================
-- WORLDLINK WEBSITE - ROW LEVEL SECURITY POLICIES
-- =====================================================
-- This file contains all RLS policies for secure data access

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.general_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- DROP EXISTING POLICIES (CLEANUP)
-- =====================================================

-- Users table policies
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Allow user registration" ON public.users;
DROP POLICY IF EXISTS "Admin full access to users" ON public.users;

-- Courses table policies
DROP POLICY IF EXISTS "Public read access for courses" ON public.courses;
DROP POLICY IF EXISTS "Admin full access for courses" ON public.courses;

-- News articles table policies
DROP POLICY IF EXISTS "Public read access for published news" ON public.news_articles;
DROP POLICY IF EXISTS "Admin full access for news" ON public.news_articles;

-- Gallery images table policies
DROP POLICY IF EXISTS "Public read access for gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin full access for gallery" ON public.gallery_images;

-- Testimonials table policies
DROP POLICY IF EXISTS "Public read access for testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin full access for testimonials" ON public.testimonials;

-- Contact submissions table policies
DROP POLICY IF EXISTS "Public can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can manage contact submissions" ON public.contact_submissions;

-- Application submissions table policies
DROP POLICY IF EXISTS "Public can submit applications" ON public.application_submissions;
DROP POLICY IF EXISTS "Admin can manage applications" ON public.application_submissions;

-- Careers table policies
DROP POLICY IF EXISTS "Public read access for careers" ON public.careers;
DROP POLICY IF EXISTS "Admin full access for careers" ON public.careers;

-- Inquiries table policies
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin can manage inquiries" ON public.inquiries;

-- General settings table policies
DROP POLICY IF EXISTS "Public read access for settings" ON public.general_settings;
DROP POLICY IF EXISTS "Admin update access for settings" ON public.general_settings;

-- Resources table policies
DROP POLICY IF EXISTS "Public read access for resources" ON public.resources;
DROP POLICY IF EXISTS "Admin full access for resources" ON public.resources;

-- Publications table policies
DROP POLICY IF EXISTS "Public read access for publications" ON public.publications;
DROP POLICY IF EXISTS "Admin full access for publications" ON public.publications;

-- Policies table policies
DROP POLICY IF EXISTS "Public read access for policies" ON public.policies;
DROP POLICY IF EXISTS "Admin full access for policies" ON public.policies;

-- Reports table policies
DROP POLICY IF EXISTS "Public read access for reports" ON public.reports;
DROP POLICY IF EXISTS "Admin full access for reports" ON public.reports;

-- Curriculums table policies
DROP POLICY IF EXISTS "Public read access for curriculums" ON public.curriculums;
DROP POLICY IF EXISTS "Admin full access for curriculums" ON public.curriculums;

-- Teams table policies
DROP POLICY IF EXISTS "Public read access for teams" ON public.teams;
DROP POLICY IF EXISTS "Admin full access for teams" ON public.teams;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Users can read their own data
CREATE POLICY "Users can read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own data, admins can update any user
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (
    auth.uid() = id OR 
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Allow user registration (insert their own record)
CREATE POLICY "Allow user registration"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Admin full access to users table
CREATE POLICY "Admin full access to users"
ON public.users
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- COURSES TABLE POLICIES
-- =====================================================

-- Public can read active courses
CREATE POLICY "Public read access for courses"
ON public.courses
FOR SELECT
USING (is_active = true);

-- Admin full access to courses
CREATE POLICY "Admin full access for courses"
ON public.courses
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- NEWS ARTICLES TABLE POLICIES
-- =====================================================

-- Public can read published news articles
CREATE POLICY "Public read access for published news"
ON public.news_articles
FOR SELECT
USING (is_published = true);

-- Admin full access to news articles
CREATE POLICY "Admin full access for news"
ON public.news_articles
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- GALLERY IMAGES TABLE POLICIES
-- =====================================================

-- Public can read all gallery images
CREATE POLICY "Public read access for gallery"
ON public.gallery_images
FOR SELECT
USING (true);

-- Admin full access to gallery
CREATE POLICY "Admin full access for gallery"
ON public.gallery_images
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- TESTIMONIALS TABLE POLICIES
-- =====================================================

-- Public can read active testimonials
CREATE POLICY "Public read access for testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Admin full access to testimonials
CREATE POLICY "Admin full access for testimonials"
ON public.testimonials
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- CONTACT SUBMISSIONS TABLE POLICIES
-- =====================================================

-- Anyone can submit contact forms (including anonymous users)
CREATE POLICY "Public can submit contact forms"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Admin can read and manage contact submissions
CREATE POLICY "Admin can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- APPLICATION SUBMISSIONS TABLE POLICIES
-- =====================================================

-- Anyone can submit applications (including anonymous users)
CREATE POLICY "Public can submit applications"
ON public.application_submissions
FOR INSERT
WITH CHECK (true);

-- Admin can manage applications
CREATE POLICY "Admin can manage applications"
ON public.application_submissions
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- CAREERS TABLE POLICIES
-- =====================================================

-- Public can read active career postings
CREATE POLICY "Public read access for careers"
ON public.careers
FOR SELECT
USING (is_active = true);

-- Admin full access to careers
CREATE POLICY "Admin full access for careers"
ON public.careers
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- INQUIRIES TABLE POLICIES
-- =====================================================

-- Anyone can submit inquiries (including anonymous users)
CREATE POLICY "Public can submit inquiries"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Admin can manage inquiries
CREATE POLICY "Admin can manage inquiries"
ON public.inquiries
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- GENERAL SETTINGS TABLE POLICIES
-- =====================================================

-- Public can read general settings
CREATE POLICY "Public read access for settings"
ON public.general_settings
FOR SELECT
USING (true);

-- Admin can update general settings
CREATE POLICY "Admin update access for settings"
ON public.general_settings
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Admin can insert general settings
CREATE POLICY "Admin insert access for settings"
ON public.general_settings
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- RESOURCES TABLE POLICIES
-- =====================================================

-- Public can read active resources
CREATE POLICY "Public read access for resources"
ON public.resources
FOR SELECT
USING (is_active = true);

-- Admin full access to resources
CREATE POLICY "Admin full access for resources"
ON public.resources
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- PUBLICATIONS TABLE POLICIES
-- =====================================================

-- Public can read publications (through resources join)
CREATE POLICY "Public read access for publications"
ON public.publications
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.resources 
        WHERE id = resource_id AND is_active = true
    )
);

-- Admin full access to publications
CREATE POLICY "Admin full access for publications"
ON public.publications
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- POLICIES TABLE POLICIES
-- =====================================================

-- Public can read policies (through resources join)
CREATE POLICY "Public read access for policies"
ON public.policies
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.resources 
        WHERE id = resource_id AND is_active = true
    )
);

-- Admin full access to policies
CREATE POLICY "Admin full access for policies"
ON public.policies
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- REPORTS TABLE POLICIES
-- =====================================================

-- Public can read reports (through resources join)
CREATE POLICY "Public read access for reports"
ON public.reports
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.resources 
        WHERE id = resource_id AND is_active = true
    )
);

-- Admin full access to reports
CREATE POLICY "Admin full access for reports"
ON public.reports
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- CURRICULUMS TABLE POLICIES
-- =====================================================

-- Public can read curriculums (through resources join)
CREATE POLICY "Public read access for curriculums"
ON public.curriculums
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.resources 
        WHERE id = resource_id AND is_active = true
    )
);

-- Admin full access to curriculums
CREATE POLICY "Admin full access for curriculums"
ON public.curriculums
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- TEAMS TABLE POLICIES
-- =====================================================

-- Public can read active team members
CREATE POLICY "Public read access for teams"
ON public.teams
FOR SELECT
USING (is_active = true);

-- Admin full access to teams
CREATE POLICY "Admin full access for teams"
ON public.teams
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
