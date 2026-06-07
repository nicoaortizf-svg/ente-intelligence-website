import { useLanguage } from '../context/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const p = t.problem

  return (
    <section className="bg-surface-1 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{p.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-6">
              {p.headlineA}<br />{p.headlineB}
            </h2>
            <p className="text-muted text-base leading-relaxed">
              {p.body}
            </p>
          </div>

          {/* Right */}
          <div className="md:col-span-3 border border-border divide-y divide-border">
            {p.items.map(({ n, title, body }) => (
              <div key={n} className="flex gap-6 p-7 hover:bg-surface-2 transition-colors group">
                <span className="text-gold-dim text-xs font-mono mt-0.5 shrink-0 pt-px">{n}</span>
                <div>
                  <h3 className="text-off-white font-semibold mb-2 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
