import { createClient } from '@/utils/supabase/server'

export default async function MenusPage() {
  const supabase = await createClient()
  const { data: menus, error } = await supabase
    .from('menu')
    .select('id, titre, description, nombre_personne_minimum, prix_minimum')
    .order('id')

  if (error) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <p className="text-red-600">Erreur de chargement : {error.message}</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Nos menus</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menus?.map((menu) => (
          <article key={menu.id} className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">{menu.titre}</h2>
            <p className="mb-4 text-sm text-gray-600">{menu.description}</p>
            <p className="text-sm">A partir de {menu.nombre_personne_minimum} personnes</p>
            <p className="mb-4 text-lg font-bold">{menu.prix_minimum} EUR</p>
            <a href={`/menus/${menu.id}`} className="inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Voir le detail</a>
          </article>
        ))}
      </div>
    </main>
  )
}