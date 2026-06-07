'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { envoyerEmail } from '@/utils/email/envoyer'

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const prenom = formData.get('prenom') as string

  const { error } = await supabase.auth.signUp({
    email: email,
    password: formData.get('password') as string,
    options: {
      data: {
        nom: formData.get('nom') as string,
        prenom: prenom,
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

  // Mail de bienvenue
  await envoyerEmail(
    email,
    'Bienvenue chez Vite & Gourmand !',
    `<div style="font-family: Arial, sans-serif; color: #1f2937;">
      <h1 style="color: #d97706;">Bienvenue ${prenom} !</h1>
      <p>Votre compte Vite & Gourmand a bien ete cree.</p>
      <p>Vous pouvez des maintenant parcourir nos menus et passer commande pour vos evenements a Bordeaux.</p>
      <p style="margin-top: 24px;">A tres bientot,<br>L'equipe Vite & Gourmand</p>
    </div>`
  )

  redirect('/inscription?success=1')
}