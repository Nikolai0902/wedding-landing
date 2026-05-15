function Closing() {
  return (
    <BotanicalSection padding="96px 28px 120px" overlayOpacity={0.5}>
      <div className="reveal" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>до встречи</div>

        <div style={{
          fontFamily: 'var(--font-script)', fontSize: 'clamp(44px, 13vw, 56px)',
          color: 'var(--graphite)', lineHeight: 1,
          opacity: 0.9, transform: 'rotate(-3deg)', marginBottom: 8
        }}>
          with love,
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(40px, 12vw, 56px)',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          color: 'var(--charcoal)', lineHeight: 1.05, margin: 0
        }}>
          ОЛЕСЯ
          <br/>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.55em', verticalAlign: 'middle', opacity: 0.75, letterSpacing: 0 }}>&amp;</span> АРТЁМ
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Rule width={48}/>
        </div>

        <div style={{
          marginTop: 32,
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 22, color: 'var(--charcoal)',
          letterSpacing: '0.4em', textIndent: '0.4em',
          fontVariantNumeric: 'tabular-nums'
        }}>
          17 · 07 · 2026
        </div>
      </div>
    </BotanicalSection>
  );
}
window.Closing = Closing;
