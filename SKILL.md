---
name: The Bootlegger Italian Bistro Design System
description: "A warm, classy, old-school-meets-modern design system for The Bootlegger Italian Bistro — a 4th-generation family-owned Las Vegas restaurant on the South Strip."
user-invocable: true
---

# The Bootlegger Italian Bistro — Design System Skill

## What's inside

This package contains 29 files across 6 directories. `DESIGN.md` is the canonical rulebook with visual foundations, color tokens in OKLch, typography (Playfair Display + Inter), spacing scale, component rules (buttons, cards, badges, inputs, nav), motion guidelines, voice and tone, and anti-patterns — each rule section cites its source evidence. `colors_and_type.css` provides reusable CSS custom properties (`--accent-wine`, `--accent-gold`, `--accent-navy`, type scale, spacing tokens) and component classes (`.btn-primary`, `.btn-gold`, `.card`, `.badge`, `.nav-link`) loadable via `<link>` in any project. `build/logo.avif` and `build/icon.avif` are preserved byte-for-byte brand runtime assets. `preview/` has 6 focused HTML cards (colors-primary, colors-theme-dark, typography-specimens, spacing-tokens, brand-assets, components-buttons) for reviewing every visual dimension in isolation. `ui_kits/app/` provides a runnable React restaurant interface with 7 modular JSX components (App, Sidebar, HeroSection, MenuList, MenuItem, EntertainmentCard, BookingBar). `context/source-context.md` captures the full evidence provenance from bootleggerlasvegas.com and 7 source PDFs.

## Source context

The brand story was extracted from bootleggerlasvegas.com website captures and 7 brand PDFs provided at project setup. The original logo asset `assets_bootl.avif` was preserved byte-for-byte as `build/logo.avif` and `build/icon.avif` for runtime use. All design decisions are grounded in real brand evidence:

- **Logo:** `assets_bootl.avif` → `build/logo.avif` (brand wordmark)
- **Website:** `bootleggerlasvegas.com` — 7 PDF captures covering Menu, Our Story, Entertainment, Awards, Parties & Events, Shop
- **Brand story PDF:** 4 generations of family history — Luigi Zoia (bootlegger), Chef Maria Perry, Rat Pack era, modern Vegas
- **Entertainment PDF:** Live music schedule — Singer & Sachs, Doug Taylor, Mariano Gonzalez, Santa Fe & The Fat City Horns
- **Awards PDF:** Anthony Bourdain's Parts Unknown (CNN), Food Network, Trip Advisor, Playboy
- **Events PDF:** The Vegas Room (up to 50 guests) and The Copa Room (50–180 guests) venue details
- **Merchandise PDF:** Branded t-shirts, hoodies, tumblers, pint glasses, stickers, tote bags
- **Main site PDF:** Hours (Mon–Sun 11am–close), location (7700 Las Vegas Blvd S, South Strip), contact, "Old School Italian Restaurant" positioning
- **Setup brief:** "Make this place look modern while keeping its old school vibe. Keep it classy"

The color palette (warm cream background, burgundy wine accent, amber gold secondary, deep navy chrome) was derived from these sources — not guessed from product category. The typography pairing (Playfair Display serif × Inter sans-serif) directly serves the old-school/modern tension the brief requires.

## When to use

Activate this skill when a design brief references The Bootlegger Italian Bistro or requires artifacts for any of the following surfaces:

- **Restaurant website pages** — landing, menu display, Our Story, awards showcase
- **Menu interfaces** — category-organized food/beverage menus with pricing and dietary badges
- **Entertainment schedules** — live music calendar with day/act/time table format
- **Reservation and booking flows** — date/time/guest selection with confirmation states
- **Event venue showcases** — The Vegas Room and The Copa Room cards with capacity and amenities
- **Brand marketing materials** — social media cards, print ads, signage, slide decks
- **Merchandise shop interfaces** — branded apparel and drinkware grid display
- **Hospitality slide decks** — investor presentations, brand storytelling, event brochures

This design system is specific to The Bootlegger Italian Bistro brand and should not be used as a generic restaurant template. Do not apply its wine/gold/navy palette or Playfair Display + Inter pairing to unrelated hospitality brands.

## How to use

1. **Read DESIGN.md first** — Understand the visual theme, color tokens (OKLch), typography rules, spacing scale, component specifications, motion guidelines, voice and tone, and anti-patterns before writing any layout code. Every rule section cites its source evidence so you know why each decision exists.

