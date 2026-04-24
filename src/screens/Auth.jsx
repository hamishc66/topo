import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mountain, Eye, EyeOff, User, AtSign, Mail } from 'lucide-react'

export default function Auth({ mode, onAuth, onBack, onSwitchMode }) {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const isSignup = mode === 'signup'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const n = name || 'Adventurer'
      const parts = n.split(' ')
      const initials = (parts[0]?.[0] || 'A').toUpperCase() + (parts[1]?.[0] || '').toUpperCase()
      onAuth({
        name: n,
        handle: handle ? `@${handle.replace('@','')}` : `@explorer_${Math.floor(Math.random()*9999)}`,
        email: email || '',
        joinedAt: new Date().toISOString(),
        avatarColor: '#ff9100',
        initials
      })
      setLoading(false)
    }, 800)
  }

  const inputClass = "w-full rounded-xl py-3.5 pr-4 text-white text-sm focus:outline-none transition-colors border"
  const inputStyle = { backgroundColor: '#0f172a', borderColor: '#334155' }

  return (
    <div className="relative w-full h-full flex flex-col" style={{ backgroundColor: '#020617' }}>
      <div className="flex items-center gap-3 px-5 pt-14 pb-6">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: '#1e293b' }}>
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Mountain className="w-5 h-5" style={{color: 'var(--accent)'}} />
          <span className="text-white font-bold tracking-widest text-sm uppercase">TOPO</span>
        </div>
      </div>

      <div className="flex-1 px-6 scroll-area">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h2 className="text-3xl font-black text-white mb-1">{isSignup ? 'Join the crew.' : 'Welcome back.'}</h2>
          <p className="text-slate-400 text-sm mb-8">{isSignup ? 'Create your TOPO account and hit the trail.' : 'Sign in to continue your adventure.'}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Kai Blackwood" className={`${inputClass} pl-11`} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Handle</label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" value={handle} onChange={e => setHandle(e.target.value.replace(/\s/g,''))} placeholder="yourhandle" className={`${inputClass} pl-11`} style={inputStyle} />
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`${inputClass} pl-11`} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={`${inputClass} px-4 pr-12`} style={inputStyle} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl font-bold text-base mt-2 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-70" style={{backgroundColor: 'var(--accent)', color: '#000'}}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Loading…
                </span>
              ) : (isSignup ? 'Create account' : 'Sign in')}
            </button>
          </form>

          <div className="mt-6 text-center pb-8">
            <span className="text-slate-500 text-sm">{isSignup ? 'Already have an account? ' : "Don't have an account? "}</span>
            <button onClick={() => onSwitchMode(isSignup ? 'login' : 'signup')} className="text-sm font-semibold" style={{color: 'var(--accent)'}}>
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
