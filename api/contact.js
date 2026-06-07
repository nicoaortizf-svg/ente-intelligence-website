import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limit: 1 submission per IP per 60 seconds.
// Note: Vercel may run multiple function instances, so this is per-instance.
// For stricter production rate limiting, add Upstash Redis.
const rateLimitMap = new Map()
const RATE_LIMIT_MS = 60_000

function isRateLimited(ip) {
  const now = Date.now()
  const last = rateLimitMap.get(ip)
  if (last && now - last < RATE_LIMIT_MS) return true
  rateLimitMap.set(ip, now)
  // Prune old entries to prevent memory growth
  for (const [key, ts] of rateLimitMap) {
    if (now - ts > RATE_LIMIT_MS) rateLimitMap.delete(key)
  }
  return false
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ??
    req.socket?.remoteAddress ??
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' })
  }

  const { name, email, company, phone, industry, message, _hp } = req.body ?? {}

  // Honeypot — bots fill this hidden field; humans never see it
  if (_hp) {
    // Silently accept so bots don't know they were caught
    return res.status(200).json({ ok: true })
  }

  // Server-side validation
  const errors = []
  if (!name?.trim())    errors.push('Name is required.')
  if (!email?.trim())   errors.push('Email is required.')
  if (!message?.trim()) errors.push('Message is required.')
  if (email && !EMAIL_RE.test(email.trim())) errors.push('Please enter a valid email address.')

  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') })
  }

  // Build the email body
  const rows = [
    ['Name',     name.trim()],
    ['Email',    email.trim()],
    ['Company',  company?.trim() || '—'],
    ['Phone',    phone?.trim()   || '—'],
    ['Industry', industry?.trim() || '—'],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;background:#161616;color:#6b6560;font-size:11px;
                   text-transform:uppercase;letter-spacing:0.1em;width:120px;vertical-align:top;">
          ${label}
        </td>
        <td style="padding:10px 16px;background:#1e1e1e;color:#f0ede8;font-size:14px;
                   vertical-align:top;">
          ${value}
        </td>
      </tr>`
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:28px;border-bottom:1px solid #242424;">
              <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
                        color:#b89a5c;">Ente Intelligence</p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;color:#f0ede8;
                         letter-spacing:-0.02em;">New Website Inquiry</h1>
            </td>
          </tr>

          <!-- Fields table -->
          <tr>
            <td style="padding-top:24px;">
              <table width="100%" cellpadding="0" cellspacing="1" style="border-collapse:separate;
                     border-spacing:0 2px;">
                ${tableRows}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding-top:24px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
                        color:#6b6560;">Message</p>
              <div style="background:#1e1e1e;padding:16px;color:#f0ede8;font-size:14px;
                          line-height:1.7;white-space:pre-wrap;">
                ${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:36px;border-top:1px solid #242424;margin-top:36px;">
              <p style="margin:0;font-size:11px;color:#6b6560;">
                Sent from enteintelligence.com contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',       // Resend sandbox sender
      to:   'nicolasortiz@enteintelligence.com',
      replyTo: email.trim(),               // Replying goes directly to the prospect
      subject: `New inquiry from ${name.trim()}${company?.trim() ? ` — ${company.trim()}` : ''}`,
      html,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
