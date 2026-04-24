import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WeatherWidget from '../components/widgets/WeatherWidget'
import GearWidget from '../components/widgets/GearWidget'
import CrewWidget from '../components/widgets/CrewWidget'
import { Edit3, Check, ChevronUp, ChevronDown } from 'lucide-react'

const DEFAULT_WIDGETS = [
  { id: 'weather', label: 'Weather' },
  { id: 'gear', label: 'Gear Locker' },
  { id: 'crew', label: 'Local Crew' },
]

export default function Dashboard({ user }) {
  const [editMode, setEditMode] = useState(false)
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS)

  const moveWidget = (index, direction) => {
    const newWidgets = [...widgets]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newWidgets.length) return
    ;[newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]]
    setWidgets(newWidgets)
  }

  const renderWidget = (id) => {
    switch (id) {
      case 'weather': return <WeatherWidget />
      case 'gear': return <GearWidget />
      case 'crew': return <CrewWidget />
      default: return null
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#020617' }}>
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white">Dashboard</h2>
          <p className="text-slate-400 text-sm mt-0.5">Hey, {user?.name?.split(' ')[0] || 'Adventurer'} 👋</p>
        </div>
        <button onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
          style={{
            backgroundColor: editMode ? 'var(--accent)' : '#1e293b',
            color: editMode ? '#000' : '#94a3b8',
            border: editMode ? 'none' : '1px solid #334155'
          }}>
          {editMode ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {editMode ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 scroll-area px-5 pb-24">
        <AnimatePresence>
          {widgets.map((widget, i) => (
            <motion.div key={widget.id} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="mb-4 relative rounded-2xl overflow-hidden"
              style={{ outline: editMode ? '2px solid var(--accent)' : '2px solid transparent', outlineOffset: '2px' }}>
              {editMode && (
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                  <button onClick={() => moveWidget(i, -1)} disabled={i === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg disabled:opacity-30 transition-opacity"
                    style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveWidget(i, 1)} disabled={i === widgets.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg disabled:opacity-30 transition-opacity"
                    style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
              {renderWidget(widget.id)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
