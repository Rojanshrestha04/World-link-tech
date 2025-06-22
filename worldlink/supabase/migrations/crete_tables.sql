-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- Create application_submissions table
CREATE TABLE application_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  education TEXT NOT NULL,
  course TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  how_did_you_hear TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  quote TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_articles table
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add published column to news_articles table
ALTER TABLE news_articles
ADD COLUMN published BOOLEAN DEFAULT false;

-- Update existing records to be published by default
UPDATE news_articles
SET published = true
WHERE published IS NULL; 

ALTER TABLE news_articles
ALTER COLUMN date SET DEFAULT now();


-- Create careers table
CREATE TABLE careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements JSONB, -- Array of requirements
  responsibilities JSONB, -- Array of responsibilities
  benefits JSONB, -- Array of benefits
  skills_required JSONB, -- Array of required skills
  application_deadline DATE,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  featured BOOLEAN DEFAULT FALSE,
  remote_work BOOLEAN DEFAULT FALSE,
  posted_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE careers
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id TEXT UNIQUE NOT NULL, -- e.g., "INQ-1001"
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('general', 'admission', 'fees', 'job', 'technical', 'career', 'scholarship')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'responded', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to UUID REFERENCES users(id),
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'phone', 'email', 'social-media', 'referral')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);