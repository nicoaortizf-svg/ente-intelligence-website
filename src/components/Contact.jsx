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
    'bg-surface-1 border border-border text-off-white text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-muted w-full'

  return (
    <section id="contact" className="bg-surface-1 py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-muted text-xs tracking-[0.22em] uppercase shrink-0">{c.label}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-off-white tracking-tight leading-tight mb-6">
              {c.headlineA}<br />{c.headlineB}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-12">
              {c.sub}
            </p>

            <div className="space-y-8">
              {c.promises.map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-gold mt-2 shrink-0" />
                  <div>
                    <div className="text-off-white font-medium text-sm mb-1">{title}</div>
                    <div className="text-muted text-sm leading-relaxed">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="border border-border bg-surface-2 p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-10 h-10 border border-gold flex items-center justify-center mb-6">
                  <span className="text-gold text-lg leading-none">✓</span>
                </div>
                <h3 className="text-off-white font-semibold text-lg mb-2">{c.success.heading}</h3>
                <p className="text-muted text-sm">{c.success.body}</p>
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
                    <label className="text-muted text-xs tracking-widest uppercase">
                      {c.fields.name} <span className="text-gold">*</span>
                    </label>
                    <input
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
                    <label className="text-muted text-xs tracking-widest uppercase">
                      {c.fields.email} <span className="text-gold">*</span>
                    </label>
                    <input
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
                    <label className="text-muted text-xs tracking-widest uppercase">{c.fields.company}</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={c.fields.companyPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-muted text-xs tracking-widest uppercase">{c.fields.phone}</label>
                    <input
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
                  <label className="text-muted text-xs tracking-widest uppercase">{c.fields.industry}</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none'}
                  >
                    <option value="" disabled>{c.fields.industryDefault}</option>
                    {c.industryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-muted text-xs tracking-widest uppercase">
                    {c.fields.message} <span className="text-gold">*</span>
                  </label>
                  <textarea
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
                  <p className="text-sm text-gold border border-gold/30 bg-gold/5 px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-gold text-surface-0 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
