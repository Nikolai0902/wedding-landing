const { useState: useStateForm } = React;

function RSVP() {
  const [name, setName] = useStateForm('');
  const [attending, setAttending] = useStateForm(null); // true | false | null
  const [count, setCount] = useStateForm(0);
  const [note, setNote] = useStateForm('');
  const [submitted, setSubmitted] = useStateForm(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || attending === null) return;
    setSubmitted(true);
  };

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

  // ↓ matches the design-system RSVPForm.jsx exactly:
  //   rectangular (r-sm), hairline border, ivory-soft fill, inset shadow
  const inputBase = {
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--charcoal)',
    padding: '16px 18px',
    borderRadius: 'var(--r-sm)',
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
                borderRadius: 'var(--r-sm)',
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

          {/* Attending Y/N */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="eyebrow">Будете ли вы присутствовать?</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" style={segBtn(attending === true)} onClick={() => setAttending(true)}>Да, буду</button>
              <button type="button" style={segBtn(attending === false)} onClick={() => setAttending(false)}>Не смогу</button>
            </div>
          </div>

          {attending === true &&
          <>
              {/* Note */}
              <label style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="eyebrow">Комментарий или пожелания</span>
                <textarea
                style={{ ...inputBase, minHeight: 96, resize: 'vertical', fontFamily: 'var(--font-body)' }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Аллергии, музыкальные пожелания, вопросы — пишите свободно." />
              
              </label>
            </>
          }

          <PiBtn
            type="submit"
            variant="dark"
            fullWidth
            disabled={!name || attending === null}
            style={{ marginTop: 12 }}>
            
            Отправить ответ <span style={{ letterSpacing: 0 }}>→</span>
          </PiBtn>
        </div>
      </form>
    </BotanicalSection>);

}
window.RSVP = RSVP;