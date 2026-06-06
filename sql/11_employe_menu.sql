-- 11_employe_menu.sql : l'employe gere les menus (CRUD)

grant insert, update, delete on table menu to authenticated;

drop policy if exists "employe gestion menu" on menu;
create policy "employe gestion menu" on menu
  for all to authenticated
  using (public.est_employe())
  with check (public.est_employe());