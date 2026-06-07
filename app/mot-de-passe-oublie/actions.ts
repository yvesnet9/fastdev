'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function demanderReset(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '')
  const origin = (await headers()).get('origin') || 'http://localhost:3000'

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: origin + '/nouveau-mot-de-passe',
  })

  redirect('/mot-de-passe-oublie?success=1')
}