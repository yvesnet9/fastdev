'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function annulerCommande(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('commande_id'))
  await supabase.from('commande').update({ statut: 'annule' }).eq('id', id)
  revalidatePath('/compte')
}

export async function modifierProfil(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  await supabase.from('utilisateur').update({
    nom: String(formData.get('nom') || ''),
    prenom: String(formData.get('prenom') || ''),
    telephone: String(formData.get('telephone') || ''),
    adresse_postale: String(formData.get('adresse_postale') || ''),
    ville: String(formData.get('ville') || ''),
    pays: String(formData.get('pays') || ''),
  }).eq('id', user.id)
  revalidatePath('/compte')
}

export async function laisserAvis(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const commandeId = Number(formData.get('commande_id'))
  const note = Number(formData.get('note'))
  const commentaire = String(formData.get('commentaire') || '')
  await supabase.from('avis').insert({
    utilisateur_id: user.id,
    commande_id: commandeId,
    note: note,
    commentaire: commentaire,
  })
  revalidatePath('/compte')
}
