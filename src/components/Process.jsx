import { useLanguage } from '../context/LanguageContext'

export default function Process() {
  const { t } = useLanguage()
  const p = t.process

  return (
    <section id="process" className="bg-surface-0 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{p.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight">
            {p.headlineA}<br />{p.headlineB}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {p.items.map(({ n, title, body, tags }) => (
            <div key={n} className="bg-surface-0 p-8 flex flex-col">
              <div className="text-gold font-mono text-sm mb-8">{n}</div>
              <h3 className="text-off-white font-semibold text-xl mb-4">{title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-8 flex-1">{body}</p>
              <div className="border-t border-border pt-5 space-y-2.5">
                {tags.map(tag => (
                  <div key={tag} className="text-xs text-muted-light flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-gold-dim shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
