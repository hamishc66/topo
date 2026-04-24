import { useState } from 'react'
import { mockGearItems } from '../../mockDatabase'
import { ChevronRight, AlertTriangle, CheckCircle, Flame } from 'lucide-react'

const STATUS_CONFIG = {
  OK: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: CheckCircle },
  CHECK: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: AlertTriangle },
  'LOW FUEL': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: Flame },
}

export default function GearWidget() {
  const [expanded, setExpanded] = useState(false)
  const items = expanded ? mockGearItems : mockGearItems.slice(0, 4)
  const issues = mockGearItems.filter(g => g.status !== 'OK').length

  return (
    <div className="p-5 rounded-2xl border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gear Locker</p>
          <h3 className="text-white font-bold text-base mt-0.5">{mockGearItems.length} items</h3>
        </div>
        {issues > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">{issues} need attention</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {items.map(item => {
          const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.OK
          const Icon = cfg.icon
          return (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#1e293b' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                <Icon className="w-4 h-4" style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{item.name}</p>
                <p className="text-slate-500 text-xs">{item.category} · {item.weight}</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                {item.status}
              </span>
            </div>
          )
        })}
      </div>

      <button onClick={() => setExpanded(!expanded)} className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700 text-slate-400">
        {expanded ? 'Show less' : `Show all ${mockGearItems.length} items`}
        <ChevronRight className="w-3.5 h-3.5" style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}
