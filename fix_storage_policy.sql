-- 1. Create the bucket 'menu-images' (if it doesn't exst) and ensure it's PUBLIC
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = true;

-- 2. Create a policy to allow PUBLIC READ access
-- Drop existing policy if it exists to avoid conflicts
drop policy if exists "Public Access to Menu Images" on storage.objects;

create policy "Public Access to Menu Images"
on storage.objects for select
using ( bucket_id = 'menu-images' );

-- 4. Create a policy to allow AUTHENTICATED users (Admins) to UPLOAD/DELETE
create policy "Authenticated Users Can Upload Menu Images"
on storage.objects for insert
with check ( bucket_id = 'menu-images' and auth.role() = 'authenticated' );

create policy "Authenticated Users Can Update Menu Images"
on storage.objects for update
using ( bucket_id = 'menu-images' and auth.role() = 'authenticated' );

create policy "Authenticated Users Can Delete Menu Images"
on storage.objects for delete
using ( bucket_id = 'menu-images' and auth.role() = 'authenticated' );
