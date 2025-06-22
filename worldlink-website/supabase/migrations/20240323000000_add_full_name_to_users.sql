-- Add full_name column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'full_name'
    ) THEN
        ALTER TABLE public.users
        ADD COLUMN full_name VARCHAR(255);
    END IF;
END $$;

-- Update existing records to set full_name to an empty string if it's NULL
UPDATE public.users
SET full_name = ''
WHERE full_name IS NULL;

-- Add a comment to the column
COMMENT ON COLUMN public.users.full_name IS 'The full name of the user'; 