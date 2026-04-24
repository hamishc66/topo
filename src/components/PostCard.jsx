import { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'

function MountainImage({ gradient, desc }) {
  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ height: '180px' }}>
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-end p-3 relative`}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,180 60,80 120,130 200,40 280,100 340,60 400,90 400,180" fill="rgba(0,0,0,0.4)" />
          <polygon points="0,180 80,120 160,150 240,80 320,120 400,100 400,180" fill="rgba(0,0,0,0.25)" />
        </svg>
        {desc && <span className="relative z-10 text-xs text-white/70 font-medium">{desc}</span>}
      </div>
    </div>
  )
}

export default function PostCard({ post, onLike }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="mb-3 p-4 rounded-2xl border border-slate-800/60" style={{ backgroundColor: '#0d1526' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: post.avatarColor }}>
          {post.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-bold text-sm">{post.author}</p>
            {post.isAlert && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>ALERT</span>}
          </div>
          <p className="text-slate-500 text-xs">{post.handle} · {post.time}</p>
        </div>
      </div>

      <p className="text-slate-200 text-sm leading-relaxed">{post.content}</p>

      {post.hasImage && <MountainImage gradient={post.imageGradient || 'from-slate-700 to-slate-900'} desc={post.imageDesc} />}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-dim)' }}>#{tag}</span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-800/60">
        <button onClick={onLike} className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all active:scale-95 flex-1 justify-center">
          <Heart className="w-4 h-4 transition-colors" style={{ color: post.liked ? '#ef4444' : '#475569', fill: post.liked ? '#ef4444' : 'none' }} />
          <span className="text-xs font-semibold" style={{ color: post.liked ? '#ef4444' : '#475569' }}>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-1 justify-center">
          <MessageCircle className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-500">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-1 justify-center">
          <Share2 className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-500">{post.shares}</span>
        </button>
        <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl justify-center">
          <Bookmark className="w-4 h-4 transition-colors" style={{ color: saved ? 'var(--accent)' : '#475569', fill: saved ? 'var(--accent)' : 'none' }} />
        </button>
      </div>
    </div>
  )
}
