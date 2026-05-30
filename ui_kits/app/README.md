# The Bootlegger Italian Bistro — App UI Kit

A runnable React 18 restaurant interface kit that models the actual surfaces of The Bootlegger Italian Bistro. This kit is both a reference implementation of the design system (consuming `colors_and_type.css` tokens) and a reusable template for generating new Bootlegger artifacts.

## Structure

```
ui_kits/app/
├── index.html              ← Runnable entry: loads React 18, Babel, colors_and_type.css, all 8 components, mounts <App />
├── README.md               ← This file
└── components/
    ├── App.jsx             ← App shell: topBar + TopNav + 7-section content router + persistent footer (window.App)
    ├── TopNav.jsx          ← Desktop horizontal top navigation bar with SVG icons and red active underline (window.TopNav)
    ├── Sidebar.jsx         ← Mobile drawer sidebar with real brand logo (build/logo.avif), SVG nav icons, gold/red accents, social links, since-1949 footer (window.Sidebar)
    ├── HeroSection.jsx     ← Full-bleed red/wine gradient hero with gold bar divider and optional logo overlay (window.HeroSection)
    ├── MenuList.jsx        ← Category-filtered food menu with pill buttons and 36 sample items (window.MenuList)
    ├── MenuItem.jsx        ← Menu item card: name, category tag, description, price in accent-red, dietary badges (window.MenuItem)
    ├── EntertainmentCard.jsx ← Weekly schedule row with day, act, time; highlight row in gold (window.EntertainmentCard)
    ├── BookingBar.jsx      ← Interactive reservation form: date, time, guest stepper (± buttons), confirmation animation (window.BookingBar)
    └── OurStory.jsx        ← Full 18-entry family timeline with historical photos, hidden until CTA click (window.OurStory)
```

`index.html` loads `../../colors_and_type.css` for design tokens, imports React 18 + ReactDOM + Babel standalone via unpkg CDN, loads all 9 component scripts from `components/`, then renders `<App />` into `#root`. Each component exposes itself as a `window` global (e.g. `window.Sidebar`, `window.App`) for Babel interop across script boundaries.

## Components/App.jsx
The application shell. On desktop (`>= 768px`), renders a horizontal `TopNav` below the top bar and hides the sidebar. On mobile, the sidebar collapses into a slide-in drawer triggered by a hamburger button. The scrollable content area renders one of 7 sections based on active nav state. A persistent dark navy footer appears below every page with brand logo, address, hours, phone, and social media links (Facebook, Instagram, TikTok). The top bar displays a small brand logo, restaurant name in Playfair Display, "South Strip Las Vegas" location tag (hidden on < 768px), open hours (hidden on < 500px), and a "Reserve a Table" button with red/wine gradient. The `navItems` array maps to 7 sections (Menu, Our Story, Entertainment, Awards, About, Parties & Events, Shop) via a content router switch. Exposed as `window.App`.

### Content sections

- **Menu** — `MenuList` with category-filtered 36-item menu + `HeroSection` reservation CTA. Desktop shows full-width banner above menu.
- **Entertainment** — Full-width dark navy show-poster wall with 8-row weekly schedule, "NO COVER · NO MINIMUM" callout, gold-highlighted Monday Santa Fe show
- **Our Story** — Full 18-entry family timeline from 1900s–2019 with 11 historical photos, gold year badges, alternating photo/text layout, legacy footer
- **Parties & Events** — Dinner reservations card with phone numbers, two venue cards (The Vegas Room up to 50, The Copa Room 50–180) with gradient top bars and event contact
- **Awards** — 8 award cards across 4 categories with red category labels
- **About** — Synopsis card, 3-card location/hours/contact grid with exact hours and clickable phone numbers, dark social media section
- **Shop** — `Merchandise.jsx` renders 9 product cards using real JPG photos from `assets/merch/` with brand logo overlay, filterable by drinkware/apparel/accessories, hover zoom effect
- **Persistent footer** — Dark navy footer on every page: brand logo, address (7700 Las Vegas Blvd S), hours, phone, social media icons (Facebook, Instagram, TikTok)

## Components/TopNav.jsx
Desktop horizontal navigation bar rendered below the top bar on viewports ≥ 768px. Uses the same `navItems` array as `Sidebar.jsx` with matching SVG icon set, but styled horizontally with red bottom-border active indicator on a dark navy gradient background. Items are spaced inline with `white-space: nowrap` and horizontal scroll when needed. Auto-hidden on mobile — the sidebar drawer replaces it. Exposed as `window.TopNav`.

