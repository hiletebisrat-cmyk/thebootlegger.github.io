const { useState, useEffect, useRef, useCallback, useMemo } = React;

const HeroSection = ({ slides: propSlides, title, subtitle, ctaText, showLogo, variant = 'card', onCtaClick }) => {
  const hasExplicitSlides = propSlides && propSlides.length > 0;
  const slides = hasExplicitSlides
    ? propSlides
    : [{ title, subtitle, ctaText, logo: showLogo }];

  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback((i) => {
    if (i < 0 || i >= total) return;
    setCurrent(i);
  }, [total]);

  const next = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total);
  }, [current, total, goTo]);

  useEffect(() => {
    if (total <= 1 || hovering) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [total, hovering, next]);

  if (!total) return null;

  const slide = slides[current];
  const isBanner = variant === 'banner';
  const isCompact = variant === 'compact';

  const themeBackgrounds = [
    'var(--gradient-hero-0)',
    'var(--gradient-hero-1)',
    'var(--gradient-hero-2)',
  ];

  const bgPos = slide.backgroundPosition || 'center';
  const background = slide.image
    ? `linear-gradient(rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%), url(${slide.image}) ${bgPos}/cover`
    : themeBackgrounds[current % 3];

  const padX = isBanner
    ? 'clamp(1.25rem, 4vw, 3rem)'
    : 'clamp(1.25rem, 4vw, 3rem)';
  const padY = isBanner
    ? 'clamp(1rem, 3vw, 2.5rem)'
    : 'clamp(1.25rem, 4vw, 3rem)';

  /* Container: block layout so content pushes height naturally.
     No flex centering — content stacks top-down from padding top.
     Overflow:hidden clips bg/overlay at border-radius but never clips
     content because content is in normal flow. */
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: isBanner ? 0 : 'var(--radius-lg)',
    minHeight: isBanner
      ? 'clamp(180px, 28vh, 360px)'
      : 'clamp(300px, 40vh, 440px)',
    height: 'auto',
  };

  const bgStyle = {
    position: 'absolute',
    inset: 0,
    background,
    transition: 'background 0.8s ease',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: isBanner
      ? 'radial-gradient(ellipse at 20% 50%, rgba(215, 160, 60, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(180, 60, 50, 0.08) 0%, transparent 50%)'
      : 'radial-gradient(ellipse at 20% 50%, rgba(215, 160, 60, 0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(180, 60, 50, 0.06) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  /* Content is position:relative so it pushes the container to be as tall
     as it needs. No flex centering — stacks top-down from padding. */
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: total > 1
      ? `${padY} ${padX} clamp(44px, 8vh, 56px)`
      : `${padY} ${padX}`,
  };

  const logoStyle = {
    width: isBanner ? '40px' : 'clamp(50px, 12vw, 70px)',
    height: 'auto',
    marginBottom: isBanner ? '4px' : 'var(--space-sm)',
    filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
  };

  const goldBarStyle = {
    width: isBanner ? '40px' : 'clamp(36px, 8vw, 50px)',
    height: '2px',
    background: 'var(--accent-gold)',
    marginBottom: 'clamp(0.5rem, 2vw, var(--space-md))',
    borderRadius: 0,
    flexShrink: 0,
  };

  /* Title: smaller floor on mobile so wrapping text fits within container.
     No fixed height — line-height + margin determine the space. */
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: isBanner
      ? 'clamp(1.1rem, 2.8vw, 2rem)'
      : 'clamp(1.25rem, 4.5vw, 2.8rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#fff',
    marginBottom: isBanner ? 'clamp(0.25rem, 1vw, 0.5rem)' : 'clamp(0.5rem, 2vw, var(--space-md))',
    letterSpacing: '-0.01em',
    textShadow: '0 2px 12px rgba(0,0,0,0.3)',
    maxWidth: isBanner ? '750px' : '600px',
    width: '100%',
    wordWrap: 'break-word',
  };

  const subtitleStyle = {
    fontSize: isBanner
      ? 'clamp(0.75rem, 1.2vw, 0.95rem)'
      : 'clamp(0.8125rem, 2.5vw, 1.05rem)',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.5,
    marginBottom: isBanner ? 'clamp(0.4rem, 1.5vw, 0.75rem)' : 'clamp(0.75rem, 3vw, var(--space-xl))',
    maxWidth: isBanner ? '480px' : '480px',
    width: '100%',
    wordWrap: 'break-word',
  };

  const ctaBtnPadding = isBanner
    ? '8px 24px'
    : 'clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 34px)';

  const ctaBtnStyle = {
    background: 'var(--accent-gold)',
    color: 'var(--fg)',
    padding: ctaBtnPadding,
    fontSize: isBanner ? '0.8rem' : 'clamp(0.8125rem, 2.2vw, var(--text-button))',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    letterSpacing: '0.02em',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    flexShrink: 0,
  };

  const dotContainer = {
    position: 'absolute',
    bottom: 'clamp(12px, 3vh, 20px)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 8,
    zIndex: 2,
  };

  const dot = (active) => ({
    width: active ? 28 : 10,
    height: 10,
    borderRadius: 0,
    border: 'none',
    background: active ? 'var(--accent-gold)' : 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  });

  const arrowBase = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    color: 'rgba(255,255,255,0.7)',
    fontSize: isBanner ? 'clamp(18px, 2.5vw, 28px)' : 'clamp(22px, 4vw, 30px)',
    cursor: 'pointer',
    padding: '8px 4px',
    opacity: hovering ? 1 : 0,
    transition: 'opacity 0.3s ease, color 0.2s',
    lineHeight: 1,
    userSelect: 'none',
    background: 'transparent',
    border: 'none',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div style={bgStyle} />
      <div style={overlayStyle} />

      <div style={contentStyle}>
        {slide.logo && (
          <img
            src="../../build/logo.avif"
            alt="The Bootlegger"
            style={logoStyle}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div style={goldBarStyle} />
        <h1 style={titleStyle}>{slide.title}</h1>
        {slide.subtitle && <p style={subtitleStyle}>{slide.subtitle}</p>}
        {slide.ctaText && (
          <a href="#" className="btn" style={ctaBtnStyle}
              onClick={(e) => { e.preventDefault(); if (onCtaClick) onCtaClick(slide.ctaText); }}
             onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(62% 0.14 70)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-gold)'; }}>
            {slide.ctaText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        )}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            style={{ ...arrowBase, left: 2 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            aria-label="Previous slide"
          >‹</button>
          <button
            onClick={next}
            style={{ ...arrowBase, right: 2 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            aria-label="Next slide"
          >›</button>
          <div style={dotContainer}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={dot(i === current)} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Object.assign(window, { HeroSection });
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
    background: 'var(--gradient-dark)',
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
// navItems + NavIcon defined in Sidebar.jsx — shared scope in `all.jsx`

const TopNav = ({ activeNav, onNavChange }) => {
  const navStyles = {
    display: 'flex',
    alignItems: 'stretch',
    background: 'var(--gradient-dark)',
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
               borderRadius: 0,
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

const menuSections = [
  { id: 'cocktails', title: 'Classic Italian Cocktails & Martinis', sub: null, note: '$19 Each Unless Noted' },
  { id: 'dessert-cocktails', title: 'Dessert & Specialty Cocktails', sub: null, note: null },
  { id: 'mocktails', title: 'Italian Mocktails', sub: 'Non-Alcoholic', note: '$11 Each' },
  { id: 'antipasti', title: 'Antipasti', sub: 'Appetizers', note: null },
  { id: 'salads', title: 'Insalate e Zuppe', sub: 'Salads & Soups', note: 'Add to any salad: Chicken $10 · Salmon $16 · Colossal Tiger Prawns $6.50 ea · 10oz Sirloin $18' },
  { id: 'sides', title: 'Al Lato', sub: 'Sides', note: null },
  { id: 'specialties', title: 'Specialties della Casa', sub: 'Steaks, Veal, Poultry & Seafood', note: 'Add Tiger Prawns $6.50 ea · Zip Sauce $4 · Creamy Peppercorn $5 · Herb Butter $4 · Demi-Glace $4' },
  { id: 'pasta', title: 'Pasta & Healthy Specialties', sub: 'Including Vegan & Gluten-Free Options', note: 'Add to any pasta: Chicken $10 · Salmon $16 · Tiger Prawns $6.50 ea · Sirloin $18 · Meatballs $5 ea · Sausage $4 ea' },
  { id: 'pizza', title: 'Pizzas', sub: null, note: 'Medium 14" / Large 16" · Additional Toppings $3 Each · Add Chicken $10' },
  { id: 'sandwiches', title: 'Sandwiches', sub: 'Lunch Menu · Served with House-Made Pasta Salad or French Fries', note: null },
];

const fullMenu = [
  // Classic Italian Cocktails & Martinis
  { category: 'cocktails', name: 'Godmother', description: 'Grey Goose Vodka & Disaronno on the Rocks', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Milano Mule', description: "Tito's Vodka, Limoncello & Ginger Beer with a Lime Wedge", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Venetian Spritz', description: 'Prosecco, Aperol Aperitif & Club Soda with an Orange Slice', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Sangria Rosso', description: 'Chianti Red Wine, Blackberry Brandy, a Splash of Soda & Orange Juice with an Orange Slice & a Cherry', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bootlegger Old Fashioned', description: "Taffer's Browned Butter Bourbon, Bitters & Simple Syrup with an Orange Slice & a Luxardo Cherry", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bootlegger Cosmo Martini', description: "Grey Goose L'Orange Vodka, Cointreau & Cranberry Juice with Freshly Squeezed Lime", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bella Maria Martini', description: 'Grey Goose Le Citron Vodka, Chambord & Pineapple Juice with a Sugared Rim & a Lime Wedge', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Godfather', description: 'Dewars Scotch & Disaronno on the Rocks', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Negroni', description: 'Tanqueray Gin, Campari Aperitivo & Sweet Vermouth with an Orange Slice', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bellini', description: 'Prosecco, Peach Schnapps & Peach Puree with a Cherry', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Italian Margarita', description: 'Silver Tequila, Cointreau, Sour Mix & Lime Juice, Topped with Amaretto Disaronno on the Rocks with a Sugared Rim & a Lime Wedge', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Blood Orange Cosmo Martini', description: 'Grey Goose Vodka, Cointreau & Blood Orange Puree with Freshly Squeezed Lime', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Sicilian Lemon Drop Martini', description: 'Grey Goose Le Citron Vodka & Limoncello with a Splash of Sour', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Classico Martini', description: 'Chopin Vodka or Bombay Sapphire Gin with Garlic Stuffed Olives & Pepperoncini', price: '$19', tags: [] },

  // Dessert & Specialty Cocktails
  { category: 'dessert-cocktails', name: 'Bootlegger Coffee', description: "Bailey's Irish Cream, Brandy, Kahlua & Fresh Brewed Coffee, Topped with Whipped Cream & Chocolate Sprinkles", price: '$17', tags: [] },
  { category: 'dessert-cocktails', name: "Mama Maria's Coffee", description: "Crown Royal, Bailey's & Fresh Brewed Coffee, Topped with Whipped Cream & Caramel Sauce", price: '$17', tags: [] },
  { category: 'dessert-cocktails', name: 'White Chocolate Martini', description: 'Vanilla Vodka, White Crème de Cacao & White Chocolate Liqueur with a Dash of Cream', price: '$19', tags: [] },
  { category: 'dessert-cocktails', name: 'Tiramisu Martini', description: 'Vanilla Vodka, Tiramisu Liqueur & Kahlua with a Dash of Cream', price: '$19', tags: [] },

  // Italian Mocktails
  { category: 'mocktails', name: 'Lorraine Spritz', description: 'Non-Alcoholic Sparkling Wine, Non-Alcoholic Aperol & Soda Water with an Orange Slice', price: '$11', tags: [] },
  { category: 'mocktails', name: 'Strawberry Basil Spritz', description: 'Non-Alcoholic Sparkling Wine, Simple Syrup & Lime Juice with Strawberries & Basil', price: '$11', tags: [] },

  // Antipasti
  { category: 'antipasti', name: 'Bootlegger Hot Mixed Antipasto', description: "Colossal Tiger Prawns Scampi Style, Calamari & Meat Ravioli Fritti, Served with Chef Maria's Marinara Sauce", price: '$35', tags: [] },
  { category: 'antipasti', name: 'Antipasto Classico', description: "Chef's Choice of Imported Italian Cold Cuts & Cheeses, Served with Kalamata Olives, Roasted Red Peppers, Dried Figs, Almonds & Dates", price: '$34', tags: ['GF'] },
  { category: 'antipasti', name: 'Braised Pork Neck Bones', description: 'In a Light Broth with Pepperoncini & Capers, Served with Ciabatta Bread', price: '$25', tags: [] },
  { category: 'antipasti', name: 'Prawns Scampi Classic', description: "Colossal Tiger Prawns Sautéed in Chef Maria's Herb Butter, Served with Garlic Bread", price: '$24', tags: [] },
  { category: 'antipasti', name: 'Shrimp Cocktail', description: 'Chilled Colossal Tiger Prawns Served with House-Made Cocktail Sauce', price: '$23', tags: ['GF'] },
  { category: 'antipasti', name: 'Mussels Fra Diavolo', description: 'Sautéed in a White Wine & Mild, Medium or Hot Spicy Marinara Sauce, Served with Ciabatta Bread', price: '$23', tags: [] },
  { category: 'antipasti', name: 'Funghi di Maria', description: 'Mushroom Caps Filled with House-Made Sausage, Broiled in an Herb Butter Cream Sauce', price: '$20', tags: [] },
  { category: 'antipasti', name: 'Calamari Fritti', description: "Marinated, Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$19', tags: [] },
  { category: 'antipasti', name: 'Bruschetta', description: '5 Pieces with Tomato, Basil & Garlic, Finished with a Balsamic Glaze', price: '$17', tags: [] },
  { category: 'antipasti', name: 'Fresh Grilled Vegetables', description: 'Grilled Zucchini, Broccoli, Portobello Mushrooms & Peppers with Garlic & Olive Oil', price: '$17', tags: ['GF'] },
  { category: 'antipasti', name: 'Meat Ravioli Fritti', description: "Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$16', tags: [] },
  { category: 'antipasti', name: 'Mozzarella Sticks', description: "Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$16', tags: [] },
  { category: 'antipasti', name: 'Chicken Fingers or Wings', description: 'With Your Choice of Mild, Medium or Hot Sauce, Served with French Fries', price: '$16', tags: [] },

  // Salads & Soups
  { category: 'salads', name: 'Bistecca Salad', description: 'Grilled Sirloin over Spring Mix, Cherry Tomatoes, Kalamata Olives, Red Onion, Gorgonzola Cheese & Shaved Carrot, Tossed with Balsamic Vinaigrette', price: '$29', tags: ['GF'] },
  { category: 'salads', name: 'Insalata Lorraine', description: 'Radicchio, Spring Mix, Shaved Pear, Candied Walnuts & Gorgonzola Cheese, Tossed with Balsamic Vinaigrette & Finished with Balsamic Reduction', price: '$20', tags: ['GF'] },
  { category: 'salads', name: 'Mozzarella Caprese', description: 'Sliced Fresh Mozzarella, Sliced Tomatoes, Basil & Shaved Red Onion with Balsamic Reduction & Olive Oil', price: '$18', tags: ['GF'] },
  { category: 'salads', name: 'Iceberg Wedge', description: 'Crispy Pancetta, Sliced Tomato, Red Onion, Scallions & Hard-Boiled Egg with Bleu Cheese Dressing', price: '$18', tags: [] },
  { category: 'salads', name: 'Italian Cobb Salad', description: "Iceberg Lettuce, Julienne Cut Ham, Cherry Tomatoes, Red Onion & Hard-Boiled Egg, Topped with Bleu Cheese Crumbles & Chef Maria's Italian Dressing", price: '$18', tags: [] },
  { category: 'salads', name: 'Insalata di Maria', description: "Mixed Greens, Chopped Salami, Provolone Cheese, Cherry Tomatoes & Garbanzo Beans with Chef Maria's Italian Dressing", price: '$18', tags: [] },
  { category: 'salads', name: 'Insalata di Caesar', description: 'Chopped Romaine, Imported Parmesan Cheese & House-Made Rustic Croutons with Caesar Dressing', price: '$17', tags: [] },
  { category: 'salads', name: 'Insalata di Casa', description: "Spring Mix, Cherry Tomatoes, Cucumbers & Garbanzo Beans with Chef Maria's Italian Dressing", price: '$12', tags: ['V'] },
  { category: 'salads', name: 'Zuppa di Minestrone', description: "Chef Maria's Recipe with House-Made Sausage, Fresh Vegetables, White Beans & Pasta", price: '$12', tags: [] },

  // Sides
  { category: 'sides', name: 'Saffron Risotto', description: 'Creamy Italian Rice with Saffron, Tomatoes & Peas', price: '$16', tags: ['GF'] },
  { category: 'sides', name: 'Portobello Mushrooms', description: 'Sliced Portobello Mushrooms Marinated with Garlic and Herbs, Sautéed in Sherry Wine & Scampi Butter', price: '$15', tags: [] },
  { category: 'sides', name: 'Mixed Greens', description: 'Broccoli, Spinach & Onions Sautéed with Garlic & Olive Oil', price: '$12', tags: ['GF'] },
  { category: 'sides', name: 'Fresh Zucchini', description: 'Sautéed with Garlic, Olive Oil & Herbs', price: '$11', tags: ['GF', 'V'] },
  { category: 'sides', name: 'Fresh Broccoli', description: 'Grilled with Garlic & Olive Oil', price: '$11', tags: ['GF', 'V'] },
  { category: 'sides', name: 'Fresh Spinach', description: 'Sautéed in Garlic & Olive Oil', price: '$11', tags: ['GF', 'V'] },

  // Specialties della Casa
  { category: 'specialties', name: 'Chilean Sea Bass', description: 'Pan Seared Sea Bass in a Sherry Wine, Lemon & Caper Sauce, Served with Saffron Risotto & Asparagus', price: '$50', tags: [] },
  { category: 'specialties', name: 'Filet Mignon', description: '8oz Grilled Filet Mignon Served with Creamy Mashed Potatoes & Asparagus', price: '$49', tags: [] },
  { category: 'specialties', name: 'Ribeye', description: '16oz Grilled Ribeye Served with Creamy Mashed Potatoes & Asparagus', price: '$49', tags: [] },
  { category: 'specialties', name: 'NY Steak Strip', description: '16oz Grilled NY Strip Served with Creamy Mashed Potatoes, Asparagus & an Onion Ring', price: '$49', tags: [] },
  { category: 'specialties', name: 'Osso Bucco', description: 'Petite Veal Shanks Served with Saffron Risotto, Asparagus, Mushrooms, Tomatoes & Zucchini', price: '$45', tags: [] },
  { category: 'specialties', name: 'Seafood Fra Diavolo', description: 'Colossal Tiger Prawns, Clams, Calamari & Mussels, Cioppino Style in a Mild, Medium or Hot Spicy Tomato Sauce, Served over Linguine Pasta', price: '$40', tags: [] },
  { category: 'specialties', name: 'Vitello Lorraine', description: 'Veal Scaloppine Sautéed in a Marsala Wine, Mushroom & Creamy Garlic Sauce, Served with Fettuccine Alfredo', price: '$40', tags: [] },
  { category: 'specialties', name: 'Vitello Marsala', description: 'Veal Scaloppine Sautéed in a Marsala Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$39', tags: [] },
  { category: 'specialties', name: 'Vitello Picatta', description: 'Veal Scaloppine Sautéed in a Sherry Wine, Lemon & Caper Sauce, Served with Fettuccine Alfredo', price: '$39', tags: [] },
  { category: 'specialties', name: "Chef Maria's Saltimbocca", description: 'Pounded Thin & Rolled with Genoa Salami, Hot Capicola & Cheese, Dipped in Italian Egg Batter, then Sautéed in a Sherry Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: 'Chicken $36 / Veal $42', tags: [] },
  { category: 'specialties', name: 'Salmone', description: 'Pan Seared Salmon Served over House-Made Salmon Filled Squid Ink Ravioli, in a Lemon Cream Sauce with Tomatoes & Zucchini', price: '$37', tags: [] },
  { category: 'specialties', name: 'Prawns Scampi Linguine', description: "Colossal Tiger Prawns Sautéed in White Wine, Garlic & Chef Maria's Herb Butter, Served over Linguini Pasta", price: '$36', tags: [] },
  { category: 'specialties', name: 'Pork Chop Marsala', description: '12oz Bone-In Pan Roasted Pork Chop in a Marsala Wine & Mushroom Sauce, Served with Creamy Mashed Potatoes & Broccoli', price: '$34', tags: [] },
  { category: 'specialties', name: 'Pollo Francese', description: 'Chicken Scaloppine Lightly Dipped in Italian Egg Batter & Sautéed in a Sherry Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$34', tags: [] },
  { category: 'specialties', name: 'Pollo Marsala', description: 'Chicken Scaloppine Sautéed in a Marsala Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Pollo Picatta', description: 'Chicken Scaloppine Sautéed in a Sherry Wine, Lemon & Caper Sauce, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Pollo Angelo', description: 'Chicken Breast Sautéed with Sherry Wine, Artichokes, Mushrooms, Kalamata Olives & Roasted Red Peppers, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Linguine alla Vongole', description: "Whole & Baby Clams Sautéed in Sherry Wine & Chef Maria's Red, Broth or Cream Sauce, Served over Linguine Pasta", price: '$32', tags: [] },
  { category: 'specialties', name: 'Orange Roughy Francese', description: "Orange Roughy Lightly Dipped in Italian Egg Batter & Sautéed with Chef Maria's Herb Butter, Served with Fettuccine Alfredo", price: '$32', tags: [] },
  { category: 'specialties', name: 'Parmigiana della Casa', description: 'Lightly Breaded, Topped with Mozzarella Cheese & Baked, Served with Angel Hair Marinara', price: 'Eggplant $28 / Chicken $32 / Veal $40', tags: [] },
  { category: 'specialties', name: 'Salsiccia al Alberto', description: "House-Made Sausage with Roasted Potatoes, Sautéed Peppers, Caramelized Onions & Chef Maria's Marinara Sauce, Served with Ciabatta Bread", price: '$28', tags: [] },

  // Pasta & Healthy Specialties
  { category: 'pasta', name: 'Salmon Griglia', description: "Grilled Salmon over Sautéed Italian Greens, Served with Whole Grain Spaghetti & Chef Maria's Pomodoro Sauce", price: '$36', tags: [] },
  { category: 'pasta', name: 'Pollo Griglia', description: "Grilled Chicken Breast over Sautéed Italian Greens, Served with Whole Grain Spaghetti & Chef Maria's Pomodoro Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: "Mama's Lasagna", description: "Chef Maria's Classic Baked Lasagna with Meat Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: 'Pappardelle Bolognese', description: "Imported Ribbon Egg Pasta with Chef Maria's Creamy Bolognese Meat Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: 'Vegan Chopped Steak', description: 'Sautéed & Topped with Sautéed Mushrooms & Onions, Served with Roasted Potatoes, Peppers & Broccoli', price: '$29', tags: ['V'] },
  { category: 'pasta', name: 'Bucatini alla Carbonara', description: 'Bucatini Pasta, Pancetta, Egg, Fresh Peas & Cracked Black Pepper in a Cream Sauce', price: '$29', tags: [] },
  { category: 'pasta', name: 'Spinach Fettuccine Primavera', description: "Spinach Pasta with Broccoli, Sun-Dried Tomatoes, Zucchini, Asparagus & Garlic in Chef Maria's Broth or Cream Sauce, Topped with Pine Nuts", price: '$26', tags: [] },
  { category: 'pasta', name: 'Vegan Margherita Pizza', description: "Chef Maria's Pizza Sauce, Vegan Mozzarella Cheese, Sliced Tomatoes & Fresh Basil", price: '$26', tags: ['V'] },
  { category: 'pasta', name: 'Gluten-Free Pizza', description: "Chef Maria's Pizza Sauce & Shredded Mozzarella", price: '$26', tags: ['GF'] },
  { category: 'pasta', name: 'Fettuccine Alfredo', description: 'Italian Classic with a Parmigiano Cheese Cream Sauce', price: '$25', tags: [] },
  { category: 'pasta', name: 'Gluten-Free Cheese Ravioli', description: "Served with Chef Maria's Marinara Sauce", price: '$25', tags: ['GF'] },
  { category: 'pasta', name: 'Baked Penne', description: "Penne Pasta with Chef Maria's Meat Sauce & Ricotta Cheese, Topped with Mozzarella & Baked", price: '$24', tags: [] },
  { category: 'pasta', name: 'Gluten-Free Pasta', description: "Served with Chef Maria's Marinara Sauce", price: '$24', tags: ['GF'] },
  { category: 'pasta', name: 'Spaghetti Classico', description: "Chef Maria's Classic Spaghetti with Meat Sauce · With Meatballs or Italian Sausage add $6", price: '$23', tags: [] },
  { category: 'pasta', name: 'Whole Grain Spaghetti', description: "Served with Chef Maria's Marinara Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Ravioli', description: "Meat or Cheese Ravioli with Choice of Chef Maria's Marinara, Meat or Rose Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Capellini alla Pomodoro Rustica', description: "Capellini Pasta with Fresh Tomatoes, Fresh Basil, Garlic & Olive Oil & a Touch of Chef Maria's Marinara Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Manicotti al Forno', description: "Pasta Crepes Filled with Fresh Ricotta Cheese & Herbs, Topped with Chef Maria's Marinara Sauce", price: '$23', tags: [] },

  // Pizzas
  { category: 'pizza', name: 'Pizza Pollo Pesto', description: 'Pesto-Basil Sauce, Grilled Chicken, Shredded Mozzarella, Red Onions & Sun-Dried Tomatoes', price: 'M $29 / L $32', tags: [] },
  { category: 'pizza', name: 'Pizza della Casa', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, House-Made Sausage, Salami, Peppers, Onions & Black Olives", price: 'M $27 / L $30', tags: [] },
  { category: 'pizza', name: 'Pizza Vegetarian', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Peppers, Onions, Mushrooms & Black Olives", price: 'M $26 / L $29', tags: [] },
  { category: 'pizza', name: 'Pizza Classica', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Pepperoni & Mushrooms", price: 'M $25 / L $27', tags: [] },
  { category: 'pizza', name: 'Pizza Margherita Caprese', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Sliced Fresh Mozzarella, Sliced Tomatoes & Fresh Basil", price: 'M $24 / L $27', tags: [] },
  { category: 'pizza', name: 'Pizza Italian Greens', description: "Chef Maria's Herb Butter, Shredded Mozzarella, Sautéed Spinach, Broccoli & Garlic", price: 'M $24 / L $26', tags: [] },
  { category: 'pizza', name: 'Pizza White', description: "Chef Maria's Alfredo Sauce, Sliced Fresh Mozzarella, Shredded Mozzarella & Ricotta Cheese", price: 'M $24 / L $26', tags: [] },
  { category: 'pizza', name: 'Pizza al Formaggio', description: "Chef Maria's Pizza Sauce & Shredded Mozzarella", price: 'M $21 / L $23', tags: [] },
  { category: 'pizza', name: 'Combo: Medium Cheese Pizza & Chicken Wings', description: null, price: '$33', tags: [] },
  { category: 'pizza', name: 'Combo: Large Cheese Pizza & Double Chicken Wings', description: null, price: '$46', tags: [] },

  // Sandwiches (Lunch Menu)
  { category: 'sandwiches', name: 'Meatball Sub', description: 'Served with House-Made Pasta Salad or French Fries', price: '$20', tags: [] },
];

const menuCategories = menuSections.map(s => s.id);

const MenuList = () => {
  return (
    <div>
      <div style={{
        marginBottom: 'var(--space-xl)',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          color: 'var(--accent-gold)',
          marginBottom: 'var(--space-xs)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}>Est. 1949 · South Strip Las Vegas</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'var(--fg)',
          lineHeight: 1.1,
        }}>Chef Maria's <span style={{ color: 'var(--accent-red)' }}>Menu</span></h2>
        <p style={{
          fontSize: 'var(--text-meta)',
          color: 'var(--muted)',
          marginTop: '6px',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}>Award-Winning Recipes · Made Fresh In House · GF = Gluten-Free · V = Vegan</p>
      </div>

      {menuSections.map((section) => {
        const items = fullMenu.filter(i => i.category === section.id);
        if (items.length === 0) return null;
        return (
          <div key={section.id} style={{ marginBottom: 'var(--space-2xl)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: section.note ? 'var(--space-xs)' : 'var(--space-md)',
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'var(--accent-wine)',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.4,
                }}>{section.title}</h3>
                {section.sub && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    marginTop: '1px',
                    whiteSpace: 'nowrap',
                  }}>{section.sub}</p>
                )}
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            {section.note && (
              <p style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--muted)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-sm)',
                paddingBottom: 'var(--space-xs)',
                borderBottom: '1px dashed var(--border)',
              }}>{section.note}</p>
            )}
            {items.map((item, i) => (
              <MenuItem key={item.name} {...item} isLast={i === items.length - 1} />
            ))}
          </div>
        );
      })}

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'var(--space-md)',
        marginTop: 'var(--space-sm)',
        fontSize: 'var(--text-meta)',
        color: 'var(--muted)',
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.
      </div>
    </div>
  );
};

Object.assign(window, { MenuList, fullMenu, menuCategories, menuSections });
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

function sanitize(str) {
  return String(str).replace(/[<>&"']/g, function(c) {
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c];
  });
}

const BookingBar = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (confirmed) {
      const t = setTimeout(() => setConfirmed(false), 3500);
      return () => clearTimeout(t);
    }
  }, [confirmed]);

  const today = new Date().toISOString().split('T')[0];
  const validTimes = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!date) { setError('Please select a date.'); return; }
    if (!time) { setError('Please select a time.'); return; }
    if (!validTimes.includes(time)) { setError('Invalid time selection.'); return; }
    var selected = new Date(date + 'T' + time);
    if (isNaN(selected.getTime())) { setError('Invalid date or time.'); return; }
    if (selected < new Date()) { setError('Reservation must be in the future.'); return; }
    if (guests < 1 || guests > 20) { setError('Guests must be between 1 and 20.'); return; }
    setAnimating(true);
    setConfirmed(true);
    setTimeout(() => setAnimating(false), 500);
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

      {error && (
        <div style={{
          marginTop: 'var(--space-md)',
          padding: 'var(--space-sm) var(--space-md)',
          background: 'color-mix(in oklch, var(--state-error) 14%, var(--surface))',
          border: '1px solid color-mix(in oklch, var(--state-error) 30%, transparent)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-small)',
          color: 'var(--state-error)',
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}

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

const merchBase = '../../assets/merch';

const merchandise = [
  { name: 'Bootlegger Tumbler', price: '$26', desc: '20 oz double-wall stainless steel tumbler', label: 'Drinkware', img: 'mpqzokmv-Tumbler.jpg' },
  { name: 'Pint Glass', price: '$20', desc: '16 oz Bootlegger drinking cup', label: 'Drinkware', img: 'mpqzokms-cup1.jpg' },
  { name: 'Rocks Glass', price: '$22', desc: '12 oz etched Bootlegger rocks glass', label: 'Drinkware', img: 'mpqzokmt-cup2.jpg' },
  { name: 'Coffee Mug', price: '$18', desc: 'Ceramic mug, Bootlegger logo', label: 'Drinkware', img: 'mpqzokmt-mug.jpg' },
  { name: 'Zip Hoodie', price: '$48', desc: 'Unisex full zip hoodie, premium fleece', label: 'Apparel', img: 'mpqzokmt-hoodie.jpg' },
  { name: 'Classic Tee', price: '$28', desc: 'Classic crew neck t-shirt, 100% cotton', label: 'Apparel', img: 'mpqzokmv-womens-tshirt.jpg' },
  { name: 'Kids Tee', price: '$22', desc: 'Kids crew neck tee, 100% cotton', label: 'Apparel', img: 'mpqzokmt-kids-tshirt.jpg' },
  { name: 'Canvas Tote', price: '$24', desc: 'Conscious cotton tote, natural canvas', label: 'Accessories', img: 'mpqzokmv-totebag.jpg' },
  { name: 'Sticker Pack', price: '$6', desc: 'Die cut sticker set — 3 designs', label: 'Accessories', img: 'mpqzokmu-sticker.jpg' },
];

const Merchandise = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Drinkware', 'Apparel', 'Accessories'];

  const filtered = activeFilter === 'All'
    ? merchandise
    : merchandise.filter(m => m.label === activeFilter);

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-md)',
        marginBottom: 'var(--space-lg)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            color: 'var(--fg)',
          }}>
            Bootlegger <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}>Swag</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'var(--accent-red)' : 'transparent',
                color: activeFilter === cat ? '#fff' : 'var(--muted)',
                border: activeFilter === cat ? '1px solid var(--accent-red)' : '1px solid var(--border)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-meta)',
                fontWeight: activeFilter === cat ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                lineHeight: 1,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 'var(--space-lg)',
      }}>
        {filtered.map((item) => (
          <div
            key={item.name}
            className="card"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Product image with logo overlay */}
            <a href="https://the-bootlegger-bistro.creator-spring.com/" target="_blank" rel="noopener noreferrer" style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              aspectRatio: '1',
              background: 'var(--surface-warm)',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              <img
                src={`${merchBase}/${item.img}`}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, var(--surface-warm), var(--bg))';
                }}
              />
              {/* Streamlined logo overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.08) 100%)',
                pointerEvents: 'none',
              }} />
              <img
                src="../../build/logo.avif"
                alt="The Bootlegger"
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '80px',
                  height: 'auto',
                  opacity: 0.6,
                  filter: 'brightness(2) contrast(0.7) drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
                  pointerEvents: 'none',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </a>

            {/* Card body */}
            <div style={{ padding: 'var(--space-md) var(--space-lg) var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent-wine)',
                fontWeight: 600,
                marginBottom: 'var(--space-2xs)',
              }}>
                {item.label}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h3)',
                marginBottom: 'var(--space-2xs)',
                color: 'var(--fg)',
              }}>
                {item.name}
              </h3>
              <p style={{
                fontSize: 'var(--text-meta)',
                color: 'var(--muted)',
                marginBottom: 'var(--space-sm)',
                lineHeight: 1.5,
                flex: 1,
              }}>
                {item.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-h3)',
                  fontWeight: 700,
                  color: 'var(--accent-red)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {item.price}
                </span>
                <a href="https://the-bootlegger-bistro.creator-spring.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 18px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Shop on Spring ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-3xl)',
          color: 'var(--muted)',
          fontFamily: 'var(--font-body)',
        }}>
          No items in this category.
        </div>
      )}
    </div>
  );
};

