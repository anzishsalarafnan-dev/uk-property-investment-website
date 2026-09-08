create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  message text not null,
  city_slug text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create index if not exists reviews_approved_idx on reviews (is_approved);

alter table reviews enable row level security;

create policy "Public read approved only" on reviews
  for select
  using (is_approved = true);

create policy "Service role full access" on reviews
  for all
  using (auth.role() = 'service_role');
