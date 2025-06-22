-- Add full_name column to users table
ALTER TABLE public.users
ADD COLUMN full_name VARCHAR(255);

-- Update existing records to set full_name to an empty string if it's NULL
UPDATE public.users
SET full_name = ''
WHERE full_name IS NULL; 