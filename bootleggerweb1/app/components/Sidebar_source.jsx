const navItems = [
  { label: 'Menu', icon: 'menu' },
  { label: 'Our Story', icon: 'story' },
  { label: 'Entertainment', icon: 'music' },
  { label: 'Awards', icon: 'star' },
  { label: 'Parties & Events', icon: 'party' },
  { label: 'About', icon: 'info' },
  { label: 'Shop', icon: 'bag' },
];

const NavIcon = ({ type }) => {
  const svgProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    menu: <svg {...svgProps}><path d="M6 6h12M6 12h12M6 18h12"/></svg>,
    story: <svg {...svgProps}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M12 6v12"/><path d="M8 6v2"/><path d="M16 6v2"/></svg>,
    music: <svg {...svgProps}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    star: <svg {...svgProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    party: <svg {...svgProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    bag: <svg {...svgProps}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    info: <svg {...svgProps}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return icons[type] || null;
};

const Sidebar = ({ activeNav, onNavChange }) => {
  const sidebarStyles = {
    width: '260px',
    background: 'linear-gradient(180deg, oklch(12% 0.005 255) 0%, oklch(8% 0.005 260) 100%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexShrink: 0,
    overflowY: 'auto',
    boxShadow: '2px 0 20px rgba(0,0,0,0.2)',
  };

  const logoSectionStyles = {
    padding: 'var(--space-xl) var(--space-lg) var(--space-lg)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const dividerStyles = {
    width: '40px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
    margin: 'var(--space-sm) auto',
  };

  const navStyles = {
    padding: 'var(--space-sm) 0',
    flex: 1,
  };

  const getItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-lg)',
      color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    fontSize: 'var(--text-small)',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.2s ease',
    borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
    background: isActive ? 'rgba(200,150,60,0.10)' : 'transparent',
    textDecoration: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.04em',
  });

  const footerStyles = {
    padding: 'var(--space-md) var(--space-lg)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 1.6,
  };

  return (
    <div style={sidebarStyles}>
      <div style={logoSectionStyles}>
        <img
          src="../../build/logo.avif"
          alt="The Bootlegger Italian Bistro"
          style={{ width: '140px', height: 'auto', marginBottom: 'var(--space-sm)', filter: 'brightness(1.1) contrast(1.1)' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>
          The Bootlegger
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '2px' }}>
          Italian Bistro
        </div>
        <div style={dividerStyles} />
        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Since 1949
        </div>
      </div>
      <nav style={navStyles}>
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
            <span style={{ display: 'flex', width: 20, justifyContent: 'center' }}>
              <NavIcon type={item.icon} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div style={footerStyles}>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>7700 Las Vegas Blvd S</span>
        </div>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Las Vegas, NV 89123</span>
        </div>
        <div style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 500 }}>
          (702) 736-4939
        </div>
        <div style={{ fontSize: '0.6rem', marginTop: 'var(--space-xs)', color: 'rgba(255,255,255,0.25)' }}>
          South Strip · Open Daily 11am
        </div>
        <div style={{
          display: 'flex', gap: 10, marginTop: 'var(--space-sm)',
          justifyContent: 'center',
        }}>
          <a href="https://www.facebook.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@bootleggerlasvegas" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Sidebar, navItems });
