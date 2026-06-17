import { useInView } from '../hooks/useInView'

/**
 * Wraps children in a fade + rise reveal that triggers when scrolled into view.
 * Styling lives in index.css ([data-reveal] / [data-visible]); this only
 * toggles the data attribute. `delay` (ms) staggers grouped reveals.
 *
 *   <Reveal as="h2" delay={120} className="...">Heading</Reveal>
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={inView ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
