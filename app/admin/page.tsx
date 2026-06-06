import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { changerRole } from './actions'

const ROLES: Record<number, string> = {
  1: 'Utilisateur',
  2: 'Employe',
  3: 'Administrateur',
}

export default async function AdminPage() {
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

  if (!profil || profil.role_id !== 3) {
    redirect('/')
  }

  const { data: utilisateurs } = await supabase
    .from('utilisateur')
    .select('id, nom, prenom, email, role_id')
    .order('role_id', { ascending: false })

  return (
    <main className="mx-auto max-w-4xl p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Espace administrateur</h1>
      <nav className="mb-8 flex flex-wrap gap-3">
        <a href="/admin" className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Comptes</a>
        <a href="/admin/stats" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Statistiques</a>
        <a href="/employe" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Espace employe</a>
      </nav>

      <h2 className="mb-4 text-2xl font-bold">Gestion des comptes</h2>
      <ul className="space-y-3">
        {utilisateurs?.map((u) => (
          <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <p className="font-semibold">{u.prenom} {u.nom}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{ROLES[u.role_id] ?? u.role_id}</span>
            </div>
            <div className="flex gap-2">
              <form action={changerRole}>
                <input type="hidden" name="utilisateur_id" value={u.id} />
                <input type="hidden" name="role_id" value="2" />
                <button type="submit" disabled={u.role_id === 2} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-40">Promouvoir employe</button>
              </form>
              <form action={changerRole}>
                <input type="hidden" name="utilisateur_id" value={u.id} />
                <input type="hidden" name="role_id" value="1" />
                <button type="submit" disabled={u.role_id === 1} className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-40">Retirer (utilisateur)</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}