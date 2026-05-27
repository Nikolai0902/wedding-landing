function EventCard({ eyebrow, title, script, lines, place, address, mapHref, variant = 'ivory' }) {
  const isStone = variant === 'stone';
  return (
    <div className="reveal" style={{
      position: 'relative',
      background: isStone ? 'var(--stone)' : 'var(--ivory-soft)',
      padding: '40px 28px',
      borderRadius: 'var(--r-md)',
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

      {lines && (
        <div style={{
          marginBottom: 28, display: 'flex', flexDirection: 'column',
          gap: 18, alignItems: 'center'
        }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 40, color: 'var(--charcoal)',
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
        lineHeight: 1.5, marginBottom: mapHref ? 24 : 0
      }}>
        {address}
      </div>

      {mapHref && (
        <PiBtn as="a" href={mapHref} variant="soft" style={{
          // explicit anchor target — Yandex map opens in new tab
        }}>
          <a style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}/>
          Открыть на карте <span style={{ letterSpacing: 0 }}>→</span>
        </PiBtn>
      )}
    </div>
  );
}

// Helper so the map link opens in a new tab (PiBtn renders <a>; we wrap with target via prop spread on the underlying element through the as="a" path).
// PiBtn already supports as="a"+href — we just need target="_blank" + rel. Reach into the rendered element with a fragment override:
function EventMapButton({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      padding: '16px 28px',
      background: 'var(--ivory-soft)',
      color: 'var(--charcoal)',
      border: '1px solid rgba(44,42,38,.10)',
      borderRadius: 2,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', gap: 10,
      cursor: 'pointer',
      transition: 'background var(--dur) var(--ease)',
      boxSizing: 'border-box'
    }}>
      Открыть на карте <span style={{ letterSpacing: 0 }}>→</span>
    </a>
  );
}

function EventCardWithMap(props) {
  const { mapHref, ...rest } = props;
  const isStone = props.variant === 'stone';
  return (
    <div className="reveal" style={{
      position: 'relative',
      background: isStone ? 'var(--stone)' : 'var(--ivory-soft)',
      padding: '40px 28px',
      borderRadius: 'var(--r-md)',
      border: isStone ? 'none' : '1px solid var(--border)',
      boxShadow: 'var(--shadow-1)',
      textAlign: 'center'
    }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{props.eyebrow}</div>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 18 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 36, textTransform: 'uppercase',
          letterSpacing: '0.04em', color: 'var(--charcoal)',
          lineHeight: 1, margin: 0
        }}>
          {props.title}
        </h3>
        {props.script && (
          <div style={{
            fontFamily: 'var(--font-script)', fontSize: 28, color: 'var(--graphite)',
            position: 'absolute', right: '-22%', top: '60%',
            opacity: 0.85, transform: 'rotate(-4deg)', lineHeight: 1
          }}>
            {props.script}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Rule width={32}/>
      </div>

      {props.lines && (
        <div style={{
          marginBottom: 28, display: 'flex', flexDirection: 'column',
          gap: 18, alignItems: 'center'
        }}>
          {props.lines.map((ln, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 40, color: 'var(--charcoal)',
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
        {props.place}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ash)',
        lineHeight: 1.5, marginBottom: mapHref ? 24 : 0
      }}>
        {props.address}
      </div>

      {mapHref && <EventMapButton href={mapHref}/>}
    </div>
  );
}

function CeremonyCard() {
  return (
    <BotanicalSection id="ceremony" padding="40px 24px" overlayOpacity={0.35}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <EventCardWithMap
          eyebrow="первая часть дня"
          title="РОСПИСЬ"
          script="ceremony"
          lines={[
            { time: '12:00', label: 'роспись' },
            { time: '13:00', label: 'фотосессия жениха и невесты' }
          ]}
          place="Дворец бракосочетания № 3"
          address="ул. Юных Ленинцев, 35, корп. 1"
          mapHref="https://yandex.ru/maps/-/CPDlVIic"
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
        <EventCardWithMap
          eyebrow="вечерняя часть"
          title="БАНКЕТ"
          script="reception"
          lines={[
            { time: '16:00', label: 'сбор гостей' },
            { time: '17:00', label: 'начало банкета' },
            { time: '22:00', label: 'завершение вечера' }
          ]}
          place="Парк отель Медвежьи озёра"
          address="ул. Берег озера, 1, д. Медвежьи Озёра"
          mapHref="https://yandex.ru/maps/-/CPDlbElj"
          variant="stone"
        />
      </div>
    </BotanicalSection>
  );
}

window.CeremonyCard = CeremonyCard;
window.BanquetCard = BanquetCard;
