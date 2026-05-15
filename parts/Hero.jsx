function Hero() {
  return (
    <section style={{
      background: 'var(--ivory)',
      color: 'var(--charcoal)',
      minHeight: '100vh',
      padding: '56px 28px 56px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
    }}>
      <style>{`
        @keyframes botanical-breathe {
          0%, 100% { transform: scale(1.04) translate(0px, 0px); }
          33%      { transform: scale(1.07) translate(-6px, -3px); }
          66%      { transform: scale(1.05) translate(5px,  3px); }
        }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-script-in {
          from { opacity: 0; transform: translateY(8px) rotate(-2deg); }
          to   { opacity: 0.85; transform: translateY(0) rotate(0deg); }
        }
        @keyframes hero-date-track {
          from { opacity: 0; letter-spacing: 0.1em; }
          to   { opacity: 1; letter-spacing: 0.42em; }
        }
        .hero-botanical {
          animation: botanical-breathe 14s ease-in-out infinite;
          transform-origin: center;
          will-change: transform;
        }
        .hero-anim    { opacity: 0; animation: hero-fade-up 900ms cubic-bezier(0,0,.2,1) forwards; }
        .hero-script  { opacity: 0; animation: hero-script-in 1100ms cubic-bezier(0,0,.2,1) forwards; }
        .hero-date    { opacity: 0; animation: hero-date-track 1200ms cubic-bezier(0,0,.2,1) forwards; }
        .d-1 { animation-delay: 200ms; }
        .d-2 { animation-delay: 600ms; }
        .d-3 { animation-delay: 1200ms; }
        .d-4 { animation-delay: 1800ms; }
        .d-5 { animation-delay: 2200ms; }
        @media (prefers-reduced-motion: reduce) {
          .hero-botanical, .hero-anim, .hero-script, .hero-date {
            animation: none !important; opacity: 1 !important; transform: none !important;
            letter-spacing: 0.42em;
          }
        }
      `}</style>

      <div className="hero-botanical" style={{
        position: 'absolute', inset: '-4%',
        backgroundImage: "url('assets/botanical-shadow.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'multiply',
        opacity: 0.55,
        pointerEvents: 'none',
        zIndex: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)'
      }} />

      {/* top — eyebrow (removed) */}
      <div/>

      {/* center — names */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div className="hero-script d-2" style={{
          fontFamily: 'var(--font-script)',
          color: 'var(--graphite)',
          lineHeight: 1, letterSpacing: '0.02em', fontSize: '45px'
        }}>
          wedding day
        </div>
        <h1 className="hero-anim d-3" style={{
          fontFamily: 'var(--font-display)',


          lineHeight: 0.95,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'var(--charcoal)',
          margin: 0, fontWeight: "500", fontSize: "80px"
        }}>
          ОЛЕСЯ<br />
          <span style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
            fontSize: '0.55em', verticalAlign: 'middle', opacity: 0.75, letterSpacing: 0
          }}>&amp;</span> АРТЁМ
        </h1>

        <div className="hero-date d-4" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          color: 'var(--charcoal)',
          fontWeight: 400,
          marginTop: 6
        }}>
          17 | 07 | 2026
        </div>
      </div>

      {/* bottom — small ornament */}
      <div className="hero-anim d-5" style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18
      }}>
        <span style={{ display: 'inline-block', width: 1, height: 40, background: 'var(--whisper)' }} />
      </div>
    </section>);

}
window.Hero = Hero;