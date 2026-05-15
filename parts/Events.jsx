function EventCard({ eyebrow, title, script, time, place, address, lines, mapHref, variant = 'ivory' }) {
  const isStone = variant === 'stone';
  return (
    <div className="reveal" style={{
      position: 'relative',
      background: isStone ? 'var(--stone)' : 'var(--ivory-soft)',
      padding: '40px 28px',
      borderRadius: 2,
      border: isStone ? 'none' : '1px solid var(--border)',
      boxShadow: 'var(--shadow-1)',
      textAlign: 'center'
    }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 18 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 36, textTransform: 'uppercase',
          letterSpacing: '0.04em', color: 'var(--charcoal)',
          lineHeight: 1, margin: 0
        }}>
          {title}
        </h3>
        {script && (
          <div style={{
            fontFamily: 'var(--font-script)', fontSize: 28, color: 'var(--graphite)',
            position: 'absolute', right: '-22%', top: '60%',
            opacity: 0.85, transform: 'rotate(-4deg)', lineHeight: 1
          }}>
            {script}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Rule width={32}/>
      </div>

      {time && (
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 44, color: 'var(--charcoal)',
          letterSpacing: '0.06em', lineHeight: 1, marginBottom: 18,
          fontVariantNumeric: 'tabular-nums'
        }}>
          {time}
        </div>
      )}

      {lines && (
        <div style={{
          marginBottom: 22, display: 'flex', flexDirection: 'column',
          gap: 14, alignItems: 'center'
        }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 44, color: 'var(--charcoal)',
                letterSpacing: '0.06em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums'
              }}>
                {ln.time}
              </div>
              <div className="eyebrow" style={{ marginTop: 8 }}>{ln.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--charcoal)',
        fontWeight: 500, marginBottom: 6, lineHeight: 1.4
      }}>
        {place}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ash)',
        lineHeight: 1.5
      }}>
        {address}
      </div>
    </div>
  );
}

function CeremonyCard() {
  return (
    <BotanicalSection id="ceremony" padding="40px 24px" overlayOpacity={0.35}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <EventCard
          eyebrow="первая часть дня"
          title="РОСПИСЬ"
          script="ceremony"
          time="12:00"
          place="Дворец бракосочетания № 3"
          address="ул. Юных Ленинцев, 35, корп. 1"
          variant="ivory"
        />
      </div>
    </BotanicalSection>
  );
}

function BanquetCard() {
  return (
    <BotanicalSection id="banquet" padding="24px 24px 56px" overlayOpacity={0.35}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <EventCard
          eyebrow="вечерняя часть"
          title="БАНКЕТ"
          script="reception"
          place="Парк отель Медвежьи озёра"
          address="ул. Берег озера, 1, д. Медвежьи Озёра"
          lines={[
            { time: '16:00', label: 'сбор гостей' },
            { time: '17:00', label: 'начало банкета' }
          ]}
          variant="stone"
        />
      </div>
    </BotanicalSection>
  );
}

window.CeremonyCard = CeremonyCard;
window.BanquetCard = BanquetCard;
