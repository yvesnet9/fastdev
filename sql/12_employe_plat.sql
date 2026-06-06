-- 12_employe_plat.sql : l'employe gere les plats (CRUD)

grant insert, update, delete on table plat to authenticated;

drop policy if exists "employe gestion plat" on plat;
create policy "employe gestion plat" on plat
  for all to authenticated
  using (public.est_employe())
  with check (public.est_employe());