import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import CommandeForm from './CommandeForm'

export default async function CommandePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/connexion')
  }

  const { data: menu } = await supabase
    .from('menu')
    .select('id, titre, prix_minimum, nombre_personne_minimum')
    .eq('id', id)
    .single()

  if (!menu) {
    notFound()
  }

  const { data: profil } = await supabase
    .from('utilisateur')
    .select('nom, prenom, email, telephone')
    .eq('id', user.id)
    .single()

  return (
    <main className="mx-auto max-w-2xl p-8 text-gray-900">
      <h1 className="mb-2 text-3xl font-bold">Commander : {menu.titre}</h1>
      <p className="mb-6 text-sm text-gray-600">A partir de {menu.nombre_personne_minimum} personnes.</p>
      <CommandeForm menu={menu} profil={profil ?? { nom: '', prenom: '', email: user.email ?? '', telephone: '' }} />
    </main>
  )
}