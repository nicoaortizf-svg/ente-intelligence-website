import { motion, useReducedMotion } from 'framer-motion'

/**
 * Flowing bronze lines drifting through the centre of the dark hero.
 * Decorative only (aria-hidden). Reduced-motion renders them static.
 *
 * Curves are generated as smooth cubic beziers joined with the SVG "S"
 * (smooth-curveto) command, which reflects the previous control point — so
 * the joins are tangent-continuous and there are no sharp bends. The lines
 * are spaced as a band centred on the vertical middle of the viewBox.
 */
const VW = 1200
const VH = 600
const COUNT = 26
const SPACING = 13

function buildPath(i) {
  const y = VH / 2 + (i - (COUNT - 1) / 2) * SPACING
  const dir = i % 2 === 0 ? 1 : -1
  const amp = 28 + (i % 5) * 10
  const a = y - dir * amp
  const b = y + dir * amp
  const a2 = y - dir * amp * 0.85
  // M -> C (left half) -> S (right half, smooth reflected join at the middle)
  return `M -80 ${y} C ${VW * 0.18} ${a}, ${VW * 0.36} ${b}, ${VW * 0.5} ${y} S ${VW * 0.82} ${a2}, ${VW + 80} ${y}`
}

function FlowingLines() {
  const reduce = useReducedMotion()

  return (
    <svg
      className="w-full h-full text-bronze"
      viewBox={`0 0 ${VW} ${VH}`}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {Array.from({ length: COUNT }, (_, i) => (
        <motion.path
          key={i}
          d={buildPath(i)}
          stroke="currentColor"
          strokeWidth={1.1 + (i % 3) * 0.3}
          strokeLinecap="round"
          strokeOpacity={0.34 + (i % 6) * 0.03}
          initial={{ pathLength: 0.4, opacity: 0.6 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.85 }
              : { pathLength: 1, opacity: [0.45, 0.9, 0.45], pathOffset: [0, 1, 0] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 16 + (i % 6) * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }
          }
        />
      ))}
    </svg>
  )
}

export default function HeroPaths() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <FlowingLines />
    </div>
  )
}
