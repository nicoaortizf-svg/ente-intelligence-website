import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Logo from './Logo'

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
          ? 'bg-anchor/95 backdrop-blur-sm border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center cursor-pointer" aria-label="Ente Intelligence — home">
          <Logo markClass="h-9" enteClass="text-[15px]" intoClass="text-[7.5px]" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-on-dark-muted hover:text-on-dark text-sm tracking-wide transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1.5 text-xs tracking-widest ml-1">
            <button
              onClick={() => setLang('en')}
              className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-on-dark' : 'text-on-dark-muted hover:text-on-dark'}`}
            >
              EN
            </button>
            <span className="text-white/25">|</span>
            <button
              onClick={() => setLang('es')}
              className={`cursor-pointer transition-colors ${lang === 'es' ? 'text-on-dark' : 'text-on-dark-muted hover:text-on-dark'}`}
            >
              ES
            </button>
          </div>

          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 bg-bronze text-ink text-xs font-semibold tracking-widest uppercase hover:bg-bronze-light transition-colors cursor-pointer"
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
          <span className={`block w-5 h-px bg-on-dark origin-center transition-all duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px bg-on-dark transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-on-dark origin-center transition-all duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-anchor ${
          open ? 'max-h-96 border-b border-white/10' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-6 space-y-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-on-dark-muted hover:text-on-dark text-sm tracking-wide border-b border-white/10 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <div className="flex items-center gap-3 py-3 border-b border-white/10">
            <span className="text-on-dark-muted text-xs tracking-widest uppercase">Language</span>
            <div className="flex items-center gap-1.5 text-xs tracking-widest">
              <button
                onClick={() => setLang('en')}
                className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-on-dark' : 'text-on-dark-muted'}`}
              >
                EN
              </button>
              <span className="text-white/25">|</span>
              <button
                onClick={() => setLang('es')}
                className={`cursor-pointer transition-colors ${lang === 'es' ? 'text-on-dark' : 'text-on-dark-muted'}`}
              >
                ES
              </button>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-4 py-3 px-5 bg-bronze text-ink text-xs font-semibold tracking-widest uppercase text-center hover:bg-bronze-light transition-colors cursor-pointer"
          >
            {t.nav.ctaMobile}
          </a>
        </div>
      </div>
    </header>
  )
}
