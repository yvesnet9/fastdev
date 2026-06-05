-- ============================================================
-- Vite & Gourmand - Schema (PostgreSQL / Supabase)
-- 01_schema.sql : creation des tables
-- ============================================================

-- ----- TABLES DE REFERENCE -----
create table role (
  id bigint generated always as identity primary key,
  libelle text not null unique
);

create table theme (
  id bigint generated always as identity primary key,
  libelle text not null unique
);

create table regime (
  id bigint generated always as identity primary key,
  libelle text not null unique
);

create table allergene (
  id bigint generated always as identity primary key,
  libelle text not null unique
);

-- ----- UTILISATEUR (profil lie a auth.users, SANS mot de passe) -----
create table utilisateur (
  id uuid primary key references auth.users(id) on delete cascade,
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text,
  adresse_postale text,
  ville text,
  pays text,
  role_id bigint not null default 1 references role(id),
  created_at timestamptz not null default now()
);

-- ----- MENU -----
create table menu (
  id bigint generated always as identity primary key,
  titre text not null,
  description text,
  theme_id bigint references theme(id),
  regime_id bigint references regime(id),
  nombre_personne_minimum int not null default 1,
  prix_minimum numeric(10,2) not null,
  conditions text,
  stock_disponible int not null default 0,
  created_at timestamptz not null default now()
);

-- ----- GALERIE D'IMAGES DU MENU -----
create table menu_image (
  id bigint generated always as identity primary key,
  menu_id bigint not null references menu(id) on delete cascade,
  url text not null,
  ordre int not null default 0
);

-- ----- PLAT -----
create table plat (
  id bigint generated always as identity primary key,
  libelle text not null,
  type text not null check (type in ('entree','plat','dessert')),
  image_url text
);

-- ----- LIAISONS n:n -----
create table menu_plat (
  menu_id bigint not null references menu(id) on delete cascade,
  plat_id bigint not null references plat(id) on delete cascade,
  primary key (menu_id, plat_id)
);

create table plat_allergene (
  plat_id bigint not null references plat(id) on delete cascade,
  allergene_id bigint not null references allergene(id) on delete cascade,
  primary key (plat_id, allergene_id)
);

-- ----- COMMANDE -----
create table commande (
  id bigint generated always as identity primary key,
  numero_commande text not null unique,
  utilisateur_id uuid not null references utilisateur(id),
  menu_id bigint not null references menu(id),
  nombre_personne int not null,
  prix_menu numeric(10,2) not null,
  prix_livraison numeric(10,2) not null default 0,
  date_prestation date,
  heure_livraison time,
  lieu_livraison text,
  statut text not null default 'en_attente'
    check (statut in ('en_attente','accepte','en_preparation','en_cours_livraison','livre','attente_retour_materiel','termine','annule')),
  pret_materiel boolean not null default false,
  motif_annulation text,
  mode_contact text,
  created_at timestamptz not null default now()
);

-- ----- SUIVI : historique des statuts -----
create table commande_statut (
  id bigint generated always as identity primary key,
  commande_id bigint not null references commande(id) on delete cascade,
  statut text not null,
  date_heure timestamptz not null default now()
);

-- ----- AVIS -----
create table avis (
  id bigint generated always as identity primary key,
  utilisateur_id uuid not null references utilisateur(id),
  commande_id bigint references commande(id) on delete set null,
  note int not null check (note between 1 and 5),
  commentaire text,
  statut text not null default 'en_attente' check (statut in ('en_attente','valide','refuse')),
  created_at timestamptz not null default now()
);

-- ----- HORAIRE -----
create table horaire (
  id bigint generated always as identity primary key,
  jour text not null,
  heure_ouverture time,
  heure_fermeture time
);

-- ============================================================
-- SECURITE : RLS + lecture publique du catalogue
-- ============================================================
alter table role enable row level security;
alter table theme enable row level security;
alter table regime enable row level security;
alter table allergene enable row level security;
alter table utilisateur enable row level security;
alter table menu enable row level security;
alter table menu_image enable row level security;
alter table plat enable row level security;
alter table menu_plat enable row level security;
alter table plat_allergene enable row level security;
alter table commande enable row level security;
alter table commande_statut enable row level security;
alter table avis enable row level security;
alter table horaire enable row level security;

-- Catalogue visible par tous (menus, plats, themes... visibles meme sans compte)
create policy "lecture publique menu" on menu for select using (true);
create policy "lecture publique menu_image" on menu_image for select using (true);
create policy "lecture publique plat" on plat for select using (true);
create policy "lecture publique menu_plat" on menu_plat for select using (true);
create policy "lecture publique plat_allergene" on plat_allergene for select using (true);
create policy "lecture publique theme" on theme for select using (true);
create policy "lecture publique regime" on regime for select using (true);
create policy "lecture publique allergene" on allergene for select using (true);
create policy "lecture publique horaire" on horaire for select using (true);

-- Avis : seuls les avis valides sont publics
create policy "lecture avis valides" on avis for select using (statut = 'valide');
