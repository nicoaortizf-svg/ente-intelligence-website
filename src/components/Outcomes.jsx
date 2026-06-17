import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import CountUp from './CountUp'

export default function Outcomes() {
  const { t } = useLanguage()
  const o = t.outcomes

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{o.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <Reveal as="h2" className="font-serif text-4xl md:text-5xl font-medium text-ink tracking-[-0.01em] leading-[1.1] mb-16 md:mb-20 max-w-3xl">
          {o.headlineA}<br />{o.headlineB}
        </Reveal>

        {/* Stat numerals */}
        <div className="grid grid-cols-2 lg:grid-cols-3 border-t border-hairline mb-20 md:mb-24">
          {o.stats.map(({ value, label }, i) => (
            <Reveal
              key={label}
              delay={(i % 3) * 90}
              className="border-b border-hairline px-1 py-8 lg:py-10 lg:px-8 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <CountUp
                value={value}
                className="block font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-ink leading-none mb-4 tracking-[-0.02em]"
              />
              <div className="text-warm-gray text-sm leading-snug max-w-[14rem]">{label}</div>
            </Reveal>
          ))}
        </div>

        {/* Result statements */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {o.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="w-8 h-px bg-bronze mb-6" />
              <h3 className="font-serif text-xl md:text-2xl font-medium text-ink mb-3">{title}</h3>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
