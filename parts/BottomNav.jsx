function BottomNav() {
  return (
    <nav style={{
      position: 'fixed',
      left: '50%', transform: 'translateX(-50%)',
      bottom: 16,
      width: 'calc(100% - 32px)', maxWidth: 448,
      background: 'rgba(239, 234, 224, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(44,42,38,.12)',
      borderRadius: 'var(--r-md)',
      padding: '8px 8px 8px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      zIndex: 100,
      boxShadow: '0 12px 40px -16px rgba(0,0,0,.18)'
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 15,
        color: 'var(--charcoal)', textTransform: 'uppercase',
        letterSpacing: '0.12em', fontWeight: 500
      }}>
        Олеся <span style={{ fontStyle: 'italic', opacity: 0.75 }}>&amp;</span> Артём
      </div>
      <a href="#rsvp" style={{
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        padding: '12px 18px', background: 'var(--charcoal)',
        color: 'var(--ivory)', textDecoration: 'none', border: 'none',
        borderRadius: 2
      }}>
        Ответить →
      </a>
    </nav>
  );
}
window.BottomNav = BottomNav;
