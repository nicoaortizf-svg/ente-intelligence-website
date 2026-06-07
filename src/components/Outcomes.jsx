import { useLanguage } from '../context/LanguageContext'

export default function Outcomes() {
  const { t } = useLanguage()
  const o = t.outcomes

  return (
    <section className="bg-surface-1 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{o.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight">
            {o.headlineA}<br />{o.headlineB}
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-px">
          {o.stats.map(({ value, label }) => (
            <div key={label} className="bg-surface-1 p-8">
              <div className="text-3xl md:text-4xl font-bold text-gold font-mono mb-3">{value}</div>
              <div className="text-muted text-sm leading-snug">{label}</div>
            </div>
          ))}
        </div>

        {/* Outcome cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {o.items.map(({ title, body }) => (
            <div key={title} className="bg-surface-1 p-8">
              <div className="w-6 h-px bg-gold mb-6" />
              <h3 className="text-off-white font-semibold mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
