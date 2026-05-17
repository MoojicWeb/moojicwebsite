# Moojic Website — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1 | UI framework |
| `react-dom` | ^19.1 | DOM renderer |
| `react-router-dom` | ^7.6 | Multi-page routing (6 pages) |
| `gsap` | ^3.13 | Core animation engine, ScrollTrigger, SplitText |
| `lucide-react` | ^0.511 | Icon library |
| `tailwindcss` | ^4.1 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.1 | Tailwind Vite integration |
| `vite` | ^6.3 | Build tool |
| `@vitejs/plugin-react` | ^4.4 | React Vite plugin |
| `typescript` | ^5.8 | Type checking |
| `@types/react` | ^19.1 | React type definitions |
| `@types/react-dom` | ^19.1 | ReactDOM type definitions |

Fonts (Google Fonts, loaded via `<link>` in `index.html`): Poppins (400,500,600,700,800), Inter (400,500,600).

---

## Component Inventory

### Layout (shared across all pages)

| Component | Source | Notes |
|---|---|---|
| `Navigation` | Custom | Scroll-aware header: transparent→white transition at 50px. Dropdown on SERVICES hover. Mobile: full-screen overlay. |
| `Footer` | Custom | 4-column grid with particle canvas background. Shared across all pages. |
| `PageLayout` | Custom | Wraps every route: renders `Navigation` + `{children}` + `Footer`. |

### Sections (page-specific, used once)

**Homepage:** `HeroSection`, `ServicesSection`, `AIMusicCurationSection`, `AboutSection`, `WhyMoojicSection`, `IndustriesSection`, `StatsSection`, `FeaturedOnSection`, `BlogPreviewSection`, `ResellerCTASection`, `ContactSection`

**Sample Player:** `PlayerHeroSection`, `PlayerInterfaceSection`, `IndustryPreviewGridSection`, `PlayerCTASection`

**Service — In-store Radio:** `ServiceHero`, `ServiceOverview`, `FeaturesSection`, `DifferentiatorsSection`, `DigitalJukeboxSection`

**Service — Digital Signage:** `ServiceHero`, `ServiceOverview`, `FeaturesSection`, `BenefitsSection`

**Service — AV Hardware:** `ServiceHero`, `ServiceOverview`, `AudioSolutionsSection`, `DisplaySolutionsSection`, `QuoteSection`

**Blog:** `BlogHero`, `BlogGridSection`, `NewsletterCTASection`

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| `SectionHeading` | Custom | Nearly every section — label + heading + description pattern |
| `GradientButton` | Custom | All CTAs — primary gradient with hover lift/glow |
| `OutlineButton` | Custom | Secondary CTAs — border variant with fill hover |
| `ServiceCard` | Custom | Homepage services grid |
| `ReasonCard` | Custom | Why Moojic section — gradient top border card |
| `FeatureRow` | Custom | Service pages — alternating icon+text layout |
| `StatCounter` | Custom | Homepage stats, Signage benefits — GSAP-driven count-up |
| `BlogCard` | Custom | Blog grid + homepage blog preview |
| `IndustryCard` | Custom | Industries grid on homepage |
| `IndustryModal` | Custom | Modal overlay triggered by IndustryCard click |
| `ContactForm` | Custom | Homepage contact, AV Hardware quote |
| `AudioVisualizer` | Custom | AI Curation section, Sample Player — CSS @keyframes bars |
| `ParticleCanvas` | Custom | Footer background, Sample Player hero accent — Canvas 2D |
| `AnimatedGradient` | Custom | Hero backgrounds, CTA banners — CSS radial-gradient @keyframes |

### Hooks

