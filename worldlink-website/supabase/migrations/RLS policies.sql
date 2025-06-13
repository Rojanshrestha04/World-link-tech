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