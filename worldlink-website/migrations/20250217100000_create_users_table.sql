-- -- Create the users table with constraints
-- CREATE TABLE public.users (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--     username VARCHAR(255) NOT NULL UNIQUE
--         CHECK (username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
--     password VARCHAR(255) NOT NULL
--         CHECK (char_length(password) >= 6),
--     role VARCHAR(50) NOT NULL DEFAULT 'user'
--         CHECK (role IN ('admin', 'user')),
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
-- );

-- -- Enable Row Level Security
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- -- Allow users to read their own data
-- CREATE POLICY "Users can read their own data"
-- ON public.users
-- FOR SELECT
-- USING (auth.uid() = id);

-- -- Allow users to update their own data
-- CREATE POLICY "Users can update their own data"
-- ON public.users
-- FOR UPDATE
-- USING (auth.uid() = id);

-- -- Create an index on username for faster lookups
-- CREATE INDEX users_username_idx ON public.users(username);

-- -- Function to update updated_at
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = timezone('utc'::text, now());
--     RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- -- Trigger for updated_at
-- CREATE TRIGGER update_users_updated_at
--     BEFORE UPDATE ON public.users
--     FOR EACH ROW
--     EXECUTE FUNCTION update_updated_at_column(); 