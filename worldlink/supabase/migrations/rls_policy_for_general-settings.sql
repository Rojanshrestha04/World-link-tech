alter table general_settings enable row level security;

create policy "Public read access" on general_settings
for select
using (true);

create policy "Admin update access" on general_settings
for update
using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin insert access" on general_settings
for insert
with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admin delete access" on general_settings
for delete
using (auth.jwt() ->> 'role' = 'admin');

