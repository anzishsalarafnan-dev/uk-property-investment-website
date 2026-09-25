alter table seller_listings add column if not exists photos jsonb default '[]';
alter table seller_listings add column if not exists condition text;
