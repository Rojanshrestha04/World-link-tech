-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;

-- Create new policies with proper permissions
CREATE POLICY "Users can read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id OR auth.role() = 'authenticated');

CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id);