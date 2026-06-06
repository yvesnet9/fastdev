-- 07_employe.sql : role employe - fonction d'aide + acces lecture

create or replace function public.est_employe()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.utilisateur
    where id = (select auth.uid()) and role_id in (2, 3)
  );
$$;

grant execute on function public.est_employe() to authenticated;

create policy "employe lecture commandes" on commande
  for select to authenticated
  using (public.est_employe());

create policy "employe lecture utilisateurs" on utilisateur
  for select to authenticated
  using (public.est_employe());
