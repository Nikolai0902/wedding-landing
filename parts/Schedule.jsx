function Schedule() {
  const items = [
    { time: '12:00', label: 'Роспись',         where: 'Дворец бракосочетания № 3', addr: 'ул. Юных Ленинцев, 35, корп. 1' },
    { time: '16:00', label: 'Сбор гостей',     where: 'Парк отель Медвежьи озёра', addr: 'ул. Берег озера, 1, д. Медвежьи Озёра' },
    { time: '17:00', label: 'Начало банкета',  where: 'Парк отель Медвежьи озёра', addr: null },
  ];
  return (
    <BotanicalSection id="schedule" padding="88px 24px" overlayOpacity={0.4}>
      <div className="reveal" style={{ maxWidth: 460, margin: '0 auto' }}>
        <SectionTitle display="ПЛАН ДНЯ" script="timing" scriptOffset={{ right: '-14%', top: '58%' }}/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -16, marginBottom: 40 }}>
          <Rule width={48}/>
        </div>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* vertical hairline */}
          <div style={{
            position: 'absolute', left: 7, top: 6, bottom: 6,
            width: 1, background: 'var(--whisper)'
          }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {items.map((it, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* dot */}
                <div style={{
                  position: 'absolute', left: -28, top: 14,
                  width: 15, height: 15, borderRadius: '50%',
                  background: 'var(--ivory)',
                  border: '1.5px solid var(--charcoal)',
                  boxSizing: 'border-box',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--charcoal)' }}/>
                </div>

                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 32, color: 'var(--charcoal)',
                  letterSpacing: '0.04em', lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {it.time}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
                  color: 'var(--charcoal)', marginTop: 8, letterSpacing: '0.02em'
                }}>
                  {it.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 13.5,
                  color: 'var(--ash)', marginTop: 4, lineHeight: 1.5
                }}>
                  {it.where}
                </div>
                {it.addr && (
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 12.5,
                    color: 'var(--mist)', marginTop: 2, lineHeight: 1.5
                  }}>
                    {it.addr}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BotanicalSection>
  );
}
window.Schedule = Schedule;
