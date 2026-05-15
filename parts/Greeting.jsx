function Greeting() {
  return (
    <BotanicalSection padding="88px 28px" overlayOpacity={0.45}>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 420, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}></div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(36px, 10vw, 48px)',
          textTransform: 'uppercase', letterSpacing: '0.03em',
          color: 'var(--charcoal)', lineHeight: 1.05, margin: 0
        }}>
          ДОРОГИЕ ГОСТИ!
        </h2>
        <div style={{
          fontFamily: 'var(--font-script)', fontSize: 32, color: 'var(--graphite)',
          opacity: 0.8, marginTop: 8, transform: 'rotate(-3deg)'
        }}>

        </div>
        <p style={{
          marginTop: 32, fontFamily: 'var(--font-body)',
          fontSize: 16, color: 'var(--ash)', lineHeight: 1.75
        }}>
          Этот день станет для нас поистине незабываемым,
          и мы мечтаем провести его рядом с&nbsp;Вами.
        </p>
        <p style={{
          marginTop: 18, fontFamily: 'var(--font-body)',
          fontSize: 16, color: 'var(--ash)', lineHeight: 1.75
        }}>
          Приглашаем Вас присоединиться к&nbsp;нашей свадьбе
          и украсить её своим присутствием!
        </p>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <Rule width={56} />
        </div>
      </div>
    </BotanicalSection>);

}
window.Greeting = Greeting;