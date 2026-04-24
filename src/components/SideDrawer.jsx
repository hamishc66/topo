import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Mountain, Settings, Info, ChevronRight, Moon, Bell } from 'lucide-react'

export default function SideDrawer({ open, onClose, user, customization, onLogout, onUpdateCustomization }) {
  const accent = customization?.accentColor || '#ff9100'

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-30" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
          
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-80 z-40 border-l border-slate-800"
            style={{ backgroundColor: '#0a0f1a' }}>
            
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 pt-14 pb-6">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" style={{color: accent}} />
                  <span className="text-white font-bold tracking-widest text-sm uppercase">TOPO</span>
                </div>
                <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700" style={{ backgroundColor: '#1e293b' }}>
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="mx-5 mb-6 p-4 rounded-2xl border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: accent }}>
                    {user?.initials || 'U'}
                  </div>
                  <div>
                    <p className="text-white font-bold">{user?.name || 'Adventurer'}</p>
                    <p className="text-slate-400 text-sm">{user?.handle || '@explorer'}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 scroll-area px-5 space-y-1">
                {[
                  { icon: Settings, label: 'Preferences', sub: 'App settings & layout' },
                  { icon: Bell, label: 'Notifications', sub: 'Alerts & updates' },
                  { icon: Moon, label: 'Appearance', sub: 'Theme & display' },
                  { icon: Info, label: 'About TOPO', sub: 'Version 2.1.0' },
                ].map(({ icon: Icon, label, sub }) => (
                  <button key={label} className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-colors hover:bg-slate-800/50">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700" style={{ backgroundColor: '#1e293b' }}>
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{label}</p>
                      <p className="text-slate-500 text-xs">{sub}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                ))}
              </div>

              <div className="p-5 pb-8">
                <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-900">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