Object.assign(window, { Merchandise, merchandise });

const photos = {
  luigiMaria:          '../../mpryfaah-Maria-and-Luigi-Zoiaa.avif',
  wedding:             '../../mpryfaah-Al-and-Maria-Wedding-Day.avif',
  littleMaria:         '../../mpryfaah-LITTLE-MARIA.avif',
  mariaAl1943:         '../../mpryfaah-1943-Maria-and-Al.avif',
  year1949:            '../../mpryfaah-1949.avif',
  marieAlBootlegger:   '../../mpryfaah-Marie-and-Al-Bootlegger.avif',
  lorraineMamaAl:      '../../mpryfaah-lorraine-mama-and-al-copy2.avif',
  fourGenerations:     '../../mpryfaah-Four-Generations.avif',
  mamaMaria100th:      '../../mpryfaah-MamaMarias100th---Mama-with-bejeweled-Crown-Royal-bottle.avif',
  year2006:            '../../mpryfaah-2006.avif',
  family:              '../../mpryfaah-916CF34C-5B5D-4F30-989E-82D092FA6F44.avif',
  mamaMariasCooking:   '../../mpryfaah-6DA0D808-9AC6-4886-8940-E78C9953E575.avif',
  rob:                 '../../mpryfad0-rob.avif',
};

