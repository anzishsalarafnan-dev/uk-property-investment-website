alter table leads add column if not exists sequence_sent jsonb default '[]';
alter table leads add column if not exists sequence_paused boolean default false;
