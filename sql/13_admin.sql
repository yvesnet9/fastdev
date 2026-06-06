-- Fonction : l'utilisateur courant est-il administrateur (role 3) ?
create or replace function public.est_admin()
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.utilisateur
    where id = auth.uid() and role_id = 3
  );
$$;

grant execute on function public.est_admin() to authenticated;

-- L'admin peut modifier le role des utilisateurs
drop policy if exists "admin gestion utilisateurs" on utilisateur;
create policy "admin gestion utilisateurs" on utilisateur
  for update to authenticated
  using (public.est_admin())
  with check (public.est_admin());

-- L'admin peut lire tous les utilisateurs (pour la liste de gestion)
drop policy if exists "admin lecture utilisateurs" on utilisateur;
create policy "admin lecture utilisateurs" on utilisateur
  for select to authenticated
  using (public.est_admin());