const timeline = [
  {
    year: 'Early 1900s',
    title: 'The Zoia Family Crosses the Atlantic',
    description: 'Luigi and Maria Zoia migrated from Padua, Italy to Niagara Falls, Ontario, Canada in the early 1900s. They built a large boarding house and provided room and board for fourteen boarders. Their granddaughter Maria was later sent to live with them at age 9 to help with the cooking and cleaning.',
    photo: photos.luigiMaria,
    caption: 'Luigi and Maria Zoia — the founders of the Bootlegger legacy',
  },
  {
    year: 'Prohibition Era',
    title: '"The Bootlegger" Nickname Is Born',
    description: 'During the prohibition era in the United States, Luigi served his homemade wine in the boarding house. The neighborhood began calling him "The Bootlegger" — a name that would define the family legacy for generations to come.',
  },
  {
    year: '1936',
    title: 'Maria Meets Albert Perry',
    description: 'At 19, Maria met and married Albert Perry, a young man from across the river in Niagara Falls, New York. The couple would go on to build one of Las Vegas\'s most beloved restaurant dynasties.',
    photo: photos.wedding,
    caption: 'Maria and Albert Perry on their wedding day',
  },
  {
    year: '1943',
    title: 'The Journey West — Las Vegas',
    description: 'Maria and Albert, along with their baby daughter Lorraine and Al\'s 14-year-old sister Madeline, left their family and friends in Niagara Falls and moved west to a little-known, dry, dusty town called Las Vegas, Nevada. This journey changed their lives forever.',
    photo: photos.mariaAl1943,
    caption: 'Maria and Al Perry, 1943 — the year they moved to Las Vegas',
  },
  {
    year: '1944',
    title: 'The Restaurant Dream Begins',
    description: 'Maria\'s exceptional culinary skills, nurtured by her grandmother, combined with Al\'s affable personality, led them into the restaurant business. They honed their skills at the famous Fiesta Villa Ristorante of the 1940s, where the "Legends of Hollywood" — Howard Hughes, Clark Gable, Jane Russell, Clara Bow — would "hang out" in Las Vegas.',
    photo: photos.littleMaria,
    caption: 'Young Maria — already learning her grandmother\'s recipes',
  },
  {
    year: '1949',
    title: 'First Italian Restaurant Opens',
    description: 'Maria and Al opened their first Italian restaurant with well-known and respected Chef Domenic Piscatelli. Liberace was the highest paid entertainer in Las Vegas earning $50,000 a week. Maria, Al, Angie, and Lou Ruvo opened the Venetian Pizzeria on Fremont Street.',
    photo: photos.year1949,
    caption: 'Venetian Pizzeria, Fremont Street — the beginning of a Las Vegas institution',
  },
  {
    year: '1963',
    title: 'The Venetian Restaurant on West Sahara',
    description: 'While Frank Sinatra and the Rat Pack were causing global excitement on the Las Vegas Strip, Maria, Al, with family Angie and Lou Ruvo opened the Venetian Restaurant on West Sahara Avenue. The Bootlegger name was becoming synonymous with fine Italian dining in Las Vegas.',
    photo: photos.marieAlBootlegger,
    caption: 'Marie and Al at The Bootlegger',
  },
  {
    year: '1969',
    title: 'Lorraine Opens the Landmark Hotel',
    description: 'Maria and Al\'s daughter Lorraine, now a Las Vegas singer and entertainer, opened the historic Landmark Hotel with her group "The Lauri Perry Four." Her boss and the owner of the hotel was Howard Hughes. With the money she earned from singing, Lorraine began purchasing vacant land on the "South Strip."',
  },
  {
    year: '1972',
    title: '"The Bootlegger" Restaurant Opens',
    description: 'While Elvis was electrifying Las Vegas audiences, Maria and Al joined forces with their daughter Lorraine to build a restaurant on Lorraine\'s land at Tropicana and Eastern. They named it "The Bootlegger" in honor of Maria\'s grandfather Luigi. The family legacy had come full circle.',
    photo: photos.lorraineMamaAl,
    caption: 'Lorraine, Mama Maria, and Al — three generations building the dream together',
  },
  {
    year: '1994',
    title: 'Lorraine Enters Public Service',
    description: 'As an entertainer, restaurateur, and small business advocate, Lorraine ran for political office and became a Clark County Commissioner and the first woman chairperson of the Las Vegas Convention and Visitor\'s Authority (LVCA).',
  },
  {
    year: '1998',
    title: 'Lieutenant Governor of Nevada',
    description: 'Lorraine was elected as the 32nd Lieutenant Governor of the State of Nevada, leading Tourism and Economic Development. She served for eight years, overseeing the state\'s tourism and economic initiatives, and serving as President of the Nevada State Senate.',
  },
  {
    year: '2001',
    title: 'The Bootlegger Italian Bistro — South Strip',
    description: 'Lorraine, Maria, Al, Cousin Joel Davies, and family opened The Bootlegger Italian Bistro on Las Vegas Boulevard, "South Strip" — continuing the legacy. The restaurant became an instant landmark, serving Chef Maria\'s original recipes to locals and celebrities alike.',
    photo: photos.fourGenerations,
    caption: 'Four generations of the Bootlegger family — a Las Vegas dynasty',
  },
  {
    year: '2003',
    title: 'Ronnie Mancuso Joins as COO',
    description: 'Lorraine\'s son, Ronnie Mancuso, joined the family business as chief operating officer. Ronnie\'s background as a musician and music producer added a new generation of creativity. As the Bistro grew to a 24-hour, 7-days-a-week operation, Ronnie\'s leadership allowed Lorraine to continue her commitment as Lt. Governor.',
    photo: photos.rob,
    caption: 'Ronnie Mancuso — carrying the family tradition forward',
  },
  {
    year: '2006',
    title: 'Lorraine Marries Dennis Bono',
    description: 'Lorraine married recording artist and music variety talk show host Dennis Bono, who brought his entertainment talents to the family enterprise. The Bootlegger became the heart of Las Vegas entertainment with live music every single night.',
    photo: photos.year2006,
    caption: '2006 — Lorraine and Dennis Bono',
  },
  {
    year: '2012',
    title: 'The Fourth Generation Arrives',
    description: 'Great-Grandmother Maria, Grandmother Lorraine, "Pa Pa" Dennis, Ron, and Cousin Joel welcomed Ron\'s son Roman to the work force at The Bootlegger. The fourth generation joined the legendary family restaurant.',
    photo: photos.family,
    caption: 'The Bootlegger family — four generations strong',
  },
  {
    year: '2017',
    title: 'Chef Maria\'s 100th Birthday',
    description: 'Chef Maria celebrated with family and friends her 100th birthday — a century of life, love, and extraordinary cooking. The Las Vegas community came together to honor the matriarch of the Bootlegger family.',
    photo: photos.mamaMaria100th,
    caption: 'Mama Maria at 100 — still the heart of the Bootlegger',
  },
  {
    year: '2018',
    title: 'Four Generations Operating Together',
    description: 'Four generations of the family that own and operate The Bootlegger Bistro: Mama Maria, Ronnie, Lorraine, Roman, Dennis, and Zia. The restaurant continued its legacy: Open Daily Sun–Thu 11am–10pm, Fri–Sat 11am–12am.',
  },
  {
    year: '2019',
    title: 'Mama Maria\'s Legacy Lives On',
    description: 'Mama Maria passed away peacefully at age 102 surrounded by her family. Her family continues to provide exceptional service and food to the Las Vegas community. The legacy of Mama Maria and Al Perry continues — four generations contributing their combined talents to bring the finest in food, drink, hospitality, and entertainment.',
    photo: photos.mamaMariasCooking,
    caption: 'Mama Maria\'s recipes — a 102-year legacy of Italian cooking perfection',
  },
];

