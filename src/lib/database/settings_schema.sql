create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

create policy "Public read access" on site_settings for select using (true);
create policy "Service role full access" on site_settings for all using (auth.role() = 'service_role');

insert into site_settings (key, value) values
  ('contact_email', 'hello@example.com'),
  ('contact_phone', ''),
  ('whatsapp_number', ''),
  ('maintenance_mode', 'false')
on conflict (key) do nothing;
