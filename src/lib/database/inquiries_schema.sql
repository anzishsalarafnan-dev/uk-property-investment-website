create table if not exists property_inquiries (
  id uuid primary key default gen_random_uuid(),
  seller_listing_id uuid references seller_listings(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  message text,
  created_at timestamptz default now()
);

alter table property_inquiries enable row level security;

create policy "Service role full access" on property_inquiries for all using (auth.role() = 'service_role');
