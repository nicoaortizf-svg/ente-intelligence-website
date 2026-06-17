import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function Industries() {
  const { t } = useLanguage()
  const ind = t.industries

  return (
    <section id="industries" className="bg-ivory py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze text-xs tracking-[0.24em] uppercase shrink-0">{ind.label}</span>
          <div className="flex-1 h-px bg-hairline" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <Reveal as="h2" className="font-serif text-4xl md:text-5xl font-medium text-ink tracking-[-0.01em] leading-[1.1]">
            {ind.headlineA}<br />{ind.headlineB}
          </Reveal>
          <Reveal as="p" delay={100} className="text-warm-gray text-base md:text-lg leading-relaxed">
            {ind.body}
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ind.items.map(({ tag, title, body }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 80}
              className="border border-hairline bg-ivory p-8 lg:p-10 flex flex-col gap-3 hover:border-bronze/40 hover:bg-ivory-deep transition-colors group"
            >
              <div className="text-bronze text-xs tracking-[0.18em] uppercase">{tag}</div>
              <h3 className="font-serif text-ink text-xl md:text-2xl font-medium">{title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
