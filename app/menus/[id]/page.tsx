import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function MenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: menu, error } = await supabase
    .from('menu')
    .select(
      `id, titre, description, nombre_personne_minimum, prix_minimum, conditions, stock_disponible,
       theme ( libelle ),
       regime ( libelle ),
       menu_plat ( plat ( id, libelle, type, plat_allergene ( allergene ( libelle ) ) ) )`
    )
    .eq('id', id)
    .single()

  if (error || !menu) {
    notFound()
  }

  const plats = menu.menu_plat?.map((mp) => mp.plat) ?? []

  return (
    <main className="mx-auto max-w-3xl p-8">
      <a href="/menus" className="mb-6 inline-block text-sm text-amber-700 hover:underline">
        &larr; Retour aux menus
      </a>

      <h1 className="mb-2 text-3xl font-bold">{menu.titre}</h1>
      <div className="mb-4 flex gap-2 text-xs">
        {menu.theme?.libelle && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{menu.theme.libelle}</span>
        )}
        {menu.regime?.libelle && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">{menu.regime.libelle}</span>
        )}
      </div>

      <p className="mb-6 text-gray-700">{menu.description}</p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">A partir de</p>
          <p className="text-lg font-semibold">{menu.nombre_personne_minimum} personnes</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Prix</p>
          <p className="text-lg font-semibold">{menu.prix_minimum} EUR</p>
        </div>
      </div>

      <h2 className="mb-3 text-xl font-semibold">Composition</h2>
      <ul className="mb-6 space-y-2">
        {plats.map((plat) => {
          const allergenes = plat.plat_allergene?.map((pa) => pa.allergene?.libelle).filter(Boolean) ?? []
          return (
            <li key={plat.id} className="rounded-lg border border-gray-200 p-3">
              <span className="text-xs uppercase text-gray-400">{plat.type}</span>
              <p className="font-medium">{plat.libelle}</p>
              {allergenes.length > 0 && (
                <p className="text-xs text-gray-500">Allergenes : {allergenes.join(', ')}</p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="rounded-lg border-2 border-amber-400 bg-amber-50 p-4">
        <h2 className="mb-2 font-semibold text-amber-900">Conditions importantes</h2>
        <p className="text-sm text-amber-900">{menu.conditions}</p>
      </div>

      <p className="mt-4 text-sm text-gray-500">Stock disponible : {menu.stock_disponible}</p>
    </main>
  )
}