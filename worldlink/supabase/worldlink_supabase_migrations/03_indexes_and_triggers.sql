-- =====================================================
-- WORLDLINK WEBSITE - INDEXES AND TRIGGERS
-- =====================================================
-- This file contains all CREATE INDEX and TRIGGER statements

-- =====================================================
-- 1. INDEXES FOR USERS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- =====================================================
-- 2. INDEXES FOR COURSES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON public.courses(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_is_featured ON public.courses(is_featured);
CREATE INDEX IF NOT EXISTS idx_courses_level ON public.courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_start_date ON public.courses(start_date);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON public.courses(created_at);

-- =====================================================
-- 3. INDEXES FOR NEWS ARTICLES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON public.news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_is_published ON public.news_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_news_articles_author_id ON public.news_articles(author_id);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON public.news_articles(published_at);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON public.news_articles(created_at);

-- =====================================================
-- 4. INDEXES FOR GALLERY IMAGES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON public.gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_is_featured ON public.gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON public.gallery_images(created_at);

-- =====================================================
-- 5. INDEXES FOR TESTIMONIALS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON public.testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at);

-- =====================================================
-- 6. INDEXES FOR CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at);

-- =====================================================
-- 7. INDEXES FOR APPLICATION SUBMISSIONS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_application_submissions_course_id ON public.application_submissions(course_id);
CREATE INDEX IF NOT EXISTS idx_application_submissions_status ON public.application_submissions(status);
CREATE INDEX IF NOT EXISTS idx_application_submissions_email ON public.application_submissions(email);
CREATE INDEX IF NOT EXISTS idx_application_submissions_created_at ON public.application_submissions(created_at);

-- =====================================================
-- 8. INDEXES FOR CAREERS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_careers_department ON public.careers(department);
CREATE INDEX IF NOT EXISTS idx_careers_location ON public.careers(location);
CREATE INDEX IF NOT EXISTS idx_careers_employment_type ON public.careers(employment_type);
CREATE INDEX IF NOT EXISTS idx_careers_is_active ON public.careers(is_active);
CREATE INDEX IF NOT EXISTS idx_careers_posted_date ON public.careers(posted_date);
CREATE INDEX IF NOT EXISTS idx_careers_application_deadline ON public.careers(application_deadline);

-- =====================================================
-- 9. INDEXES FOR INQUIRIES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_course_interest ON public.inquiries(course_interest);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at);

-- =====================================================
-- 10. INDEXES FOR RESOURCES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_date ON public.resources(date);
CREATE INDEX IF NOT EXISTS idx_resources_is_active ON public.resources(is_active);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON public.resources(created_at);

-- =====================================================
-- 11. INDEXES FOR PUBLICATIONS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_publications_resource_id ON public.publications(resource_id);
CREATE INDEX IF NOT EXISTS idx_publications_publication_type ON public.publications(publication_type);
CREATE INDEX IF NOT EXISTS idx_publications_author ON public.publications(author);

-- =====================================================
-- 12. INDEXES FOR POLICIES TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_policies_resource_id ON public.policies(resource_id);
CREATE INDEX IF NOT EXISTS idx_policies_policy_type ON public.policies(policy_type);
CREATE INDEX IF NOT EXISTS idx_policies_effective_date ON public.policies(effective_date);

-- =====================================================
-- 13. INDEXES FOR REPORTS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_reports_resource_id ON public.reports(resource_id);
CREATE INDEX IF NOT EXISTS idx_reports_report_type ON public.reports(report_type);
CREATE INDEX IF NOT EXISTS idx_reports_reporting_period ON public.reports(reporting_period);

-- =====================================================
-- 14. INDEXES FOR CURRICULUMS TABLE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_curriculums_resource_id ON public.curriculums(resource_id);
CREATE INDEX IF NOT EXISTS idx_curriculums_course_id ON public.curriculums(course_id);
CREATE INDEX IF NOT EXISTS idx_curriculums_curriculum_type ON public.curriculums(curriculum_type);
CREATE INDEX IF NOT EXISTS idx_curriculums_academic_year ON public.curriculums(academic_year);

-- =====================================================
-- TRIGGER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
        NEW.slug = trim(both '-' from NEW.slug);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update last_sign_in_at when user signs in
CREATE OR REPLACE FUNCTION update_last_sign_in()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users 
    SET last_sign_in_at = timezone('utc'::text, now())
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TRIGGERS FOR UPDATED_AT COLUMNS
-- =====================================================

-- Users table trigger
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Courses table trigger
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- News articles table trigger
CREATE TRIGGER update_news_articles_updated_at
    BEFORE UPDATE ON public.news_articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- General settings table trigger
CREATE TRIGGER update_general_settings_updated_at
    BEFORE UPDATE ON public.general_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGERS FOR SLUG GENERATION
-- =====================================================

-- Courses slug generation trigger
CREATE TRIGGER generate_courses_slug
    BEFORE INSERT OR UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION generate_slug_from_title();

-- News articles slug generation trigger
CREATE TRIGGER generate_news_articles_slug
    BEFORE INSERT OR UPDATE ON public.news_articles
    FOR EACH ROW
    EXECUTE FUNCTION generate_slug_from_title();

-- =====================================================
-- TRIGGERS FOR PUBLISHED_AT TIMESTAMP
-- =====================================================

-- Function to set published_at when is_published becomes true
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_published = true AND (OLD.is_published = false OR OLD.is_published IS NULL) THEN
        NEW.published_at = timezone('utc'::text, now());
    ELSIF NEW.is_published = false THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- News articles published_at trigger
CREATE TRIGGER set_news_articles_published_at
    BEFORE UPDATE ON public.news_articles
    FOR EACH ROW
    EXECUTE FUNCTION set_published_at();
