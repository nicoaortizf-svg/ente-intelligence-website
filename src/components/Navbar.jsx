import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: t.nav.services,   href: '#services' },
    { label: t.nav.industries, href: '#industries' },
    { label: t.nav.process,    href: '#process' },
    { label: t.nav.about,      href: '#about' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-1/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="-ml-2 flex items-center">
          <img
            src="/assets/ente-logo-horizontal.png"
            alt="Ente Intelligence"
            className="h-14 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-muted hover:text-off-white text-sm tracking-wide transition-colors"
            >
              {label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1.5 text-xs tracking-widest ml-1">
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-off-white' : 'text-muted hover:text-muted-light'}`}
            >
              EN
            </button>
            <span className="text-border-light">|</span>
            <button
              onClick={() => setLang('es')}
              className={`transition-colors ${lang === 'es' ? 'text-off-white' : 'text-muted hover:text-muted-light'}`}
            >
              ES
            </button>
          </div>

          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 bg-gold text-surface-0 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            {t.nav.cta}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-5 h-px bg-off-white origin-center transition-all duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px bg-off-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-off-white origin-center transition-all duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-surface-1 ${
          open ? 'max-h-96 border-b border-border' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-6 space-y-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted hover:text-off-white text-sm tracking-wide border-b border-border last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <div className="flex items-center gap-3 py-3 border-b border-border">
            <span className="text-muted text-xs tracking-widest uppercase">Language</span>
            <div className="flex items-center gap-1.5 text-xs tracking-widest">
              <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-off-white' : 'text-muted'}`}
              >
                EN
              </button>
              <span className="text-border-light">|</span>
              <button
                onClick={() => setLang('es')}
                className={`transition-colors ${lang === 'es' ? 'text-off-white' : 'text-muted'}`}
              >
                ES
              </button>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-4 py-3 px-5 bg-gold text-surface-0 text-xs font-semibold tracking-widest uppercase text-center hover:bg-gold-light transition-colors"
          >
            {t.nav.ctaMobile}
          </a>
        </div>
      </div>
    </header>
  )
}
