-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read access" ON courses;
DROP POLICY IF EXISTS "Admin access" ON courses;

-- Create policies for courses table
CREATE POLICY "Public read access" ON courses FOR SELECT USING (true);
CREATE POLICY "Admin access" ON courses FOR ALL USING (auth.jwt() ->> 'role' = 'admin'); 