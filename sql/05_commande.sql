-- 05_commande.sql : droits et policies pour les commandes (utilisateur connecte)

-- Droits de base sur la table commande pour les utilisateurs connectes
grant select, insert, update on table commande to authenticated;

-- Creer une commande a son nom
create policy "creation de sa commande" on commande
  for insert to authenticated
  with check ((select auth.uid()) = utilisateur_id);

-- Lire ses propres commandes
create policy "lecture de ses commandes" on commande
  for select to authenticated
  using ((select auth.uid()) = utilisateur_id);

-- Modifier / annuler sa commande tant qu'elle n'est pas acceptee
create policy "modification de ses commandes" on commande
  for update to authenticated
  using ((select auth.uid()) = utilisateur_id and statut = 'en_attente')
  with check ((select auth.uid()) = utilisateur_id);
