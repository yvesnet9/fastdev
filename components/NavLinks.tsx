'use client'

import { useState } from 'react'
import { signOut } from '@/app/connexion/actions'

export default function NavLinks({ connecte, roleId = 0 }: { connecte: boolean; roleId?: number }) {
  const [ouvert, setOuvert] = useState(false)

  const liens = (
    <>
      <a href="/menus" className="text-gray-700 hover:text-amber-700">Nos menus</a>
      {connecte ? (
        <>
          <a href="/compte" className="text-gray-700 hover:text-amber-700">Mon compte</a>
          {roleId >= 2 && (
            <a href="/employe" className="text-gray-700 hover:text-amber-700">Espace employe</a>
          )}
          {roleId >= 3 && (
            <a href="/admin" className="text-gray-700 hover:text-amber-700">Espace admin</a>
          )}
          <form action={signOut}><button type="submit" className="rounded-lg bg-gray-800 px-3 py-1.5 text-white hover:bg-gray-900">Deconnexion</button></form>
        </>
      ) : (
        <>
          <a href="/connexion" className="text-gray-700 hover:text-amber-700">Connexion</a>
          <a href="/inscription" className="rounded-lg bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700">Inscription</a>
        </>
      )}
    </>
  )

  return (
    <>
      {/* Menu horizontal sur grand ecran */}
      <div className="hidden items-center gap-4 text-sm sm:flex">
        {liens}
      </div>

      {/* Bouton hamburger sur mobile */}
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        aria-label="Ouvrir le menu"
        aria-expanded={ouvert}
        className="text-gray-700 sm:hidden"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
        </svg>
      </button>

      {/* Menu deroulant mobile */}
      {ouvert && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-3 border-b border-gray-200 bg-white px-6 py-4 text-sm sm:hidden">
          {liens}
        </div>
      )}
    </>
  )
}