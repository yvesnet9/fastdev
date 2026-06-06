-- 08_employe_statut.sql : l'employe peut modifier le statut des commandes

drop policy if exists "employe modif commandes" on commande;
create policy "employe modif commandes" on commande
  for update to authenticated
  using (public.est_employe())
  with check (public.est_employe());