## Components/Sidebar.jsx
Mobile drawer navigation panel (260px). Displays the real Bootlegger brand logo from `../../build/logo.avif` with a golden divider and "Since 1949" tag. Navigation uses 6 inline SVG icons (menu, book, music note, star, people, shopping bag) instead of emoji. Active state highlighted with `--accent-red` left border and red-tinted background. Footer shows address, phone in gold, and "South Strip · Open Daily 11am". Hidden on desktop (TopNav replaces it). Exposed as `window.Sidebar`.

## Components/HeroSection.jsx
Full-bleed hero with a red-to-wine-to-navy gradient background, warm radial overlays, a gold accent bar, and optional brand logo display. Used in Menu (reservation CTA) and Our Story (brand tagline with logo). CTA button uses gold with arrow icon. Exposed as `window.HeroSection`.

## Components/MenuList.jsx
Category-filtered food menu with a 9-item sample data set derived from the captured Menu PDF evidence. Renders a header with "Our Menu" title (Playfair Display, "Menu" in red), a row of pill-shaped filter buttons (All, Appetizers, Pasta, Entrees, Pizza, Desserts) with red active state, and a filtered list of `MenuItem` components. Category filter state managed via `useState`. Exposed as `window.MenuList`.

## Components/MenuItem.jsx
Individual menu item card with no bottom border on the last item. Displays the dish name in Playfair Display, a colored category tag (Appetizers, Pasta, etc.) in red with uppercase lettering, an English description in Inter body text, dietary badges (Gluten-Free in olive, Vegetarian in green, Shellfish in gold), and the price right-aligned in `--accent-red` with tabular numerals. Subtle red-tinted hover background. Exposed as `window.MenuItem`.

## Components/EntertainmentCard.jsx
Weekly entertainment schedule row in a 3-column grid layout (100px day, 1fr act, 120px time). Displays day in Playfair Display red with "Night" sub-label, artist/act name, description, and time. The Monday Santa Fe & The Fat City Horns show uses a gold-tinted gradient background with gold-colored time text. Hover state adds a red-tinted background to non-highlighted rows. Exposed as `window.EntertainmentCard`.

## Components/OurStory.jsx
Self-contained story page that renders a brand hero with "The Place Where Locals & Celebrities Gather" headline, logo, and a gold "Read Our Story" CTA button. Clicking the button reveals the full 18-entry historical timeline — from Luigi and Maria Zoia's migration in the early 1900s through Mama Maria's passing in 2019. Each timeline entry includes the year in a gold badge, a title, a detailed description, and (when available) a historical photo from the project's preserved photo archive. Timeline entries alternate photo placement (left/right) for visual rhythm. The section concludes with a dark navy legacy footer displaying 4 brand stats (7700 Las Vegas Blvd S, 4 Generations, 73+ Years, 102 Years). Timeline content starts hidden and scrolls into view on CTA click. Exposed as `window.OurStory`.

## Components/BookingBar.jsx
Interactive reservation booking form with header icon and "The Copa Room · The Vegas Room" sub-header. Contains:
- Date picker (HTML date input with `min` set to today)
- Time selector (5:00 PM – 9:00 PM in 30-minute increments, styled select)
- Guest count with ± stepper buttons (1–20 range with wine-colored controls)
- "Reserve a Table" submit button with red-to-wine gradient; changes to green "✓ Reserved!" on success
- Animated confirmation panel that slides in with date/time/guest details, auto-hides after 3.5 seconds
Exposed as `window.BookingBar`.

## Usage Workflow

1. **Open `index.html`** in any modern browser to launch the full restaurant interface with the dark-framed app window.
2. **Navigate sections** — On desktop, click any of the 6 horizontal top nav links. The active section is highlighted with a red bottom underline and red-tinted background. On mobile, open the hamburger menu and select from the slide-in drawer.
3. **Browse the menu** — 9 sample items across 5 categories with dietary filter pills. Prices show in `--accent-red` with tabular numerals.
4. **Make a reservation** — Use the date/time pickers and guest stepper, then click "Reserve a Table." The red gradient button confirms with an animated green panel showing reservation details.
5. **Browse entertainment** — The schedule renders each weeknight with the Monday Santa Fe & The Fat City Horns show highlighted in gold.
6. **View venues** — The Vegas Room (up to 50) and The Copa Room (50–180) with inquiry/booking CTAs.

