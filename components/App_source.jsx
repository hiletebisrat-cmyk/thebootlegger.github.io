const { useState, useEffect, useCallback } = React;

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
  const showBanner = isDesktop && activeNav === 'Menu';

  const bannerSlides = [
    {
      title: "Reserve Your Table",
      subtitle: "Join us for dinner, live music, and the best Italian on the South Strip. The Copa Room and The Vegas Room are available for your evening.",
      ctaText: "Make a Reservation",
      logo: true,
    },
    {
      title: "Live Music Every Night",
      subtitle: "No Cover — No Minimum. From jazz duos to The Fat City Horns in The Copa Room.",
      ctaText: "See Entertainment",
    },
    {
      title: "A Family Tradition Since 1949",
      subtitle: "Four generations of authentic Italian cooking — The Bootlegger Italian Bistro, Las Vegas.",
      ctaText: "Read Our Story",
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
    display: 'flex',
    justifyContent: 'space-between',
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
    borderRadius: 1,
    transition: 'all 0.3s ease',
  };

  const sectionOuterStyles = {
    padding: 'var(--space-2xl) var(--space-lg)',
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
  };

  const footerStyle = {
    background: 'linear-gradient(180deg, oklch(12% 0.005 255) 0%, oklch(8% 0.005 260) 100%)',
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
            background: 'linear-gradient(180deg, oklch(12% 0.005 255) 0%, oklch(8% 0.005 260) 50%, oklch(5% 0.003 260) 100%)',
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
                borderRadius: '999px',
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
                <p style={{ fontSize: 'var(--text-meta)', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>GRAND · SPECTACULAR</p>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>Accommodates 50–180 guests. Live music stage, full bar, dance floor — the quintessential Vegas venue.</p>
                <span className="badge badge-gold" style={{ marginBottom: 'var(--space-md)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>50–180 Guests</span>
                <a href="#" className="btn" style={{
                  background: 'linear-gradient(135deg, var(--accent-gold), oklch(62% 0.14 70))',
                  color: 'var(--fg)', width: '100%', fontWeight: 600,
                }}>Book Event</a>
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
              background: 'linear-gradient(135deg, oklch(12% 0.005 255), oklch(8% 0.005 260))',
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
            <img
              src="../../build/logo.avif"
              alt="The Bootlegger"
              style={{ height: 28, width: 'auto', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
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

Object.assign(window, { App, entertainmentSchedule });
