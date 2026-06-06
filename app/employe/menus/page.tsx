import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { creerMenu, supprimerMenu } from '../actions'

export default async function GestionMenusPage() {
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

  const { data: menus } = await supabase.from('menu').select('id, titre, prix_minimum, nombre_personne_minimum, stock_disponible').order('id')
  const { data: themes } = await supabase.from('theme').select('id, libelle').order('id')
  const { data: regimes } = await supabase.from('regime').select('id, libelle').order('id')

  return (
    <main className="mx-auto max-w-3xl p-8 text-gray-900">
      <a href="/employe" className="mb-6 inline-block text-sm text-amber-700 hover:underline">&larr; Retour espace employe</a>
      <h1 className="mb-6 text-3xl font-bold">Gerer les menus</h1>

      <h2 className="mb-4 text-2xl font-bold">Creer un menu</h2>
      <form action={creerMenu} className="mb-10 space-y-3 rounded-xl border border-gray-200 p-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Titre</label>
          <input name="titre" required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows={2} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Theme</label>
            <select name="theme_id" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
              {themes?.map((t) => (<option key={t.id} value={t.id}>{t.libelle}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Regime</label>
            <select name="regime_id" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
              {regimes?.map((r) => (<option key={r.id} value={r.id}>{r.libelle}</option>))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Pers. min</label>
            <input name="nombre_personne_minimum" type="number" min="1" defaultValue="1" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Prix (EUR)</label>
            <input name="prix_minimum" type="number" min="0" step="0.01" defaultValue="0" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
            <input name="stock_disponible" type="number" min="0" defaultValue="0" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Conditions</label>
          <textarea name="conditions" rows={2} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900"></textarea>
        </div>
        <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Creer le menu</button>
      </form>

      <h2 className="mb-4 text-2xl font-bold">Menus existants</h2>
      <ul className="space-y-3">
        {menus?.map((m) => (
          <li key={m.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <p className="font-semibold">{m.titre}</p>
              <p className="text-sm text-gray-600">{m.prix_minimum} EUR — min {m.nombre_personne_minimum} pers. — stock {m.stock_disponible}</p>
            </div>
            <form action={supprimerMenu}>
              <input type="hidden" name="menu_id" value={m.id} />
              <button type="submit" className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Supprimer</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  )
}