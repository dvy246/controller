# Design System: ControllerTesting.com
## The Ultimate Gaming Hardware Hub — Visual Identity & Design Guidelines

> **Design Read**: Gaming hardware tool hub for competitive and casual gamers, with a
> dark-tech premium language, leaning toward custom CSS properties + Geist + spring-physics
> motion. Mode: **Operate** (users complete diagnostic tasks) with a **Persuade** layer
> on the landing page.

---

## 1. Visual Theme & Atmosphere

**Vibe Archetype**: Dark Tech — the aesthetic of a high-end gaming cockpit meets a precision
engineering dashboard. Clean, clinical, but warm where it matters. The interface should feel
like a premium instrument panel — every pixel exists for a reason.

**Design Dials**:
| Dial | Value | Rationale |
|---|---|---|
| `DESIGN_VARIANCE` | 7 | Asymmetric but not chaotic — tools need structure, landing needs flair |
| `MOTION_INTENSITY` | 6 | Spring-physics interactions, staggered reveals, but never distracting during tests |
| `VISUAL_DENSITY` | 5 | Data-rich tool pages need density; content pages breathe |

**Atmosphere in one line**: "A precision-engineered dark interface with confident spatial hierarchy,
selective neon accents on deep matte surfaces, and weighty spring-physics motion — like a
Razer product page designed by the Linear team."

---

## 2. Color Palette & Roles

### 2.1 Dark Theme (Default — Gaming Identity)

#### Surfaces (Layered Depth System)
| Token | Name | Hex | Role |
|---|---|---|---|
| `--surface-0` | Void Black | `#06060B` | Page background, deepest layer |
| `--surface-1` | Obsidian | `#0C0C14` | Primary content background |
| `--surface-2` | Dark Slate | `#12122A` | Card backgrounds, panels |
| `--surface-3` | Graphite | `#1A1A36` | Elevated cards, hover states |
| `--surface-4` | Ash | `#222244` | Active states, selected items |

#### Borders
| Token | Name | Hex/Value | Role |
|---|---|---|---|
| `--border-subtle` | Whisper Edge | `rgba(255,255,255,0.06)` | Default card/divider borders |
| `--border-default` | Steel Line | `rgba(255,255,255,0.10)` | Stronger structural borders |
| `--border-focus` | Focus Ring | `var(--accent-primary)` | Focus states, active elements |

#### Text
| Token | Name | Hex | Role |
|---|---|---|---|
| `--text-primary` | Snow | `#F0F0F8` | Headings, primary labels |
| `--text-secondary` | Silver Mist | `#9898B0` | Descriptions, secondary info |
| `--text-tertiary` | Graphite Hint | `#606078` | Placeholders, disabled text |
| `--text-inverse` | Deep Ink | `#06060B` | Text on accent-colored backgrounds |

#### Accent (Single Accent — Max 1)
| Token | Name | Hex | Role |
|---|---|---|---|
| `--accent-primary` | Electric Cobalt | `#2563EB` | Primary CTAs, active states, focus rings, links |
| `--accent-primary-hover` | Deep Cobalt | `#1D4ED8` | Hover state for primary accent |
| `--accent-secondary` | Emerald Signal | `#10B981` | Success states, positive results, "pass" indicators |

#### Status Colors (Diagnostic-Specific)
| Token | Name | Hex | Bg Hex | Role |
|---|---|---|---|---|
| `--status-pass` | Clear Green | `#10B981` | `#0A2A1A` | Test passed, healthy |
| `--status-warning` | Amber Alert | `#F59E0B` | `#2A1F00` | Moderate issue, attention needed |
| `--status-fail` | Signal Red | `#EF4444` | `#2A0808` | Test failed, critical issue |
| `--status-info` | Soft Blue | `#3B82F6` | `#0A1628` | Informational, neutral |
| `--status-neutral` | Muted Slate | `#6B7280` | `#1A1A22` | No data, untested |

### 2.2 Light Theme

