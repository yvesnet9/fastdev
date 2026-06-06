'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function creerPlat(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  await supabase.from('plat').insert({
    libelle: String(formData.get('libelle') || ''),
    type: String(formData.get('type') || 'plat'),
  })
  revalidatePath('/employe/plats')
}

export async function supprimerPlat(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = Number(formData.get('plat_id'))
  await supabase.from('plat').delete().eq('id', id)
  revalidatePath('/employe/plats')
}