export default async function MerciPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams

  if (error) {
    return (
      <main className="mx-auto max-w-2xl p-8 text-center text-gray-900">
        <h1 className="mb-4 text-3xl font-bold text-red-700">Oups, un probleme est survenu</h1>
        <p className="mb-6 text-gray-700">Votre commande n'a pas pu etre enregistree : {error}</p>
        <a href="/menus" className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white hover:bg-amber-700">Retour aux menus</a>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl p-8 text-center text-gray-900">
      <h1 className="mb-4 text-3xl font-bold text-amber-700">Merci, votre commande est enregistree !</h1>
      <p className="mb-6 text-gray-700">Vous recevrez bientot un mail de confirmation. Vous pouvez suivre votre commande depuis votre espace.</p>
      <div className="flex justify-center gap-4">
        <a href="/compte" className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white hover:bg-amber-700">Mon compte</a>
        <a href="/menus" className="rounded-lg border border-amber-600 px-6 py-3 font-medium text-amber-700 hover:bg-amber-100">Voir d'autres menus</a>
      </div>
    </main>
  )
}