const { useState: useStateDate, useEffect: useEffectDate } = React;

// July 2026 starts on Wednesday — confirmed. The 17th is a Friday.
function JulyCalendar() {
  // Build 6×7 grid for July 2026
  const cells = [];
  // empty cells before July 1 (Mon=0...Sun=6 layout, Jul 1 2026 = Wed → index 2)
  for (let i = 0; i < 2; i++) cells.push(null);
  for (let d = 1; d <= 31; d++) cells.push(d);
  return (
    <div style={{ marginTop: 36 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
        fontFamily: 'var(--font-body)', maxWidth: 320, margin: '0 auto'
      }}>
        {['пн','вт','ср','чт','пт','сб','вс'].map((d) => (
          <div key={d} style={{
            fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--mist)', padding: '8px 0', fontWeight: 500, textAlign: 'center'
          }}>
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={'e' + i}/>;
          const isWedding = d === 17;
          return (
            <div key={d} style={{
              fontFamily: 'var(--font-display)', fontSize: 17,
              color: isWedding ? 'var(--ivory)' : 'var(--charcoal)',
              padding: 8, textAlign: 'center', position: 'relative',
              fontWeight: isWedding ? 600 : 400,
              aspectRatio: '1 / 1', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              {isWedding && (
                <svg viewBox="0 0 40 36" width="34" height="30" style={{ position: 'absolute', inset: 0, margin: 'auto' }}>
                  <path d="M20 33 C 6 22, -2 13, 4 5 C 9 -1, 16 1, 20 7 C 24 1, 31 -1, 36 5 C 42 13, 34 22, 20 33 Z" fill="var(--stone-deep)"/>
                </svg>
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Countdown() {
  const target = new Date('2026-07-17T12:00:00+03:00');
  const [now, setNow] = useStateDate(() => new Date());
  useEffectDate(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const item = (n, label) => (
    <div style={{ textAlign: 'center', minWidth: 56 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36,
        color: 'var(--charcoal)', letterSpacing: '0.02em', lineHeight: 1,
        fontVariantNumeric: 'tabular-nums'
      }}>
        {String(n).padStart(2, '0')}
      </div>
      <div className="eyebrow" style={{ marginTop: 10, fontSize: 9.5 }}>{label}</div>
    </div>
  );
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      gap: 8, marginTop: 36
    }}>
      {item(d, 'дней')}
      <div style={{ color: 'var(--whisper)', fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: '36px' }}>·</div>
      {item(h, 'часов')}
      <div style={{ color: 'var(--whisper)', fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: '36px' }}>·</div>
      {item(m, 'минут')}
      <div style={{ color: 'var(--whisper)', fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: '36px' }}>·</div>
      {item(s, 'секунд')}
    </div>
  );
}

function DateBlock() {
  return (
    <BotanicalSection padding="80px 28px" overlayOpacity={0.4}>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 460, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(48px, 14vw, 64px)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--charcoal)', lineHeight: 1, margin: 0
        }}>
          ИЮЛЬ
        </h2>

        <JulyCalendar/>
      </div>
    </BotanicalSection>
  );
}
window.DateBlock = DateBlock;
