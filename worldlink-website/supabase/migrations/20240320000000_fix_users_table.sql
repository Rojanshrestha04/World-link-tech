-- Drop existing table and related objects if they exist
DO $$ 
BEGIN
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
    DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
    
    -- Drop trigger if it exists
    DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
    
    -- Drop function if it exists
    DROP FUNCTION IF EXISTS update_updated_at_column();
    
    -- Drop table if it exists
    DROP TABLE IF EXISTS public.users;
EXCEPTION
    WHEN undefined_table THEN
        -- Table doesn't exist, which is fine
        NULL;
END $$;

-- Create the users table with proper structure
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    role VARCHAR(50) NOT NULL DEFAULT 'user'
        CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Create index
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert the admin user
DO $$
DECLARE
    auth_user_id UUID;
BEGIN
    -- Get the auth user ID
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'niraj@envision.com';
    
    -- If the user exists in auth.users, insert into public.users
    IF auth_user_id IS NOT NULL THEN
        INSERT INTO public.users (id, email, role)
        VALUES (auth_user_id, 'niraj@envision.com', 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin';
    END IF;
END $$; 