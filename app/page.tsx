import { createClient } from '@/utils/supabase/server'

export default async function AccueilPage() {
  const supabase = await createClient()

  const { data: avis } = await supabase
    .from('avis')
    .select('id, note, commentaire, created_at')
    .eq('statut', 'valide')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="text-gray-900">
      <section className="bg-amber-50 px-6 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Vite &amp; Gourmand</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">Votre traiteur evenementiel a Bordeaux. Des menus raffines, livres chez vous, pour tous vos moments a partager.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/menus" className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white hover:bg-amber-700">Voir nos menus</a>
          <a href="/inscription" className="rounded-lg border border-amber-600 px-6 py-3 font-medium text-amber-700 hover:bg-amber-100">Creer un compte</a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-4 text-2xl font-bold">Qui sommes-nous ?</h2>
        <p className="mb-4 text-gray-700">Vite &amp; Gourmand, c'est l'histoire de Julie et Jose, deux passionnes de cuisine qui mettent leur savoir-faire au service de vos evenements : anniversaires, mariages, repas de fete ou diners entre amis.</p>
        <p className="text-gray-700">Nous selectionnons des produits frais et de saison pour composer des menus genereux, adaptes a tous les regimes. Commandez en ligne, on s'occupe du reste : preparation, livraison et installation.</p>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold">Ils nous ont fait confiance</h2>
          {!avis || avis.length === 0 ? (
            <p className="text-center text-gray-500">Aucun avis pour le moment. Soyez le premier a partager votre experience !</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {avis.map((a) => (
                <article key={a.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="mb-2 text-amber-500">{'★'.repeat(a.note)}{'☆'.repeat(5 - a.note)}</p>
                  <p className="text-sm text-gray-700">{a.commentaire}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}