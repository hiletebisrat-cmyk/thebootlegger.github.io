const { useState, useEffect } = React;

const BookingBar = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (confirmed) {
      const t = setTimeout(() => setConfirmed(false), 3500);
      return () => clearTimeout(t);
    }
  }, [confirmed]);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time) {
      setAnimating(true);
      setConfirmed(true);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const containerStyles = {
    background: 'linear-gradient(135deg, var(--surface-warm) 0%, var(--bg) 100%)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    boxShadow: 'var(--shadow-warm)',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    marginBottom: 'var(--space-lg)',
    paddingBottom: 'var(--space-md)',
    borderBottom: '1px solid var(--border)',
  };

  const headerIconStyles = {
    width: 32,
    height: 32,
    borderRadius: 'var(--radius-sm)',
    background: 'var(--accent-wine)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
  };

  const headerTitleStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h3)',
    fontWeight: 600,
    color: 'var(--fg)',
  };

  const headerSubStyles = {
    fontSize: 'var(--text-meta)',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  };

  const formRowStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-md)',
    alignItems: 'flex-end',
  };

  const fieldStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2xs)',
    flex: '1 1 140px',
    minWidth: 0,
  };

  const labelStyles = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-meta)',
    fontWeight: 600,
    color: 'var(--fg)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  const guestInputStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--surface)',
    padding: '2px',
  };

  const guestBtnStyles = {
    width: 36,
    height: 36,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: 'var(--accent-wine)',
    borderRadius: 'var(--radius-sm)',
    display: 'grid',
    placeItems: 'center',
    transition: 'background 0.15s',
  };

  const confirmationStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    background: 'color-mix(in oklch, var(--state-success) 12%, var(--surface))',
    borderRadius: 'var(--radius-md)',
    border: '1px solid color-mix(in oklch, var(--state-success) 30%, transparent)',
    marginTop: 'var(--space-md)',
    opacity: confirmed ? 1 : 0,
    transform: confirmed ? 'translateY(0)' : 'translateY(-8px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={headerIconStyles}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div>
          <div style={headerTitleStyles}>Reserve a Table</div>
          <div style={headerSubStyles}>The Copa Room · The Vegas Room</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={formRowStyles}>
          <div style={fieldStyles}>
            <label style={labelStyles}>Date</label>
            <input className="input" type="date" value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)} required
              style={{ cursor: 'pointer' }} />
          </div>
          <div style={fieldStyles}>
            <label style={labelStyles}>Time</label>
            <select className="input" value={time}
              onChange={(e) => setTime(e.target.value)} required
              style={{ cursor: 'pointer' }}>
              <option value="">Select time</option>
              <option value="17:00">5:00 PM</option>
              <option value="17:30">5:30 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="20:30">8:30 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>
          <div style={fieldStyles}>
            <label style={labelStyles}>Guests</label>
            <div style={guestInputStyles}>
              <button type="button" style={guestBtnStyles}
                onClick={() => setGuests(Math.max(1, guests - 1))}
                onMouseEnter={(e) => e.currentTarget.style.background = 'color-mix(in oklch, var(--accent-wine) 10%, transparent)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                −
              </button>
              <span style={{
                flex: 1, textAlign: 'center', fontSize: 'var(--text-body)',
                fontWeight: 500, fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums',
              }}>{guests}</span>
              <button type="button" style={guestBtnStyles}
                onClick={() => setGuests(Math.min(20, guests + 1))}
                onMouseEnter={(e) => e.currentTarget.style.background = 'color-mix(in oklch, var(--accent-wine) 10%, transparent)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                +
              </button>
            </div>
          </div>
          <button type="submit" className="btn" style={{
            background: confirmed ? 'var(--state-success)' : 'linear-gradient(135deg, var(--accent-red), var(--accent-wine))',
            color: '#fff',
            padding: '12px 28px',
            flex: '0 0 auto',
            fontWeight: 600,
            letterSpacing: '0.01em',
            transition: 'all 0.3s ease',
          }}>
            {confirmed ? '✓ Reserved!' : 'Reserve a Table'}
          </button>
        </div>
      </form>

      <div style={confirmationStyles}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--state-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-small)', color: 'var(--fg)' }}>Reservation Confirmed</div>
          <div style={{ fontSize: 'var(--text-meta)', color: 'var(--muted)' }}>
            {guests} {guests === 1 ? 'guest' : 'guests'} · {date ? new Date(date + 'T12:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''} · {time ? (time.startsWith('17') ? '5' : time.startsWith('18') ? '6' : time.startsWith('19') ? '7' : time.startsWith('20') ? '8' : '9') + time.slice(3) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BookingBar });
