import { createClient } from '@/utils/supabase/server'
import NavLinks from './NavLinks'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Recuperer le role de l'utilisateur connecte (1=client, 2=employe, 3=admin)
  let roleId = 0
  if (user) {
    const { data: profil } = await supabase
      .from('utilisateur')
      .select('role_id')
      .eq('id', user.id)
      .single()
    roleId = profil?.role_id ?? 1
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-amber-700">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="6.5" r="1.3" /><path d="M12 9 L12 7.8" /><path d="M4 18 Q4 9 12 9 Q20 9 20 18" /><path d="M3 18 h18" /></svg>
          <span>Vite &amp; Gourmand</span>
        </a>
        <NavLinks connecte={!!user} roleId={roleId} />
      </nav>
    </header>
  )
}