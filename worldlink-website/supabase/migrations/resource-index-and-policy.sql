-- Create indexes for better performance
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_date ON resources(date);

CREATE INDEX idx_publications_resource_id ON publications(resource_id);
CREATE INDEX idx_publications_type ON publications(publication_type);

CREATE INDEX idx_policies_resource_id ON policies(resource_id);
CREATE INDEX idx_policies_type ON policies(policy_type);
CREATE INDEX idx_policies_effective_date ON policies(effective_date);

CREATE INDEX idx_reports_resource_id ON reports(resource_id);
CREATE INDEX idx_reports_type ON reports(report_type);
CREATE INDEX idx_reports_fiscal_year ON reports(fiscal_year);

CREATE INDEX idx_curriculums_resource_id ON curriculums(resource_id);
CREATE INDEX idx_curriculums_type ON curriculums(curriculum_type);
CREATE INDEX idx_curriculums_category ON curriculums(course_category);
CREATE INDEX idx_curriculums_occupation ON curriculums(occupation);
CREATE INDEX idx_curriculums_status ON curriculums(status);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculums ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON resources FOR SELECT USING (true);
CREATE POLICY "Public read access" ON publications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON policies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON reports FOR SELECT USING (true);
CREATE POLICY "Public read access" ON curriculums FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admin write access" ON resources FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON publications FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON policies FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON reports FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON curriculums FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create triggers for updated_at columns
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publications_updated_at
    BEFORE UPDATE ON publications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON policies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_curriculums_updated_at
    BEFORE UPDATE ON curriculums
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create views to easily query resources with their specific details
CREATE VIEW publications_view AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.file,
    r.category,
    r.date,
    p.publication_type,
    p.version,
    p.language,
    r.created_at,
    r.updated_at
FROM resources r
JOIN publications p ON r.id = p.resource_id;

CREATE VIEW policies_view AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.file,
    r.category,
    r.date,
    p.policy_type,
    p.effective_date,
    p.review_date,
    p.approved_by,
    p.version,
    r.created_at,
    r.updated_at
FROM resources r
JOIN policies p ON r.id = p.resource_id;

CREATE VIEW reports_view AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.file,
    r.category,
    r.date,
    rp.report_type,
    rp.reporting_period,
    rp.fiscal_year,
    rp.prepared_by,
    rp.approved_by,
    r.created_at,
    r.updated_at
FROM resources r
JOIN reports rp ON r.id = rp.resource_id;

CREATE VIEW curriculums_view AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.file,
    r.category,
    r.date,
    c.occupation,
    c.type,
    c.developed_by,
    c.curriculum_type,
    c.course_category,
    c.duration,
    c.credit_hours,
    c.prerequisites,
    c.learning_outcomes,
    c.assessment_methods,
    c.approved_date,
    c.revision_date,
    c.status,
    r.created_at,
    r.updated_at
FROM resources r
JOIN curriculums c ON r.id = c.resource_id;