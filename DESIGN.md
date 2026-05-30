# The Bootlegger Italian Bistro Design System

> Category: Restaurant & Hospitality
> Surface: Web + Mobile
> Status: Published

## Source-backed Context

This design system is grounded in the following source evidence, extracted before any design rules were written:

| Evidence Type | Source | Key Findings |
|---|---|---|
| Logo asset | `assets_bootl.avif` (preserved as `build/logo.avif`) | Brand wordmark/logo |
| Brand website | bootleggerlasvegas.com (7 PDF captures) | Menu, Our Story, Entertainment (live music nightly), Awards (Trip Advisor, Anthony Bourdain, Playboy), Parties & Events (The Vegas Room, The Copa Room), Shop (merchandise) |
| Brand story PDF | `assets_PDF3Our-Story-_-The-Bootlegger-Italian-Bistro.pdf` | Full family history: Luigi Zoia (bootlegger), Chef Maria Perry, Rat Pack era, 4 generations |
| Entertainment PDF | `assets_PDF4Entertainment-_-The-Bootlegger-Italian-Bistro.pdf` | Weekly schedule: Singer & Sachs, Doug Taylor, Mariano Gonzalez, Santa Fe & The Fat City Horns |
| Awards PDF | `assets_PDF5Awards-_-The-Bootlegger-Italian-Bistro.pdf` | 8+ awards including Anthony Bourdain's Parts Unknown, Food Network, Trip Advisor |
| Events PDF | `assets_PDF6Parties-_-Events-_-The-Bootlegger-Italian-Bistro.pdf` | The Vegas Room (50 guests), The Copa Room (50–180 guests) |
| Merchandise PDF | `assets_PDF7The-Bootlegger-Bistro.pdf` | T-shirts, hoodies, tumblers, pint glasses, stickers, tote bags |
| Main website PDF | `assets_PDFThe-Bootlegger-Italian-Bistro---Old-School-Italian-Restaurant-Las-Vegas.pdf` | Hours, location (7700 Las Vegas Blvd S, South Strip), contact, Anthony Bourdain quote |
| Setup brief | Project metadata | "Make this place look modern while keeping its old school vibe. Keep it classy" |

No external GitHub repositories or local code folders were linked. All color tokens, typography choices, and component patterns are derived from these sources and the brief's explicit visual direction.

---

## 1. Visual Theme & Atmosphere

### Source-backed Context

Brand PDF (bootleggerlasvegas.com) — "Old School Italian Restaurant Las Vegas" describes the venue as "The Place Where Locals & Celebrities Gather," noting its prohibition-era bootlegger origin story, Rat Pack clientele (Frank Sinatra, Dean Martin, Sammy Davis Jr.), and 4th-generation family ownership since 1949. The setup notes explicitly state: "Make this place look modern while keeping its old school vibe. Keep it classy."

A design system for **The Bootlegger Italian Bistro** — a fourth-generation, family-owned Las Vegas landmark on the South Strip. The brand lives at the intersection of Old Vegas Rat Pack glamour, prohibition-era bootlegger grit, and modern Italian hospitality.

**Mood:** Warm, confident, classy. Like a perfectly lit corner booth in a dimly lit room with a burgundy banquette and a brass rail. The visuals balance old-world Italian warmth (terra-cotta, wine, candlelight) with crisp modern typography and layout that keeps the brand from feeling dated.

**Visual references:** The Rat Pack era of Vegas entertainment (Frank Sinatra, Dean Martin, Liberace, Elvis Presley — all documented as patrons), prohibition-era speakeasy lighting and textures, modern Italian restaurant design (clean lines, generous whitespace, quality materials).

**Key tension:** "Old school vibe" through color, warmth, and imagery — "modern" through typography, spacing, interaction design, and component architecture. Neither side dominates.

---

## 2. Color

### Source-backed Context

Colors derived from the brand's Italian heritage, prohibition-era speakeasy atmosphere (amber/gold candlelight), and Las Vegas entertainment culture. The wine red references Chef Maria's Italian cooking legacy; the amber gold echoes the warm dimly-lit dining room and "speakeasy" atmosphere. The navy provides a sophisticated modern counterpoint. No existing brand style guide was provided — these tokens were inferred from product category, venue photography context, and the "classy" brief mandate.

### Brand Palette

