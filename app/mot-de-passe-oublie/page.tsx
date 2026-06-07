import { demanderReset } from './actions'

export default async function MotDePasseOubliePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const { success } = await searchParams
  return (
    <main className="mx-auto max-w-md p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Mot de passe oublie</h1>
      {success && <p className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700">Si un compte existe avec cet email, un lien de reinitialisation vient d&apos;etre envoye.</p>}
      <p className="mb-4 text-sm text-gray-600">Entrez votre email, nous vous enverrons un lien pour reinitialiser votre mot de passe.</p>
      <form action={demanderReset} className="space-y-3">
        <input name="email" type="email" placeholder="Email" required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        <button type="submit" className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Envoyer le lien</button>
      </form>
    </main>
  )
}