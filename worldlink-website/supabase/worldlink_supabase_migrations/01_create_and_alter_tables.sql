-- =====================================================
-- WORLDLINK WEBSITE - TABLE CREATION AND ALTERATIONS
-- =====================================================
-- This file contains all CREATE TABLE and ALTER TABLE statements

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
-- Drop existing table and related objects if they exist
DO $$ 
BEGIN
    -- Drop trigger if it exists
    DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;

    -- Drop table if it exists
    DROP TABLE IF EXISTS public.users CASCADE;
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- Create the users table with proper structure
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'user'
        CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 2. COURSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT DEFAULT 'Beginner',
    duration TEXT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    prerequisites TEXT[],
    learning_outcomes TEXT[],
    course_outline JSONB,
    instructor_name TEXT,
    instructor_bio TEXT,
    instructor_image TEXT,
    max_students INTEGER,
    start_date DATE,
    end_date DATE,
    schedule TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 3. NEWS ARTICLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    category TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 4. GALLERY IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 5. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    quote TEXT NOT NULL,
    image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 6. CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 7. APPLICATION SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.application_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id INTEGER REFERENCES public.courses(id),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    education_level TEXT NOT NULL,
    previous_experience TEXT,
    motivation TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 8. CAREERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.careers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    salary_range TEXT,
    is_active BOOLEAN DEFAULT true,
    posted_date DATE DEFAULT CURRENT_DATE,
    application_deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 9. INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_interest TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 10. GENERAL SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.general_settings (
    id SERIAL PRIMARY KEY,
    site_name TEXT NOT NULL,
    site_description TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    social_facebook TEXT,
    social_twitter TEXT,
    social_linkedin TEXT,
    social_instagram TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 11. RESOURCES TABLE (Parent table for publications, policies, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    file TEXT NOT NULL,
    category TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 12. PUBLICATIONS TABLE (Child of resources)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.publications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    publication_type TEXT NOT NULL,
    author TEXT,
    isbn TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 13. POLICIES TABLE (Child of resources)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    policy_type TEXT NOT NULL,
    effective_date DATE,
    version TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 14. REPORTS TABLE (Child of resources)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    reporting_period TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 15. CURRICULUMS TABLE (Child of resources)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.curriculums (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES public.courses(id),
    curriculum_type TEXT NOT NULL,
    academic_year TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
