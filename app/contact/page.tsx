import { envoyerMessageContact } from './actions'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const { success } = await searchParams
  return (
    <main className="mx-auto max-w-2xl p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Contactez-nous</h1>

      <div className="mb-8 rounded-xl border border-gray-200 p-5">
        <p className="font-semibold">Vite &amp; Gourmand</p>
        <p className="text-sm text-gray-600">Traiteur evenementiel a Bordeaux</p>
        <p className="mt-2 text-sm text-gray-600">Email : contact@fastdev.fr</p>
        <p className="text-sm text-gray-600">Telephone : 05 56 00 00 00</p>
        <p className="text-sm text-gray-600">Adresse : 12 cours de l'Intendance, 33000 Bordeaux</p>
      </div>

      <h2 className="mb-4 text-2xl font-bold">Nous ecrire</h2>
      {success && <p className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700">Votre message a bien ete envoye. Nous vous repondrons rapidement.</p>}
      <form action={envoyerMessageContact} className="space-y-3">
        <div>
          <label htmlFor="nom" className="mb-1 block text-sm font-medium text-gray-700">Nom</label>
          <input id="nom" name="nom" required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" name="message" rows={5} required className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900"></textarea>
        </div>
        <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Envoyer</button>
      </form>
    </main>
  )
}