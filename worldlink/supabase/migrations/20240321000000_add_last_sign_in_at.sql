-- Add last_sign_in_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'last_sign_in_at'
    ) THEN
        ALTER TABLE public.users
        ADD COLUMN last_sign_in_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Add a comment to the column
COMMENT ON COLUMN public.users.last_sign_in_at IS 'Timestamp of the user''s last sign in'; 