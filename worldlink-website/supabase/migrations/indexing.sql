-- Create indexes for better query performance
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_featured ON courses(featured);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_news_articles_slug ON news_articles(slug);
CREATE INDEX idx_news_articles_category ON news_articles(category);
CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_application_submissions_status ON application_submissions(status);

-- Create indexes for careers table
CREATE INDEX idx_careers_slug ON careers(slug);
CREATE INDEX idx_careers_status ON careers(status);
CREATE INDEX idx_careers_job_type ON careers(job_type);
CREATE INDEX idx_careers_experience_level ON careers(experience_level);
CREATE INDEX idx_careers_featured ON careers(featured);
CREATE INDEX idx_careers_application_deadline ON careers(application_deadline);
CREATE INDEX idx_careers_posted_date ON careers(posted_date);

-- Create indexes for inquiries table
CREATE INDEX idx_inquiries_inquiry_id ON inquiries(inquiry_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_type ON inquiries(inquiry_type);
CREATE INDEX idx_inquiries_priority ON inquiries(priority);
CREATE INDEX idx_inquiries_assigned_to ON inquiries(assigned_to);
CREATE INDEX idx_inquiries_follow_up_date ON inquiries(follow_up_date);
CREATE INDEX idx_inquiries_source ON inquiries(source);

-- Enable RLS
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for careers (public read, admin write)
CREATE POLICY "Public read access" ON careers FOR SELECT USING (status = 'active');
CREATE POLICY "Admin full access" ON careers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for inquiries (admin-only access)
CREATE POLICY "Admin access" ON inquiries FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create trigger for careers table
CREATE TRIGGER update_careers_updated_at
    BEFORE UPDATE ON careers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for inquiries table  
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();