| Hook | Purpose |
|---|---|
| `useScrollEntrance` | IntersectionObserver wrapper for section entrance animations. Returns ref + hasAnimated boolean. Threshold 0.15, fires once. |
| `useNavScroll` | Scroll position listener (threshold 50px). Returns scrolled boolean for Navigation styling. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|---|---|---|---|
| Hero mesh gradient background | CSS | 3+ `radial-gradient` layers with `@keyframes` translating `background-position` over 18–25s, infinite alternate | Low |
| Hero entrance sequence (tagline→headline→desc→CTA→illustration) | GSAP timeline | Single timeline with sequential `from()` tweens, increasing delays. Illustration adds `scale: 0.95→1` | Medium |
| Scroll-triggered section entrances | GSAP + ScrollTrigger | `useScrollEntrance` hook creates ScrollTrigger per section. Default: `y: 40, opacity: 0` → origin. Card grids add `stagger: 0.08–0.1` | Low |
| Hero illustration floating | CSS | `@keyframes` oscillating `translateY(±10px)` over 6s | Low |
| Floating music notes | CSS | Multiple `@keyframes` with varied durations (4–8s) and amplitudes | Low |
| Navigation scroll transition | CSS | `transition` on background/box-shadow. JS toggles class at 50px threshold | Low |
| Stats counter | GSAP | `gsap.to()` tweening a proxy object from `{value: 0}` to target, with `onUpdate` writing to DOM. `power2.out`, 2s duration. ScrollTrigger once | Medium |
| Industry tile hover | CSS | `transform: scale(1.08)` on image, overlay opacity transition, plus icon `scale(0→1)` + `rotate(0→90deg)` | Low |
| Industry modal entrance | GSAP | `scale: 0.9→1`, `opacity: 0→1`, `duration: 0.3`, ease `back.out(1.7)` | Low |
| Service card icon pulse glow | CSS | `@keyframes` box-shadow oscillation on hover | Low |
| Reason card gradient shine | CSS | Pseudo-element with `linear-gradient` translated from `-100%` to `100%` on hover, `1s` | Low |
| Audio visualizer bars | CSS | 5–7 bars with `@keyframes` height animation, staggered `animation-delay` for wave effect | Low |
| AI badge glow pulse | CSS | `@keyframes` oscillating `box-shadow` spread over 3s | Low |
| Footer particle network | Canvas 2D | Custom `ParticleCanvas` component: `requestAnimationFrame` loop, 40 particles, distance-based line connections, mouse repel. No library needed | Medium |
| **Sample Player tab switch** | **GSAP** | **Outgoing playlist: `opacity→0, x→-20` over 0.2s. Incoming: `opacity→0→1, x: 20→0` over 0.3s with 0.15s delay. Crossfade pattern** | **Medium** |
| **Track selection border slide** | **GSAP** | **Gradient left border `height: 0→100%` over 0.2s on selected row** | **Low** |
| **Track title shuffle** | **GSAP + SplitText** | **SplitText splits title into chars, GSAP randomizes characters then resolves to actual text over 0.4s** | **Medium** |
| Play/Pause morph | CSS | Crossfade between Play and Pause icons with `scale` transition | Low |
| Album art pulse shadow | CSS | `@keyframes` oscillating `box-shadow` when playing state is active | Low |
| Blog card thumbnail zoom | CSS | `transform: scale(1.05)` on card hover, overflow hidden on container | Low |
| Reseller CTA gradient shift | CSS | `background-position` animation on linear-gradient over 15s | Low |
| Feature row alternating slide | GSAP + ScrollTrigger | Left-aligned features: `x: -40→0`. Right-aligned: `x: 40→0`. ScrollTrigger per row | Low |
| About image/content split | GSAP + ScrollTrigger | Image `x: -40→0`, content `x: 40→0`, simultaneous | Low |

---

## State & Logic Plan

### Sample Player — Non-Trivial State Architecture

The player requires coordinated state across industry selection, track selection, and playback simulation:

**`useSamplePlayer` hook** manages a single state object:
- `activeIndustry`: string — drives which playlist renders and which tab is highlighted
- `activeTrackIndex`: number | null — drives track highlighting, now-playing info, and player state
- `isPlaying`: boolean — drives play/pause icon, visualizer animation, album art pulse
- `progress`: number (0–100) — simulated playback progress, incremented via `setInterval` when `isPlaying`
- `volume`: number (0–100)
- `isShuffle` / `isRepeat`: booleans

**Progress simulation:** When `isPlaying` is true, a `setInterval` (every 100ms) increments `progress`. At 100, it auto-advances to next track (or stops if repeat is off and last track). The interval is cleaned up on pause/unmount.

**Industry data:** Static array of 12 industry objects, each containing name, icon, description, genre tags, gradient artwork reference, and 12 tracks. No API — all data is bundled.

**Tab switch → playlist swap:** Changing `activeIndustry` resets `activeTrackIndex` to 0 and `progress` to 0. The outgoing playlist container gets a GSAP exit animation; the incoming container gets an entrance animation after a brief delay. This requires two keyed container divs or a single container with GSAP-controlled enter/exit states.

### Industry Modal State

Modal is controlled via a single piece of state: `selectedIndustry: string | null`. When an industry tile is clicked, `selectedIndustry` is set. The `IndustryModal` component renders when this is non-null. Modal uses a portal or fixed overlay. Click outside or X button sets `selectedIndustry` to null.

### Scroll-Triggered Animation Orchestration

Sections must animate once when entering the viewport. `useScrollEntrance` creates a GSAP ScrollTrigger for each section. To prevent memory leaks, the hook must call `ScrollTrigger.getAll()` and `kill()` appropriately on unmount. For pages with many sections (homepage has 11), consider batching ScrollTrigger creation or using a single ScrollTrigger instance with `batch()` for card grids.

---

## Other Key Decisions

**Routing:** 6 routes handled by `react-router-dom` — `/` (home), `/sample-player`, `/service/in-store-radio`, `/service/digital-signage`, `/service/av-hardware`, `/blog`. All routes render within `PageLayout`.

**No shadcn/ui:** The design is fully custom with no standard UI patterns (no dialogs, tables, forms, dropdowns that match shadcn primitives). The IndustryModal is a custom overlay, the Services dropdown is a custom hover card, and all inputs are styled from scratch. Adding shadcn would introduce unused infrastructure.

**No Lenis:** The design does not specify smooth-scroll-dependent effects like parallax pin sequences or scroll-velocity-driven animations. Native CSS `scroll-behavior: smooth` is sufficient.

**Video in hero:** The In-store Radio service hero includes a looping video background. Use the HTML5 `<video>` element with `autoPlay muted loop playsInline` attributes. No video player library needed.

**Particle canvas:** Footer and Sample Player hero share the same particle effect. The `ParticleCanvas` component accepts a `config` prop for density/connection distance variations between contexts. Runs in a `useEffect` with `requestAnimationFrame` — no external canvas library.
