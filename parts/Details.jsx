function Details() {
  const items = [
    {
      title: 'Дресс-код',
      script: 'dress code',
      text: 'На нашей свадьбе ограничений по дресс-коду нет. Для нас главное — Ваше присутствие и хорошее настроение!'
    },
    {
      title: 'Подарки',
      script: 'gifts',
      text: 'Мы не будем оригинальными, но будем практичными. Лучший для нас подарок — это Ваша денежная инвестиция в нашу молодую семью.'
    }
  ];

  return (
    <>
      {/* heading on ivory */}
      <BotanicalSection padding="80px 28px 24px" overlayOpacity={0.4}>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <SectionTitle display="ДЕТАЛИ" script="details" scriptOffset={{ right: '-22%', top: '64%' }}/>
        </div>
      </BotanicalSection>

      {/* cards on a soft stone wash — gradient edges keep the transition seamless */}
      <section style={{
        background: 'linear-gradient(180deg, transparent 0%, var(--stone) 14%, var(--stone) 86%, transparent 100%)',
        padding: '40px 24px 80px'
      }}>
        <div className="reveal" style={{ maxWidth: 460, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: 'var(--ivory-soft)',
              borderRadius: 'var(--r-md)',
              padding: '32px 26px',
              boxShadow: 'var(--shadow-1)',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                marginBottom: 14, flexWrap: 'wrap'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 26, textTransform: 'uppercase',
                  letterSpacing: '0.04em', color: 'var(--charcoal)', lineHeight: 1
                }}>
                  {it.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-script)', fontSize: 24,
                  color: 'var(--graphite)', opacity: 0.75, lineHeight: 1,
                  transform: 'translateY(2px)'
                }}>
                  {it.script}
                </div>
              </div>
              <Rule width={28} style={{ marginBottom: 14 }}/>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'var(--ash)', lineHeight: 1.7, margin: 0
              }}>
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
window.Details = Details;
