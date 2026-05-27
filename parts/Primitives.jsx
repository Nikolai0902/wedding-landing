// Shared primitives — pulled straight from the design system
// (botanical sections, section heading with script overlay, square CTA, hairline rule)

function BotanicalSection({ children, background = 'transparent', padding = '80px 28px', overlayOpacity, id, style }) {
  // Botanical pattern now lives on the shell as one continuous backdrop —
  // per-section overlay is intentionally NOT rendered to avoid visible seams.
  return (
    <section id={id} style={{
      position: 'relative',
      background,
      padding,
      ...style
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ display, script, scriptOffset = { right: '8%', top: '62%' }, scriptRotate = -4, align = 'center' }) {
  return (
    <div style={{ textAlign: align, position: 'relative', marginBottom: 36, display: 'inline-block', width: '100%' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(40px, 11vw, 52px)',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          color: 'var(--charcoal)', lineHeight: 1, margin: 0
        }}>
          {display}
        </h2>
        {script && (
          <div style={{
            fontFamily: 'var(--font-script)', fontSize: 36, color: 'var(--graphite)',
            position: 'absolute', right: scriptOffset.right, top: scriptOffset.top,
            opacity: 0.85, transform: `rotate(${scriptRotate}deg)`, lineHeight: 1
          }}>
            {script}
          </div>
        )}
      </div>
    </div>
  );
}

// PI-style square CTA — variants: 'soft' (ivory-soft) / 'dark' (charcoal)
function PiBtn({ children, variant = 'soft', as = 'button', href, type, onClick, disabled, style, fullWidth }) {
  const base = {
    fontFamily: 'var(--font-body)',
    fontSize: 11, fontWeight: 500,
    letterSpacing: '0.22em', textTransform: 'uppercase',
    padding: '16px 28px',
    background: variant === 'dark' ? 'var(--charcoal)' : 'var(--ivory-soft)',
    color: variant === 'dark' ? 'var(--ivory)' : 'var(--charcoal)',
    border: variant === 'soft' ? '1px solid rgba(44,42,38,.10)' : 'none',
    borderRadius: 2,
    textDecoration: 'none',
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center', justifyContent: 'center', gap: 10,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur) var(--ease)',
    width: fullWidth ? '100%' : 'auto',
    boxSizing: 'border-box',
    ...style
  };
  if (as === 'a') {
    return <a href={href} style={base}>{children}</a>;
  }
  return <button type={type || 'button'} onClick={onClick} disabled={disabled} style={base}>{children}</button>;
}

function Rule({ width = 48, vertical = false, color = 'var(--whisper)', style }) {
  return vertical
    ? <span style={{ display: 'inline-block', width: 1, height: width, background: color, ...style }}/>
    : <span style={{ display: 'inline-block', height: 1, width, background: color, ...style }}/>;
}

window.BotanicalSection = BotanicalSection;
window.SectionTitle = SectionTitle;
window.PiBtn = PiBtn;
window.Rule = Rule;
