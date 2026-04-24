import { mockCrewMembers } from '../../mockDatabase'
import { MapPin, Wifi } from 'lucide-react'

export default function CrewWidget() {
  return (
    <div className="p-5 rounded-2xl border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Crew</p>
          <h3 className="text-white font-bold text-base mt-0.5">{mockCrewMembers.length} nearby</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <Wifi className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-bold text-green-400">Mesh Active</span>
        </div>
      </div>

      <div className="space-y-2">
        {mockCrewMembers.map(m => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#1e293b' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: m.avatarColor }}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold">{m.name}</p>
              <p className="text-slate-500 text-xs">{m.activity}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <MapPin className="w-3 h-3 text-slate-500" />
                <p className="text-white text-xs font-bold">{m.distance}</p>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.status === 'Active' || m.status === 'Moving' ? '#22c55e' : '#64748b' }} />
                <p className="text-xs text-slate-400">{m.lastSeen}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
