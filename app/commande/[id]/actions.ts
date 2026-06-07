'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDb } from '@/utils/mongodb/client'
import { envoyerEmail } from '@/utils/email/envoyer'

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
  const totalFinal = Number((prixMenuFinal + prixLivraisonFinal).toFixed(2))

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
      total: totalFinal,
      date_commande: new Date(),
    })
  } catch (e) {
    console.error('MongoDB stat non enregistree :', e)
  }

  // Mail de confirmation de commande
  if (user.email) {
    await envoyerEmail(
      user.email,
      'Confirmation de votre commande ' + numeroCommande,
      `<div style="font-family: Arial, sans-serif; color: #1f2937;">
        <h1 style="color: #d97706;">Commande confirmee !</h1>
        <p>Merci pour votre commande chez Vite & Gourmand.</p>
        <table style="margin-top: 16px; border-collapse: collapse;">
          <tr><td style="padding: 4px 12px 4px 0;">Numero</td><td><strong>${numeroCommande}</strong></td></tr>
          <tr><td style="padding: 4px 12px 4px 0;">Menu</td><td>${menu.titre}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0;">Nombre de personnes</td><td>${personnes}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0;">Date prestation</td><td>${date || 'a definir'}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0;">Prix menu</td><td>${prixMenuFinal.toFixed(2)} EUR</td></tr>
          <tr><td style="padding: 4px 12px 4px 0;">Livraison</td><td>${prixLivraisonFinal.toFixed(2)} EUR</td></tr>
          <tr><td style="padding: 8px 12px 4px 0; border-top: 1px solid #e5e7eb;"><strong>Total</strong></td><td style="border-top: 1px solid #e5e7eb;"><strong>${totalFinal.toFixed(2)} EUR</strong></td></tr>
        </table>
        <p style="margin-top: 24px;">Vous pouvez suivre l'etat de votre commande dans votre espace client.</p>
        <p>A tres bientot,<br>L'equipe Vite & Gourmand</p>
      </div>`
    )
  }

  redirect('/commande/merci')
}