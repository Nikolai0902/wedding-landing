const { useState: useStateNotice, useEffect: useEffectNotice } = React;

// Polite full-screen notice for desktop / wide-screen viewers.
// The invitation is mobile-first (480px column); on a 1440px monitor it looks like a thin strip.
// We softly ask guests to switch to their phone, with a "look anyway" escape hatch.
function DesktopNotice() {
  const isClient = typeof window !== 'undefined';
  const [wide, setWide] = useStateNotice(isClient ? window.matchMedia('(min-width: 720px)').matches : false);
  const [dismissed, setDismissed] = useStateNotice(
    isClient ? sessionStorage.getItem('desktop-notice-dismissed') === '1' : false
  );

  useEffectNotice(() => {
    if (!isClient) return;
    const mq = window.matchMedia('(min-width: 720px)');
    const onChange = (e) => setWide(e.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
    };
  }, []);

  if (!wide || dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem('desktop-notice-dismissed', '1');
    setDismissed(true);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--ivory)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 32px',
      overflow: 'hidden'
    }}>
      {/* botanical backdrop, same DNA as the rest of the system */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('assets/botanical-shadow.svg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        mixBlendMode: 'multiply',
        opacity: 0.45,
        pointerEvents: 'none'
      }}/>

      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        maxWidth: 520
      }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          Артём <span style={{ fontStyle: 'italic', opacity: 0.75 }}>&amp;</span> Олеся · 17.07.2026
        </div>

        {/* phone glyph drawn inline, in the same charcoal weight as the rest of the system */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <svg width="44" height="64" viewBox="0 0 44 64" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="40" height="60" rx="6" stroke="var(--charcoal)" strokeWidth="1.4"/>
            <line x1="16" y1="8" x2="28" y2="8" stroke="var(--charcoal)" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="22" cy="56" r="1.6" fill="var(--charcoal)"/>
          </svg>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 52px)',
            textTransform: 'uppercase', letterSpacing: '0.04em',
            color: 'var(--charcoal)', lineHeight: 1.05, margin: 0
          }}>
            ОТКРОЙТЕ С&nbsp;ТЕЛЕФОНА
          </h2>
          <div style={{
            fontFamily: 'var(--font-script)', fontSize: 36, color: 'var(--graphite)',
            position: 'absolute', right: '-4%', top: '88%',
            opacity: 0.85, transform: 'rotate(-4deg)', lineHeight: 1
          }}>
            for mobile
          </div>
        </div>

        <p style={{
          marginTop: 56, fontFamily: 'var(--font-body)',
          fontSize: 16, color: 'var(--ash)', lineHeight: 1.75,
          maxWidth: 420, marginLeft: 'auto', marginRight: 'auto'
        }}>
          Это приглашение создано для просмотра с&nbsp;телефона.
          Пожалуйста, откройте эту ссылку на&nbsp;мобильном устройстве —
          так оно раскроется именно таким, каким&nbsp;мы его задумали.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Rule width={48}/>
        </div>

        <div style={{
          marginTop: 36,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--mist)'
        }}>
          <button
            type="button"
            onClick={dismiss}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--whisper)',
              padding: '4px 0',
              fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
              letterSpacing: 'inherit', textTransform: 'inherit',
              color: 'var(--ash)',
              cursor: 'pointer',
              transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease)'
            }}
          >
            всё равно посмотреть здесь →
          </button>
        </div>

        <div style={{
          marginTop: 56,
          fontFamily: 'var(--font-display)', fontSize: 14,
          letterSpacing: '0.4em', textIndent: '0.4em',
          color: 'var(--mist)',
          fontVariantNumeric: 'tabular-nums'
        }}>
          17 · 07 · 2026
        </div>
      </div>
    </div>
  );
}
window.DesktopNotice = DesktopNotice;
