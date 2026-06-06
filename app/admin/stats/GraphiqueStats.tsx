'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type StatMenu = {
  menu_titre: string
  nombre_commandes: number
  chiffre_affaires: number
}

export default function GraphiqueStats({ stats }: { stats: StatMenu[] }) {
  if (!stats || stats.length === 0) {
    return <p className="text-gray-500">Aucune donnee pour le moment. Passe une commande pour alimenter les statistiques.</p>
  }

  return (
    <div className="space-y-12">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Chiffre d&apos;affaires par menu (EUR)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="menu_titre" angle={-20} textAnchor="end" interval={0} height={70} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="chiffre_affaires" fill="#d97706" name="CA (EUR)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Nombre de commandes par menu</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="menu_titre" angle={-20} textAnchor="end" interval={0} height={70} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="nombre_commandes" fill="#16a34a" name="Commandes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}