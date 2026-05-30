# The Bootlegger Italian Bistro Design System

## Product Context

**Source product:** The Bootlegger Italian Bistro is a landmark Italian-American restaurant at 7700 Las Vegas Blvd S on the South Strip, five minutes from the "Welcome to Fabulous Las Vegas" sign. It has operated as a family-owned establishment since 1949 — now in its fourth generation of Mancuso family ownership and management. The restaurant traces its roots to Luigi and Maria Zoia who immigrated from Padua, Italy to Canada in the early 1900s. During Prohibition, Luigi served homemade wine from the family boarding house, earning the nickname "The Bootlegger." The family moved to Las Vegas in 1943, opened their first Italian restaurant in 1949, and the current Bootlegger Italian Bistro opened on the South Strip in 2001. Today it is run by the fourth generation including Lorraine Hunt-Bono (former Nevada Lt. Governor), Ron Mancuso, and Roman Mancuso.

**Primary surfaces:**
- **Brand website** — Menu, Our Story, Entertainment (live music nightly), Awards, Parties & Events (The Vegas Room, The Copa Room), Gift Cards, Shop (merchandise) — captured from bootleggerlasvegas.com
- **Reservation system** — Online booking via OpenTable integration with date/time/guest selection, availability confirmation
- **Live entertainment calendar** — Music every night (jazz duos, piano vocals, harpist, Santa Fe & The Fat City Horns on Mondays) with "NO COVER — NO MINIMUM" policy
- **Event venue booking** — The Vegas Room (up to 50 seated guests) and The Copa Room (50–180 guests) with multimedia equipment, catering, and private bartending
- **Merchandise store** — Branded t-shirts, hoodies, tumblers, pint glasses, stickers, and tote bags
- **Marketing and awards** — Anthony Bourdain's Parts Unknown (CNN), Food Network "Vegas Cakes", BuzzFeed, Trip Advisor Certificate of Excellence, Playboy "Best Bar in Vegas"

**Core capabilities this design system supports:**
- Menu and pricing display with dietary badges (GF, V, Spicy) and Italian/English bilingual naming
- Live entertainment schedule tables with day/act/time columns and special event highlighting
- Reservation booking flows with date picker, time slots, guest count, and confirmation states
- Event venue showcase cards with capacity, amenities, and booking CTAs
- Brand marketing materials (social cards, ads, signage, slide decks) with consistent color/typography
- Merchandise shop interfaces with product grid, pricing, and add-to-cart patterns
- Responsive web, mobile, and fixed-canvas (social media, slide presentation) surfaces

**Evidence source:** bootleggerlasvegas.com website captures (7 PDFs), logo asset (assets_bootl.avif). See `context/source-context.md` for full provenance.

**Design brief:** "Make this place look modern while keeping its old school vibe. Keep it classy."

---

## Package Contents

```
.
├── DESIGN.md                     ← Canonical design rules (color, type, components, voice)
├── README.md                     ← This file
├── SKILL.md                      ← Agent-usable skill entry with YAML frontmatter
├── colors_and_type.css           ← Reusable CSS tokens and component classes
│
├── build/                        ← Runtime brand assets (byte-for-byte from source)
│   ├── logo.avif                 ← Primary brand logo
│   └── icon.avif                 ← Icon variant
│
├── assets/                       ← Source evidence (read-only reference)
│   ├── assets_bootl.avif         ← Original logo asset
│   └── assets_PDF*.pdf           ← 7 brand/marketing PDFs
│
├── preview/                      ← Reviewable HTML cards (one per visual dimension)
│   ├── colors-primary.html       ← Brand palette + state color swatches
│   ├── colors-theme-dark.html    ← Alternative dark theme palette
│   ├── typography-specimens.html ← Font stacks + type scale specimens
│   ├── spacing-tokens.html       ← Spacing scale + radii + shadows
│   ├── brand-assets.html         ← Logo display + build asset inventory
│   └── components-buttons.html   ← Buttons, badges, cards, nav links, inputs
│
├── ui_kits/app/                  ← Applied React restaurant interface
│   ├── index.html                ← Runnable entry (React 18 + Babel)
│   ├── README.md                 ← Kit structure and usage guide
│   └── components/               ← 7 modular JSX components
│       ├── App.jsx               ← Shell with sidebar + top bar + content router
│       ├── Sidebar.jsx           ← Dark navy nav with restaurant info
│       ├── HeroSection.jsx       ← Gradient hero with CTA
│       ├── MenuList.jsx          ← Sample food menu with category filter
│       ├── MenuItem.jsx          ← Menu item card (name, desc, price, dietary)
│       ├── EntertainmentCard.jsx ← Live music schedule rows
│       └── BookingBar.jsx        ← Interactive reservation form
│
├── context/
│   └── source-context.md         ← Source evidence and provenance notes
│
└── source_examples/              ← (Empty — no source code repositories were linked)
```

