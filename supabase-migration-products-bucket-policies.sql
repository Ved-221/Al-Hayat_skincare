-- Create the "products" storage bucket (if it doesn't exist already)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Allow public read access to all files in the "products" bucket
create policy "Public read access on products"
  on storage.objects for select
  using (bucket_id = 'products');

-- Only authenticated admins can upload files
create policy "Admin write access on products"
  on storage.objects for insert
  with check (
    bucket_id = 'products'
    and exists (select 1 from public.admins where admins.id = auth.uid())
  );

-- Only authenticated admins can update files
create policy "Admin update access on products"
  on storage.objects for update
  using (
    bucket_id = 'products'
    and exists (select 1 from public.admins where admins.id = auth.uid())
  );

-- Only authenticated admins can delete files
create policy "Admin delete access on products"
  on storage.objects for delete
  using (
    bucket_id = 'products'
    and exists (select 1 from public.admins where admins.id = auth.uid())
  );
