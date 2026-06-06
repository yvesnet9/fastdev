import { createClient } from '@/utils/supabase/server'
import MenusListe from './MenusListe'

export default async function MenusPage() {
  const supabase = await createClient()
  const { data: menus, error } = await supabase
    .from('menu')
    .select('id, titre, description, nombre_personne_minimum, prix_minimum, theme ( libelle ), regime ( libelle )')
    .order('id')

  if (error) {
    return (
      <main className="mx-auto max-w-5xl p-8 text-gray-900">
        <p className="text-red-600">Erreur de chargement : {error.message}</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Nos menus</h1>
      <MenusListe menus={menus ?? []} />
    </main>
  )
}
