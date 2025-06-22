-- Drop the column if it exists (to avoid conflicts)
ALTER TABLE public.users DROP COLUMN IF EXISTS last_sign_in_at;

-- Add last_sign_in_at column
ALTER TABLE public.users
ADD COLUMN last_sign_in_at TIMESTAMP WITH TIME ZONE;

-- Add a comment to the column
COMMENT ON COLUMN public.users.last_sign_in_at IS 'Timestamp of the user''s last sign in'; 