#### Surfaces
| Token | Name | Hex | Role |
|---|---|---|---|
| `--surface-0` | Canvas White | `#FAFBFD` | Page background |
| `--surface-1` | Pure Surface | `#FFFFFF` | Primary content background |
| `--surface-2` | Warm Mist | `#F5F6FA` | Card backgrounds |
| `--surface-3` | Light Fog | `#EEEEF4` | Elevated cards, hover states |
| `--surface-4` | Silver Wash | `#E4E4EC` | Active states |

#### Borders
| Token | Name | Hex/Value | Role |
|---|---|---|---|
| `--border-subtle` | Vapor Line | `rgba(0,0,0,0.05)` | Default borders |
| `--border-default` | Pencil Line | `rgba(0,0,0,0.10)` | Stronger borders |
| `--border-focus` | Focus Ring | `var(--accent-primary)` | Focus states |

#### Text
| Token | Name | Hex | Role |
|---|---|---|---|
| `--text-primary` | Charcoal Ink | `#18181B` | Headings, primary labels |
| `--text-secondary` | Muted Steel | `#52525B` | Descriptions |
| `--text-tertiary` | Fog Text | `#A1A1AA` | Placeholders |
| `--text-inverse` | Snow | `#FFFFFF` | Text on accent backgrounds |

#### Accent (Same Hue, Adjusted Saturation)
| Token | Name | Hex | Role |
|---|---|---|---|
| `--accent-primary` | Deep Cobalt | `#1D4ED8` | Primary CTAs — darker for light bg contrast |
| `--accent-primary-hover` | Navy Press | `#1E40AF` | Hover state |
| `--accent-secondary` | Forest Signal | `#059669` | Success — darker for light bg contrast |

#### Status Colors (Light Theme)
| Token | Name | Hex | Bg Hex | Role |
|---|---|---|---|---|
| `--status-pass` | Forest Green | `#059669` | `#ECFDF5` | Pass |
| `--status-warning` | Burnt Amber | `#D97706` | `#FFFBEB` | Warning |
| `--status-fail` | Crimson | `#DC2626` | `#FEF2F2` | Fail |
| `--status-info` | Ocean | `#2563EB` | `#EFF6FF` | Info |

### 2.3 Color Rules (STRICT)

> **BANNED**: Pure black (`#000000`) — use Off-Black `#06060B` instead
> **BANNED**: AI Purple/Blue neon gradients — no `#7C3AED`, no `#8B5CF6`
> **BANNED**: Oversaturated rainbow accents
> **BANNED**: Warm/cool gray fluctuation within same theme — pick ONE neutral ramp (Zinc)
> **MAX 1 accent color** across the entire interface. Saturation stays below 80%.
> **All colors via CSS custom properties** — ZERO hardcoded hex values in component CSS.

---

## 3. Typography Rules

### 3.1 Font Stack

| Role | Font | Weight | Fallback | Usage |
|---|---|---|---|---|
| **Display / Headlines** | `Geist` | 700, 800 | `system-ui, -apple-system, sans-serif` | H1, H2, hero text, scores |
| **Body / UI** | `Geist` | 400, 500, 600 | `system-ui, sans-serif` | Paragraphs, labels, descriptions |
| **Mono / Data** | `Geist Mono` | 400, 500 | `'JetBrains Mono', monospace` | Numbers, scores, coordinates, polling rates, percentages, code |
| **Score Display** | `Geist Mono` | 700 | `monospace` | Health Score number, CPS counter, timer |

> **BANNED Fonts**: Inter, Roboto, Arial, Open Sans, Helvetica, Times New Roman, Georgia
> Geist provides the modern, technical premium feel without being the overused Inter.

### 3.2 Type Scale

