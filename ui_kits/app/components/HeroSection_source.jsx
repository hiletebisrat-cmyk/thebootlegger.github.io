const { useState, useEffect, useRef, useCallback } = React;

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
    'linear-gradient(160deg, oklch(48% 0.18 30) 0%, oklch(40% 0.14 260) 50%, oklch(32% 0.10 250) 100%)',
    'linear-gradient(160deg, oklch(32% 0.10 250) 0%, oklch(48% 0.18 30) 50%, oklch(40% 0.12 40) 100%)',
    'linear-gradient(160deg, oklch(58% 0.15 70) 0%, oklch(42% 0.18 28) 50%, oklch(34% 0.10 250) 100%)',
  ];

  const background = slide.image
    ? `linear-gradient(rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%), url(${slide.image}) center/cover`
    : themeBackgrounds[current % 3];

  const padX = isBanner
    ? 'clamp(1.25rem, 4vw, 3rem)'
    : 'clamp(1.25rem, 4vw, 3rem)';
  const padY = isBanner
    ? 'clamp(1rem, 3vw, 2.5rem)'
    : 'clamp(1.25rem, 4vw, 3rem)';

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
    borderRadius: '1px',
    flexShrink: 0,
  };

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
    borderRadius: 5,
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
    width: isBanner ? 52 : 'clamp(36px, 8vw, 44px)',
    height: isBanner ? 52 : 'clamp(36px, 8vw, 44px)',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: isBanner ? 26 : 'clamp(18px, 4vw, 22px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isBanner || hovering ? 1 : 0,
    transition: 'opacity 0.3s ease, background 0.2s',
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
            style={{ ...arrowBase, left: 12 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            aria-label="Previous slide"
          >‹</button>
          <button
            onClick={next}
            style={{ ...arrowBase, right: 12 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
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
