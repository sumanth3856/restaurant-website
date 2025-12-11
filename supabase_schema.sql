-- Create Menu Items Table
create table public.menu_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  category text not null, -- 'Starters', 'Mains', 'Desserts', 'Drinks'
  image text,
  tags text[], -- Array of strings e.g. ['Vegan', 'GF']
  is_available boolean default true
);

-- Create Bookings Table
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date not null,
  time text not null,
  party_size integer not null,
  name text not null,
  email text not null,
  phone text not null,
  requests text,
  status text default 'pending' -- 'pending', 'confirmed', 'cancelled'
);

-- Enable Row Level Security (RLS)
alter table public.menu_items enable row level security;
alter table public.bookings enable row level security;

-- Policies for Menu Items
-- Public read access
create policy "Public items are viewable by everyone" on public.menu_items
  for select using (true);

-- Admin write access (simplified for MVP: allow anon insert for now, or assume service role later)
create policy "Everyone can insert items" on public.menu_items
  for insert with check (true);
  
create policy "Everyone can update items" on public.menu_items
  for update using (true);

create policy "Everyone can delete items" on public.menu_items
  for delete using (true);


-- Policies for Bookings
-- Public can create bookings
create policy "Public can create bookings" on public.bookings
  for insert with check (true);

-- Only admins/creators can view (simplified: allow public read for demo dashboard)
create policy "Public can view bookings" on public.bookings
  for select using (true);
