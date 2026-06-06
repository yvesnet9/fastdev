import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../connexion/actions'
import { annulerCommande, modifierProfil } from './actions'

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

export default async function ComptePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/connexion')
  }

  const { data: profil } = await supabase
    .from('utilisateur')
    .select('nom, prenom, email, telephone, adresse_postale, ville, pays')
    .eq('id', user.id)
    .single()

  const { data: commandes } = await supabase
    .from('commande')
    .select('id, numero_commande, nombre_personne, prix_menu, prix_livraison, date_prestation, statut, menu ( titre )')
    .order('id', { ascending: false })

  return (
    <main className="mx-auto max-w-3xl p-8 text-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon compte</h1>
        <form action={signOut}><button type="submit" className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white hover:bg-gray-900">Se deconnecter</button></form>
      </div>

      <p className="mb-8 text-gray-600">Connecte en tant que <strong>{user.email}</strong></p>

      <h2 className="mb-4 text-2xl font-bold">Mes commandes</h2>

      {!commandes || commandes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">Vous n'avez pas encore de commande. <a href="/menus" className="text-amber-700 hover:underline">Voir les menus</a></p>
      ) : (
        <ul className="space-y-4">
          {commandes.map((c) => (
            <li key={c.id} className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{c.menu?.titre ?? 'Menu'}</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">{STATUTS[c.statut] ?? c.statut}</span>
              </div>
              <p className="text-sm text-gray-600">Commande {c.numero_commande}</p>
              <p className="text-sm text-gray-600">{c.nombre_personne} personnes{c.date_prestation ? ' — prestation le ' + c.date_prestation : ''}</p>
              <p className="mt-2 font-bold">{(Number(c.prix_menu) + Number(c.prix_livraison)).toFixed(2)} EUR</p>
              {c.statut === 'en_attente' && (
                <form action={annulerCommande} className="mt-3">
                  <input type="hidden" name="commande_id" value={c.id} />
                  <button type="submit" className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Annuler la commande</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2 className="mb-4 mt-10 text-2xl font-bold">Mes informations</h2>
      <form action={modifierProfil} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Prenom</label>
            <input name="prenom" defaultValue={profil?.prenom ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nom</label>
            <input name="nom" defaultValue={profil?.nom ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Telephone</label>
          <input name="telephone" defaultValue={profil?.telephone ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Adresse postale</label>
          <input name="adresse_postale" defaultValue={profil?.adresse_postale ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ville</label>
            <input name="ville" defaultValue={profil?.ville ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Pays</label>
            <input name="pays" defaultValue={profil?.pays ?? ''} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
        </div>
        <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">Enregistrer mes infos</button>
      </form>
    </main>
  )
}
