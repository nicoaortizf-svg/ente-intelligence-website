import { useLanguage } from '../context/LanguageContext'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-anchor border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <a href="#" className="flex items-center cursor-pointer" aria-label="Ente Intelligence — home">
            <Logo markClass="h-10" enteClass="text-[16px]" intoClass="text-[8px]" />
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {t.footer.links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-on-dark-muted hover:text-on-dark text-xs tracking-wide transition-colors cursor-pointer"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-on-dark-muted/70 text-xs tracking-wide">
            © {year} Ente Intelligence
          </div>
        </div>
      </div>
    </footer>
  )
}