```
--text-hero:    clamp(3rem, 6vw, 5rem)      /* 48-80px — Landing hero only */
--text-display: clamp(2rem, 4vw, 3.5rem)    /* 32-56px — Page titles */
--text-h1:      clamp(1.75rem, 3vw, 2.5rem) /* 28-40px — Section headings */
--text-h2:      clamp(1.25rem, 2vw, 1.75rem)/* 20-28px — Subsection headings */
--text-h3:      1.125rem                     /* 18px — Card titles */
--text-body:    1rem                         /* 16px — Body text (NEVER smaller on mobile) */
--text-small:   0.875rem                     /* 14px — Captions, metadata */
--text-micro:   0.75rem                      /* 12px — Labels, badges, timestamps */
```

### 3.3 Typography Rules

- **Headlines**: Track-tight (`letter-spacing: -0.02em`), controlled scale through weight and color — not just massive size
- **Body**: Relaxed leading (`line-height: 1.65`), max-width `65ch` per line
- **Data/Numbers**: ALWAYS use `Geist Mono` — scores, percentages, coordinates, polling rates, timestamps
- **Mobile body**: NEVER smaller than `1rem` (16px)
- **Heading hierarchy**: Weight + color-shift hierarchy, not just size escalation
- **No orphan lines**: Use `text-wrap: balance` on headings where supported

---

## 4. Layout Architecture

### 4.1 Grid System

```css
/* Page container */
.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

/* Tool page grid */
.tool-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

/* Card grid (related tools, actions) */
.card-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
```

### 4.2 Spacing System (8px Base)

```
--space-1:  0.25rem   /* 4px */
--space-2:  0.5rem    /* 8px */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.25rem   /* 20px */
--space-6:  1.5rem    /* 24px */
--space-8:  2rem      /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
--space-24: 6rem      /* 96px */

/* Section vertical spacing — the design BREATHES */
--section-gap: clamp(4rem, 8vw, 7rem);
```

### 4.3 Layout Principles

- **No overlapping elements** — every element occupies its own clear spatial zone
- **CSS Grid over Flexbox math** — never use `calc()` percentage hacks
- **Contain layouts** using `max-width: 1400px` centered
- **Full-height sections**: `min-height: 100dvh` — NEVER `height: 100vh` (iOS Safari catastrophic jump)
- **Asymmetric hero**: Centered hero BANNED on landing page. Use split-screen or left-aligned with tool preview on right
- **No 3-equal-column card rows** on landing page — use asymmetric bento grid, 2-column zig-zag, or horizontal scroll

### 4.4 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | `< 640px` | Single column, `padding: 0 1rem`, full-width cards |
| Tablet | `640px – 1024px` | 2-column grids, stacked tool panels |
| Desktop | `1024px – 1400px` | Full layout, side-by-side panels |
| Wide | `> 1400px` | Max-width contained, centered |

**Critical mobile rules**:
- All multi-column layouts collapse to single column below 640px
- Touch targets: minimum `44px × 44px`
- No horizontal overflow — EVER
- Typography scales via `clamp()` — never media queries for font sizes
- Tool visualizations: redesigned for portrait, not just shrunk

---

## 5. Component Specifications

### 5.1 Card System (The Core UI Pattern)

**Double-Bezel Architecture** — Cards are NOT flat on the background. They have subtle depth:

```css
.card {
  /* Outer shell */
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: 1.25rem;  /* 20px */
  padding: 1.5rem;
  
  /* Depth effect */
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.12),
    0 0 0 1px var(--border-subtle),
    inset 0 1px 0 rgba(255,255,255,0.04);
  
  /* Motion */
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
              box-shadow 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 24px rgba(0,0,0,0.20),
    0 0 0 1px var(--border-default),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
```

**Card Types** (each has specific styling):

| Card Type | Border Radius | Padding | Hover Effect | Special |
|---|---|---|---|---|
| Tool Card | `1.25rem` | `1.5rem` | Lift + glow | Icon + title + description + arrow |
| Result Card | `1rem` | `1.25rem` | None (static) | Color-coded border-left (pass/warn/fail) |
| Action Card | `1.25rem` | `1.5rem` | Lift + accent glow | Icon + title + CTA arrow |
| Game Card | `1.25rem` | `0` (image fills top) | Scale(1.02) | Thumbnail + title + score |
| Achievement Card | `1rem` | `1rem` | Shimmer | Badge icon + name + progress |
| Content Card | `1rem` | `1.25rem` | Lift | Category tag + title + excerpt |

