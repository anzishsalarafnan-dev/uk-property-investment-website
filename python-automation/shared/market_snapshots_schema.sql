create table if not exists market_snapshots (
  city_slug text primary key,
  avg_price integer not null,
  updated_at timestamptz default now()
);

alter table market_snapshots enable row level security;

create policy "Service role full access" on market_snapshots
  for all
  using (auth.role() = 'service_role');

create policy "Public read access" on market_snapshots
  for select
  using (true);
