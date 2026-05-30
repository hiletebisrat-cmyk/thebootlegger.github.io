const { useState } = React;

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
