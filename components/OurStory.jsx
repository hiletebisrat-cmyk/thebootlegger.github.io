const { useEffect } = React;

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
  useEffect(() => { setMounted(true); }, []);

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
        minHeight: 'clamp(340px, 50vh, 560px)',
        background: 'linear-gradient(160deg, oklch(42% 0.18 28) 0%, oklch(12% 0.008 255) 50%, oklch(8% 0.006 260) 100%)',
        marginBottom: 'var(--space-xl)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(215, 160, 60, 0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        }}>
          <img src="../../build/logo.avif" alt="The Bootlegger" style={{
            width: 'clamp(70px, 12vw, 100px)', height: 'auto',
            marginBottom: 'var(--space-sm)',
            filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
          }} />
          <div style={{
            width: 'clamp(40px, 8vw, 60px)', height: '2px',
            background: 'var(--accent-gold)',
            marginBottom: 'var(--space-md)',
            borderRadius: '1px',
          }} />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#fff',
            marginBottom: 'var(--space-md)',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            maxWidth: '700px',
          }}>
            The Place Where Locals & Celebrities Gather
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-lg)',
            maxWidth: '580px',
          }}>
            From Howard Hughes and Frank Sinatra to today's Las Vegas headliners — Chef Maria's original recipes have made The Bootlegger a Las Vegas landmark on the South Strip since 2001.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
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
        gap: 'var(--space-md)',
        marginBottom: 'var(--space-xl)',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h3)',
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
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-xl)',
              padding: 'var(--space-lg)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}>
              {/* Year badge */}
              <div style={{
                position: 'absolute',
                top: '-1px',
                [isLeft ? 'left' : 'right']: 'var(--space-lg)',
                background: 'var(--accent-red)',
                color: '#fff',
                padding: '4px 16px',
                borderRadius: '0 var(--radius-sm) 0 var(--radius-sm)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-display)',
              }}>
                {entry.year}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: entry.photo ? (isLeft ? 'row' : 'row-reverse') : 'column',
                gap: 'var(--space-lg)',
                alignItems: entry.photo ? 'flex-start' : 'stretch',
                marginTop: 'var(--space-md)',
              }}>
                {entry.photo && (
                  <div style={{
                    flex: '0 0 clamp(200px, 30%, 300px)',
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
          background: 'linear-gradient(135deg, oklch(12% 0.005 255), oklch(8% 0.005 260))',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-xl) var(--space-lg)',
          textAlign: 'center',
          marginTop: 'var(--space-xl)',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 'var(--space-md)',
            lineHeight: 1.2,
          }}>
            Continuing a Family Tradition Since 1949
          </p>
          <p style={{
            fontSize: 'var(--text-body)',
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
            gap: 'var(--space-xl)',
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
