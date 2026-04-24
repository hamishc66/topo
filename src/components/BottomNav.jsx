import { Rss, Map, Radio, Settings, CloudSun, Users } from 'lucide-react'

const TAB_ICONS = {
  Feed: Rss,
  Map: Map,
  Mesh: Radio,
  Gear: Settings,
  Weather: CloudSun,
  Crew: Users,
}

export default function BottomNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-slate-800" style={{ backgroundColor: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
      {tabs.map(tab => {
        const Icon = TAB_ICONS[tab] || Rss
        const active = activeTab === tab
        return (
          <button key={tab} onClick={() => onTabChange(tab)} className="flex-1 flex flex-col items-center gap-1 py-3 transition-all">
            <Icon className="w-5 h-5 transition-colors" style={{ color: active ? 'var(--accent)' : '#475569' }} />
            <span className="text-xs font-semibold transition-colors" style={{ color: active ? 'var(--accent)' : '#475569' }}>{tab}</span>
            {active && <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />}
          </button>
        )
      })}
    </div>
  )
}
