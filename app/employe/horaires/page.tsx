import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { modifierHoraire } from '../actions'

export default async function HorairesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/connexion')
  }

  const { data: profil } = await supabase
    .from('utilisateur')
    .select('role_id')
    .eq('id', user.id)
    .single()

  if (!profil || (profil.role_id !== 2 && profil.role_id !== 3)) {
    redirect('/')
  }

  const { data: horaires } = await supabase
    .from('horaire')
    .select('id, jour, heure_ouverture, heure_fermeture')
    .order('id')

  return (
    <main className="mx-auto max-w-2xl p-8 text-gray-900">
      <a href="/employe" className="mb-6 inline-block text-sm text-amber-700 hover:underline">&larr; Retour espace employe</a>
      <h1 className="mb-6 text-3xl font-bold">Gerer les horaires</h1>

      <ul className="space-y-3">
        {horaires?.map((h) => (
          <li key={h.id} className="rounded-xl border border-gray-200 p-4 shadow-sm">
            <form action={modifierHoraire} className="flex flex-wrap items-center gap-3">
              <input type="hidden" name="horaire_id" value={h.id} />
              <span className="w-24 font-medium">{h.jour}</span>
              <input type="time" name="heure_ouverture" defaultValue={h.heure_ouverture?.slice(0, 5) ?? ''} className="rounded border border-gray-300 bg-white p-2 text-sm text-gray-900" />
              <span className="text-gray-500">a</span>
              <input type="time" name="heure_fermeture" defaultValue={h.heure_fermeture?.slice(0, 5) ?? ''} className="rounded border border-gray-300 bg-white p-2 text-sm text-gray-900" />
              <button type="submit" className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700">Enregistrer</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  )
}