import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="relative min-h-screen bg-[#060606] flex flex-col justify-center overflow-hidden">

      {/* Full-width grid — consistent left to right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-surface-1 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-8 bg-gold shrink-0" />
          <span className="text-gold text-xs tracking-[0.22em] uppercase font-medium">
            {h.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[108px] font-bold text-off-white leading-[1.03] tracking-tight mb-8 max-w-5xl">
          {h.headlineA}<span className="text-gold">.</span><br />
          {h.headlineB}<span className="text-gold">.</span>
        </h1>

        {/* Sub-copy */}
        <p className="text-muted-light text-lg lg:text-xl leading-relaxed max-w-2xl mb-12">
          {h.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-surface-0 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            {h.cta1}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#services"
            className="px-7 py-3.5 border border-border-light text-off-white text-xs tracking-widest uppercase hover:border-muted-light transition-colors"
          >
            {h.cta2}
          </a>
        </div>

      </div>
    </section>
  )
}
