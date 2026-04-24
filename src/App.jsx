import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Welcome from './screens/Welcome'
import Auth from './screens/Auth'
import Customize from './screens/Customize'
import MainApp from './screens/MainApp'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94]
}

function App() {
  const [screen, setScreen] = useState('welcome')
  const [user, setUser] = useState(null)
  const [customization, setCustomization] = useState(null)
  const [authMode, setAuthMode] = useState('signup')

  useEffect(() => {
    const storedUser = localStorage.getItem('topo_user')
    const storedCustomization = localStorage.getItem('topo_customization')
    if (storedUser && storedCustomization) {
      setUser(JSON.parse(storedUser))
      setCustomization(JSON.parse(storedCustomization))
      setScreen('app')
    } else if (storedUser) {
      setUser(JSON.parse(storedUser))
      setScreen('customize')
    }
  }, [])

  const handleAuth = (userData) => {
    setUser(userData)
    localStorage.setItem('topo_user', JSON.stringify(userData))
    setScreen('customize')
  }

  const handleCustomization = (config) => {
    setCustomization(config)
    localStorage.setItem('topo_customization', JSON.stringify(config))
    setScreen('app')
  }

  const handleLogout = () => {
    localStorage.removeItem('topo_user')
    localStorage.removeItem('topo_customization')
    setUser(null)
    setCustomization(null)
    setScreen('welcome')
  }

  const updateCustomization = (newConfig) => {
    setCustomization(newConfig)
    localStorage.setItem('topo_customization', JSON.stringify(newConfig))
  }

  useEffect(() => {
    const accent = customization?.accentColor || '#ff9100'
    document.documentElement.style.setProperty('--accent', accent)
    const hex = accent.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    document.documentElement.style.setProperty('--accent-dim', `rgba(${r},${g},${b},0.15)`)
    document.documentElement.style.setProperty('--accent-rgb', `${r},${g},${b}`)
  }, [customization?.accentColor])

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100dvh', backgroundColor: '#020617' }}>
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="absolute inset-0">
            <Welcome onGetStarted={() => { setAuthMode('signup'); setScreen('auth') }} onLogin={() => { setAuthMode('login'); setScreen('auth') }} />
          </motion.div>
        )}
        {screen === 'auth' && (
          <motion.div key="auth" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="absolute inset-0">
            <Auth mode={authMode} onAuth={handleAuth} onBack={() => setScreen('welcome')} onSwitchMode={(m) => setAuthMode(m)} />
          </motion.div>
        )}
        {screen === 'customize' && (
          <motion.div key="customize" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="absolute inset-0">
            <Customize user={user} onComplete={handleCustomization} />
          </motion.div>
        )}
        {screen === 'app' && (
          <motion.div key="app" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="absolute inset-0">
            <MainApp user={user} customization={customization} onLogout={handleLogout} onUpdateCustomization={updateCustomization} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
