const { useState: useStateForm } = React;

// ── Google Sheets endpoint ─────────────────────────────────────────────────
// После того как развернёте Apps Script как Web App (см. docs/google-sheets-setup.md),
// вставьте сюда полученный URL. Пока URL пустой — форма работает в offline-режиме
// (показывает «Спасибо», но ответ никуда не отправляется).
const SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzLWmdgWv_TB0vUf3PaigzoWfW0V6-5B4pkGuj7h7-ZuJb2HSROKG-V3agWlrFTzd9c/exec';

// Простой shared-секрет, отсеивает случайный спам. Должен совпадать со значением
// SECRET в Apps Script (docs/google-apps-script.gs). Не считается криптографической
// защитой — это лёгкий фильтр от ботов.
const SHEETS_SECRET = 'lesya-artem-2026';
// ───────────────────────────────────────────────────────────────────────────

function RSVP() {
  const [name, setName] = useStateForm('');
  const [attending, setAttending] = useStateForm(null); // true | false | null
  const [count, setCount] = useStateForm(0);
  const [drinks, setDrinks] = useStateForm([]);
  const [drinksOpen, setDrinksOpen] = useStateForm(false);
  const [note, setNote] = useStateForm('');
  const [submitted, setSubmitted] = useStateForm(false);
  const [sending, setSending] = useStateForm(false);
  const [errorMsg, setErrorMsg] = useStateForm('');
  const [duplicate, setDuplicate] = useStateForm(false);

  const DRINK_OPTIONS = [
    'Красное вино',
    'Белое вино',
    'Шампанское',
    'Виски / коньяк',
    'Водка',
    'Не буду пить алкоголь'
  ];

  const toggleDrink = (opt) => {
    setDrinks((prev) =>
      prev.includes(opt) ? prev.filter((d) => d !== opt) : [...prev, opt]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || attending === null || sending) return;

    setErrorMsg('');

    // No endpoint configured — fall back to offline "thanks" screen so design previews still work.
    if (!SHEETS_ENDPOINT) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        // text/plain → no CORS preflight (Apps Script doesn't support OPTIONS).
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          secret: SHEETS_SECRET,
          name: name.trim(),
          attending,
          guests: count,
          drinks,
          comment: note.trim()
        })
      });
      const data = await res.json();

      if (data.status === 'ok') {
        setSubmitted(true);
      } else if (data.status === 'duplicate') {
        setDuplicate(true);
        setErrorMsg(data.message || 'Такое имя уже подтверждено.');
      } else {
        setErrorMsg(data.message || 'Не удалось отправить ответ. Попробуйте ещё раз.');
      }
    } catch (err) {
      setErrorMsg('Ошибка соединения. Проверьте интернет и попробуйте ещё раз.');
    } finally {
      setSending(false);
    }
  };

  // close dropdown on outside click
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!drinksOpen) return;
    const onDoc = (ev) => {
      if (wrapRef.current && !wrapRef.current.contains(ev.target)) setDrinksOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [drinksOpen]);

  if (submitted) {
    return (
      <BotanicalSection id="rsvp" padding="120px 28px" overlayOpacity={0.5}>
        <div className="reveal is-in" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>ответ принят</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(48px, 14vw, 64px)',
            textTransform: 'uppercase', letterSpacing: '0.03em',
            color: 'var(--charcoal)', lineHeight: 1, margin: 0
          }}>
            СПАСИБО!
          </h2>
          <div style={{
            fontFamily: 'var(--font-script)', fontSize: 38,
            color: 'var(--graphite)', marginTop: 6,
            transform: 'rotate(-3deg)'
          }}>
            we got it
          </div>
          <p style={{
            marginTop: 28, maxWidth: 320, marginLeft: 'auto', marginRight: 'auto',
            fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ash)', lineHeight: 1.7
          }}>
            Мы получили ваш ответ. Будем ждать встречи 17 июля.
          </p>
        </div>
      </BotanicalSection>);
  }

  const inputBase = {
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--charcoal)',
    padding: '16px 18px',
    borderRadius: 'var(--r-lg)',
    border: '1px solid rgba(44,42,38,.18)',
    background: 'var(--ivory-soft)',
    outline: 'none',
    width: '100%', boxSizing: 'border-box',
    boxShadow: 'var(--shadow-inset)',
    letterSpacing: '0.01em',
    transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)'
  };

  const segBtn = (on) => ({
    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
    textTransform: 'uppercase', fontWeight: 500,
    padding: '16px 18px', borderRadius: 'var(--r-sm)',
    border: 'none',
    background: on ? 'var(--charcoal)' : 'var(--ivory-soft)',
    color: on ? 'var(--ivory)' : 'var(--charcoal)',
    cursor: 'pointer', flex: 1,
    boxShadow: on ? 'none' : 'inset 0 0 0 1px rgba(44,42,38,.18)',
    transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)'
  });

  const stepBtn = (disabled = false) => ({
    width: 72, height: 48, borderRadius: 'var(--r-sm)',
    border: '1px solid rgba(44,42,38,.18)',
    background: 'var(--ivory-soft)',
    color: 'var(--charcoal)',
    fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, lineHeight: 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    boxShadow: 'var(--shadow-inset)',
    transition: 'background var(--dur) var(--ease)'
  });

  return (
    <BotanicalSection id="rsvp" padding="88px 28px" overlayOpacity={0.4}>
      <form onSubmit={onSubmit} className="reveal" style={{ maxWidth: 440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(36px, 10vw, 48px)',
              textTransform: 'uppercase', letterSpacing: '0.04em',
              color: 'var(--charcoal)', lineHeight: 1, margin: 0
            }}>
              ПОДТВЕРДИТЕ<br />ПРИСУТСТВИЕ
            </h2>
            <div style={{
              fontFamily: 'var(--font-script)', fontSize: 34, color: 'var(--graphite)',
              position: 'absolute', right: '-4%', top: '86%',
              opacity: 0.85, transform: 'rotate(-4deg)', lineHeight: 1
            }}>
              rsvp
            </div>
          </div>
          <p style={{
            marginTop: 28, fontFamily: 'var(--font-body)', fontSize: 14.5,
            color: 'var(--ash)', lineHeight: 1.65, maxWidth: 340, marginLeft: 'auto', marginRight: 'auto'
          }}>
            Пожалуйста, сообщите нам, сможете ли вы быть с нами в этот день.
          </p>
          {/* deadline notice — quiet, eyebrow-style */}
          <div style={{
            marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 16px',
            background: 'var(--ivory-soft)',
            border: '1px solid rgba(44,42,38,.12)',
            borderRadius: 2
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: 'var(--stone-deep)'
            }}/>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 10.4, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--charcoal)'
            }}>
              ответ — до 01.06.2026
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Name */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="eyebrow">Имя и фамилия</span>
            <input
              style={inputBase}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Анна Соколова" />
          </label>

          {/* +Guests count — always visible right under name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="eyebrow">СКОЛЬКО ГОСТЕЙ БУДЕТ С ВАМИ?</span>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
              <button type="button" style={stepBtn(count === 0)}
                onClick={() => setCount(Math.max(0, count - 1))}
                disabled={count === 0}
                aria-label="меньше">−</button>
              <div style={{
                flex: 1, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 22, color: 'var(--charcoal)', letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--ivory-soft)',
                border: '1px solid rgba(44,42,38,.18)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-inset)',
                fontVariantNumeric: 'tabular-nums'
              }}>
                <span>+{count}</span>
              </div>
              <button type="button" style={stepBtn(count === 5)}
                onClick={() => setCount(Math.min(5, count + 1))}
                disabled={count === 5}
                aria-label="больше">+</button>
            </div>
          </div>

          {/* Alcohol preferences — custom multi-select dropdown */}
          <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
            <span className="eyebrow">Какой алкоголь вы предпочитаете?</span>
            <button
              type="button"
              onClick={() => setDrinksOpen((o) => !o)}
              style={{
                ...inputBase,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, textAlign: 'left',
                color: drinks.length ? 'var(--charcoal)' : 'var(--mist)'
              }}
              aria-haspopup="listbox"
              aria-expanded={drinksOpen}
            >
              <span style={{
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                flex: 1
              }}>
                {drinks.length === 0
                  ? 'Выберите один или несколько вариантов'
                  : drinks.join(', ')}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal)',
                transform: drinksOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--dur) var(--ease)',
                lineHeight: 1
              }}>
                ▾
              </span>
            </button>

            {drinksOpen && (
              <div role="listbox" style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                marginTop: 6,
                background: 'var(--ivory-soft)',
                border: '1px solid rgba(44,42,38,.18)',
                borderRadius: 'var(--r-md)',
                boxShadow: 'var(--shadow-2)',
                zIndex: 30,
                overflow: 'hidden'
              }}>
                {DRINK_OPTIONS.map((opt, i) => {
                  const on = drinks.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      role="option"
                      aria-selected={on}
                      onClick={() => toggleDrink(opt)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        width: '100%', textAlign: 'left',
                        padding: '14px 16px',
                        background: on ? 'var(--ivory-warm)' : 'transparent',
                        border: 'none',
                        borderTop: i === 0 ? 'none' : '1px solid rgba(44,42,38,.08)',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: 14.5,
                        color: 'var(--charcoal)',
                        transition: 'background var(--dur-fast) var(--ease)'
                      }}
                    >
                      <span style={{
                        width: 18, height: 18, borderRadius: 2,
                        border: '1.5px solid var(--charcoal)',
                        background: on ? 'var(--charcoal)' : 'transparent',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background var(--dur-fast) var(--ease)'
                      }}>
                        {on && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4.5L4 7.5L10 1" stroke="var(--ivory)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Attending Y/N */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="eyebrow">Будете ли вы присутствовать?</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" style={segBtn(attending === true)} onClick={() => setAttending(true)}>Да, буду</button>
              <button type="button" style={segBtn(attending === false)} onClick={() => setAttending(false)}>Не смогу</button>
            </div>
          </div>

          {attending === true && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="eyebrow">Комментарий или пожелания</span>
              <textarea
                style={{ ...inputBase, minHeight: 96, resize: 'vertical', fontFamily: 'var(--font-body)' }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Аллергии, музыкальные пожелания, вопросы — пишите свободно." />
            </label>
          )}

          {errorMsg && (
            <div role="alert" style={{
              padding: '14px 16px',
              background: 'var(--ivory-soft)',
              border: '1px solid rgba(139,58,47,.35)',
              borderLeft: '3px solid var(--danger)',
              borderRadius: 'var(--r-md)',
              fontFamily: 'var(--font-body)', fontSize: 13.5,
              color: 'var(--charcoal)', lineHeight: 1.55
            }}>
              {errorMsg}
            </div>
          )}

          <PiBtn
            type="submit"
            variant="dark"
            fullWidth
            disabled={!name || attending === null || sending}
            style={{ marginTop: 12 }}>
            {sending
              ? <span>Отправляем…</span>
              : <>{duplicate ? 'Отправить ещё раз' : 'Отправить ответ'} <span style={{ letterSpacing: 0 }}>→</span></>}
          </PiBtn>
        </div>
      </form>
    </BotanicalSection>);
}
window.RSVP = RSVP;
