-- 06_avis.sql : droits et policies pour les avis (utilisateur connecte)

grant insert on table avis to authenticated;

create policy "creation de son avis" on avis
  for insert to authenticated
  with check ((select auth.uid()) = utilisateur_id);

create policy "lecture de ses avis" on avis
  for select to authenticated
  using ((select auth.uid()) = utilisateur_id);
