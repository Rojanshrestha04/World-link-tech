-- Create parent resources table
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Publications', 'Policy', 'Reports', 'Curriculum')),
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create publications table (child of resources)
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  publication_type TEXT CHECK (publication_type IN ('handbook', 'calendar', 'newsletter', 'guide', 'manual')),
  version TEXT,
  language TEXT DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create policies table (child of resources)
CREATE TABLE policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  policy_type TEXT CHECK (policy_type IN ('admission', 'scholarship', 'conduct', 'academic', 'administrative')),
  effective_date DATE,
  review_date DATE,
  approved_by TEXT,
  version TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table (child of resources)
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  report_type TEXT CHECK (report_type IN ('annual', 'training', 'partnership', 'financial', 'performance')),
  reporting_period TEXT,
  fiscal_year TEXT,
  prepared_by TEXT,
  approved_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create curriculums table (child of resources) - with additional fields
CREATE TABLE curriculums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  occupation TEXT NOT NULL,
  type TEXT NOT NULL, -- Level 1, Level 2, Level 3, etc.
  developed_by TEXT NOT NULL,
  curriculum_type TEXT NOT NULL CHECK (curriculum_type IN ('Curriculum', 'OP', 'OSS/NOSS')),
  course_category TEXT CHECK (course_category IN ('IT', 'Electrical', 'Mechanical', 'Hospitality', 'Construction', 'Agriculture')),
  duration TEXT,
  credit_hours INTEGER,
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  assessment_methods TEXT[],
  approved_date DATE,
  revision_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived', 'under_review')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);