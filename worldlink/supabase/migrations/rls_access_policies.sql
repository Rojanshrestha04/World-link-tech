-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON contact_submissions;

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON application_submissions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON application_submissions;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON application_submissions;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON application_submissions;

-- Create policies for contact_submissions
CREATE POLICY "Enable read access for authenticated users" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON contact_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON contact_submissions
    FOR DELETE
    TO authenticated
    USING (true);

-- Create policies for application_submissions
CREATE POLICY "Enable read access for authenticated users" ON application_submissions
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON application_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON application_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON application_submissions
    FOR DELETE
    TO authenticated
    USING (true);

-- Create policies for testimonials
CREATE POLICY "Enable read access for all users" ON testimonials
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON testimonials
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON testimonials
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON testimonials
    FOR DELETE
    TO authenticated
    USING (true);

-- Create policies for gallery_images
CREATE POLICY "Enable read access for all users" ON gallery_images
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON gallery_images
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON gallery_images
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON gallery_images
    FOR DELETE
    TO authenticated
    USING (true);

-- Create policies for news_articles
CREATE POLICY "Enable read access for all users" ON news_articles
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON news_articles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON news_articles
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON news_articles
    FOR DELETE
    TO authenticated
    USING (true);


CREATE POLICY "Enable public insert for contact form" ON contact_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable public insert for application form" ON application_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);