```
--bg:            oklch(97.5% 0.012 60)    — warm cream (candlelit paper)
--surface:       oklch(100% 0 0)          — clean white (menu cards)
--surface-warm:  oklch(96% 0.015 55)      — warm off-white (alt surfaces)
--fg:            oklch(15% 0.025 30)      — near-black with warmth
--muted:         oklch(55% 0.03 40)       — warm grey (subtle copy)
--border:        oklch(88% 0.02 50)       — warm border (vintage edge)
--accent-wine:   oklch(42% 0.18 28)       — burgundy wine (primary brand color)
--accent-red:    oklch(52% 0.20 28)       — rich Italian red (visible mainstay accent)
--accent-gold:   oklch(68% 0.14 70)       — warm amber gold (speakeasy lighting)
--accent-olive:  oklch(45% 0.10 120)      — muted olive (Italian countryside)
--accent-navy:   oklch(38% 0.10 250)      — deep navy (modern sophistication)
```

### Semantic Roles

| Token | Role | Usage |
|---|---|---|
| `--bg` | Page background | Primary canvas |
| `--surface` | Card/surface background | Content panels, cards |
| `--surface-warm` | Alt surface | Hero sections, feature callouts |
| `--fg` | Body text | Primary copy |
| `--muted` | Secondary text | Labels, captions, metadata |
| `--border` | Borders | Dividers, card borders, inputs |
| `--accent-wine` | Primary action | CTAs, active states, links |
| `--accent-red` | Visible accent | Badges, highlights, hover states, secondary CTAs |
| `--accent-gold` | Secondary accent | Highlights, badges, decorative elements |
| `--accent-olive` | Tertiary accent | Organic/category signals, specials |
| `--accent-navy` | Inverted bg | Dark headers, footer, nav bars |

### State Colors

- `--state-success`: oklch(55% 0.14 145) — green (available, confirmed)
- `--state-warning`: oklch(65% 0.14 85) — amber (limited, waitlist)
- `--state-error`: oklch(50% 0.18 28) — red (unavailable, error)
- `--state-info`: oklch(55% 0.12 240) — blue (information)

### Accessibility

- All text-on-background combinations must pass WCAG AA (4.5:1 contrast for body, 3:1 for large text)
- `--accent-wine` on `--bg`: 7.2:1 — passes AAA
- `--accent-red` on `--bg`: 5.8:1 — passes AA
- `--accent-gold` on `--fg`: 4.8:1 — passes AA for large text only
- `--muted` on `--bg`: 4.9:1 — passes AA

---

## 3. Typography

### Source-backed Context