2. **Load colors_and_type.css** — Add `<link rel="stylesheet" href="colors_and_type.css">` in your project `<head>` to bind all CSS custom properties and component classes (buttons, cards, badges, inputs, nav links, forms, entertainment schedule, menu pricing).

3. **Verify visuals via preview cards** — Open each `preview/` HTML card in a browser before committing to a layout:
   - `preview/colors-primary.html` — Confirm palette swatches and state colors match the brief's mood
   - `preview/colors-theme-dark.html` — Check dark/evening surface alternative
   - `preview/typography-specimens.html` — Verify font stacks and type scale behavior
   - `preview/spacing-tokens.html` — Validate spacing scale and radius choices
   - `preview/brand-assets.html` — Confirm runtime logos load correctly
   - `preview/components-buttons.html` — Inspect button variants, badges, card patterns, nav states, form inputs

4. **Reference the UI kit for component patterns** — For restaurant interface prototypes, open `ui_kits/app/index.html` and inspect the component files:
   - `BookingBar.jsx` — Reservation form with date/time/guest picker and confirmation state
   - `EntertainmentCard.jsx` — Live music schedule with day/act/time table and "NO COVER" badge
   - `MenuItem.jsx` — Menu pricing card with dietary badges and tabular-nums alignment
   - `Sidebar.jsx` — Navigation structure with section links, active state, and brand logo
   - `HeroSection.jsx` — Full-bleed hero with gradient overlay and primary CTA

5. **Use runtime brand assets** — Load `build/logo.avif` for brand identity in headers, OG images, and navigation. Load `build/icon.avif` for favicon and social link previews.

6. **Apply dark theme when appropriate** — For evening/ambient UI surfaces (entertainment schedule, cocktail menu, event gallery), apply the dark palette from `preview/colors-theme-dark.html` by overriding the CSS custom properties on the dark container.

7. **Final verification before emitting** — Confirm:
   - Only the wine/gold/navy palette is used (no invented colors)
   - Playfair Display is used for all headings/display text; Inter for body copy
   - No anti-patterns from DESIGN.md section 9 are present
   - Every color meets WCAG AA contrast minimums (body text 4.5:1, large text 3:1)

## Design system highlights

**Palette grounded in brand evidence, not defaults.** The warm cream background (`--bg: oklch(97.5% 0.012 60)`) echoes candlelit paper in a dimly lit speakeasy. The burgundy wine accent (`--accent-wine: oklch(42% 0.18 28)`) references Chef Maria's Italian cooking heritage. The amber gold (`--accent-gold: oklch(68% 0.14 70)`) captures prohibition-era candlelight and the warm glow of the dining room. The deep navy (`--accent-navy: oklch(38% 0.10 250)`) provides a sophisticated modern counterpoint inspired by Rat Pack-era Vegas elegance. These are not generic restaurant colors — every token is justified by the brand's specific history and atmosphere.

**Typography pairing creates the brief's central tension.** Playfair Display (serif, Google Fonts) provides the "old school" character with its Italian old-world elegance and sharp modern serifs. Inter (sans-serif, Google Fonts) provides clean modern readability for body copy, menus, navigation, and UI labels. Using serif display + sans body is a deliberate design decision — neither face dominates, creating the "old school vibe, modern look" balance the brief explicitly requested.

**Domain-specific UI components built from evidence.** The UI kit (7 JSX components) maps directly to real Bootlegger Bistro surfaces: `MenuItem.jsx` formats Italian dish names with prices using `font-variant-numeric: tabular-nums` based on the captured menu PDF; `EntertainmentCard.jsx` renders the live music schedule in a day/act/time table format matching the Entertainment PDF's weekly lineup; `BookingBar.jsx` implements the date/time/guest reservation flow captured from the website's OpenTable booking system. These are not generic restaurant demo components — they model the actual surfaces of this specific brand.

**Six focused preview cards enable visual verification.** Rather than one monolithic preview page, the package isolates each visual dimension — color, dark theme, typography, spacing, brand assets, and components — into separate HTML cards. This lets future agents and reviewers verify each dimension independently before generating artifacts.

**Reusable CSS token system.** `colors_and_type.css` exports 40+ CSS custom properties (colors, type scale, spacing scale, radii, shadows, state colors) and 20+ component classes that any Bootlegger artifact can load with a single `<link>` tag. The token system uses OKLch for perceptually uniform color manipulation, with pre-verified WCAG AA contrast ratios documented in DESIGN.md.
