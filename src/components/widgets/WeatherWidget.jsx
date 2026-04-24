import { mockWeather } from '../../mockDatabase'
import { Wind, Droplets, Thermometer } from 'lucide-react'

export default function WeatherWidget() {
  const w = mockWeather[2]

  return (
    <div className="p-5 rounded-2xl border border-slate-800" style={{ backgroundColor: '#0f172a' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weather</p>
          <h3 className="text-white font-bold text-base mt-0.5">{w.location}</h3>
          <p className="text-slate-400 text-xs">{w.elevation}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-white">{w.temp}°</p>
          <p className="text-slate-400 text-xs">{w.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: Wind, label: 'Wind', value: `${w.wind.speed}km/h` },
          { icon: Droplets, label: 'Humidity', value: `${w.humidity}%` },
          { icon: Thermometer, label: 'Feels like', value: `${w.feelsLike}°` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-2.5 rounded-xl border border-slate-800 text-center" style={{ backgroundColor: '#1e293b' }}>
            <Icon className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
            <p className="text-white text-sm font-bold">{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {w.forecast.map((f, i) => (
          <div key={i} className="flex-1 p-2 rounded-xl border border-slate-800 text-center" style={{ backgroundColor: '#1e293b' }}>
            <p className="text-slate-400 text-xs mb-1">{f.day}</p>
            <p className="text-white text-xs font-bold">{f.high}°</p>
            <p className="text-slate-500 text-xs">{f.low}°</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,145,0,0.08)', border: '1px solid rgba(255,145,0,0.15)' }}>
        <p className="text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>AI FORECAST</p>
        <p className="text-slate-300 text-xs leading-relaxed">{w.aiSummary}</p>
      </div>
    </div>
  )
}
