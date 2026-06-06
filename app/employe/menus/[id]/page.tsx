import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { modifierMenu } from '../../actions'

export default async function ModifierMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  const { data: menu } = await supabase.from('menu').select('*').eq('id', Number(id)).single()
  if (!menu) {
    redirect('/employe/menus')
  }

  const { data: themes } = await supabase.from('theme').select('id, libelle').order('id')
  const { data: regimes } = await supabase.from('regime').select('id, libelle').order('id')

  return (
    <main className="mx-auto max-w-3xl p-8 text-gray-900">
      <a href="/employe/menus" className="mb-6 inline-block text-sm text-amber-700 hover:underline">&larr; Retour aux menus</a>
      <h1 className="mb-6 text-3xl font-bold">Modifier le menu</h1>

      <form action={modifierMenu} className="space-y-3 rounded-xl border border-gray-200 p-5">
        <input type="hidden" name="menu_id" value={menu.id} />
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Titre</label>
          <input name="titre" required defaultValue={menu.titre ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows={2} defaultValue={menu.description ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Theme</label>
            <select name="theme_id" defaultValue={String(menu.theme_id ?? '')} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
              {themes?.map((t) => (<option key={t.id} value={t.id}>{t.libelle}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Regime</label>
            <select name="regime_id" defaultValue={String(menu.regime_id ?? '')} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
              {regimes?.map((r) => (<option key={r.id} value={r.id}>{r.libelle}</option>))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Pers. min</label>
            <input name="nombre_personne_minimum" type="number" min="1" defaultValue={menu.nombre_personne_minimum ?? 1} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Prix (EUR)</label>
            <input name="prix_minimum" type="number" min="0" step="0.01" defaultValue={menu.prix_minimum ?? 0} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
            <input name="stock_disponible" type="number" min="0" defaultValue={menu.stock_disponible ?? 0} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Conditions</label>
          <textarea name="conditions" rows={2} defaultValue={menu.conditions ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900"></textarea>
        </div>
        <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Enregistrer les modifications</button>
      </form>
    </main>
  )
}