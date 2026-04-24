import { useState } from 'react'
import { motion } from 'framer-motion'
import { mockPosts } from '../mockDatabase'
import PostCard from '../components/PostCard'
import { Mountain, Search, Bell } from 'lucide-react'

export default function Feed({ user }) {
  const [posts, setPosts] = useState(mockPosts.map(p => ({ ...p, liked: false })))

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#020617' }}>
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div className="flex items-center gap-2">
          <Mountain className="w-5 h-5" style={{color: 'var(--accent)'}} />
          <span className="text-white font-bold tracking-widest text-base uppercase">TOPO</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700" style={{ backgroundColor: '#1e293b' }}>
            <Search className="w-4 h-4 text-slate-400" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700 relative" style={{ backgroundColor: '#1e293b' }}>
            <Bell className="w-4 h-4 text-slate-400" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          </button>
        </div>
      </div>

      <div className="flex-1 scroll-area pb-24 px-4">
        {posts.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}>
            <PostCard post={post} onLike={() => handleLike(post.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
