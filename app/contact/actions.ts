'use server'

import { redirect } from 'next/navigation'
import { envoyerEmail } from '@/utils/email/envoyer'

export async function envoyerMessageContact(formData: FormData) {
  const nom = String(formData.get('nom') || '')
  const email = String(formData.get('email') || '')
  const message = String(formData.get('message') || '')

  await envoyerEmail(
    process.env.EMAIL_EXPEDITEUR || 'onboarding@resend.dev',
    'Nouveau message de contact - ' + nom,
    `<div style="font-family: Arial, sans-serif; color: #1f2937;">
      <h1 style="color: #d97706;">Nouveau message de contact</h1>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p>${message}</p>
    </div>`
  )

  redirect('/contact?success=1')
}