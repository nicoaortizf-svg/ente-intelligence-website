import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="bg-ivory-deep py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{a.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: statement */}
          <div>
            <Reveal as="h2" className="font-serif text-4xl md:text-5xl font-medium text-ink tracking-[-0.01em] leading-[1.1] mb-8">
              {a.headlineA}<br />{a.headlineB}
            </Reveal>
            <Reveal className="h-px w-12 bg-bronze mb-8" />
            <div className="space-y-5 text-warm-gray text-base md:text-lg leading-relaxed max-w-xl">
              <Reveal as="p" delay={60}>{a.p1}</Reveal>
              <Reveal as="p" delay={120}>{a.p2}</Reveal>
              <Reveal as="p" delay={180}>{a.p3}</Reveal>
            </div>
          </div>

          {/* Right: facts ledger */}
          <Reveal delay={120} className="border-t border-hairline">
            {a.facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-hairline">
                <div className="sm:w-2/5 text-bronze text-xs tracking-[0.18em] uppercase font-medium shrink-0">
                  {label}
                </div>
                <div className="flex-1 font-serif text-ink text-lg md:text-xl leading-snug">
                  {value}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