---

## Preview Manifest

| Card | Path | What to inspect there | Source-backed dimensions demonstrated |
|---|---|---|---|
| Colors (Primary) | `preview/colors-primary.html` | Brand palette in OKLch with hex swatches, semantic token roles, state colors (success, warning, error, info), WCAG AA contrast verification table | Color tokens derived from brand evidence (wine from Italian heritage, gold from speakeasy lighting, navy from Rat Pack sophistication) |
| Colors (Dark Theme) | `preview/colors-theme-dark.html` | Alternative dark palette for evening/ambient UI, demo card showing dark background with gold accents, semantic token mapping with light palette equivalents | Dark surfaces use navy-derived backgrounds for warmth (not pure black), suitable for entertainment schedule and cocktail menu interfaces |
| Typography | `preview/typography-specimens.html` | Playfair Display + Inter font specimens, full type scale from `--text-hero` through `--text-meta`, paragraph rendering with max-width, menu pricing layout demonstrating `font-variant-numeric: tabular-nums` | Font pairing directly serves old-school/modern tension; pricing display verified against captured menu PDF patterns |
| Spacing | `preview/spacing-tokens.html` | Spacing scale visualized as stacked boxes (4px–64px), border radius demos (4px–9999px), shadow cards with warm and standard variants, responsive grid demonstration | 4px base spacing scale calibrated for restaurant UI readability; warm shadows (`--shadow-warm`) tinted for cream backgrounds |
| Brand Assets | `preview/brand-assets.html` | `build/logo.avif` rendered in `<img>`, full build directory inventory listing each file with size and format, provenance credits explaining source-to-build preservation | Logo preserved byte-for-byte from `assets_bootl.avif`; demonstrates runtime asset loading pattern for future artifacts |
| Components | `preview/components-buttons.html` | All 5 button variants (wine, gold, ghost, outline, danger) with hover and active states, badges (success/warning/error/info) with tinted backgrounds, menu card layout, event card layout, testimonial card, navigation link states, form inputs with focus rings | Every component maps to real Bootlegger surface: menu cards from Menu PDF, event cards from Parties & Events PDF, entertainment badges from Entertainment PDF |

---

## Reuse Workflow

1. **Load tokens** — Add `<link rel="stylesheet" href="colors_and_type.css">` in your `<head>` to bind all design tokens (`--accent-wine`, `--accent-gold`, `--accent-navy`, type scale, spacing tokens) and component classes (`.btn-primary`, `.btn-gold`, `.card`, `.badge`, `.nav-link`, `.schedule-table`, `.menu-item`).
2. **Read DESIGN.md** for component rules, spacing guidance, and anti-patterns before writing any layout code.
3. **Verify visuals via preview cards** — Open each `preview/` HTML card to confirm color, typography, spacing, brand assets, and component choices match the brief.
4. **Reference the applied UI kit** — For restaurant app prototypes, inspect `ui_kits/app/index.html` and its component files — especially `BookingBar.jsx` for form patterns, `EntertainmentCard.jsx` for schedule layouts, and `MenuItem.jsx` for pricing display.
5. **Use runtime brand assets** — Load `build/logo.avif` for OG images, navigation headers, and hero overlays.
6. **Apply dark theme for evening surfaces** — For entertainment schedule, cocktail menu, or event gallery UI, copy the dark palette from `preview/colors-theme-dark.html` by overriding the CSS custom properties on a dark container.
7. **Final verification** — Confirm wine/gold/navy palette is used, Playfair Display for headings with Inter for body, and zero anti-patterns from DESIGN.md section 9 before emitting.

