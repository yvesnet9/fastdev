import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getStatsParMenu, getChiffreAffairesTotal } from '@/utils/mongodb/stats'
import GraphiqueStats from './GraphiqueStats'

export default async function AdminStatsPage() {
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

  if (!profil || profil.role_id !== 3) {
    redirect('/')
  }

  const stats = await getStatsParMenu()
  const caTotal = await getChiffreAffairesTotal()

  return (
    <main className="mx-auto max-w-4xl p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Statistiques</h1>
      <nav className="mb-8 flex flex-wrap gap-3">
        <a href="/admin" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Comptes</a>
        <a href="/admin/stats" className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Statistiques</a>
      </nav>

      <div className="mb-10 rounded-xl border-2 border-amber-400 bg-amber-50 p-6">
        <p className="text-sm text-amber-900">Chiffre d&apos;affaires total</p>
        <p className="text-3xl font-bold text-amber-900">{caTotal.toFixed(2)} EUR</p>
        <p className="mt-1 text-xs text-amber-800">Source : base NoSQL MongoDB</p>
      </div>

      <GraphiqueStats stats={stats} />
    </main>
  )
}