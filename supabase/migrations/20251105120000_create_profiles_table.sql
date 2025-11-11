create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;

create policy "Public profiles are viewable by owner"
on profiles for select
using ( auth.uid() = id );

create policy "Users can insert their own profile"
on profiles for insert
with check ( auth.uid() = id );
