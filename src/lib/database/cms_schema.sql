create table if not exists guides (
  slug text primary key,
  title text not null,
  type text not null,
  city_slug text,
  description text,
  preview_images jsonb default '[]',
  pdf_path text,
  updated_at timestamptz default now()
);

create table if not exists blog_posts (
  slug text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  author text not null,
  published_at date not null,
  read_time_minutes integer,
  updated_at timestamptz default now()
);

alter table guides enable row level security;
alter table blog_posts enable row level security;

create policy "Public read access" on guides for select using (true);
create policy "Service role full access" on guides for all using (auth.role() = 'service_role');

create policy "Public read access" on blog_posts for select using (true);
create policy "Service role full access" on blog_posts for all using (auth.role() = 'service_role');
