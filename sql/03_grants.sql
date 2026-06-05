-- 03_grants.sql : exposition du catalogue a l'API (lecture seule)
grant select on table
  menu, menu_image, plat, menu_plat, plat_allergene,
  theme, regime, allergene, horaire, avis
to anon, authenticated;
