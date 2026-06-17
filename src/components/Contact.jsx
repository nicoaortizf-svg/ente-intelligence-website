import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const EMPTY_FORM = { name: '', email: '', company: '', phone: '', industry: '', message: '', _hp: '' }

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  const [form, setForm]           = useState(EMPTY_FORM)
  const [status, setStatus]       = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg]   = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || c.error)
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg(c.error)
      setStatus('error')
    }
  }

  const inputClass =
    'bg-white/[0.04] border border-white/15 text-on-dark text-sm px-4 py-3 focus:outline-none focus:border-bronze transition-colors placeholder:text-on-dark-muted/50 w-full'

  return (
    <section id="contact" className="bg-anchor py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-bronze-light text-xs tracking-[0.24em] uppercase shrink-0">{c.label}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-on-dark tracking-[-0.01em] leading-[1.1] mb-6">
              {c.headlineA}<br />{c.headlineB}
            </h2>
            <p className="text-on-dark-muted text-base md:text-lg leading-relaxed mb-12 max-w-md">
              {c.sub}
            </p>

            <div className="space-y-8">
              {c.promises.map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-bronze mt-2 shrink-0" />
                  <div>
                    <div className="text-on-dark font-medium text-sm mb-1">{title}</div>
                    <div className="text-on-dark-muted text-sm leading-relaxed">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="border border-white/10 bg-white/[0.02] p-8 lg:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-10 h-10 border border-bronze flex items-center justify-center mb-6">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5l3.2 3.2L13 4.5" stroke="#c0a062" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-on-dark font-medium text-xl mb-2">{c.success.heading}</h3>
                <p className="text-on-dark-muted text-sm">{c.success.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Honeypot — visually hidden from humans, invisible to screenreaders */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label htmlFor="_hp">Leave this blank</label>
                  <input
                    id="_hp"
                    type="text"
                    name="_hp"
                    value={form._hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-on-dark-muted text-xs tracking-widest uppercase">
                      {c.fields.name} <span className="text-bronze-light">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={c.fields.namePlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-on-dark-muted text-xs tracking-widest uppercase">
                      {c.fields.email} <span className="text-bronze-light">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={c.fields.emailPlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Company + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-on-dark-muted text-xs tracking-widest uppercase">{c.fields.company}</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={c.fields.companyPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-on-dark-muted text-xs tracking-widest uppercase">{c.fields.phone}</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={c.fields.phonePlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="industry" className="text-on-dark-muted text-xs tracking-widest uppercase">{c.fields.industry}</label>
                  <select
                    id="industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none cursor-pointer'}
                  >
                    <option value="" disabled>{c.fields.industryDefault}</option>
                    {c.industryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-on-dark-muted text-xs tracking-widest uppercase">
                    {c.fields.message} <span className="text-bronze-light">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={c.fields.messagePlaceholder}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {/* Server error */}
                {status === 'error' && (
                  <p className="text-sm text-bronze-light border border-bronze/40 bg-bronze/10 px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-bronze text-ink text-xs font-semibold tracking-widest uppercase hover:bg-bronze-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'submitting' ? c.fields.submitting : c.fields.submit}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