---

## Typography

Display typography uses **Playfair Display** (Google Fonts), a serif face with Italian old-world elegance and modern sharpness — loaded via `@import` in `colors_and_type.css`. Body typography uses **Inter** (Google Fonts), a clean sans-serif for all prose, menus, navigation, and UI labels. Menu pricing uses Inter with `font-variant-numeric: tabular-nums` for consistent price alignment. JetBrains Mono is available as a fallback in the monospace stack for data displays. No local font files are bundled.

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-hero` | clamp(3rem, 5vw, 5rem) | 700 | 1.1 | Hero headlines, slide titles |
| `--text-h1` | clamp(2rem, 3.5vw, 3.5rem) | 700 | 1.15 | Section headings |
| `--text-h2` | clamp(1.5rem, 2.5vw, 2.5rem) | 600 | 1.2 | Subsection headings |
| `--text-h3` | clamp(1.25rem, 1.8vw, 1.75rem) | 600 | 1.3 | Card titles, menu categories |
| `--text-body` | clamp(1rem, 1.1vw, 1.125rem) | 400 | 1.6 | Body copy |
| `--text-small` | clamp(0.875rem, 0.9vw, 0.9375rem) | 400 | 1.5 | Labels, captions |
| `--text-meta` | 0.75rem | 400 | 1.4 | Metadata, prices, footnotes |
| `--text-button` | 0.9375rem | 500 | 1 | Button labels |

---

## Color Token Summary

| Token | OKLch | Role |
|---|---|---|
| `--bg` | oklch(97.5% 0.012 60) | Warm cream page background |
| `--surface` | oklch(100% 0 0) | Clean white content surface |
| `--surface-warm` | oklch(96% 0.015 55) | Warm off-white alt surface |
| `--fg` | oklch(15% 0.025 30) | Near-black body text |
| `--muted` | oklch(48% 0.03 40) | Warm grey secondary text |
| `--border` | oklch(88% 0.02 50) | Warm border edges |
| `--accent-wine` | oklch(42% 0.18 28) | Burgundy — primary brand color |
| `--accent-gold` | oklch(68% 0.14 70) | Amber gold — speakeasy lighting accent |
| `--accent-navy` | oklch(38% 0.10 250) | Deep navy for dark chrome |
| `--accent-olive` | oklch(45% 0.10 120) | Muted olive — Italian countryside accent |
| `--state-success` | oklch(55% 0.14 145) | Green for available/confirmed states |
| `--state-warning` | oklch(65% 0.14 85) | Amber for limited/waitlist states |
| `--state-error` | oklch(50% 0.18 28) | Red for unavailable/error states |
| `--state-info` | oklch(55% 0.12 240) | Blue for information states |

---

## Design Principles

**Old-school warmth, modern execution.** The palette and typography contrast — Playfair Display serif for headlines, Inter sans-serif for body — embodies the exact "old school vibe, modern look" tension the brief requested. Neither side dominates.

**Classy, not kitschy.** No Italian restaurant clichés (checkered tablecloths, gondola imagery, comic typefaces). The wine/gold/navy palette is restrained and sophisticated, drawing from prohibition-era speakeasy lighting and Rat Pack-era glamour rather than Tuscan villa tropes.

**One decisive flourish per page.** Gold accent is used sparingly as the highlight color — never flooding every element.

**Story-driven identity.** Every design decision connects back to the family's 73-year Las Vegas legacy, the bootlegger origin story, and the "Place Where Locals & Celebrities Gather" brand position.

---

## Credits

Design system generated from The Bootlegger Bistro brand evidence (bootleggerlasvegas.com, 7 source PDFs, logo asset). Color palette derived from Italian restaurant heritage, prohibition-era speakeasy lighting, and Old Vegas entertainment culture. All product names, logos, and brand references are the property of The Bootlegger Bistro and the Mancuso family.
