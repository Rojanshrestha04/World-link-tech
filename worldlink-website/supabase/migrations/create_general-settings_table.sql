create table general_settings (
  id serial primary key,
  site_name text not null,
  site_description text,
  contact_email text not null,
  contact_phone text not null,
  address text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Automatically update updated_at on change
create or replace function update_general_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_general_settings_updated_at
before update on general_settings
for each row
execute function update_general_settings_updated_at();

-- Insert a default row (optional, for single-row settings)
insert into general_settings (site_name, site_description, contact_email, contact_phone, address)
values (
  'World Link Technical Training Institute',
  'CTEVT affiliated vocational training provider offering quality short-term courses in Nepal.',
  'info@worldlinktraining.edu.np',
  '01-5970000',
  'Jawalakhel, Lalitpur, Kathmandu, Nepal'
);
