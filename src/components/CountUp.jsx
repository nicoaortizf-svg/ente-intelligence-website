import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Splits a metric string into an animatable number plus surrounding text.
 *   "90%"     -> { prefix: "",  end: 90,  suffix: "%",   decimals: 0 }
 *   "4x"      -> { prefix: "",  end: 4,   suffix: "x",   decimals: 0 }
 *   "<12 wk"  -> { prefix: "<", end: 12,  suffix: " wk", decimals: 0 }
 * Returns end: null when there's no number to count (renders text as-is).
 */
function parseMetric(raw) {
  const value = (raw ?? '').toString().trim()
  const match = value.match(/^([^\d]*?)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { prefix: '', end: null, suffix: value, decimals: 0 }
  const [, prefix, num, suffix] = match
  const decimals = num.split('.')[1]?.length ?? 0
  return { prefix, end: parseFloat(num), suffix, decimals }
}

/**
 * Counts a number up from 0 to its target when scrolled into view.
 * No dependency — uses IntersectionObserver + requestAnimationFrame.
 * Under prefers-reduced-motion it renders the final value with no animation.
 */
export default function CountUp({ value, duration = 1500, className }) {
  const { prefix, end, suffix, decimals } = parseMetric(value)
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (end === null) return
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setDisplay(end)
      return
    }

    let raf
    let started = false

    const run = () => {
      const start = performance.now()
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setDisplay(end * eased)
        if (t < 1) raf = requestAnimationFrame(step)
        else setDisplay(end)
      }
      raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  if (end === null) {
    return <span className={className}>{suffix}</span>
  }

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
