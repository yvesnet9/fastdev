import { createClient } from '@/utils/supabase/server'

export default async function Footer() {
  const supabase = await createClient()
  const { data: horaires } = await supabase
    .from('horaire')
    .select('id, jour, heure_ouverture, heure_fermeture')
    .order('id')

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">Vite &amp; Gourmand</h3>
          <p className="text-sm text-gray-400">Traiteur evenementiel a Bordeaux.</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-white">Horaires</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            {horaires?.map((h) => (<li key={h.id} className="flex justify-between gap-4"><span>{h.jour}</span><span>{h.heure_ouverture?.slice(0, 5)} - {h.heure_fermeture?.slice(0, 5)}</span></li>))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-white">Informations</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="/mentions-legales" className="hover:text-white">Mentions legales</a></li>
            <li><a href="/cgv" className="hover:text-white">CGV</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">© 2026 Vite &amp; Gourmand. Tous droits reserves.</div>
    </footer>
  )
}