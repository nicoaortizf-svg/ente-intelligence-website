import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function Problem() {
  const { t } = useLanguage()
  const p = t.problem

  return (
    <section className="bg-ivory-deep py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{p.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="md:col-span-2">
            <Reveal as="h2" className="font-serif text-4xl md:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.01em] mb-6">
              {p.headlineA}<br />{p.headlineB}
            </Reveal>
            <Reveal as="p" delay={100} className="text-warm-gray text-base md:text-lg leading-relaxed max-w-md">
              {p.body}
            </Reveal>
          </div>

          {/* Right — ruled list */}
          <div className="md:col-span-3 border-t border-hairline">
            {p.items.map(({ n, title, body }, i) => (
              <Reveal
                key={n}
                delay={i * 90}
                className="flex gap-6 lg:gap-8 py-7 border-b border-hairline group"
              >
                <span className="font-serif text-bronze text-lg shrink-0 leading-none pt-1">{n}</span>
                <div>
                  <h3 className="font-serif text-ink text-xl font-medium mb-2">{title}</h3>
                  <p className="text-warm-gray text-sm md:text-base leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
