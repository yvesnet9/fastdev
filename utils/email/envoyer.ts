import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const expediteur = process.env.EMAIL_EXPEDITEUR || 'onboarding@resend.dev'

export async function envoyerEmail(destinataire: string, sujet: string, html: string) {
  try {
    await resend.emails.send({
      from: 'Vite & Gourmand <' + expediteur + '>',
      to: destinataire,
      subject: sujet,
      html: html,
    })
  } catch (e) {
    console.error('Envoi email echoue :', e)
  }
}