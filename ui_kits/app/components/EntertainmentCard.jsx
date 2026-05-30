const EntertainmentCard = ({ day, act, time, description, isHighlight }) => {
  const dayAbbrev = day.slice(0, 3).toUpperCase();

  const cardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-lg) var(--space-xl)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: isHighlight
      ? 'linear-gradient(135deg, rgba(200, 60, 40, 0.12), rgba(200, 150, 60, 0.06))'
      : 'transparent',
    borderLeft: isHighlight ? '3px solid var(--accent-gold)' : '3px solid transparent',
    transition: 'background 0.2s ease',
    cursor: 'default',
  };

  const dayCircleStyles = {
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: isHighlight
      ? 'linear-gradient(135deg, var(--accent-gold), color-mix(in oklch, var(--accent-gold) 60%, var(--accent-red)))'
      : 'rgba(255,255,255,0.06)',
    flexShrink: 0,
  };

  const dayNumStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 700,
    color: isHighlight ? 'var(--fg)' : 'rgba(255,255,255,0.8)',
    lineHeight: 1,
  };

  const dayTextStyles = {
    fontSize: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: isHighlight ? 'rgba(28,27,26,0.7)' : 'rgba(255,255,255,0.4)',
    fontWeight: 600,
    marginTop: 1,
  };

  const actSectionStyles = {
    flex: 1,
    minWidth: 0,
  };

  const actNameStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: isHighlight ? 'var(--text-h3)' : 'var(--text-body)',
    fontWeight: isHighlight ? 700 : 500,
    color: isHighlight ? 'var(--accent-gold)' : 'rgba(255,255,255,0.85)',
    fontStyle: isHighlight ? 'italic' : 'normal',
    lineHeight: 1.3,
  };

  const actDescStyles = {
    fontSize: 'var(--text-meta)',
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
    fontFamily: 'var(--font-body)',
  };

  const timeStyles = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-meta)',
    color: isHighlight ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '0.02em',
    textAlign: 'right',
    flexShrink: 0,
  };

  const highlightBadge = isHighlight && (
    <span style={{
      fontSize: '0.45rem',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: 'var(--accent-gold)',
      fontWeight: 600,
      display: 'block',
      marginBottom: 2,
    }}>Featured</span>
  );

  return (
    <div
      style={cardStyles}
      onMouseEnter={(e) => {
        if (!isHighlight) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
      onMouseLeave={(e) => {
        if (!isHighlight) e.currentTarget.style.background = 'transparent';
      }}
    >
      <div style={dayCircleStyles}>
        <span style={dayNumStyles}>{day.slice(0, 2)}</span>
        <span style={dayTextStyles}>{dayAbbrev}</span>
      </div>
      <div style={actSectionStyles}>
        {highlightBadge}
        <div style={actNameStyles}>{act}</div>
        {description && <div style={actDescStyles}>{description}</div>}
      </div>
      <div style={timeStyles}>{time}</div>
    </div>
  );
};

Object.assign(window, { EntertainmentCard });
