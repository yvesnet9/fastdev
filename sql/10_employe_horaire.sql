-- 10_employe_horaire.sql : l'employe peut modifier les horaires

grant update on table horaire to authenticated;

drop policy if exists "employe modif horaire" on horaire;
create policy "employe modif horaire" on horaire
  for update to authenticated
  using (public.est_employe())
  with check (public.est_employe());