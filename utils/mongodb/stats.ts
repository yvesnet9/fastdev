import { getDb } from './client'

export type StatMenu = {
  menu_titre: string
  nombre_commandes: number
  chiffre_affaires: number
}

export async function getStatsParMenu(): Promise<StatMenu[]> {
  const db = await getDb()
  const resultat = await db
    .collection('statistiques_commandes')
    .aggregate([
      {
        $group: {
          _id: '$menu_titre',
          nombre_commandes: { $sum: 1 },
          chiffre_affaires: { $sum: '$total' },
        },
      },
      { $sort: { chiffre_affaires: -1 } },
    ])
    .toArray()

  return resultat.map((r) => ({
    menu_titre: r._id ?? 'Inconnu',
    nombre_commandes: r.nombre_commandes,
    chiffre_affaires: Number((r.chiffre_affaires ?? 0).toFixed(2)),
  }))
}

export async function getChiffreAffairesTotal(): Promise<number> {
  const db = await getDb()
  const resultat = await db
    .collection('statistiques_commandes')
    .aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }])
    .toArray()

  return Number((resultat[0]?.total ?? 0).toFixed(2))
}