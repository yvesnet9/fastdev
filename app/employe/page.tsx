import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { changerStatut } from './actions'

const STATUTS: Record<string, string> = {
  en_attente: 'En attente',
  accepte: 'Acceptee',
  en_preparation: 'En preparation',
  en_cours_livraison: 'En cours de livraison',
  livre: 'Livree',
  attente_retour_materiel: 'En attente retour materiel',
  termine: 'Terminee',
  annule: 'Annulee',
}

export default async function EmployePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/connexion')
  }

  const { data: profil } = await supabase
    .from('utilisateur')
    .select('role_id')
    .eq('id', user.id)
    .single()

  if (!profil || (profil.role_id !== 2 && profil.role_id !== 3)) {
    redirect('/')
  }

  const { data: commandes } = await supabase
    .from('commande')
    .select('id, numero_commande, statut, nombre_personne, prix_menu, prix_livraison, date_prestation, menu ( titre ), utilisateur ( prenom, nom )')
    .order('id', { ascending: false })

  return (
    <main className="mx-auto max-w-4xl p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Espace employe</h1>
      <h2 className="mb-4 text-2xl font-bold">Toutes les commandes</h2>

      {!commandes || commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {commandes.map((c) => (
            <li key={c.id} className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{c.menu?.titre ?? 'Menu'}</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">{STATUTS[c.statut] ?? c.statut}</span>
              </div>
              <p className="text-sm text-gray-600">Commande {c.numero_commande}</p>
              <p className="text-sm text-gray-600">Client : {c.utilisateur?.prenom} {c.utilisateur?.nom}</p>
              <p className="text-sm text-gray-600">{c.nombre_personne} personnes{c.date_prestation ? ' — prestation le ' + c.date_prestation : ''}</p>
              <p className="mb-3 mt-2 font-bold">{(Number(c.prix_menu) + Number(c.prix_livraison)).toFixed(2)} EUR</p>

              <form action={changerStatut} className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
                <input type="hidden" name="commande_id" value={c.id} />
                <label className="text-sm text-gray-600">Statut :</label>
                <select name="statut" defaultValue={c.statut} className="rounded border border-gray-300 bg-white p-2 text-sm text-gray-900">
                  <option value="en_attente">En attente</option>
                  <option value="accepte">Acceptee</option>
                  <option value="en_preparation">En preparation</option>
                  <option value="en_cours_livraison">En cours de livraison</option>
                  <option value="livre">Livree</option>
                  <option value="attente_retour_materiel">En attente retour materiel</option>
                  <option value="termine">Terminee</option>
                  <option value="annule">Annulee</option>
                </select>
                <button type="submit" className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700">Mettre a jour</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}