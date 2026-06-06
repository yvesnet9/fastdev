'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function changerStatut(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('commande_id'))
  const statut = String(formData.get('statut') || '')
  await supabase.from('commande').update({ statut: statut }).eq('id', id)
  revalidatePath('/employe')
}

export async function traiterAvis(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('avis_id'))
  const statut = String(formData.get('statut') || '')
  await supabase.from('avis').update({ statut: statut }).eq('id', id)
  revalidatePath('/employe')
  revalidatePath('/')
}

export async function modifierHoraire(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('horaire_id'))
  const ouverture = String(formData.get('heure_ouverture') || '')
  const fermeture = String(formData.get('heure_fermeture') || '')
  await supabase.from('horaire').update({
    heure_ouverture: ouverture || null,
    heure_fermeture: fermeture || null,
  }).eq('id', id)
  revalidatePath('/employe/horaires')
  revalidatePath('/')
}