'use client'

import { useState } from 'react'

type Menu = {
  id: number
  titre: string
  description: string | null
  nombre_personne_minimum: number
  prix_minimum: number
  theme: { libelle: string } | null
  regime: { libelle: string } | null
}

export default function MenusListe({ menus }: { menus: Menu[] }) {
  const [prixMin, setPrixMin] = useState('')
  const [prixMax, setPrixMax] = useState('')
  const [theme, setTheme] = useState('')
  const [regime, setRegime] = useState('')
  const [personnes, setPersonnes] = useState('')

  const themes = Array.from(new Set(menus.map((m) => m.theme?.libelle).filter(Boolean))) as string[]
  const regimes = Array.from(new Set(menus.map((m) => m.regime?.libelle).filter(Boolean))) as string[]

  const menusFiltres = menus.filter((menu) => {
    if (prixMin !== '' && menu.prix_minimum < Number(prixMin)) return false
    if (prixMax !== '' && menu.prix_minimum > Number(prixMax)) return false
    if (theme !== '' && menu.theme?.libelle !== theme) return false
    if (regime !== '' && menu.regime?.libelle !== regime) return false
    if (personnes !== '' && menu.nombre_personne_minimum > Number(personnes)) return false
    return true
  })

  function reinitialiser() {
    setPrixMin('')
    setPrixMax('')
    setTheme('')
    setRegime('')
    setPersonnes('')
  }

  return (
    <div className="text-gray-900">
      <div className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Prix min (EUR)</label>
          <input type="number" min="0" value={prixMin} onChange={(e) => setPrixMin(e.target.value)} placeholder="0" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Prix max (EUR)</label>
          <input type="number" min="0" value={prixMax} onChange={(e) => setPrixMax(e.target.value)} placeholder="500" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
            <option value="">Tous</option>
            {themes.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Regime</label>
          <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900">
            <option value="">Tous</option>
            {regimes.map((r) => (<option key={r} value={r}>{r}</option>))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nombre de personnes</label>
          <input type="number" min="1" value={personnes} onChange={(e) => setPersonnes(e.target.value)} placeholder="ex : 4" className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900" />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">{menusFiltres.length} menu(s) trouve(s)</p>
        <button onClick={reinitialiser} className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">Reinitialiser</button>
      </div>

      {menusFiltres.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">Aucun menu ne correspond a ces criteres.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menusFiltres.map((menu) => (
            <article key={menu.id} className="rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">{menu.titre}</h2>
              <p className="mb-3 text-sm text-gray-600">{menu.description}</p>
              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                {menu.theme?.libelle && (<span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800">{menu.theme.libelle}</span>)}
                {menu.regime?.libelle && (<span className="rounded-full bg-green-100 px-2 py-1 text-green-800">{menu.regime.libelle}</span>)}
              </div>
              <p className="text-sm">A partir de {menu.nombre_personne_minimum} personnes</p>
              <p className="mb-4 text-lg font-bold">{menu.prix_minimum} EUR</p>
              <a href={`/menus/${menu.id}`} className="inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Voir le detail</a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}