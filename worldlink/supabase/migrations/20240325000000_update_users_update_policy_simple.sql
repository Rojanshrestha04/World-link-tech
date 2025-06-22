-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;

-- Create a new policy that allows users to update their own data
-- and also allows admin users to update any user's data.
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (
    auth.uid() = id OR EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    )
); 