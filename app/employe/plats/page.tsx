import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { creerPlat, supprimerPlat } from './actions'

const TYPES: Record<string, string> = {
  entree: 'Entree',
  plat: 'Plat',
  dessert: 'Dessert',
}

export default async function GestionPlatsPage() {
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

  const { data: plats } = await supabase.from('plat').select('id, libelle, type').order('id')

  return (
    <main className="mx-auto max-w-3xl p-8 text-gray-900">
      <a href="/employe" className="mb-6 inline-block text-sm text-amber-700 hover:underline">&larr; Retour espace employe</a>
      <h1 className="mb-6 text-3xl font-bold">Gerer les plats</h1>

      <h2 className="mb-4 text-2xl font-bold">Creer un plat</h2>
      <form action={creerPlat} className="mb-10 space-y-3 rounded-xl border border-gray-200 p-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Libelle</label>
          <input name="libelle" required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
          <select name="type" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
            <option value="entree">Entree</option>
            <option value="plat">Plat</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Creer le plat</button>
      </form>

      <h2 className="mb-4 text-2xl font-bold">Plats existants</h2>
      <ul className="space-y-3">
        {plats?.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <p className="font-semibold">{p.libelle}</p>
              <p className="text-sm text-gray-600">{TYPES[p.type] ?? p.type}</p>
            </div>
            <form action={supprimerPlat}>
              <input type="hidden" name="plat_id" value={p.id} />
              <button type="submit" className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Supprimer</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  )
}