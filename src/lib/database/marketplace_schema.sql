create table if not exists seller_listings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  city_slug text,
  property_type text not null,
  asking_price integer not null,
  bedrooms integer,
  description text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists buyer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  city_slug text,
  property_type text not null,
  budget_max integer not null,
  bedrooms_wanted integer,
  requirements text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

alter table seller_listings enable row level security;
alter table buyer_requests enable row level security;

-- Public can only see approved listings, and only non-contact fields
-- (contact details are protected at the query level in our app code,
-- not exposed via a public-facing view).
create policy "Public read approved only" on seller_listings for select using (is_approved = true);
create policy "Service role full access" on seller_listings for all using (auth.role() = 'service_role');

create policy "Public read approved only" on buyer_requests for select using (is_approved = true);
create policy "Service role full access" on buyer_requests for all using (auth.role() = 'service_role');
