'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDb } from '@/utils/mongodb/client'

export async function creerCommande(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/connexion')
  }

  const menuId = Number(formData.get('menu_id'))
  const personnesSaisies = Number(formData.get('nombre_personne'))
  const ville = String(formData.get('ville') || '')
  const km = Number(formData.get('km') || 0)
  const date = String(formData.get('date') || '')
  const heure = String(formData.get('heure') || '')
  const lieu = String(formData.get('lieu') || '')

  const { data: menu } = await supabase
    .from('menu')
    .select('titre, prix_minimum, nombre_personne_minimum')
    .eq('id', menuId)
    .single()

  if (!menu) {
    redirect('/menus')
  }

  const min = menu.nombre_personne_minimum
  const personnes = Math.max(personnesSaisies, min)
  const prixUnitaire = Number(menu.prix_minimum) / min
  let prixMenu = prixUnitaire * personnes
  if (personnes >= min + 5) {
    prixMenu = prixMenu * 0.9
  }
  const horsBordeaux = ville.trim().toLowerCase() !== 'bordeaux'
  const prixLivraison = horsBordeaux ? 5 + 0.59 * km : 0

  const numeroCommande = 'CMD-' + Date.now()
  const prixMenuFinal = Number(prixMenu.toFixed(2))
  const prixLivraisonFinal = Number(prixLivraison.toFixed(2))

  const { error } = await supabase.from('commande').insert({
    numero_commande: numeroCommande,
    utilisateur_id: user.id,
    menu_id: menuId,
    nombre_personne: personnes,
    prix_menu: prixMenuFinal,
    prix_livraison: prixLivraisonFinal,
    date_prestation: date || null,
    heure_livraison: heure || null,
    lieu_livraison: lieu || null,
  })

  if (error) {
    redirect('/commande/merci?error=' + encodeURIComponent(error.message))
  }

  // Statistique dans MongoDB (base NoSQL) pour le tableau de bord admin
  try {
    const db = await getDb()
    await db.collection('statistiques_commandes').insertOne({
      numero_commande: numeroCommande,
      menu_id: menuId,
      menu_titre: menu.titre,
      nombre_personne: personnes,
      prix_menu: prixMenuFinal,
      prix_livraison: prixLivraisonFinal,
      total: Number((prixMenuFinal + prixLivraisonFinal).toFixed(2)),
      date_commande: new Date(),
    })
  } catch (e) {
    console.error('MongoDB stat non enregistree :', e)
  }

  redirect('/commande/merci')
}