import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="bg-surface-0 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{a.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: statement */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight mb-8">
              {a.headlineA}<br />{a.headlineB}
            </h2>
            <div className="h-px w-12 bg-gold mb-8" />
            <div className="space-y-5 text-muted text-base leading-relaxed">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
            </div>
          </div>

          {/* Right: fact table */}
          <div className="border border-border divide-y divide-border">
            {a.facts.map(({ label, value }) => (
              <div key={label} className="flex">
                <div className="w-2/5 p-5 bg-surface-1 text-muted text-xs tracking-widest uppercase font-medium shrink-0">
                  {label}
                </div>
                <div className="flex-1 p-5 bg-surface-2 text-off-white text-sm leading-relaxed">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
