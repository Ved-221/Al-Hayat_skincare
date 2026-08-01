-- Create the site_media table
CREATE TABLE public.site_media (
    key text PRIMARY KEY,
    url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.site_media ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can read)
CREATE POLICY "Allow public read access on site_media"
ON public.site_media
FOR SELECT
TO public
USING (true);

-- Note: No public INSERT/UPDATE/DELETE policies are created.
-- Only the service role (which bypasses RLS automatically) and authenticated admins (if future policies are added) can write to this table.
