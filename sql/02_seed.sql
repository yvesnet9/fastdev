-- 02_seed.sql : donnees de test (catalogue)
-- A executer UNE SEULE FOIS sur des tables vides.

insert into role (libelle) values ('utilisateur'), ('employe'), ('administrateur');

insert into theme (libelle) values ('Noel'), ('Paques'), ('Classique'), ('Evenement');

insert into regime (libelle) values ('Classique'), ('Vegetarien'), ('Vegan');

insert into allergene (libelle) values
  ('Gluten'), ('Lactose'), ('Oeuf'), ('Fruits a coque'),
  ('Crustaces'), ('Soja'), ('Poisson');

insert into horaire (jour, heure_ouverture, heure_fermeture) values
  ('Lundi', '09:00', '18:00'),
  ('Mardi', '09:00', '18:00'),
  ('Mercredi', '09:00', '18:00'),
  ('Jeudi', '09:00', '18:00'),
  ('Vendredi', '09:00', '20:00'),
  ('Samedi', '10:00', '22:00'),
  ('Dimanche', '10:00', '16:00');

insert into plat (libelle, type) values
  ('Veloute de potimarron', 'entree'),
  ('Salade de chevre chaud', 'entree'),
  ('Foie gras maison', 'entree'),
  ('Filet de boeuf sauce truffe', 'plat'),
  ('Saumon en croute', 'plat'),
  ('Risotto aux champignons', 'plat'),
  ('Buche au chocolat', 'dessert'),
  ('Tarte aux pommes', 'dessert'),
  ('Mousse au citron', 'dessert');

insert into menu (titre, description, theme_id, regime_id, nombre_personne_minimum, prix_minimum, conditions, stock_disponible) values
  ('Menu de Noel Tradition', 'Un repas de fete genereux et raffine pour celebrer Noel en famille.', 1, 1, 6, 240.00, 'A commander au moins 5 jours avant la prestation. Conservation au frais imperative.', 5),
  ('Menu Paques Gourmand', 'Saveurs printanieres : agneau et legumes de saison.', 2, 1, 4, 160.00, 'A commander au moins 3 jours avant la prestation.', 8),
  ('Menu Vegetarien Decouverte', 'Une selection creative 100% vegetarienne, fraiche et coloree.', 3, 2, 2, 70.00, 'A commander au moins 2 jours avant la prestation.', 12);

-- Liaisons menu <-> plat
insert into menu_plat (menu_id, plat_id) values (1, 3), (1, 4), (1, 7);
insert into menu_plat (menu_id, plat_id) values (2, 1), (2, 5), (2, 8);
insert into menu_plat (menu_id, plat_id) values (3, 2), (3, 6), (3, 9);

-- Liaisons plat <-> allergene
insert into plat_allergene (plat_id, allergene_id) values (7, 1), (7, 2), (7, 3);
insert into plat_allergene (plat_id, allergene_id) values (5, 1), (5, 7), (8, 1), (8, 2), (8, 3);
insert into plat_allergene (plat_id, allergene_id) values (2, 1), (2, 2), (6, 2), (9, 2), (9, 3);
