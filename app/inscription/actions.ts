'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        nom: formData.get('nom') as string,
        prenom: formData.get('prenom') as string,
        telephone: formData.get('telephone') as string,
        adresse_postale: formData.get('adresse_postale') as string,
        ville: formData.get('ville') as string,
        pays: formData.get('pays') as string,
      },
    },
  })

  if (error) {
    redirect('/inscription?error=' + encodeURIComponent(error.message))
  }

  redirect('/inscription?success=1')
}