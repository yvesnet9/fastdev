import { signUp } from './actions'
export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const { error, success } = await searchParams
  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold">Creer un compte</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      {success && <p className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700">Compte cree ! Verifie tes emails pour confirmer l inscription.</p>}
      <form action={signUp} className="space-y-3">
        <label htmlFor="prenom" className="sr-only">Prenom</label>
        <input id="prenom" name="prenom" placeholder="Prenom" required className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="nom" className="sr-only">Nom</label>
        <input id="nom" name="nom" placeholder="Nom" required className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="email" className="sr-only">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" required className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="telephone" className="sr-only">Telephone (GSM)</label>
        <input id="telephone" name="telephone" placeholder="Telephone (GSM)" className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="adresse_postale" className="sr-only">Adresse postale</label>
        <input id="adresse_postale" name="adresse_postale" placeholder="Adresse postale" className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="ville" className="sr-only">Ville</label>
        <input id="ville" name="ville" placeholder="Ville" className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="pays" className="sr-only">Pays</label>
        <input id="pays" name="pays" placeholder="Pays" className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="password" className="sr-only">Mot de passe (10 caracteres minimum)</label>
        <input id="password" name="password" type="password" placeholder="Mot de passe (10 caracteres min)" required minLength={10} className="w-full rounded border border-gray-300 p-2" />
        <button type="submit" className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Creer mon compte</button>
      </form>
    </main>
  )
}