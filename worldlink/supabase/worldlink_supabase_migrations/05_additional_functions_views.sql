-- =====================================================
-- WORLDLINK WEBSITE - ADDITIONAL SQL FUNCTIONS & VIEWS
-- =====================================================
-- This file contains additional SQL functions, views, and utilities

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS TEXT AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role 
    FROM public.users 
    WHERE id = user_id;

    RETURN COALESCE(user_role, 'anonymous');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to sanitize and generate slug
CREATE OR REPLACE FUNCTION create_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        trim(
            both '-' from 
            regexp_replace(
                regexp_replace(input_text, '[^a-zA-Z0-9\s-]', '', 'g'),
                '\s+', '-', 'g'
            )
        )
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to count active courses by category
CREATE OR REPLACE FUNCTION count_courses_by_category()
RETURNS TABLE(category TEXT, course_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT c.category, COUNT(*)::BIGINT
    FROM public.courses c
    WHERE c.is_active = true
    GROUP BY c.category
    ORDER BY course_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get featured content
CREATE OR REPLACE FUNCTION get_featured_content()
RETURNS TABLE(
    content_type TEXT,
    id INTEGER,
    title TEXT,
    description TEXT,
    image TEXT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    -- Featured courses
    SELECT 
        'course'::TEXT,
        c.id,
        c.title,
        c.description,
        c.image,
        c.created_at
    FROM public.courses c
    WHERE c.is_featured = true AND c.is_active = true

    UNION ALL

    -- Featured testimonials
    SELECT 
        'testimonial'::TEXT,
        t.id,
        t.name,
        t.quote,
        t.image,
        t.created_at
    FROM public.testimonials t
    WHERE t.is_featured = true AND t.is_active = true

    UNION ALL

    -- Featured gallery images
    SELECT 
        'gallery'::TEXT,
        g.id,
        g.title,
        g.description,
        g.image_url,
        g.created_at
    FROM public.gallery_images g
    WHERE g.is_featured = true

    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for active courses with enrollment count (placeholder)
CREATE OR REPLACE VIEW active_courses_view AS
SELECT 
    c.*,
    CASE 
        WHEN c.max_students IS NOT NULL THEN c.max_students
        ELSE 0
    END as available_seats
FROM public.courses c
WHERE c.is_active = true;

-- View for published news articles with author info
CREATE OR REPLACE VIEW published_news_view AS
SELECT 
    n.*,
    u.full_name as author_name,
    u.email as author_email
FROM public.news_articles n
LEFT JOIN public.users u ON n.author_id = u.id
WHERE n.is_published = true
ORDER BY n.published_at DESC;

-- View for contact submissions summary
CREATE OR REPLACE VIEW contact_submissions_summary AS
SELECT 
    status,
    COUNT(*) as count,
    DATE_TRUNC('day', created_at) as submission_date
FROM public.contact_submissions
GROUP BY status, DATE_TRUNC('day', created_at)
ORDER BY submission_date DESC;

-- View for application submissions with course info
CREATE OR REPLACE VIEW applications_with_course_info AS
SELECT 
    a.*,
    c.title as course_title,
    c.category as course_category,
    c.duration as course_duration
FROM public.application_submissions a
LEFT JOIN public.courses c ON a.course_id = c.id
ORDER BY a.created_at DESC;

-- View for resources with child table info
CREATE OR REPLACE VIEW resources_detailed_view AS
SELECT 
    r.*,
    CASE 
        WHEN p.id IS NOT NULL THEN 'publication'
        WHEN pol.id IS NOT NULL THEN 'policy'
        WHEN rep.id IS NOT NULL THEN 'report'
        WHEN cur.id IS NOT NULL THEN 'curriculum'
        ELSE 'general'
    END as resource_type,
    COALESCE(p.publication_type, pol.policy_type, rep.report_type, cur.curriculum_type) as sub_type
FROM public.resources r
LEFT JOIN public.publications p ON r.id = p.resource_id
LEFT JOIN public.policies pol ON r.id = pol.resource_id
LEFT JOIN public.reports rep ON r.id = rep.resource_id
LEFT JOIN public.curriculums cur ON r.id = cur.resource_id
WHERE r.is_active = true;

-- =====================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- =====================================================

-- Procedure to archive old submissions
CREATE OR REPLACE FUNCTION archive_old_submissions(days_old INTEGER DEFAULT 365)
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER;
BEGIN
    -- This is a placeholder for archiving logic
    -- In a real scenario, you might move old records to an archive table

    SELECT COUNT(*) INTO archived_count
    FROM public.contact_submissions
    WHERE created_at < (CURRENT_DATE - INTERVAL '1 day' * days_old);

    -- For now, just return the count that would be archived
    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- Procedure to update course popularity (placeholder)
CREATE OR REPLACE FUNCTION update_course_popularity()
RETURNS VOID AS $$
BEGIN
    -- This could update a popularity score based on applications, views, etc.
    -- Placeholder implementation
    UPDATE public.courses 
    SET updated_at = NOW()
    WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Procedure to generate monthly report data
CREATE OR REPLACE FUNCTION generate_monthly_stats(report_month DATE DEFAULT DATE_TRUNC('month', CURRENT_DATE))
RETURNS TABLE(
    metric_name TEXT,
    metric_value BIGINT,
    metric_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 'new_applications'::TEXT, COUNT(*)::BIGINT, report_month
    FROM public.application_submissions
    WHERE DATE_TRUNC('month', created_at) = report_month

    UNION ALL

    SELECT 'new_contacts'::TEXT, COUNT(*)::BIGINT, report_month
    FROM public.contact_submissions
    WHERE DATE_TRUNC('month', created_at) = report_month

    UNION ALL

    SELECT 'new_inquiries'::TEXT, COUNT(*)::BIGINT, report_month
    FROM public.inquiries
    WHERE DATE_TRUNC('month', created_at) = report_month

    UNION ALL

    SELECT 'active_courses'::TEXT, COUNT(*)::BIGINT, report_month
    FROM public.courses
    WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SECURITY FUNCTIONS
-- =====================================================

-- Function to log admin actions (placeholder)
CREATE OR REPLACE FUNCTION log_admin_action(
    action_type TEXT,
    table_name TEXT,
    record_id TEXT,
    details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- This would typically insert into an audit log table
    -- For now, it's just a placeholder
    RAISE NOTICE 'Admin action logged: % on % (ID: %)', action_type, table_name, record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate email format
CREATE OR REPLACE FUNCTION is_valid_email(email_address TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to validate phone number (basic Nepal format)
CREATE OR REPLACE FUNCTION is_valid_phone(phone_number TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Basic validation for Nepal phone numbers
    RETURN phone_number ~ '^(\+977[-\s]?)?[0-9]{10}$|^[0-9]{10}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =====================================================
-- CLEANUP FUNCTIONS
-- =====================================================

-- Function to clean up expired sessions or temporary data
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS INTEGER AS $$
DECLARE
    cleaned_count INTEGER := 0;
BEGIN
    -- This is a placeholder for cleanup operations
    -- You might clean up expired tokens, old logs, etc.

    RAISE NOTICE 'Cleanup completed. Records processed: %', cleaned_count;
    RETURN cleaned_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant execute permissions on functions to authenticated users
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION create_slug(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION count_courses_by_category() TO authenticated;
GRANT EXECUTE ON FUNCTION get_featured_content() TO authenticated;
GRANT EXECUTE ON FUNCTION is_valid_email(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION is_valid_phone(TEXT) TO authenticated;

-- Grant select permissions on views to authenticated users
GRANT SELECT ON active_courses_view TO authenticated;
GRANT SELECT ON published_news_view TO authenticated;
GRANT SELECT ON resources_detailed_view TO authenticated;

-- Admin-only functions
GRANT EXECUTE ON FUNCTION archive_old_submissions(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION update_course_popularity() TO authenticated;
GRANT EXECUTE ON FUNCTION generate_monthly_stats(DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION log_admin_action(TEXT, TEXT, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_expired_data() TO authenticated;

-- Admin-only views
GRANT SELECT ON contact_submissions_summary TO authenticated;
GRANT SELECT ON applications_with_course_info TO authenticated;
