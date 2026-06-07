import { useLanguage } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="bg-surface-0 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{s.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight">
            {s.headlineA}<br />{s.headlineB}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {s.items.map(({ id, title, body }) => (
            <div key={id} className="bg-surface-0 p-8 flex flex-col gap-4 hover:bg-surface-2 transition-colors group">
              <div className="text-gold-dim text-xs font-mono">{id}</div>
              <h3 className="text-off-white font-semibold text-lg group-hover:text-gold transition-colors">
                {title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