### 5.2 Buttons

**Primary CTA** (Accent filled, pill shape):
```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: 999px;  /* Full pill */
  padding: 0.75rem 1.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  
  /* Tactile press feedback */
  transition: all 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.btn-primary:hover {
  background: var(--accent-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25);
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

**Secondary CTA** (Ghost/outline):
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  padding: 0.75rem 1.75rem;
}
.btn-secondary:hover {
  background: var(--surface-3);
  border-color: var(--border-focus);
}
```

> **BANNED**: Neon outer glow on buttons. Custom mouse cursors. Buttons wider than 280px.

### 5.3 Navigation

**Floating Island Nav** — detached from top edge, glass pill:
```css
.nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 2rem);
  padding: 0.625rem 1.5rem;
  border-radius: 999px;
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(20px) saturate(1.4);
  z-index: 50;
  
  /* Subtle shadow for floating effect */
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}
```

Mobile: Hamburger morphs to X with rotation animation. Menu opens as full-screen overlay with staggered link reveals.

### 5.4 Tool Visualizations

**Stick Visualizer** (Canvas/SVG):
- Dark theme: Deep black grid (`#06060B`) with `var(--accent-primary)` dot/trail
- Light theme: White grid (`#FFFFFF`) with `var(--accent-primary)` dot/trail
- Grid lines use `var(--border-subtle)` — visible in both themes
- Active crosshair: `var(--accent-primary)` with glow
- Trail: Semi-transparent accent with configurable colors (reward shop upgrades)

**Health Score Gauge**:
- Circular arc gauge using SVG
- Score color: pass green (85+), warning amber (60-84), fail red (<60)
- Score number in `Geist Mono` 700, large display size
- Letter grade badge next to score
- Animated fill on reveal (spring physics, 1.2s)

### 5.5 Result Indicators

**Status Badge**:
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: var(--text-micro);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge-pass {
  background: var(--status-pass-bg);
  color: var(--status-pass);
}
.badge-warning {
  background: var(--status-warning-bg);
  color: var(--status-warning);
}
.badge-fail {
  background: var(--status-fail-bg);
  color: var(--status-fail);
}
```

### 5.6 Loading & Empty States

- **Skeleton loaders**: Match exact layout dimensions with shimmer animation — NO generic circular spinners
- **Empty state** ("Connect a controller"): Composed illustration + description + CTA button. Not just "No data" text.
- **Error state**: Inline error near the problem source, clear language, recovery action

---

## 6. Motion & Interaction Philosophy

### 6.1 Spring Physics (Default for ALL interactions)

```css
/* Premium spring curve — weighty, confident feel */
--ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Durations */
--duration-fast: 200ms;     /* Hover, focus */
--duration-default: 400ms;  /* Card lifts, slides */
--duration-slow: 700ms;     /* Page transitions, reveals */
--duration-reveal: 1000ms;  /* Scroll-in animations */
```

> **BANNED**: `linear` easing. `ease-in-out`. Instant state changes. Durations under 150ms for UI transitions.

### 6.2 Scroll Reveal (Entry Animations)

Elements never appear statically. As they enter viewport:
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  filter: blur(4px);
  transition: all var(--duration-reveal) var(--ease-spring);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

Use `IntersectionObserver` — NEVER `window.addEventListener('scroll')`.

**Staggered cascade**: Lists and card grids reveal with 60ms delay per item.

### 6.3 Micro-Interactions

| Element | Interaction | Animation |
|---|---|---|
| Card hover | Lift | `translateY(-2px)` + shadow increase |
| Button hover | Glow | `translateY(-1px)` + accent shadow |
| Button active | Press | `scale(0.98)` + `translateY(0)` |
| Tab switch | Indicator slide | `transform: translateX()` with spring |
| Score reveal | Count up | Animated number from 0 to final value |
| Test start | Pulse | Pulsing glow ring on active test |
| Achievement unlock | Pop + shimmer | `scale(0→1.1→1)` with gold shimmer |
| Points earned | Float up | `+50pts` floats up and fades out |

### 6.4 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
```