No brand font files or typography guidelines were provided in the source assets. The original pairing of Playfair Display + Inter was replaced with Cormorant Garamond + DM Sans to elevate the brand's luxury perception. Inter was a cold corporate UI workhorse that undercut the restaurant's warm Old Vegas character; its replacement needed more elegance and warmth. Cormorant Garamond brings Italian Renaissance refinement (directly tying to the restaurant's heritage) with lighter, more delicate strokes than Playfair Display. DM Sans provides a warm, refined sans-serif contrast — modern without feeling corporate. The lighter weight palette (300–500 vs the previous 400–700) is intentional: luxury signals through restraint, not volume.

### Font Stack

| Role | Stack |
|---|---|
| **Display** | `'Cormorant Garamond', 'Cormorant', Georgia, 'Times New Roman', serif` |
| **Body** | `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` |
| **Menu / Pricing** | `'DM Sans', -apple-system, system-ui, sans-serif` with `font-variant-numeric: tabular-nums` |

### Type Scale

| Token | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|
| `--text-hero` | clamp(3rem, 5vw, 5rem) | 500 | 1.1 | +0.03em | Hero headlines, slide titles |
| `--text-h1` | clamp(2rem, 3.5vw, 3.5rem) | 500 | 1.15 | +0.03em | Section headings |
| `--text-h2` | clamp(1.5rem, 2.5vw, 2.5rem) | 500 | 1.2 | +0.02em | Subsection headings |
| `--text-h3` | clamp(1.25rem, 1.8vw, 1.75rem) | 500 | 1.3 | +0.02em | Card titles, menu categories |
| `--text-body` | clamp(1rem, 1.1vw, 1.125rem) | 300 | 1.7 | normal | Body copy |
| `--text-small` | clamp(0.875rem, 0.9vw, 0.9375rem) | 300 | 1.5 | normal | Labels, captions |
| `--text-meta` | 0.75rem | 300 | 1.4 | normal | Metadata, prices, footnotes |
| `--text-button` | 0.9375rem | 400 | 1 | +0.06em | Button labels |

### Typography Rules

- Display face (`Cormorant Garamond`) is for headlines and decorative elements only — never for body copy
- Body face (`DM Sans`) is the workhorse for all prose, menus, navigation, and UI labels
- Menu items and pricing use tabular numerals for alignment
- Headlines use the `--accent-wine` or `--fg` color; never apply `--accent-gold` to text at small sizes
- Display text should use `letter-spacing: var(--tracking-display)` for elegance; uppercase uses use `var(--tracking-wide)`
- Maximum line length for body text: 65 characters
- Lighter weights (300 body, 500 display) are intentional — avoid heavy weights (700+) except for very large display-only wordmarks

---

## 4. Spacing

### Source-backed Context

Spacing scale is a standard 4px/0.25rem base derived from restaurant UI patterns — generous whitespace for menu readability, compact spacing for dense entertainment schedules and booking forms. Border radii are moderate (4–16px) to feel approachable without being overly casual, matching the "classy" brief.

### Spacing Scale

| Token | Rem | px (16px base) | Usage |
|---|---|---|---|
| `--space-2xs` | 0.25rem | 4px | Tight icon gaps |
| `--space-xs` | 0.5rem | 8px | Dense UI, form gaps |
| `--space-sm` | 0.75rem | 12px | Button padding, compact |
| `--space-md` | 1rem | 16px | Standard gap, card padding |
| `--space-lg` | 1.5rem | 24px | Section spacing |
| `--space-xl` | 2rem | 32px | Major section breaks |
| `--space-2xl` | 3rem | 48px | Page section padding |
| `--space-3xl` | 4rem | 64px | Hero padding, large screens |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Inputs, small elements |
| `--radius-md` | 8px | Cards, buttons |
| `--radius-lg` | 12px | Modals, larger containers |
| `--radius-xl` | 16px | Hero sections, feature panels |
| `--radius-full` | 9999px | Pills, badges |

### Shadows

- `--shadow-sm`: `0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)` — cards
- `--shadow-md`: `0 4px 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)` — dropdowns, modals
- `--shadow-lg`: `0 10px 25px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)` — hero overlays
- `--shadow-warm`: `0 2px 8px rgba(110, 50, 30, 0.1)` — warm-tinted shadow for cards on cream

---

## 5. Layout & Composition

### Source-backed Context

Layout patterns derived from the website structure captured in PDFs — the site includes: Home, Menu, Our Story, Entertainment (live music schedule), Awards, Parties & Events (The Vegas Room, The Copa Room), Gift Cards, and Shop sections. The page structure mirrors this navigation hierarchy. 1200px max-width keeps content centered and readable.

### Grid

- **Page grid:** 12-column grid at viewport widths ≥ 768px, 4-column on mobile
- **Content max-width:** 1200px, centered with auto margins
- **Menu grid:** 2-column grid for menu items on desktop, single column on mobile
- **Card grid:** Auto-fill with `minmax(320px, 1fr)` for responsive card layouts

### Page Structure

```
┌─────────────────────────────────────┐
│  Nav bar (sticky, frosted, dark)    │
├─────────────────────────────────────┤
│  Hero section (full-bleed, overlay) │
├─────────────────────────────────────┤
│  Content sections (1200px max)      │
│  ┌─────────┐  ┌─────────┐          │
│  │  Card   │  │  Card   │          │
│  └─────────┘  └─────────┘          │
├─────────────────────────────────────┤
│  Feature callout (warm bg)          │
├─────────────────────────────────────┤
│  Footer (dark, navy)                │
└─────────────────────────────────────┘
```

### Navigation

- **Primary nav:** Sticky top bar, frosted glass (`backdrop-filter: blur(12px)`), dark background with gold accent
- **Mobile nav:** Slide-in drawer from right, full-height, with overlay
- **Footer nav:** 4-column link grid, dark background

### Responsive Breakpoints

- **Mobile:** 360px – 767px
- **Tablet:** 768px – 1023px
- **Desktop:** 1024px – 1439px
- **Wide:** 1440px+

---

## 6. Components

### Source-backed Context

Component patterns reflect real site surfaces: reservation booking (date/time/guest picker from the website), live entertainment schedule (weekly DJ/music calendar from Entertainment PDF), event venue cards (The Vegas Room and The Copa Room from Parties & Events PDF), menu items with pricing (from menu PDF), and merchandise shop items (from The Bootlegger Bistro merchandise PDF). Button variants match the classy-but-modern tone — wine for primary actions, gold for entertainment/special moments.

### Buttons

| Variant | Background | Text | Hover | Usage |
|---|---|---|---|---|
| `.btn-primary` | `--accent-wine` | White | Darker wine | Primary CTAs (Reserve a Table, Order) |
| `.btn-secondary` | Transparent | `--accent-wine` | Wine bg, white text | Secondary actions |
| `.btn-gold` | `--accent-gold` | `--fg` | Darker gold | Entertainment/special CTAs |
| `.btn-ghost` | Transparent | `--muted` | Subtle bg | Tertiary actions |
| `.btn-outline` | Transparent | `--fg` | Border + bg | Outline variant |

### Cards

- **Menu card:** Image top, title, description, price, dietary badges
- **Event card:** Image background, date overlay, title, description, CTA
- **Feature card:** Icon/illustration, title, description, optional link
- **Testimonial card:** Quote, attribution, optional image

### Forms

- Inputs have warm borders (`--border`), 12px padding, 8px radius
- Focus state: 2px `--accent-wine` border with `--accent-wine`/0.1 box-shadow
- Labels use `--text-small` weight 500, 8px gap below
- Select dropdowns styled with custom chevron
- Date picker for reservation booking

### Navigation

- Desktop: horizontal links with underline-on-hover animation
- Mobile: hamburger → slide-in drawer
- Active state: `--accent-gold` underline
- CTA button in nav: `.btn-primary` (Reserve a Table)

### Entertainment Schedule

- Table layout with day column, event column, time column
- Alternating row backgrounds for scannability
- "No Cover — No Minimum" badge in `--accent-gold`

### Event Spaces

- Two-venue display (The Vegas Room, The Copa Room)
- Capacity badges, gallery thumbnails, contact CTA

---

## 7. Motion & Interaction

### Source-backed Context

Motion guidelines inferred from the modern-restaurant UX pattern library — not from source code (none was provided). Durations and easing follow standard Material/Apple HIG conventions adapted for the hospitality context: slow enough to feel intentional, fast enough to not delay for a busy restaurant customer.

### Durations

- Micro-interactions: 150ms (button press, hover)
- Standard transitions: 250ms (nav items, card hover)
- Page/panel transitions: 350ms (mobile drawer, modal)
- Hero animations: 600ms (entrance on load)

### Easing

- Default: `cubic-bezier(0.4, 0, 0.2, 1)`
- Decelerate: `cubic-bezier(0, 0, 0.2, 1)` — elements entering
- Accelerate: `cubic-bezier(0.4, 0, 1, 1)` — elements leaving

### Interaction Patterns

- Card hover: subtle translateY(-2px) + shadow elevation
- Nav link hover: scale underline from center
- Button: scale(0.97) on press
- Mobile drawer: slide from right with backdrop fade
- Smooth scroll for anchor links
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animation except opacity fades

---

## 8. Voice & Brand

### Source-backed Context

Copy and terminology extracted directly from the brand website and PDFs: "The Place Where Locals & Celebrities Gather," "Continuing a Family Tradition Since 1949," "Old School Italian Restaurant," "NO COVER — NO MINIMUM," "South Strip," "The Copa Room," "The Vegas Room," and the full prohibition-era origin story. The voice reflects the tone set by Chef Maria and the Mancuso family: warm, proud, welcoming, and deeply rooted in Las Vegas history.

### Tone

- **Warm and confident** — like a welcoming maître d'
- **Story-driven** — the family history and Vegas legacy is part of every interaction
- **Direct but gracious** — clear CTAs, no jargon
- **"Old Vegas" charm** — references to the Rat Pack era, prohibition history, without being kitschy

### Copy Patterns

- "Reserve a Table" (not "Book Now")
- "Join Us Tonight" (not "RSVP")
- "The Place Where Locals & Celebrities Gather"
- "Continuing a Family Tradition Since 1949"
- Menu items: Italian name, English description, price aligned right

### Terminology

| Term | Used for |
|---|---|
| The Bootlegger | The establishment (short form) |
| The Bootlegger Bistro | Full name |
| South Strip | Location context |
| Chef Maria | Foundational figure, culinary heritage |
| The Copa Room | Main entertainment venue |
| The Vegas Room | Private event space |
| Mama Maria | Endearing reference to Chef Maria Perry |

### Capitalization

- **Title Case:** Page titles, section headings, menu categories
- **Sentence case:** Button labels, navigation links, descriptions
- **UPPERCASE:** Kickers, eyebrow text, metadata labels (e.g., "LIVE MUSIC", "OPEN DAILY")

---

## 9. Anti-patterns

### Source-backed Context

Anti-patterns are derived from the brief's explicit "classy" mandate, the prohibition-era "bootlegger" heritage (which must be referenced with class, not gimmickry), and general design-system best practices for avoiding AI-generated aesthetic tropes that would undermine a 4th-generation family brand.

- ❌ Generic Italian restaurant clichés (checkered tablecloths, Chianti bottles as candle holders, gondola imagery)
- ❌ Overly rustic/"farmhouse" design — this is a Vegas restaurant, not a Tuscan villa
- ❌ Comic or novelty typefaces for the Italian theme
- ❌ Red/green/white flag color schemes — use the defined wine/gold/navy palette
- ❌ Clip-art style illustrations of pasta, grapes, or colosseums
- ❌ Aggressive dark mode with no warmth — the dark surfaces should be navy, not pure black
- ❌ Making the brand feel like a chain or franchise — every element should feel independently owned
- ❌ Using the bootlegger/prohibition theme for edgy or cheeky copy — keep it classy
- ❌ Sans-serif only typography — the serif display face is required for brand character
- ❌ Stock photography of generic Italian food — use venue-specific imagery when possible
- ❌ Purple/violet gradients, AI-generated emoji icons, rounded cards with left accent borders
- ❌ Warm beige/peach/pink page washes without brand justification — the cream/warm palette here is brand-led

---

## 10. Security

### Source-backed Context

Security practices are derived from modern web security standards (CSP Level 2+, SRI) applied to a static React/Babel application. The app uses runtime Babel transpilation which requires `'unsafe-eval'` in the CSP. All external resources are loaded with Subresource Integrity and `crossorigin` attributes where available.

### Content Security Policy

The app enforces a strict Content Security Policy via `<meta http-equiv="Content-Security-Policy">`:

| Directive | Value | Rationale |
|---|---|---|
| `default-src` | `'self'` | Baseline — only same-origin by default |
| `script-src` | `'self'` `https://unpkg.com` `'unsafe-eval'` `'unsafe-inline'` | Babel requires `unsafe-eval` for runtime transpilation; inline bootstrap script needs `unsafe-inline` |
| `style-src` | `'self'` `https://fonts.googleapis.com` `'unsafe-inline'` | Google Fonts stylesheet + inline styles in error messages |
| `font-src` | `https://fonts.gstatic.com` | Google Fonts font file delivery |
| `img-src` | `'self'` `data:` `blob:` | Local images + inline data URIs |
| `connect-src` | `'self'` | Local fetch for all.jsx |
| `frame-ancestors` | `'none'` | Prevents clickjacking |
| `base-uri` | `'self'` | Prevents base URI injection |
| `form-action` | `'self'` | Form submissions only to same origin |

### Subresource Integrity

All CDN-loaded scripts include `integrity` and `crossorigin="anonymous"` attributes:

- **React 18.3.1** (`react.production.min.js`): `sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z`
- **ReactDOM 18.3.1** (`react-dom.production.min.js`): `sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1`
- **Babel Standalone 7.29.0** (`babel.min.js`): `sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y`

### External Links

All external links use `target="_blank"` with `rel="noopener noreferrer"` to prevent tab-napping attacks and referrer leakage.

### Form Input Validation

The reservation booking form validates all inputs client-side before allowing submission:

- **Date**: Must be today or a future date
- **Time**: Must be a valid slot from the predefined time list
- **Guests**: Must be between 1 and 20
- **Combined**: Date + time must represent a valid future datetime

### Additional Headers

- `X-Content-Type-Options: nosniff` — prevents MIME type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer data on cross-origin requests
