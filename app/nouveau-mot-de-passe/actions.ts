'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function mettreAJourMotDePasse(formData: FormData) {
  const supabase = await createClient()
  const password = String(formData.get('password') || '')

  const { error } = await supabase.auth.updateUser({ password: password })

  if (error) {
    redirect('/nouveau-mot-de-passe?error=' + encodeURIComponent(error.message))
  }

  redirect('/connexion?reset=1')
}