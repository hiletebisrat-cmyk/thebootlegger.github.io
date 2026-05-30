const MenuItem = ({ name, description, price, tags, isLast }) => {
  const priceDisplay = typeof price === 'number' ? `$${price}` : price;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 'var(--space-lg)',
        padding: 'var(--space-sm) 0',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        transition: 'background 0.12s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'color-mix(in oklch, var(--accent-gold) 5%, transparent)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', marginBottom: description ? '2px' : 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'var(--fg)',
          }}>{name}</span>
          {tags && tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: tag === 'V' ? 'oklch(38% 0.12 145)' : 'oklch(35% 0.10 250)',
              background: tag === 'V' ? 'oklch(95% 0.06 145)' : 'oklch(95% 0.04 250)',
              padding: '1px 5px',
              borderRadius: '3px',
              lineHeight: 1.8,
              flexShrink: 0,
            }}>{tag}</span>
          ))}
        </div>
        {description && (
          <span style={{
            fontSize: 'var(--text-meta)',
            color: 'var(--muted)',
            lineHeight: 1.4,
            fontFamily: 'var(--font-body)',
          }}>{description}</span>
        )}
      </div>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: 'var(--accent-gold)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.01em',
        marginLeft: 'var(--space-md)',
      }}>{priceDisplay}</span>
    </div>
  );
};

Object.assign(window, { MenuItem });
