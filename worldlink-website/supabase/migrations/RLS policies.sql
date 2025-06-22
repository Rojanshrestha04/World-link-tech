-- Cleanup and consolidate RLS Policies

-- Drop all existing policies for relevant tables to ensure a clean slate
DROP POLICY IF EXISTS "Enable read access for all authenticated users on courses" ON public.courses;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on courses" ON public.courses;
DROP POLICY IF EXISTS "Enable update for all authenticated users on courses" ON public.courses;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on courses" ON public.courses;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Enable update for all authenticated users on news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on news_articles" ON public.news_articles;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on careers" ON public.careers;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on careers" ON public.careers;
DROP POLICY IF EXISTS "Enable update for all authenticated users on careers" ON public.careers;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on careers" ON public.careers;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable update for all authenticated users on gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on gallery_images" ON public.gallery_images;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Enable update for all authenticated users on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.testimonials;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on resources" ON public.resources;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on resources" ON public.resources;
DROP POLICY IF EXISTS "Enable update for all authenticated users on resources" ON public.resources;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on resources" ON public.resources;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on publications" ON public.publications;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on publications" ON public.publications;
DROP POLICY IF EXISTS "Enable update for all authenticated users on publications" ON public.publications;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on publications" ON public.publications;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on policies" ON public.policies;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on policies" ON public.policies;
DROP POLICY IF EXISTS "Enable update for all authenticated users on policies" ON public.policies;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on policies" ON public.policies;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on reports" ON public.reports;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on reports" ON public.reports;
DROP POLICY IF EXISTS "Enable update for all authenticated users on reports" ON public.reports;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on reports" ON public.reports;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on curriculums" ON public.curriculums;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on curriculums" ON public.curriculums;
DROP POLICY IF EXISTS "Enable update for all authenticated users on curriculums" ON public.curriculums;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on curriculums" ON public.curriculums;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable update for all authenticated users on contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable public insert for contact form" ON public.contact_submissions;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on application_submissions" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on application_submissions" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable update for all authenticated users on application_submissions" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on application_submissions" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.application_submissions;
DROP POLICY IF EXISTS "Enable public insert for application form" ON public.application_submissions;

DROP POLICY IF EXISTS "Enable read access for all authenticated users on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Enable update for all authenticated users on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on inquiries" ON public.inquiries;

-- Policies specifically for the 'users' table
DROP POLICY IF EXISTS "Enable read access for all authenticated users on users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for all authenticated users on users" ON public.users;
DROP POLICY IF EXISTS "Enable update for all authenticated users on users" ON public.users;
DROP POLICY IF EXISTS "Enable delete for all authenticated users on users" ON public.users;
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert data" ON public.users;
DROP POLICY IF EXISTS "Admins can delete any user" ON public.users;

-- Ensure RLS is enabled for tables that will have policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_submissions ENABLE ROW LEVEL SECURITY;

-- Re-create policies as per user's request

-- RLS Policies for 'courses' table
CREATE POLICY "Enable read access for all authenticated users on courses"
ON public.courses FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on courses"
ON public.courses FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on courses"
ON public.courses FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'news_articles' table
CREATE POLICY "Enable read access for all authenticated users on news_articles"
ON public.news_articles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on news_articles"
ON public.news_articles FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on news_articles"
ON public.news_articles FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on news_articles"
ON public.news_articles FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'careers' table
CREATE POLICY "Enable read access for all authenticated users on careers"
ON public.careers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on careers"
ON public.careers FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on careers"
ON public.careers FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on careers"
ON public.careers FOR DELETE
TO authenticated
USING (true);
alter policy "Enable read access for all users"
on "public"."careers"
to public
using (true);

-- RLS Policies for 'gallery_images' table
CREATE POLICY "Enable read access for all authenticated users on gallery_images"
ON public.gallery_images FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on gallery_images"
ON public.gallery_images FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on gallery_images"
ON public.gallery_images FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on gallery_images"
ON public.gallery_images FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'testimonials' table
CREATE POLICY "Enable read access for all authenticated users on testimonials"
ON public.testimonials FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on testimonials"
ON public.testimonials FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Enable update for all authenticated users on testimonials"
ON public.testimonials FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on testimonials"
ON public.testimonials FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'resources' table
CREATE POLICY "Enable read access for all authenticated users on resources"
ON public.resources FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on resources"
ON public.resources FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on resources"
ON public.resources FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on resources"
ON public.resources FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'publications' table
CREATE POLICY "Enable read access for all authenticated users on publications"
ON public.publications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on publications"
ON public.publications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on publications"
ON public.publications FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on publications"
ON public.publications FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'policies' table
CREATE POLICY "Enable read access for all authenticated users on policies"
ON public.policies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on policies"
ON public.policies FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on policies"
ON public.policies FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on policies"
ON public.policies FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'reports' table
CREATE POLICY "Enable read access for all authenticated users on reports"
ON public.reports FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on reports"
ON public.reports FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on reports"
ON public.reports FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on reports"
ON public.reports FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'curriculums' table
CREATE POLICY "Enable read access for all authenticated users on curriculums"
ON public.curriculums FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on curriculums"
ON public.curriculums FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on curriculums"
ON public.curriculums FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on curriculums"
ON public.curriculums FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'contact_submissions' table
CREATE POLICY "Enable read access for all authenticated users on contact_submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on contact_submissions"
ON public.contact_submissions FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on contact_submissions"
ON public.contact_submissions FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on contact_submissions"
ON public.contact_submissions FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'application_submissions' table
CREATE POLICY "Enable read access for all authenticated users on application_submissions"
ON public.application_submissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on application_submissions"
ON public.application_submissions FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on application_submissions"
ON public.application_submissions FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on application_submissions"
ON public.application_submissions FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'inquiries' table
CREATE POLICY "Enable read access for all authenticated users on inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on inquiries"
ON public.inquiries FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for 'users' table (Use with extreme caution)
CREATE POLICY "Enable read access for all authenticated users on users"
ON public.users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on users"
ON public.users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on users"
ON public.users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on users"
ON public.users FOR DELETE
TO authenticated
USING (true);
