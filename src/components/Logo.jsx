/**
 * Brand lockup: the real high-res Ente mark (recolored to white via filter so
 * it stays crisp at any DPI) + the "ENTE / INTELLIGENCE" wordmark as live text.
 * Replaces the low-res 209x60 horizontal PNG that looked blurry on retina.
 *
 * Designed for dark backgrounds (navbar + footer). Sizes are overridable.
 */
export default function Logo({
  markClass = 'h-9',
  enteClass = 'text-[15px]',
  intoClass = 'text-[7.5px]',
  gap = 'gap-3',
}) {
  return (
    <span className={`flex items-center ${gap} select-none`}>
      <img
        src="/assets/ente-logo.png"
        alt=""
        aria-hidden="true"
        className={`${markClass} w-auto shrink-0`}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-light text-on-dark tracking-[0.4em] ${enteClass}`}>ENTE</span>
        <span className={`font-light text-on-dark-muted tracking-[0.27em] mt-[0.35em] ${intoClass}`}>
          INTELLIGENCE
        </span>
      </span>
    </span>
  )
}
