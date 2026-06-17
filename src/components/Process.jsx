import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function Process() {
  const { t } = useLanguage()
  const p = t.process

  return (
    <section id="process" className="bg-ivory-deep py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{p.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <Reveal as="h2" className="font-serif text-4xl md:text-5xl font-medium text-ink tracking-[-0.01em] leading-[1.1] mb-16 md:mb-24 max-w-3xl">
          {p.headlineA}<br />{p.headlineB}
        </Reveal>

        {/* Vertical sequence */}
        <div className="max-w-5xl">
          {p.items.map(({ n, title, body, tags }, i) => (
            <Reveal
              key={n}
              delay={i * 70}
              className="grid md:grid-cols-12 gap-4 md:gap-10 pb-14 md:pb-16 last:pb-0"
            >
              {/* Numeral */}
              <div className="md:col-span-3">
                <span className="font-serif text-6xl md:text-7xl text-bronze/35 leading-none">{n}</span>
              </div>

              {/* Content */}
              <div className="md:col-span-9 border-t border-hairline pt-6">
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-ink mb-4">{title}</h3>
                <p className="text-warm-gray text-base leading-relaxed max-w-2xl mb-6">{body}</p>
                <div className="flex flex-wrap gap-x-7 gap-y-2.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-xs text-warm-gray-light tracking-wide uppercase flex items-center gap-2.5">
                      <span className="w-1 h-1 bg-bronze shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