const OurStory = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const containerStyle = {
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.5s ease',
  };

  return (
    <div style={containerStyle}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        minHeight: 'clamp(280px, 50vh, 560px)',
        background: 'var(--gradient-family)',
        marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(215, 160, 60, 0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          padding: isMobile ? 'clamp(1.5rem, 5vw, 2.5rem) clamp(1rem, 5vw, 4rem)' : 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        }}>
          <img src="../../build/logo.avif" alt="The Bootlegger" style={{
            width: 'clamp(60px, 12vw, 100px)', height: 'auto',
            marginBottom: 'var(--space-xs)',
            filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
          }} />
          <div style={{
            width: 'clamp(36px, 8vw, 60px)', height: '2px',
            background: 'var(--accent-gold)',
            marginBottom: isMobile ? 'var(--space-xs)' : 'var(--space-md)',
            borderRadius: 0,
          }} />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'clamp(1.4rem, 5vw, 2rem)' : 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#fff',
            marginBottom: isMobile ? 'var(--space-xs)' : 'var(--space-md)',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            maxWidth: '700px',
          }}>
            The Place Where Locals & Celebrities Gather
          </h1>
          <p style={{
            fontSize: isMobile ? 'clamp(0.8125rem, 1.4vw, 1rem)' : 'clamp(0.9rem, 1.4vw, 1.15rem)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
            maxWidth: '580px',
          }}>
            From Howard Hughes and Frank Sinatra to today's Las Vegas headliners — Chef Maria's original recipes have made The Bootlegger a Las Vegas landmark on the South Strip since 2001.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? 'var(--space-xs)' : 'var(--space-md)', flexWrap: 'wrap' }}>
            <span className="badge badge-red" style={{ fontSize: '0.65rem', padding: '4px 14px' }}>Since 1949</span>
            <span className="badge" style={{ background: 'var(--accent-gold)', color: 'var(--fg)', fontSize: '0.65rem', padding: '4px 14px' }}>4 Generations</span>
            <span className="badge" style={{ background: 'var(--accent-olive)', color: '#fff', fontSize: '0.65rem', padding: '4px 14px' }}>Family Owned</span>
            <span className="badge" style={{ background: 'var(--accent-navy)', color: '#fff', fontSize: '0.65rem', padding: '4px 14px' }}>102 Years</span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
        marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'var(--text-body)' : 'var(--text-h3)',
          fontWeight: 700,
          color: 'var(--accent-red)',
          whiteSpace: 'nowrap',
        }}>
          Our Family History
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

        {timeline.map((entry, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 'var(--space-xs)' : 'var(--space-sm)',
              marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
              padding: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}>
              {/* Year badge */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '0' : '-1px',
                left: isMobile ? '0' : (isLeft ? 'var(--space-lg)' : 'auto'),
                right: isMobile ? 'auto' : (isLeft ? 'auto' : 'var(--space-lg)'),
                borderRadius: isMobile ? '0 var(--radius-sm) var(--radius-sm) 0' : '0 var(--radius-sm) 0 var(--radius-sm)',
                background: 'var(--accent-red)',
                color: '#fff',
                padding: '4px 16px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-display)',
              }}>
                {entry.year}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : (entry.photo ? (isLeft ? 'row' : 'row-reverse') : 'column'),
                gap: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                alignItems: isMobile ? 'stretch' : (entry.photo ? 'flex-start' : 'stretch'),
                marginTop: isMobile ? 'var(--space-lg)' : 'var(--space-md)',
              }}>
                {entry.photo && (
                  <div style={{
                    flex: isMobile ? '0 0 100%' : '0 0 clamp(200px, 30%, 300px)',
                    maxWidth: isMobile ? '100%' : 'clamp(200px, 30%, 300px)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={entry.photo}
                      alt={entry.caption || entry.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 'var(--radius-md)',
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    {entry.caption && (
                      <p style={{
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        marginTop: 'var(--space-2xs)',
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                      }}>
                        {entry.caption}
                      </p>
                    )}
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h3)',
                    fontWeight: 700,
                    color: 'var(--fg)',
                    marginBottom: 'var(--space-xs)',
                    lineHeight: 1.3,
                  }}>
                    {entry.title}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--muted)',
                    lineHeight: 1.8,
                  }}>
                    {entry.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer with legacy summary */}
        <div style={{
          background: 'var(--gradient-dark-diag)',
          borderRadius: 'var(--radius-lg)',
          padding: isMobile ? 'var(--space-lg) var(--space-md)' : 'var(--space-xl) var(--space-lg)',
          textAlign: 'center',
          marginTop: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'var(--text-h3)' : 'var(--text-h2)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 'var(--space-md)',
            lineHeight: 1.2,
          }}>
            Continuing a Family Tradition Since 1949
          </p>
          <p style={{
            fontSize: isMobile ? 'var(--text-small)' : 'var(--text-body)',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto var(--space-lg)',
            lineHeight: 1.7,
          }}>
            After 102 years, the legacy of Mama Maria and Al is continued by this dedicated Italian family — contributing their combined talents to bring the finest in food, drink, hospitality, and entertainment to the many friends and visitors who patronize their restaurant.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 'var(--space-md)' : 'var(--space-xl)',
            flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--accent-gold)' }}>7700</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Las Vegas Blvd S</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--accent-gold)' }}>4</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Generations</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--accent-gold)' }}>73+</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Years Serving LV</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--accent-gold)' }}>102</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mama Maria's Years</p>
            </div>
          </div>
        </div>
    </div>
  );
};

