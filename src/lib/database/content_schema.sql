create table if not exists cities (
  slug text primary key,
  name text not null,
  tagline text not null,
  hero_image text,
  population integer,
  avg_price integer,
  avg_yield numeric(4,1),
  growth_rate numeric(4,1),
  description text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  updated_at timestamptz default now()
);

create table if not exists areas (
  slug text primary key,
  city_slug text references cities(slug) not null,
  name text not null,
  images jsonb default '[]',
  investment_score numeric(3,1),
  pricing jsonb not null,
  rental_yield numeric(4,1),
  growth_projection numeric(4,1),
  last_updated date,
  overview text,
  amenities jsonb,
  faqs jsonb default '[]',
  latitude numeric(9,6),
  longitude numeric(9,6),
  updated_at timestamptz default now()
);

alter table cities enable row level security;
alter table areas enable row level security;

create policy "Public read access" on cities for select using (true);
create policy "Service role full access" on cities for all using (auth.role() = 'service_role');

create policy "Public read access" on areas for select using (true);
create policy "Service role full access" on areas for all using (auth.role() = 'service_role');
