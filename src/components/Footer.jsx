import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-0 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-5 h-5 border border-gold flex items-center justify-center shrink-0">
              <div className="w-2 h-2 bg-gold group-hover:bg-gold-light transition-colors" />
            </div>
            <span className="text-off-white text-sm font-semibold tracking-[0.16em] uppercase">
              Ente Intelligence
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {t.footer.links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-muted hover:text-off-white text-xs tracking-wide transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-muted text-xs tracking-wide">
            © {year} Ente Intelligence
          </div>
        </div>
      </div>
    </footer>
  )
}
