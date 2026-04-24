import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Radio, Wifi, WifiOff } from 'lucide-react'

const INITIAL_NODES = [
  { id: 1, name: "Kai_B", distance: "0.3km", signal: 95, x: 55, y: 35 },
  { id: 2, name: "Sierra_D", distance: "1.2km", signal: 78, x: 25, y: 55 },
  { id: 3, name: "TOPO-R7", distance: "2.1km", signal: 62, x: 72, y: 65 },
  { id: 4, name: "Ava_C", distance: "2.8km", signal: 48, x: 40, y: 75 },
  { id: 5, name: "RangerUnit7", distance: "3.4km", signal: 35, x: 80, y: 40 },
]

const INITIAL_MESSAGES = [
  { id: 1, sender: "Kai_B", content: "Heading up north face, will check in at waypoint 3", time: "14:23", isMe: false },
  { id: 2, sender: "Me", content: "Copy that. Weather looks stable for another 4 hours", time: "14:24", isMe: true },
  { id: 3, sender: "Sierra_D", content: "Trail conditions good below 1800m. Snow above.", time: "14:26", isMe: false },
  { id: 4, sender: "RangerUnit7", content: "⚠️ Avalanche advisory: North aspects elevated risk", time: "14:31", isMe: false },
  { id: 5, sender: "Me", content: "Roger that. Staying on south aspects today", time: "14:32", isMe: true },
]

function RadarBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative w-72 h-72 opacity-20">
        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
          <div key={i} className="absolute rounded-full border border-green-500" style={{
            width: `${scale * 288}px`,
            height: `${scale * 288}px`,
            top: '50%',
            left: '50%',
            marginTop: `-${scale * 144}px`,
            marginLeft: `-${scale * 144}px`
          }} />
        ))}
        <div className="absolute inset-0" style={{ animation: 'radarScan 3s linear infinite', transformOrigin: 'center center' }}>
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '2px',
            top: '50%',
            right: '50%',
            transformOrigin: 'right center',
            background: 'linear-gradient(to left, rgba(34,197,94,0.8), transparent)',
          }} />
          <div style={{
            position: 'absolute',
            width: '144px',
            height: '144px',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(34,197,94,0.15), transparent 90deg)',
          }} />
        </div>
        <div className="absolute rounded-full bg-green-400 w-3 h-3" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </div>
    </div>
  )
}

export default function Mesh({ user }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [nodes, setNodes] = useState([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    INITIAL_NODES.forEach((node, i) => {
      setTimeout(() => {
        setNodes(prev => [...prev, node])
      }, i * 600 + 500)
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg = {
      id: Date.now(),
      sender: 'Me',
      content: input.trim(),
      time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isMe: true
    }
    setMessages(prev => [...prev, msg])
    setInput('')
    setTimeout(() => {
      const responders = INITIAL_NODES.filter(n => n.signal > 50)
      const responder = responders[Math.floor(Math.random() * responders.length)]
      const responses = ['👍 Copy that', 'Understood', 'Roger, staying safe', 'All good here', '✅ Received']
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: responder?.name || 'Kai_B',
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isMe: false
      }])
    }, 1200 + Math.random() * 1000)
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#020617' }}>
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <div>
          <h2 className="text-2xl font-black text-white">Mesh</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            {connected ? <Wifi className="w-3 h-3 text-green-400" /> : <WifiOff className="w-3 h-3 text-red-400" />}
            <p className="text-xs" style={{ color: connected ? '#4ade80' : '#f87171' }}>{nodes.length} nodes connected</p>
          </div>
        </div>
        <button onClick={() => setConnected(!connected)} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border" style={{ borderColor: connected ? '#166534' : '#991b1b', backgroundColor: connected ? 'rgba(22,101,52,0.2)' : 'rgba(153,27,27,0.2)', color: connected ? '#4ade80' : '#f87171' }}>
          <Radio className="w-3 h-3" />
          {connected ? 'Online' : 'Offline'}
        </button>
      </div>

      <div className="relative mx-5 rounded-2xl border border-slate-800 overflow-hidden" style={{ height: '180px', backgroundColor: '#020617' }}>
        <RadarBackground />
        <div className="absolute inset-0">
          {nodes.map(node => (
            <div key={node.id} className="absolute node-appear flex flex-col items-center" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)' }}>
              <div className="w-2.5 h-2.5 rounded-full mb-1" style={{ backgroundColor: node.signal > 70 ? '#4ade80' : node.signal > 40 ? '#fbbf24' : '#f87171', boxShadow: `0 0 8px ${node.signal > 70 ? '#4ade80' : node.signal > 40 ? '#fbbf24' : '#f87171'}` }} />
              <span className="text-green-400 font-mono leading-none" style={{ fontSize: '9px' }}>{node.name}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-3 text-xs font-mono text-green-500 opacity-60">TOPO MESH v2.1</div>
        <div className="absolute bottom-2 right-3 text-xs font-mono text-green-500 opacity-60">RANGE: 5km</div>
      </div>

      <div className="flex gap-2 px-5 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {nodes.map(node => (
          <div key={node.id} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.signal > 70 ? '#4ade80' : node.signal > 40 ? '#fbbf24' : '#f87171' }} />
            <span className="text-xs text-slate-300 font-mono">{node.name}</span>
            <span className="text-xs text-slate-500">{node.distance}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 scroll-area px-5 pb-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Local Burst Chat</p>
        {messages.map(msg => (
          <div key={msg.id} className={`flex mb-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%]">
              {!msg.isMe && <p className="text-xs text-slate-500 mb-1 ml-1 font-mono">{msg.sender}</p>}
              <div className="px-4 py-2.5 rounded-2xl text-sm" style={{
                backgroundColor: msg.isMe ? 'var(--accent)' : '#1e293b',
                color: msg.isMe ? '#000' : '#e2e8f0',
                borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
              }}>
                {msg.content}
              </div>
              <p className="text-xs text-slate-600 mt-1 font-mono" style={{ textAlign: msg.isMe ? 'right' : 'left' }}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-3 px-5 pb-24 pt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Burst message to crew..."
          className="flex-1 py-3 px-4 rounded-2xl text-white text-sm focus:outline-none border border-slate-700"
          style={{ backgroundColor: '#0f172a' }}
        />
        <button onClick={sendMessage} className="w-11 h-11 flex items-center justify-center rounded-2xl flex-shrink-0 transition-all active:scale-95" style={{ backgroundColor: 'var(--accent)' }}>
          <Send className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  )
}