### 6.5 Performance Guardrails

- **GPU-safe**: Animate ONLY `transform` and `opacity`. NEVER animate `top`, `left`, `width`, `height`.
- **`backdrop-filter`**: Only on fixed/sticky elements (nav, modals). NEVER on scrolling containers.
- **Grain/noise**: Fixed pseudo-element only (`position: fixed; pointer-events: none`).
- **`will-change`**: Apply sparingly, only to actively animating elements. Remove after animation.
- **Canvas rendering**: Use `requestAnimationFrame`, never `setInterval`. Pause when tab is hidden.

---

## 7. Landing Page Design (The First Impression)

### 7.1 Hero Section

**Layout**: Asymmetric split — NOT centered.
- Left 55%: Headline + subtitle + CTA
- Right 45%: Live interactive controller visualization (mini-test preview)

**Hero copy rules**:
- Headline: 6-8 words max, punchy, specific
  - ✅ "Test Any Controller. Instantly. Free."
  - ❌ "The Ultimate Gaming Hardware Testing Platform Solution"
- Subtitle: 1 line, specific value prop
  - ✅ "Drift detection, health scoring, and guided diagnostics for PS5, Xbox, Switch, and PC controllers."
  - ❌ "Elevate your gaming experience with our next-gen seamless tools."
- Single primary CTA: "Test Your Controller →"
- NO secondary "Learn more" links in hero
- NO "Scroll to explore" text, NO bouncing chevrons

> **BANNED in hero**: Centered layout. AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen"). Emojis. Purple gradients. Stock photos.

### 7.2 Page Sections (Scroll Order)

1. **Hero** — Asymmetric, live controller preview
2. **Tool Categories** — Bento grid of 6 categories (controller, mouse, keyboard, audio, utilities, performance)
3. **Featured Tool Deep-Dive** — Full-width demo of the Drift Tester with live visualization
4. **Trust Signals** — Tests run counter, privacy promise, browser-based, free
5. **How It Works** — 3-step flow: Connect → Test → Get Results (NOT 3 equal cards — use zig-zag layout)
6. **Games Preview** — 2-3 game screenshots with "Play free" CTAs
7. **Controller Profiles** — Horizontal scroll of controller cards
8. **Testimonials / Community Data** — "50,000+ controllers tested" with aggregate stats
9. **FAQ** — Expandable accordion
10. **Footer** — Links, legal, social

### 7.3 Section Spacing

Every section BREATHES. Minimum `var(--section-gap)` = `clamp(4rem, 8vw, 7rem)` between sections.
No cramped layouts. Whitespace is premium.

---

## 8. Anti-Patterns (BANNED — AI Design Tells)

These are the patterns that instantly make a site look AI-generated and cheap. NEVER use them:

