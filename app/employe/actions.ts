'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

export async function creerMenu(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  await supabase.from('menu').insert({
    titre: String(formData.get('titre') || ''),
    description: String(formData.get('description') || ''),
    theme_id: Number(formData.get('theme_id')) || null,
    regime_id: Number(formData.get('regime_id')) || null,
    nombre_personne_minimum: Number(formData.get('nombre_personne_minimum')) || 1,
    prix_minimum: Number(formData.get('prix_minimum')) || 0,
    conditions: String(formData.get('conditions') || ''),
    stock_disponible: Number(formData.get('stock_disponible')) || 0,
  })
  revalidatePath('/employe/menus')
  revalidatePath('/menus')
}

export async function modifierMenu(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('menu_id'))
  await supabase.from('menu').update({
    titre: String(formData.get('titre') || ''),
    description: String(formData.get('description') || ''),
    theme_id: Number(formData.get('theme_id')) || null,
    regime_id: Number(formData.get('regime_id')) || null,
    nombre_personne_minimum: Number(formData.get('nombre_personne_minimum')) || 1,
    prix_minimum: Number(formData.get('prix_minimum')) || 0,
    conditions: String(formData.get('conditions') || ''),
    stock_disponible: Number(formData.get('stock_disponible')) || 0,
  }).eq('id', id)
  revalidatePath('/employe/menus')
  revalidatePath('/menus')
  redirect('/employe/menus')
}

export async function supprimerMenu(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('menu_id'))
  await supabase.from('menu').delete().eq('id', id)
  revalidatePath('/employe/menus')
  revalidatePath('/menus')
}