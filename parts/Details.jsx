function Details() {
  const items = [
    {
      title: 'Подарки',
      script: 'gifts',
      text: 'Ваше присутствие — лучший подарок. Если захотите сделать приятное, мы будем благодарны за вклад в нашу семейную мечту.'
    },
    {
      title: 'Цветы',
      script: 'flowers',
      text: 'Вместо цветов будем рады бутылочке вина или приятной записке на память.'
    },
    {
      title: 'Пожелания',
      script: 'wishes',
      text: 'Главное для нас — ваше хорошее настроение и желание разделить с нами этот день.'
    }
  ];

  return (
    <>
      {/* heading on ivory */}
      <BotanicalSection padding="80px 28px 24px" overlayOpacity={0.4}>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>пара слов</div>
          <SectionTitle display="ВАЖНЫЕ ДЕТАЛИ" script="details" scriptOffset={{ right: '-6%', top: '78%' }}/>
        </div>
      </BotanicalSection>

      {/* cards on stone — soft gradient transition top and bottom for seamless blend */}
      <section style={{
        background: 'linear-gradient(180deg, var(--ivory) 0%, var(--stone) 14%, var(--stone) 86%, var(--ivory) 100%)',
        padding: '40px 24px 80px'
      }}>
        <div className="reveal" style={{ maxWidth: 460, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: 'var(--ivory-soft)',
              borderRadius: 2,
              padding: '28px 24px',
              boxShadow: 'var(--shadow-1)',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                marginBottom: 12
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
                fontFamily: 'var(--font-body)', fontSize: 14.5,
                color: 'var(--ash)', lineHeight: 1.65, margin: 0
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