## Design Notes

All components consume CSS custom properties from `../../colors_and_type.css`, ensuring visual consistency with the broader design system:

- **Real brand logo** — `Sidebar.jsx` and `App.jsx` both load `../../build/logo.avif` as the canonical brand mark instead of text-only or emoji placeholders
- **SVG icon system** — Navigation icons are rendered as inline Feather-style SVGs rather than generic emoji, matching the "classy" brief
- **Red as mainstay** (`--accent-red`) — Replaces wine as the dominant accent for navigation active states, category tags, price display, entertainment day labels, and button gradients. Wine (`--accent-wine`) remains for secondary surfaces (venue cards, secondary buttons)
- **Gold restraint** (`--accent-gold`) — Follows the "one decisive flourish" principle: gold appears only on the sidebar decorative divider, entertainment highlight rows, the "NO COVER · NO MINIMUM" callout, and the venue "Book Event" CTA
- **Gradient credibility** — CTAs use subtle red/wine gradients (never purple/violet) to feel rich without veering into AI-slop territory
- **Typography contrast** — Playfair Display serif for headings and menu items, Inter sans-serif for body and UI — creates the required old-school/modern tension
- **Guest stepper** — The ± button pattern in the booking form feels more tactile than a raw number input
- **Category filter pills** — Rounded pill buttons with red active state make the menu scannable without requiring page reload
- **Self-contained components** — Each `.jsx` file uses inline styles (via React `style` objects) for portability; no external CSS dependencies beyond the token system
- **No generic demo content** — All component text (menu items, entertainment schedule, brand copy) is derived from real Bootlegger Bistro evidence

## Reuse Guide

Future agents should use this kit as both a pattern reference and a template for generating new Bootlegger artifacts:

- **Extend navigation** — `App.jsx` has a `navItems` array and a content router switch. Add new sections (Gift Cards, Gallery, Wine List) by appending entries and render cases.
- **Replicate menu items** — `MenuItem.jsx` accepts `name`, `desc`, `price`, and `badges` props. Reuse for appetizers, pizza, desserts, wine list categories.
- **Extend booking** — `BookingBar.jsx` can be extended with venue selection (The Vegas Room vs The Copa Room) and party size categories for event inquiries.
- **Adapt for mobile** — The sidebar collapses to a hamburger drawer pattern using responsive breakpoints from DESIGN.md section 5. The component structure supports this without refactoring.
- **Dark theme** — For evening/ambient surfaces, reference `../../preview/colors-theme-dark.html` and swap `--accent-navy` with dark palette tokens.
- **Copy individual components** — Each `.jsx` file is standalone and can be dropped into new projects with minimal modification. Components load tokens via `colors_and_type.css` — copy that file alongside.
- **Preserve component globals** — When adding new `.jsx` components, expose each as `window.ComponentName` before the final render script to ensure Babel interop across script boundaries.

## Source Basis

All component content is derived from specific evidence in the design system package:

| Component | Evidence Source | Specific Content Derived |
|---|---|---|---|
| `TopNav.jsx` | Website PDF + Sidebar.jsx pattern | Same 6-section nav, SVG icon set, navItems array reused from sidebar |
| `Sidebar.jsx` | Website PDF + build/logo.avif | 6-section navigation, address/hours/phone, brand logo |
| `HeroSection.jsx` | Website PDF | "The Place Where Locals & Celebrities Gather" tagline |
| `MenuList.jsx` + `MenuItem.jsx` | Menu PDF evidence | 9 sample dishes across 5 categories, Italian/English naming, pricing with dietary badges |
| `EntertainmentCard.jsx` | Entertainment PDF | Weekly lineup: Singer & Sachs, Doug Taylor, Mariano Gonzalez, Santa Fe & The Fat City Horns; "NO COVER · NO MINIMUM" policy |
| `BookingBar.jsx` | Website PDF | Date/time/guest flow with confirmation state and venue references |
| `OurStory.jsx` | Our Story PDF + 16 historical photos | Full 18-entry timeline: Luigi/Maria Zoia, prohibition, 1943 move to Vegas, Venetian Restaurant, The Bootlegger, Lorraine's political career, 4 generations, Mama Maria's 100th, legacy footer |
| `App.jsx` | Website PDF | Page structure, section mapping, content hierarchy |

See `../../DESIGN.md` for the full design system rulebook and `../../README.md` for the package overview. See `../../context/source-context.md` for complete evidence provenance.
