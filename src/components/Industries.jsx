import { useLanguage } from '../context/LanguageContext'

export default function Industries() {
  const { t } = useLanguage()
  const ind = t.industries

  return (
    <section id="industries" className="bg-surface-1 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{ind.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight">
            {ind.headlineA}<br />{ind.headlineB}
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            {ind.body}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {ind.items.map(({ tag, title, body }) => (
            <div key={title} className="bg-surface-1 p-8 flex flex-col gap-3 hover:bg-surface-3 transition-colors group">
              <div className="text-gold text-xs tracking-[0.16em] uppercase">{tag}</div>
              <h3 className="text-off-white font-semibold text-xl group-hover:text-gold transition-colors">
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
