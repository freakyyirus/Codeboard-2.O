-- Enable storage if not enabled (usually enabled by default)
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Since we can't easily check if it exists in SQL without errors in some environments, 
-- we use an insert with conflict handler or just assume the user will run this.
-- Safe insert for bucket:
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Policies
-- 1. Public Read Access
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- 2. Authenticated Upload Access
create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

-- 3. Update Access (Users can update their own files)
create policy "Users can update their own avatar."
  on storage.objects for update
  using ( bucket_id = 'avatars' AND auth.uid() = owner )
  with check ( bucket_id = 'avatars' AND auth.uid() = owner );

-- 4. Delete Access
create policy "Users can delete their own avatar."
  on storage.objects for delete
  using ( bucket_id = 'avatars' AND auth.uid() = owner );