| # | Anti-Pattern | Why It's Banned |
|---|---|---|
| 1 | Inter font | Overused, generic, AI-default |
| 2 | Pure black `#000000` | Harsh, unnatural — use off-black `#06060B` |
| 3 | Purple/neon gradients | AI cliché, screams "template" |
| 4 | 3-equal-column feature cards | Every AI landing page uses this layout |
| 5 | Centered hero text + gradient background | The #1 AI design tell |
| 6 | "Scroll to explore" / bouncing chevrons | Filler UI text |
| 7 | Outer glow/neon shadows on buttons | Cheap gaming aesthetic |
| 8 | Generic stock photos | Use real tool screenshots or SVG illustrations |
| 9 | Emojis as design elements | Unprofessional in production UI |
| 10 | Custom cursor effects | Accessibility nightmare, adds nothing |
| 11 | AI copywriting clichés | "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionary" |
| 12 | Rounded `999px` on everything | Use intentional border-radius per component |
| 13 | Generic names in mocks | "John Doe", "Acme Corp", "Lorem ipsum" |
| 14 | Fake round numbers | "99.9%", "10x faster", "50%" — use real or plausible data |
| 15 | Horizontal scroll of identical cards | Lazy layout, no visual hierarchy |
| 16 | `linear` or `ease-in-out` easing | Robotic feel — use spring physics |
| 17 | `h-screen` for full sections | iOS Safari breaks — use `min-h-[100dvh]` |
| 18 | `z-index: 9999` | Z-index chaos — use systematic layers (10, 20, 30, 50) |
| 19 | Overlapping text on images | Readability fail |
| 20 | Thick icon strokes | Use ultra-light, precise icon lines (Phosphor Light style) |

---

## 9. Accessibility Requirements (CRITICAL)

| Requirement | Standard | Implementation |
|---|---|---|
| Color contrast | WCAG 2.1 AA (4.5:1 normal text, 3:1 large text) | All color pairs verified |
| Focus visibility | Visible focus ring on ALL interactive elements | `outline: 2px solid var(--accent-primary); outline-offset: 2px` |
| Keyboard navigation | Full keyboard operability | Tab order matches visual order |
| Screen readers | Meaningful alt text, ARIA labels | All icons have `aria-label`, images have `alt` |
| Touch targets | 44×44px minimum | All buttons, links, controls |
| Reduced motion | `prefers-reduced-motion` respected | All animations disabled |
| Color independence | Never rely on color alone for information | Status uses color + icon + text label |
| Form labels | Visible `<label>` for every input | Label above input, error below |
| Heading hierarchy | Logical H1→H6 without skipping | One H1 per page, sequential H2→H3 |

---

## 10. Pre-Flight Checklist (Before Every Page Ships)

- [ ] No banned fonts (Inter, Roboto, Arial, Helvetica, Open Sans)
- [ ] No hardcoded hex values in component CSS — only CSS custom properties
- [ ] Both dark AND light themes tested — no invisible text, no broken borders
- [ ] No `#000000` pure black anywhere
- [ ] No purple/neon gradient buttons or backgrounds
- [ ] All cards use the double-bezel architecture (border + shadow + inner highlight)
- [ ] Section spacing is minimum `clamp(4rem, 8vw, 7rem)`
- [ ] All transitions use custom `cubic-bezier` — no `linear` or `ease-in-out`
- [ ] All numbers/data use `Geist Mono`
- [ ] Touch targets are 44px minimum
- [ ] Color contrast passes 4.5:1 AA for all text
- [ ] Focus rings visible on every interactive element
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No horizontal overflow on mobile
- [ ] Score/result cards have color + icon + text (not color alone)
- [ ] Canvas/SVG visualizations respond to theme changes
- [ ] SVG icons use `currentColor` (inherit text color)
- [ ] The page does NOT look like it was made by an AI

---

## 11. Homepage Finish Extension — 2026-08

The homepage keeps the original dark-tech precision system while introducing a quieter, premium-consumer presentation:

- The supplied DualSense photograph is the hero proof point. It is displayed without a decorative poster frame, with reserved aspect-ratio space to protect LCP and CLS.
- The hero remains a left-copy / right-hardware split on desktop and collapses to a single-column, content-first flow on small screens.
- Hero motion is limited to transform-only tilt, a slow float, and a restrained light pass. Pointer interaction is progressive enhancement and is disabled for reduced-motion users.
- The homepage uses cobalt for actions, emerald for passing diagnostics, amber for attention, and red for failure states. SVGs inherit semantic color through `currentColor` or theme variables.
- Light mode remaps legacy slate/stone utilities to the shared surface and text tokens so content remains visible across tool and content pages.
- FAQs are direct-answer content in the page and FAQPage JSON-LD. Keep answers factual and avoid repeating target phrases unnaturally.
