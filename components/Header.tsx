import { createClient } from '@/utils/supabase/server'
import { signOut } from '@/app/connexion/actions'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-amber-700">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="6.5" r="1.3" /><path d="M12 9 L12 7.8" /><path d="M4 18 Q4 9 12 9 Q20 9 20 18" /><path d="M3 18 h18" /></svg>
          <span>Vite &amp; Gourmand</span>
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="/menus" className="text-gray-700 hover:text-amber-700">Nos menus</a>
          {user ? (
            <>
              <a href="/compte" className="text-gray-700 hover:text-amber-700">Mon compte</a>
              <form action={signOut}><button type="submit" className="rounded-lg bg-gray-800 px-3 py-1.5 text-white hover:bg-gray-900">Deconnexion</button></form>
            </>
          ) : (
            <>
              <a href="/connexion" className="text-gray-700 hover:text-amber-700">Connexion</a>
              <a href="/inscription" className="rounded-lg bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700">Inscription</a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
