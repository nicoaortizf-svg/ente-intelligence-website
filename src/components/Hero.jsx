import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import HeroPaths from './HeroPaths'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  // Cascade the cover in on load (above the fold, so not scroll-triggered).
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(r)
  }, [])

  return (
    <section className="relative min-h-screen bg-anchor flex flex-col justify-center overflow-hidden">

      {/* Animated flowing paths — faint bronze texture (reduced-motion aware) */}
      <HeroPaths />

      {/* Warm bronze glow — very subtle, anchors the eye to the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(154,123,63,0.12), transparent 70%)',
        }}
      />

      {/* Faint editorial baseline rule down the left margin */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-6 lg:left-12 w-px bg-white/[0.06] pointer-events-none"
      />

      {/* Content */}
      <div
        data-loaded={loaded}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-24"
      >

        {/* Eyebrow */}
        <div className="hero-rise flex items-center gap-4 mb-10" style={{ '--d': '0ms' }}>
          <div className="h-px w-10 bg-bronze shrink-0" />
          <span className="text-bronze-light text-xs tracking-[0.28em] uppercase font-medium">
            {h.eyebrow}
          </span>
        </div>

        {/* Headline — Playfair serif, line-by-line reveal */}
        <h1 className="font-serif text-on-dark font-medium leading-[1.02] tracking-[-0.015em] mb-10 text-5xl sm:text-6xl lg:text-8xl xl:text-[124px] max-w-6xl">
          <span className="hero-rise block" style={{ '--d': '140ms' }}>
            {h.headlineA}<span className="text-bronze">.</span>
          </span>
          <span className="hero-rise block" style={{ '--d': '260ms' }}>
            {h.headlineB}<span className="text-bronze">.</span>
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          className="hero-rise text-on-dark-muted text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-12"
          style={{ '--d': '380ms' }}
        >
          {h.sub}
        </p>

        {/* CTAs */}
        <div className="hero-rise flex flex-wrap items-center gap-4" style={{ '--d': '500ms' }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-ink text-xs font-semibold tracking-[0.18em] uppercase hover:bg-bronze-light transition-colors cursor-pointer"
          >
            {h.cta1}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-white/15 text-on-dark text-xs tracking-[0.18em] uppercase hover:border-bronze-light hover:text-bronze-light transition-colors cursor-pointer"
          >
            {h.cta2}
          </a>
        </div>

      </div>

      {/* Bottom hairline divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10 pointer-events-none" />
    </section>
  )
}
