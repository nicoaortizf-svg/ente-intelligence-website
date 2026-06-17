import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="bg-ivory-deep py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{s.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <Reveal as="h2" className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-ink tracking-[-0.01em] leading-[1.08] mb-16 md:mb-20 max-w-3xl">
          {s.headlineA}<br />{s.headlineB}
        </Reveal>

        {/* Ruled capabilities index */}
        <div className="border-t border-hairline">
          {s.items.map(({ id, title, body }, i) => (
            <Reveal
              key={id}
              delay={(i % 3) * 80}
              className="group grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 md:py-8 border-b border-hairline transition-colors"
            >
              <div className="md:col-span-1 font-serif text-bronze text-lg leading-none">{id}</div>
              <h3 className="md:col-span-4 font-serif text-ink text-xl md:text-2xl font-medium leading-snug group-hover:text-bronze transition-colors">
                {title}
              </h3>
              <p className="md:col-span-7 text-warm-gray text-sm md:text-base leading-relaxed">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
