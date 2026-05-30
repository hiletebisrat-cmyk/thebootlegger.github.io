// navItems + NavIcon defined in Sidebar.jsx — shared scope in `all.jsx`

const TopNav = ({ activeNav, onNavChange }) => {
  const navStyles = {
    display: 'flex',
    alignItems: 'stretch',
    background: 'linear-gradient(180deg, oklch(12% 0.005 255) 0%, oklch(8% 0.005 260) 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0 var(--space-lg)',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
    flexShrink: 0,
  };

  const innerStyles = {
    display: 'flex',
    alignItems: 'stretch',
    gap: 0,
    margin: '0 auto',
    height: 48,
  };

  const getItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '0 18px',
      color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    fontSize: '0.8125rem',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.2s ease',
    borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
    background: isActive ? 'rgba(200,150,60,0.10)' : 'transparent',
    textDecoration: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    position: 'relative',
  });

  return (
    <nav style={navStyles}>
      <div style={innerStyles}>
        {navItems.map((item) => (
          <button
            key={item.label}
            style={getItemStyles(activeNav === item.label)}
            onClick={() => onNavChange && onNavChange(item.label)}
            onMouseEnter={(e) => {
              if (activeNav !== item.label) {
                e.currentTarget.style.color = 'var(--accent-gold)';
                e.currentTarget.style.background = 'rgba(200,150,60,0.06)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.label) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <NavIcon type={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

Object.assign(window, { TopNav, navItems });
