import { signIn } from './actions'
export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold">Connexion</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <form action={signIn} className="space-y-3">
        <label htmlFor="email" className="sr-only">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" required className="w-full rounded border border-gray-300 p-2" />
        <label htmlFor="password" className="sr-only">Mot de passe</label>
        <input id="password" name="password" type="password" placeholder="Mot de passe" required className="w-full rounded border border-gray-300 p-2" />
        <button type="submit" className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Se connecter</button>
      </form>
      <p className="mt-4 text-sm"><a href="/mot-de-passe-oublie" className="text-amber-700 hover:underline">Mot de passe oublie ?</a></p>
      <p className="mt-4 text-sm text-gray-600">Pas encore de compte ? <a href="/inscription" className="text-amber-700 hover:underline">Creer un compte</a></p>
    </main>
  )
}