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