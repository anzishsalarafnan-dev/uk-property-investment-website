-- Leads table: stores every form submission (contact, valuation, guide download)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  interested_city text,
  interested_area text,
  budget_range text,
  source text not null,           -- 'contact', 'valuation', 'guide-download', 'newsletter'
  message text,
  score integer default 0,
  created_at timestamptz default now()
);

create index if not exists leads_email_idx on leads (email);
create index if not exists leads_source_idx on leads (source);
create index if not exists leads_created_at_idx on leads (created_at desc);

-- Row-Level Security: only service role (server) can read/write, never the public client.
alter table leads enable row level security;

create policy "Service role full access" on leads
  for all
  using (auth.role() = 'service_role');
