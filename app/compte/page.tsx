import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../connexion/actions'

export default async function ComptePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-3xl font-bold">Mon compte</h1>
      <p className="mb-6 text-gray-700">Connecte en tant que <strong>{user.email}</strong></p>
      <form action={signOut}>
        <button type="submit" className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900">Se deconnecter</button>
      </form>
    </main>
  )
}