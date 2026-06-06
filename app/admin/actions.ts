'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function changerRole(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }
  const id = String(formData.get('utilisateur_id') || '')
  const roleId = Number(formData.get('role_id'))
  if (!id || !roleId) {
    return
  }
  await supabase.from('utilisateur').update({ role_id: roleId }).eq('id', id)
  revalidatePath('/admin')
}