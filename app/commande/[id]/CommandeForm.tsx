'use client'

import { useState } from 'react'
import { creerCommande } from './actions'

type Menu = { id: number; titre: string; prix_minimum: number; nombre_personne_minimum: number }
type Profil = { nom: string; prenom: string; email: string; telephone: string | null }

export default function CommandeForm({ menu, profil }: { menu: Menu; profil: Profil }) {
  const min = menu.nombre_personne_minimum
  const [personnes, setPersonnes] = useState(min)
  const [ville, setVille] = useState('Bordeaux')
  const [km, setKm] = useState(0)

  const horsBordeaux = ville.trim().toLowerCase() !== 'bordeaux'
  const prixUnitaire = Number(menu.prix_minimum) / min
  const prixMenuBrut = prixUnitaire * personnes
  const remiseActive = personnes >= min + 5
  const prixMenu = remiseActive ? prixMenuBrut * 0.9 : prixMenuBrut
  const livraison = horsBordeaux ? 5 + 0.59 * km : 0
  const total = prixMenu + livraison
  const eur = (n: number) => n.toFixed(2) + ' EUR'

  return (
    <form action={creerCommande}>
      <input type="hidden" name="menu_id" value={menu.id} />

      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
        <p className="mb-2 font-medium text-gray-700">Vos informations (pre-remplies)</p>
        <p className="text-gray-600">{profil.prenom} {profil.nom}</p>
        <p className="text-gray-600">{profil.email}</p>
        <p className="text-gray-600">{profil.telephone || 'Telephone non renseigne'}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nombre de personnes (minimum {min})</label>
          <input type="number" name="nombre_personne" min={min} value={personnes} onChange={(e) => setPersonnes(Number(e.target.value))} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          {personnes < min && (<p className="mt-1 text-sm text-red-600">Le minimum pour ce menu est de {min} personnes.</p>)}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Ville de livraison</label>
          <input type="text" name="ville" value={ville} onChange={(e) => setVille(e.target.value)} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        {horsBordeaux && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Distance depuis Bordeaux (km)</label>
            <input type="number" name="km" min={0} value={km} onChange={(e) => setKm(Number(e.target.value))} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date de la prestation</label>
          <input type="date" name="date" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Heure de livraison</label>
          <input type="time" name="heure" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Lieu / adresse de livraison</label>
          <input type="text" name="lieu" placeholder="12 rue des Vignes, Bordeaux" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
      </div>

      <div className="mt-6 rounded-lg border-2 border-amber-400 bg-amber-50 p-4">
        <h2 className="mb-3 font-semibold text-amber-900">Recapitulatif du prix</h2>
        <div className="flex justify-between text-sm text-gray-800"><span>Prix du menu ({personnes} pers.)</span><span>{eur(prixMenu)}</span></div>
        {remiseActive && (<p className="mb-1 text-xs text-green-700">Remise -10% appliquee (au moins 5 personnes au-dessus du minimum)</p>)}
        <div className="flex justify-between text-sm text-gray-800"><span>Livraison {horsBordeaux ? `(${km} km hors Bordeaux)` : '(Bordeaux)'}</span><span>{eur(livraison)}</span></div>
        <div className="mt-2 flex justify-between border-t border-amber-300 pt-2 font-bold text-amber-900"><span>Total</span><span>{eur(total)}</span></div>
      </div>

      <button type="submit" disabled={personnes < min} className="mt-6 w-full rounded-lg bg-amber-600 px-4 py-3 font-medium text-white hover:bg-amber-700 disabled:opacity-50">Valider la commande</button>
    </form>
  )
}