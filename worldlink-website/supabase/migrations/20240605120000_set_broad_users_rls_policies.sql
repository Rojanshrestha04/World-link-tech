-- Drop any existing policies that might conflict
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can delete any user" ON public.users; -- Drop policy from previous attempt

-- RLS Policies for 'users' table (allowing broad access for authenticated users)
CREATE POLICY "Enable read access for all authenticated users on users"
ON public.users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all authenticated users on users"
ON public.users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users on users"
ON public.users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users on users"
ON public.users FOR DELETE
TO authenticated
USING (true); 