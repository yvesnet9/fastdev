-- 09_employe_avis.sql : l'employe peut lire et moderer tous les avis

grant update on table avis to authenticated;

drop policy if exists "employe lecture avis" on avis;
create policy "employe lecture avis" on avis
  for select to authenticated
  using (public.est_employe());

drop policy if exists "employe modif avis" on avis;
create policy "employe modif avis" on avis
  for update to authenticated
  using (public.est_employe())
  with check (public.est_employe());