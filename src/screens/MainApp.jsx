import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from '../components/BottomNav'
import SideDrawer from '../components/SideDrawer'
import Feed from './Feed'
import Dashboard from './Dashboard'
import Mesh from './Mesh'
import { Menu } from 'lucide-react'
import { mockWeather, mockCrewMembers } from '../mockDatabase'

function MapPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full" style={{ backgroundColor: '#020617' }}>
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ backgroundColor: '#1e293b' }}>
        <span className="text-4xl">🗺️</span>
      </div>
      <h3 className="text-white text-xl font-bold mb-2">Map</h3>
      <p className="text-slate-500 text-sm text-center max-w-xs px-8">Offline topographic maps coming soon. Connect with crew locations in real-time.</p>
    </div>
  )
}

function WeatherScreen() {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#020617' }}>
      <div className="px-5 pt-14 pb-4">
        <h2 className="text-2xl font-black text-white">Weather</h2>
        <p className="text-slate-400 text-sm mt-1">Mountain conditions</p>
      </div>
      <div className="flex-1 scroll-area px-5 pb-24">
        {mockWeather.map(w => (
          <div key={w.id} className="mb-4 p-5 rounded-2xl border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-base">{w.location}</h3>
                <p className="text-slate-400 text-xs">{w.elevation}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-3xl font-black">{w.temp}°</p>
                <p className="text-slate-400 text-xs">Feels {w.feelsLike}°</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">{w.condition}</p>
            {w.alerts.length > 0 && w.alerts.map((a, i) => (
              <div key={i} className="text-xs px-3 py-2 rounded-xl mb-2 font-semibold" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>⚠️ {a}</div>
            ))}
            <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,145,0,0.08)', border: '1px solid rgba(255,145,0,0.15)' }}>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>AI FORECAST</p>
              <p className="text-slate-300 text-xs leading-relaxed">{w.aiSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CrewScreen() {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#020617' }}>
      <div className="px-5 pt-14 pb-4">
        <h2 className="text-2xl font-black text-white">Crew</h2>
        <p className="text-slate-400 text-sm mt-1">Nearby via TOPO Mesh</p>
      </div>
      <div className="flex-1 scroll-area px-5 pb-24">
        {mockCrewMembers.map(m => (
          <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 mb-3" style={{ backgroundColor: '#0f172a' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: m.avatarColor }}>
              {m.initials}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{m.name}</p>
              <p className="text-slate-400 text-xs">{m.handle} · {m.activity}</p>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-bold">{m.distance}</p>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.status === 'Active' || m.status === 'Moving' ? '#22c55e' : '#64748b' }} />
                <p className="text-xs text-slate-400">{m.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MainApp({ user, customization, onLogout, onUpdateCustomization }) {
  const tabs = customization?.tabs || ['Feed', 'Map', 'Gear']
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const renderScreen = () => {
    switch (activeTab) {
      case 'Feed': return <Feed user={user} customization={customization} />
      case 'Map': return <MapPlaceholder />
      case 'Mesh': return <Mesh user={user} />
      case 'Gear': return <Dashboard user={user} customization={customization} />
      case 'Weather': return <WeatherScreen />
      case 'Crew': return <CrewScreen />
      default: return <Feed user={user} customization={customization} />
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col" style={{ backgroundColor: '#020617' }}>
      <button onClick={() => setDrawerOpen(true)} className="absolute top-14 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-slate-700" style={{ backgroundColor: '#1e293b' }}>
        <Menu className="w-4 h-4 text-white" />
      </button>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="h-full">
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} customization={customization} onLogout={onLogout} onUpdateCustomization={onUpdateCustomization} />
    </div>
  )
}
