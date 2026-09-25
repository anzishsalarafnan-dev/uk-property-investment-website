-- Anyone can view photos (public bucket already allows this, but explicit policy for clarity)
create policy "Public can view property photos"
on storage.objects for select
using (bucket_id = 'property-photos');

-- Only the service role (our server) can upload — never directly from the browser
create policy "Service role can upload property photos"
on storage.objects for insert
with check (bucket_id = 'property-photos' and auth.role() = 'service_role');

-- Only the service role can delete
create policy "Service role can delete property photos"
on storage.objects for delete
using (bucket_id = 'property-photos' and auth.role() = 'service_role');