Object.assign(window, { OurStory });

const entertainmentSchedule = [
  { day: 'Monday', act: 'Singer & Sachs — Jazz Duo', time: '6:30–9:30pm', description: 'Joey Singer & Bob Sachs' },
  { day: 'Monday', act: 'Santa Fe & The Fat City Horns', time: '7:30pm', description: 'In The Copa Room — Jazz, Funk, Rock & Latin', isHighlight: true },
  { day: 'Tuesday', act: 'Doug Taylor — Vocals & Piano', time: '6:30–9:30pm' },
  { day: 'Wednesday', act: 'Mariano Gonzalez — Master Harpist', time: '6:30–9:30pm' },
  { day: 'Thursday', act: 'Mariano Gonzalez — Master Harpist', time: '6:30–9:30pm' },
  { day: 'Friday', act: 'Doug Taylor — Vocals & Piano', time: '6:30–10:30pm' },
  { day: 'Saturday', act: 'Doug Taylor — Vocals & Piano', time: '6:30–10:30pm' },
  { day: 'Sunday', act: 'Doug Taylor — Vocals & Piano', time: '6:30–9:30pm' },
];

const App = () => {
  const [activeNav, setActiveNav] = useState('Menu');
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    };
    const handleClick = (e) => {
      if (sidebarOpen && !e.target.closest('[data-drawer]')) setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [sidebarOpen]);

  const isDesktop = !isMobile;
  const showBanner = activeNav === 'Menu';

  const bannerSlides = [
    {
      title: "Reserve Your Table",
      subtitle: "Join us for dinner, live music, and the best Italian on the South Strip. The Copa Room and The Vegas Room are available for your evening.",
      ctaText: "Make a Reservation",
      logo: true,
      image: "../../mpsv1ck9-food2.avif",
    },
    {
      title: "Live Music Every Night",
      subtitle: "No Cover — No Minimum. From jazz duos to The Fat City Horns in The Copa Room.",
      ctaText: "See Entertainment",
      image: "../../mpsvg323-SantaFe_featured.avif",
      backgroundPosition: "center 15%",
    },
    {
      title: "A Family Tradition Since 1949",
      subtitle: "Four generations of authentic Italian cooking — The Bootlegger Italian Bistro, Las Vegas.",
      ctaText: "Read Our Story",
      image: "../../mpsvh620-Screen-Shot-2022-06-23-at-7_25_58-PM.avif",
    },
  ];

  const menuSlides = [
    {
      title: "Chef Maria's Award Winning Menu",
      subtitle: "Authentic Italian recipes, made fresh in house since 1949. Dine in, take out, or book a private event.",
      ctaText: "Make a Reservation",
      logo: true,
    },
  ];

  const handleNavChange = useCallback((label) => {
    setActiveNav(label);
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const bannerCtaClick = useCallback((ctaText) => {
    if (ctaText === 'See Entertainment') setActiveNav('Entertainment');
    else if (ctaText === 'Read Our Story') setActiveNav('Our Story');
    else if (ctaText === 'Make a Reservation') setActiveNav('Parties & Events');
  }, []);

  const mainStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'var(--bg)',
    fontFamily: 'var(--font-body)',
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.4s ease',
  };

  const contentStyles = {
    flex: 1,
    overflow: 'hidden',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  };

  const topBarStyles = {
    padding: 'var(--space-sm) var(--space-lg)',
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    flexShrink: 0,
  };

  const topBarLeftStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
  };

  const topBarRightStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    justifySelf: 'end',
  };

  const topBarCenterStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const hamBtnStyles = {
    width: 38,
    height: 38,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    background: 'var(--surface-warm)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    padding: 6,
    flexShrink: 0,
  };

  const hamLine = {
    width: '100%',
    height: 2,
    background: 'var(--fg)',
    borderRadius: 0,
    transition: 'all 0.3s ease',
  };

  const sectionOuterStyles = {
    padding: 'var(--space-2xl) var(--space-lg)',
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
  };

  const footerStyle = {
    background: 'var(--gradient-dark)',
    color: '#fff',
    padding: isMobile ? '10px var(--space-md) 10px' : 'var(--space-md) var(--space-lg) var(--space-md)',
    flexShrink: 0,
  };

  const footerInnerStyle = {
    maxWidth: 960,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: isMobile ? 'var(--space-xs)' : 'var(--space-md)',
  };

  const sectionInnerStyles = {
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
  };

  const sectionTitleStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h2)',
    marginBottom: 'var(--space-lg)',
    color: 'var(--fg)',
  };

  const sectionTitleAccent = {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h2)',
  };

  const venueGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--space-lg)',
    marginTop: 'var(--space-lg)',
  };

  /* ---- overlay and drawer for mobile sidebar ---- */
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: 50,
    animation: 'fadeIn 0.2s ease',
  };

  const drawerWrapperStyle = (open) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 51,
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: open ? '4px 0 40px rgba(0,0,0,0.3)' : 'none',
  });

  const drawerCloseBtn = {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '50%',
    color: '#fff',
    fontSize: 18,
    cursor: 'pointer',
    zIndex: 52,
    lineHeight: 1,
  };

  const renderContent = () => {
    switch (activeNav) {
    case 'Menu':
      return (
        <div key="Menu">
          {/* Delivery services bar */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: isMobile ? 'var(--space-sm)' : 'var(--space-sm)',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            marginBottom: 'var(--space-xl)',
            padding: 'var(--space-md) var(--space-lg)',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-meta)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
              fontWeight: 600,
              display: 'block',
              width: isMobile ? '100%' : 'auto',
              marginBottom: isMobile ? 'var(--space-xs)' : 0,
              marginRight: isMobile ? 0 : 'var(--space-xs)',
            }}>Order Delivery</span>
            <a
              href="https://www.doordash.com/store/the-bootlegger-italian-bistro-las-vegas-71712/43542346/"
              onClick={(e) => { e.preventDefault(); window.open('https://www.doordash.com/store/the-bootlegger-italian-bistro-las-vegas-71712/43542346/', '_blank', 'noopener,noreferrer'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                background: '#ff3008',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-button)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                flex: isMobile ? '1 1 auto' : '0 0 auto',
                width: isMobile ? '100%' : 'auto',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#cc2606'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ff3008'; e.currentTarget.style.transform = ''; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              DoorDash
            </a>
            <a
              href="https://www.ubereats.com/store/bootlegger-bistro-las-vegas/VXl3z9TPT4epMtn0ShUoPA"
              onClick={(e) => { e.preventDefault(); window.open('https://www.ubereats.com/store/bootlegger-bistro-las-vegas/VXl3z9TPT4epMtn0ShUoPA', '_blank', 'noopener,noreferrer'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                background: '#000',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-button)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                flex: isMobile ? '1 1 auto' : '0 0 auto',
                width: isMobile ? '100%' : 'auto',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = ''; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              Uber Eats
            </a>
            <a
              href="https://postmates.com/store/bootlegger-bistro-las-vegas/VXl3z9TPT4epMtn0ShUoPA"
              onClick={(e) => { e.preventDefault(); window.open('https://postmates.com/store/bootlegger-bistro-las-vegas/VXl3z9TPT4epMtn0ShUoPA', '_blank', 'noopener,noreferrer'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                background: '#ff6b47',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-button)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                flex: isMobile ? '1 1 auto' : '0 0 auto',
                width: isMobile ? '100%' : 'auto',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e5512f'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ff6b47'; e.currentTarget.style.transform = ''; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              Postmates
            </a>
          </div>

          <MenuList />
          </div>
        );

      case 'Entertainment':
        return (
          <div style={{
            width: '100%',
            background: 'var(--gradient-dark-banner)',
            color: '#fff',
          }}>
            {/* Hero band */}
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 0%, rgba(200, 60, 40, 0.15) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
              <span style={{
                display: 'inline-block',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--accent-gold)',
                fontWeight: 600,
                marginBottom: 'var(--space-md)',
                border: '1px solid rgba(200, 150, 60, 0.3)',
                padding: '6px 18px',
                borderRadius: 0,
              }}>No Cover · No Minimum</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#fff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>
                Live Music <span style={{ color: 'var(--accent-gold)' }}>Every Night</span>
              </h2>
              <p style={{
                fontSize: 'var(--text-body)',
                color: 'rgba(255,255,255,0.5)',
                marginTop: 'var(--space-sm)',
                maxWidth: 500,
                margin: 'var(--space-sm) auto 0',
              }}>
                The Copa Room · South Strip · 6:30pm Nightly
              </p>
            </div>

            {/* Schedule poster wall */ }
            <div style={{
              maxWidth: 800,
              margin: '0 auto',
              padding: '0 var(--space-lg)',
            }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{
                  padding: 'var(--space-sm) var(--space-xl)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  <span>This Week's Lineup</span>
                  <span>8 Shows Nightly</span>
                </div>
                {entertainmentSchedule.map((e, i) => (
                  <EntertainmentCard key={i} {...e} />
                ))}
              </div>
            </div>

            {/* Footer coda */ }
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-2xl) var(--space-lg) var(--space-3xl)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                letterSpacing: '-0.01em',
                marginBottom: 'var(--space-xs)',
              }}>
                NO COVER · NO MINIMUM
              </p>
              <p style={{
                fontSize: 'var(--text-small)',
                color: 'rgba(255,255,255,0.4)',
              }}>
                Nightly dining entertainment. Abundant free parking.
              </p>
            </div>
          </div>
        );

        case 'Our Story':
          return <OurStory />;

      case 'Parties & Events':
        return (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', marginBottom: 'var(--space-xl)', color: 'var(--fg)' }}>
              Parties & <span style={sectionTitleAccent}>Events</span>
            </h2>

            <div className="card" style={{
              overflow: 'hidden',
              marginBottom: 'var(--space-xl)',
              border: '2px solid var(--accent-red)',
            }}>
              <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, var(--accent-red), var(--accent-gold))',
                margin: 'calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-md)',
              }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
                marginBottom: 'var(--space-sm)',
              }}>
                <span style={{
                  fontSize: '1.2rem', lineHeight: 1,
                }}>🍽️</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--fg)' }}>
                  Book a Table — Dinner Reservations
                </h3>
              </div>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                Walk-ins welcome, but reservations recommended. Call us to book your table for dinner tonight.
              </p>
              <div style={{
                background: 'var(--surface-warm)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--fg)' }}>Reservations</span>
                  <a href="tel:+17027364939" style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)',
                    color: 'var(--accent-red)', textDecoration: 'none', fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}>(702) 736-4939</a>
                </div>
                <div style={{ height: '1px', background: 'var(--border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--fg)' }}>Take Out</span>
                  <a href="tel:+17027367080" style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)',
                    color: 'var(--accent-red)', textDecoration: 'none', fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}>(702) 736-7080</a>
                </div>
              </div>
            </div>

            <div style={{
              position: 'relative',
              marginBottom: 'var(--space-lg)',
              textAlign: 'center',
            }}>
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '50%',
                height: '1px', background: 'var(--border)',
              }} />
              <span style={{
                position: 'relative', display: 'inline-block',
                background: 'var(--bg)', padding: '0 var(--space-md)',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-meta)',
                textTransform: 'uppercase', letterSpacing: '0.15em',
                color: 'var(--muted)', fontWeight: 500,
              }}>Private Events</span>
            </div>

            <div style={venueGridStyles}>
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: '4px', background: 'linear-gradient(90deg, var(--accent-wine), var(--accent-red))',
                  margin: 'calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-md)',
                }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-2xs)', color: 'var(--fg)' }}>The Vegas Room</h3>
                <p style={{ fontSize: 'var(--text-meta)', color: 'var(--accent-wine)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>INTIMATE · ELEGANT</p>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>Accommodates up to 50 guests. Perfect for intimate celebrations, rehearsal dinners, and private parties.</p>
                <span className="badge badge-wine" style={{ marginBottom: 'var(--space-md)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>Up to 50 Guests</span>
                <a href="#" className="btn btn-primary" style={{ width: '100%' }}>Inquire</a>
              </div>
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: '4px', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-red))',
                  margin: 'calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-md)',
                }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-2xs)', color: 'var(--fg)' }}>The Copa Room</h3>
                <p style={{ fontSize: 'var(--text-meta)', color: 'var(--accent-red)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>GRAND · SPECTACULAR</p>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>Accommodates 50–180 guests. Live music stage, full bar, dance floor — the quintessential Vegas venue.</p>
                <span className="badge badge-red" style={{ marginBottom: 'var(--space-md)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>50–180 Guests</span>
                <a href="#" className="btn btn-primary" style={{ width: '100%' }}>Book Event</a>
              </div>
            </div>
            <div style={{
              marginTop: 'var(--space-lg)',
              textAlign: 'center',
              padding: 'var(--space-xl)',
              background: 'linear-gradient(135deg, var(--surface-warm), var(--bg))',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-2xs)', color: 'var(--fg)' }}>
                Contact Our Events Team
              </p>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--accent-red)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
                (702) 609-3390
              </p>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--muted)' }}>
                events@bootleggerlasvegas.com
              </p>
            </div>
          </div>
        );

      case 'Awards':
        return (
          <div>
            <h2 style={sectionTitleStyles}>
              Awards & <span style={sectionTitleAccent}>Recognitions</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              {[
                { text: 'Wedding Industry Visionary Award — 2023', cat: 'Industry' },
                { text: 'WCCNV Entertainment Venue Award — 2023', cat: 'Venue' },
                { text: 'Restaurant Guru — Best Food Delivery In Las Vegas — 2020', cat: 'Food' },
                { text: 'Food Network "Vegas Cakes" — 2018', cat: 'Television' },
                { text: 'Anthony Bourdain\'s Parts Unknown — CNN — 2014', cat: 'Television' },
                { text: 'Playboy\'s Guide — "Best Bar in Vegas" — 2011', cat: 'Nightlife' },
                { text: 'Trip Advisor Certificate of Excellence — 2013', cat: 'Hospitality' },
                { text: 'International Chef\'s Hall of Fame — Presidents Award — 2013', cat: 'Culinary' },
              ].map((award, i) => (
                <div key={i} className="card" style={{
                  fontSize: 'var(--text-small)',
                  lineHeight: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-md)',
                }}>
                  <span style={{
                    fontSize: '0.55rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--accent-red)',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                  }}>
                    {award.cat}
                  </span>
                  <span style={{ color: 'var(--fg)' }}>{award.text}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'About':
        return (
          <div>
            <h2 style={sectionTitleStyles}>
              About <span style={sectionTitleAccent}>The Bootlegger</span>
            </h2>

            {/* Synopsis */}
            <div className="card" style={{
              marginBottom: 'var(--space-xl)',
              background: 'linear-gradient(135deg, var(--surface-warm), var(--surface))',
              border: '1px solid var(--border)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)',
                marginBottom: 'var(--space-md)', lineHeight: 1.4, color: 'var(--fg)',
              }}>
                A Fourth-Generation Las Vegas Landmark
              </p>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 'var(--space-sm)' }}>
                The Bootlegger Italian Bistro has been a South Strip staple since 1949, serving authentic Italian cuisine four generations strong. Founded by Luigi and Maria Zoia — a bootlegger and his bride — the restaurant has welcomed everyone from Frank Sinatra and Dean Martin to Anthony Bourdain and generations of Las Vegas locals.
              </p>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.7 }}>
                Today, under the Mancuso family, The Bootlegger continues its tradition of old-school Italian hospitality, live music nightly in The Copa Room, and the warm, classy atmosphere that has made it "The Place Where Locals & Celebrities Gather."
              </p>
            </div>

            {/* Location & Hours grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-xl)',
            }}>
              {/* Location */}
              <div className="card" style={{
                borderLeft: '3px solid var(--accent-red)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-sm)', color: 'var(--fg)' }}>
                  Location
                </h3>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 'var(--space-xs)' }}>
                  7700 Las Vegas Blvd S<br />
                  Las Vegas, NV 89123
                </p>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--accent-gold)', fontStyle: 'italic' }}>
                  Located on the South Strip, 5 minutes from the "Welcome to Fabulous Las Vegas Sign"
                </p>
              </div>

              {/* Hours */}
              <div className="card" style={{
                borderLeft: '3px solid var(--accent-gold)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-sm)', color: 'var(--fg)' }}>
                  Open Daily
                </h3>
                <div style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500, color: 'var(--fg)' }}>Sun – Thur</span>
                    <span>11am – 10pm (Kitchen) 11pm (Bar)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontWeight: 500, color: 'var(--fg)' }}>Fri – Sat</span>
                    <span>11am – 12am (Kitchen) 1am (Bar)</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="card" style={{
                borderLeft: '3px solid var(--accent-wine)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-sm)', color: 'var(--fg)' }}>
                  Contact
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)' }}>Reservations</span>
                    <a href="tel:+17027364939" style={{
                      fontFamily: 'var(--font-display)', fontSize: '1rem',
                      color: 'var(--accent-red)', textDecoration: 'none', fontWeight: 600,
                    }}>(702) 736-4939</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)' }}>Take Out</span>
                    <a href="tel:+17027367080" style={{
                      fontFamily: 'var(--font-display)', fontSize: '1rem',
                      color: 'var(--accent-red)', textDecoration: 'none', fontWeight: 600,
                    }}>(702) 736-7080</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
                    <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', flexShrink: 0 }}>Events</span>
                    <a href="mailto:events@bootleggerlasvegas.com" style={{
                      fontSize: 'var(--text-small)',
                      color: 'var(--accent-gold)', textDecoration: 'none',
                      overflowWrap: 'break-word', wordBreak: 'break-all',
                      textAlign: 'right', marginLeft: 'var(--space-sm)',
                    }}>events@bootleggerlasvegas.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-xl)',
              background: 'var(--gradient-dark-diag)',
              borderRadius: 'var(--radius-lg)',
              color: '#fff',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-xs)', color: '#fff' }}>
                Follow Us
              </h3>
              <p style={{ fontSize: 'var(--text-small)', color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-lg)' }}>
                The Place Where Locals & Celebrities Gather
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)' }}>
                <a href="https://www.facebook.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'all 0.2s',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Facebook</span>
                </a>
                <a href="https://www.instagram.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'all 0.2s',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@bootleggerlasvegas" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'all 0.2s',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        );

      case 'Shop':
        return <Merchandise />;

      default:
        return null;
    }
  };

  return (
    <div style={mainStyles}>
      {/* Mobile backdrop overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={overlayStyle}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer (fixed overlay) */}
      {isMobile && (
        <div data-drawer style={drawerWrapperStyle(sidebarOpen)}>
          <button
            onClick={() => setSidebarOpen(false)}
            style={drawerCloseBtn}
            aria-label="Close sidebar"
          >×</button>
          <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />
        </div>
      )}

      <div style={contentStyles}>
        <div className="topbar-inner" style={topBarStyles}>
          <div className="topbar-gap" style={topBarLeftStyles}>
            {isMobile && (
              <button
                style={hamBtnStyles}
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <span style={hamLine} />
                <span style={hamLine} />
                <span style={hamLine} />
              </button>
            )}
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--fg)' }}>
              The Bootlegger
            </span>
            <span className="topbar-location" style={{
              fontSize: '0.6rem', color: 'var(--muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              South Strip Las Vegas
            </span>
          </div>
          <div style={topBarCenterStyles}>
            <img
              src="../../build/logo.avif"
              alt="The Bootlegger"
              style={{ height: 48, width: 'auto', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="topbar-gap" style={topBarRightStyles}>
            <span className="topbar-hours" style={{ fontSize: 'var(--text-meta)', color: 'var(--muted)' }}>
              Open Daily · 11am
            </span>
            <button className="btn topbar-shrink-btn" onClick={() => setActiveNav('Parties & Events')} style={{
              background: 'linear-gradient(135deg, var(--accent-red), var(--accent-wine))',
              color: '#fff',
              padding: '8px 22px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
              boxShadow: '0 2px 8px rgba(150, 40, 30, 0.25)',
              cursor: 'pointer',
              border: 'none',
            }}>
              Reserve a Table
            </button>

          </div>
        </div>
        {!isMobile && <TopNav activeNav={activeNav} onNavChange={handleNavChange} />}
        {showBanner && <HeroSection variant="banner" slides={bannerSlides} onCtaClick={bannerCtaClick} />}

        {activeNav === 'Entertainment' ? (
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            {renderContent()}
          </div>
        ) : (
          <div style={sectionOuterStyles}>
            <div style={sectionInnerStyles}>
              {renderContent()}
            </div>
          </div>
        )}

        {/* Persistent site footer — every page */}
        <div style={footerStyle}>
          <div style={footerInnerStyle}>
            {/* Brand — compact row always */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <img src="../../build/logo.avif" alt="The Bootlegger"
                style={{ height: isMobile ? 22 : 28, width: 'auto', filter: 'brightness(1.2) contrast(1.1)' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '0.85rem' : '1.05rem', color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                  The Bootlegger
                </div>
                {!isMobile && (
                  <div style={{ fontSize: '0.6rem', color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Est. 1949
                  </div>
                )}
              </div>
            </div>

            {/* Location + Hours — compact */}
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              <div>7700 Las Vegas Blvd S, Las Vegas, NV 89123</div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Sun&ndash;Thu</span> 11am&ndash;10pm &bull;
                <span style={{ color: 'rgba(255,255,255,0.35)' }}> Fri&ndash;Sat</span> 11am&ndash;12am
              </div>
            </div>

            {/* Social + Phone — compact row */}
            <div style={{ display: 'flex', gap: isMobile ? 4 : 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://www.facebook.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/bootleggerbistrolv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@bootleggerlasvegas" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.65rem', fontWeight: 500, marginLeft: isMobile ? 0 : 4 }}>
                (702) 736-4939
              </span>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            paddingTop: 6,
            marginTop: isMobile ? 4 : 8,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.55rem',
            color: 'rgba(255,255,255,0.25)',
            maxWidth: 960,
            margin: isMobile ? '4px auto 0' : '8px auto 0',
          }}>
            The Place Where Locals &amp; Celebrities Gather &bull; Since 1949 &bull; South Strip &middot; Las Vegas
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { App, entertainmentSchedule, all: true });
