import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mountain, Check, ChevronRight, Rss, Map, Radio, Settings, CloudSun, Users } from 'lucide-react'

const PRESETS = [
  { id: 'explorer', name: 'Explorer', icon: '🧭', tabs: ['Feed', 'Map', 'Weather', 'Gear'], accentColor: '#ff9100', description: 'Navigation, weather & discovery' },
  { id: 'climber', name: 'Climber', icon: '🧗', tabs: ['Feed', 'Gear', 'Weather', 'Crew'], accentColor: '#ef4444', description: 'Gear tracking & crew sync' },
  { id: 'runner', name: 'Runner', icon: '🏃', tabs: ['Feed', 'Map', 'Crew', 'Weather'], accentColor: '#3b82f6', description: 'Tracks, crew & weather' },
  { id: 'ranger', name: 'Ranger', icon: '🌲', tabs: ['Feed', 'Map', 'Mesh', 'Crew', 'Gear'], accentColor: '#22c55e', description: 'Full comms & operations suite' },
  { id: 'minimal', name: 'Minimal', icon: '◻', tabs: ['Feed', 'Map', 'Gear'], accentColor: '#94a3b8', description: 'Just the essentials' },
]

const TAB_OPTIONS = [
  { id: 'Feed', label: 'Feed', icon: Rss },
  { id: 'Map', label: 'Map', icon: Map },
  { id: 'Mesh', label: 'Mesh', icon: Radio },
  { id: 'Gear', label: 'Gear', icon: Settings },
  { id: 'Weather', label: 'Weather', icon: CloudSun },
  { id: 'Crew', label: 'Crew', icon: Users },
]

const ACCENT_COLORS = [
  { id: 'orange', color: '#ff9100', label: 'SAR Orange' },
  { id: 'red', color: '#ef4444', label: 'Summit Red' },
  { id: 'blue', color: '#3b82f6', label: 'Alpine Blue' },
  { id: 'green', color: '#22c55e', label: 'Trail Green' },
]

export default function Customize({ user, onComplete }) {
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [isCustom, setIsCustom] = useState(false)
  const [tabs, setTabs] = useState(['Feed', 'Map', 'Gear'])
  const [accentColor, setAccentColor] = useState('#ff9100')
  const [features, setFeatures] = useState({ meshComms: true, weatherAlerts: true, gearReminders: false, crewLocation: true })

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id)
    setIsCustom(false)
    setTabs(preset.tabs)
    setAccentColor(preset.accentColor)
    document.documentElement.style.setProperty('--accent', preset.accentColor)
  }

  const handleCustom = () => {
    setIsCustom(true)
    setSelectedPreset(null)
  }

  const toggleTab = (tabId) => {
    if (tabs.includes(tabId)) {
      if (tabs.length > 3) setTabs(tabs.filter(t => t !== tabId))
    } else {
      if (tabs.length < 5) setTabs([...tabs, tabId])
    }
  }

  const toggleFeature = (key) => {
    setFeatures(f => ({ ...f, [key]: !f[key] }))
  }

  const handleComplete = () => {
    onComplete({ preset: selectedPreset, tabs, accentColor, features, isCustom })
  }

  return (
    <div className="relative w-full h-full flex flex-col" style={{ backgroundColor: '#020617' }}>
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <Mountain className="w-5 h-5" style={{color: 'var(--accent)'}} />
          <span className="text-white font-bold tracking-widest text-sm uppercase">TOPO</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-1">Make it yours.</h2>
        <p className="text-slate-400 text-sm">Choose a preset or build your own layout.</p>
      </div>

      <div className="flex-1 scroll-area px-6 pb-32">
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Choose a preset</p>
          <div className="space-y-2">
            {PRESETS.map(preset => (
              <button key={preset.id} onClick={() => handlePresetSelect(preset)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left"
                style={{
                  backgroundColor: selectedPreset === preset.id ? 'var(--accent-dim)' : 'rgba(15,23,42,0.8)',
                  borderColor: selectedPreset === preset.id ? 'var(--accent)' : '#334155'
                }}>
                <span className="text-2xl">{preset.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{preset.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{preset.description}</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                  style={{ borderColor: selectedPreset === preset.id ? 'var(--accent)' : '#475569', backgroundColor: selectedPreset === preset.id ? 'var(--accent)' : 'transparent' }}>
                  {selectedPreset === preset.id && <Check className="w-3 h-3 text-black" />}
                </div>
              </button>
            ))}
            <button onClick={handleCustom}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left"
              style={{
                backgroundColor: isCustom ? 'var(--accent-dim)' : 'rgba(15,23,42,0.8)',
                borderColor: isCustom ? 'var(--accent)' : '#334155'
              }}>
              <span className="text-2xl">⚙️</span>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Custom</p>
                <p className="text-slate-400 text-xs mt-0.5">Build your own layout</p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: isCustom ? 'var(--accent)' : '#475569', backgroundColor: isCustom ? 'var(--accent)' : 'transparent' }}>
                {isCustom && <Check className="w-3 h-3 text-black" />}
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {(isCustom || selectedPreset) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bottom Tabs <span className="text-slate-600 normal-case font-normal">({tabs.length}/5 selected, min 3)</span></p>
              <div className="grid grid-cols-3 gap-2">
                {TAB_OPTIONS.map(({ id, label, icon: Icon }) => {
                  const sel = tabs.includes(id)
                  return (
                    <button key={id} onClick={() => toggleTab(id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                      style={{
                        backgroundColor: sel ? 'var(--accent-dim)' : 'rgba(15,23,42,0.8)',
                        borderColor: sel ? 'var(--accent)' : '#334155'
                      }}>
                      <Icon className="w-5 h-5" style={{ color: sel ? 'var(--accent)' : '#64748b' }} />
                      <span className="text-xs font-semibold" style={{ color: sel ? 'var(--accent)' : '#94a3b8' }}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Accent Color</p>
          <div className="flex gap-3">
            {ACCENT_COLORS.map(({ id, color, label }) => (
              <button key={id} onClick={() => {
                setAccentColor(color)
                document.documentElement.style.setProperty('--accent', color)
              }} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all"
                  style={{ backgroundColor: color, borderColor: accentColor === color ? 'white' : 'transparent', boxShadow: accentColor === color ? `0 0 16px ${color}66` : 'none' }}>
                  {accentColor === color && <Check className="w-5 h-5 text-black" strokeWidth={3} />}
                </div>
                <span className="text-xs text-slate-400">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Features</p>
          <div className="space-y-2">
            {[
              { key: 'meshComms', label: 'Mesh Communications', desc: 'P2P offline messaging' },
              { key: 'weatherAlerts', label: 'Weather Alerts', desc: 'Push notifications for conditions' },
              { key: 'gearReminders', label: 'Gear Reminders', desc: 'Service and check reminders' },
              { key: 'crewLocation', label: 'Crew Location', desc: 'Share position with your crew' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-2xl border border-slate-800" style={{ backgroundColor: 'rgba(15,23,42,0.8)' }}>
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
                <button onClick={() => toggleFeature(key)} className="relative w-12 h-6 rounded-full transition-all" style={{ backgroundColor: features[key] ? 'var(--accent)' : '#334155' }}>
                  <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: features[key] ? 'calc(100% - 22px)' : '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8" style={{ background: 'linear-gradient(to top, #020617 60%, transparent)' }}>
        <button onClick={handleComplete} disabled={!selectedPreset && !isCustom} className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-40"
          style={{backgroundColor: 'var(--accent)', color: '#000'}}>
          Continue to TOPO
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
