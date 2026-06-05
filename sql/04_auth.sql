-- 04_auth.sql : creation auto du profil a l'inscription + policies utilisateur

-- Fonction : a chaque nouvel utilisateur auth, creer son profil dans "utilisateur"
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.utilisateur (id, nom, prenom, email, telephone, adresse_postale, ville, pays)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nom', ''),
    coalesce(new.raw_user_meta_data ->> 'prenom', ''),
    new.email,
    new.raw_user_meta_data ->> 'telephone',
    new.raw_user_meta_data ->> 'adresse_postale',
    new.raw_user_meta_data ->> 'ville',
    new.raw_user_meta_data ->> 'pays'
  );
  return new;
end;
$$;

-- Declenchement apres chaque inscription
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Droits + policies : chaque utilisateur gere uniquement son propre profil
grant select, update on table utilisateur to authenticated;

create policy "lecture de son profil" on utilisateur
  for select using ((select auth.uid()) = id);

create policy "modification de son profil" on utilisateur
  for update using ((select auth.uid()) = id);
