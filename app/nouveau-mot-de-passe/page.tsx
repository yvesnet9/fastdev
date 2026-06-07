import { mettreAJourMotDePasse } from './actions'

export default async function NouveauMotDePassePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <main className="mx-auto max-w-md p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Nouveau mot de passe</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <form action={mettreAJourMotDePasse} className="space-y-3">
        <label htmlFor="password" className="sr-only">Nouveau mot de passe (10 caracteres minimum)</label>
        <input id="password" name="password" type="password" placeholder="Nouveau mot de passe (10 caracteres min)" required minLength={10} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        <button type="submit" className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Mettre a jour</button>
      </form>
    </main>
  )
}