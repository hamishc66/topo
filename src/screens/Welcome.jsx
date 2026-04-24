import { motion } from 'framer-motion'
import { Mountain, ArrowRight } from 'lucide-react'

function TopoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            .tl { fill: none; stroke: rgba(255,145,0,0.07); stroke-width: 1.5; }
            .tl2 { fill: none; stroke: rgba(255,145,0,0.04); stroke-width: 1; }
            @keyframes tf1 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(-15px,-20px); } 66% { transform: translate(10px,12px); } }
            @keyframes tf2 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(18px,15px); } 66% { transform: translate(-12px,-18px); } }
            @keyframes tf3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,22px); } }
            .tg1 { animation: tf1 18s ease-in-out infinite; }
            .tg2 { animation: tf2 22s ease-in-out infinite; }
            .tg3 { animation: tf3 26s ease-in-out infinite; }
          `}</style>
        </defs>
        <g className="tg1">
          <path className="tl" d="M-50,200 Q150,150 300,220 Q450,290 600,230 Q720,185 850,210"/>
          <path className="tl" d="M-50,280 Q100,220 280,300 Q440,370 620,310 Q750,270 870,290"/>
          <path className="tl" d="M-30,360 Q120,310 320,370 Q480,430 660,380 Q780,345 900,360"/>
          <path className="tl" d="M-80,440 Q80,400 260,450 Q420,500 580,460 Q720,430 920,445"/>
          <path className="tl" d="M-60,520 Q60,490 240,530 Q380,565 560,535 Q700,510 940,525"/>
        </g>
        <g className="tg2">
          <path className="tl" d="M-50,160 Q200,100 380,170 Q520,225 700,160 Q800,125 900,145"/>
          <path className="tl" d="M-50,600 Q180,555 360,610 Q500,650 680,600 Q800,565 930,590"/>
          <path className="tl" d="M-50,680 Q160,640 340,690 Q490,730 680,690 Q810,660 950,675"/>
          <path className="tl" d="M20,750 Q200,715 400,760 Q560,795 750,760 Q870,735 980,755"/>
          <path className="tl" d="M-20,830 Q150,800 380,840 Q540,868 740,840 Q880,818 1010,830"/>
        </g>
        <g className="tg3">
          <path className="tl2" d="M100,100 Q250,60 400,110 Q550,158 680,100 Q780,60 900,80"/>
          <path className="tl2" d="M-20,480 Q100,450 280,490 Q430,524 600,482 Q730,452 900,470"/>
          <path className="tl2" d="M50,720 Q230,695 450,730 Q620,758 800,725 Q900,708 970,720"/>
        </g>
      </svg>
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2,6,23,0.7) 60%, rgba(2,6,23,0.97) 100%)'}}/>
    </div>
  )
}

export default function Welcome({ onGetStarted, onLogin }) {
  return (
    <div className="relative w-full h-full flex flex-col" style={{ backgroundColor: '#020617' }}>
      <TopoBackground />
      <div className="relative z-10 flex flex-col h-full px-6">
        <div className="flex items-center justify-between pt-14 pb-4">
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6" style={{color: 'var(--accent)'}} />
            <span className="text-white font-bold text-lg tracking-widest uppercase">TOPO</span>
          </div>
          <button onClick={onLogin} className="text-sm text-slate-400 px-3 py-1.5 rounded-full border border-slate-700">
            Log in
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="mb-3">
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{color: 'var(--accent)'}}>DISCOVER YOUR TERRAIN</span>
            </div>
            <h1 className="text-5xl font-black text-white leading-none mb-2 tracking-tight">
              The social app<br />
              <span style={{color: 'var(--accent)'}}>built for</span><br />
              the wild.
            </h1>
            <p className="text-slate-400 text-base mt-5 max-w-xs leading-relaxed">
              Connect with outdoor crews. Track your gear. Navigate with mesh comms. All in one premium platform.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-wrap gap-2 mt-6">
            {['Mesh Comms', 'Smart Weather', 'Gear Locker', 'Local Crew'].map(f => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full text-slate-300 border border-slate-700/60" style={{ backgroundColor: 'rgba(30,41,59,0.8)' }}>
                {f}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="pb-12 space-y-3">
          <button onClick={onGetStarted} className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.97]" style={{backgroundColor: 'var(--accent)', color: '#000'}}>
            Get started — it's free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={onLogin} className="w-full py-4 rounded-2xl font-semibold text-base text-white border border-slate-700 transition-all active:scale-[0.97]" style={{ backgroundColor: 'rgba(15,23,42,0.5)' }}>
            I already have an account
          </button>
          <p className="text-center text-xs text-slate-600 pt-1">By continuing you agree to TOPO's Terms & Privacy Policy</p>
        </motion.div>
      </div>
    </div>
  )
}
