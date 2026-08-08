# ControllerTesting.com Design System

## 1. Core Philosophy
This design system establishes a premium, unified visual language for ControllerTesting.com, transitioning it from a disjointed utility tool to a high-end, world-class product on par with Linear, Apple, and Raycast. We adopt the **"Ethereal Glass"** and **"Soft Structuralism"** archetypes to present complex telemetry data with extreme clarity, spatial rhythm, and haptic depth.

## 2. Typography Scale
We use a highly legible, premium geometric Grotesk font (e.g., `Geist`, `Inter` configured properly, or `Plus Jakarta Sans`).
- **Font Family:** `font-sans` globally.
- **Weights:** Use `400` (Regular) for body text, `500` (Medium) for UI labels/buttons, and `600` (Semi-bold) for critical headings. Avoid overusing `700` and `800`.
- **Line Heights:**
  - Display / Headings (H1, H2, H3): `leading-tight` (1.1 - 1.2)
  - Body Text (P, span): `leading-relaxed` (1.5 - 1.6)
  - UI Elements (Buttons, Badges): `leading-none` (1.0)
- **Letter Spacing:**
  - Headings: `tracking-tight` (-0.02em to -0.01em)
  - Uppercase Labels/Badges: `tracking-widest` (0.1em to 0.2em)
  - Body Text: `tracking-normal` (0em)

## 3. Spacing Rhythm & Grid (Strict Base-8)
All spatial properties (padding, margin, width, height, gaps) MUST strictly follow the 8px baseline grid. **No arbitrary values** (e.g., `12px`, `15px`, `20px`).
- **Micro (4px):** `gap-1`, `p-1` (Only for tight internal alignments, like icon + label)
- **Base (8px):** `gap-2`, `p-2` (Standard component internal spacing)
- **Medium (16px):** `gap-4`, `p-4` (Standard card padding, container gutters)
- **Large (24px):** `gap-6`, `p-6` (Form groups, larger cards)
- **X-Large (32px):** `gap-8`, `p-8` (Section gaps)
- **Macro (64px - 96px):** `py-16`, `py-24` (Major section vertical rhythm)

## 4. Layout & Containers
- **Max Widths:** Use standard container max-widths, heavily leaning on `max-w-5xl` or `max-w-6xl` for dashboard layouts, ensuring line lengths never exceed 75 characters.
- **Asymmetrical Bento / Grid:** Use CSS Grid (`grid-cols-12`) for dashboards. Metric cards span 4, 6, or 8 columns.
- **Mobile Collapse (Responsive):** Any multi-column layout above `md:` MUST aggressively fall back to a single column (`grid-cols-1`, `w-full`) with `px-4` padding below `768px`.

## 5. Color Tokens & Dark Theme Rules
Adopt an OLED-optimized dark theme with extremely precise contrast control.
- **Backgrounds:** Deepest black (`#050505` or `slate-950`).
- **Surfaces (Cards):** `bg-white/5` for resting state, `bg-white/10` for elevated or active states.
- **Borders:** Hairline borders using `border-white/10` (never solid gray).
- **Text:** 
  - Primary: `text-white/90` (Contrast ratio safe)
  - Secondary/Muted: `text-white/60`
  - Disabled: `text-white/30`
- **Accents:** Restrained use of brand colors (e.g., subtle blue/purple gradients) primarily mapped to data viz or active states, avoiding UI noise.

## 6. Radius, Elevation, Shadows & Borders
Discard harsh, generic drop shadows and 1px solid borders. Adopt the **"Double-Bezel" (Doppelrand)** nested architecture.
- **Border Radius:**
  - Standard Cards: `rounded-2xl` (16px) or `rounded-[2rem]` (32px)
  - Inner Elements: Mathematically smaller (e.g., `rounded-xl` / 12px)
  - Pills/Buttons: `rounded-full`
- **Nested Architecture (Double-Bezel):**
  - **Outer Shell:** `p-1.5`, `bg-white/5`, `ring-1 ring-white/10`, `rounded-2xl`.
  - **Inner Core:** The content container receives a subtle inner shadow (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`) and smaller radius (`rounded-xl`).
- **Shadows:** Use highly diffused ambient shadows (e.g., `shadow-[0_8px_30px_rgb(0,0,0,0.12)]`) only for elevated overlays/modals, never on standard cards.

## 7. Component Standards
- **Buttons (`<Button>`):** Fully rounded pills (`rounded-full`), `px-6 py-3`.
  - **Button-in-Button Pattern:** Trailing icons must sit in their own nested circular wrapper (`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center`) flush with the button's right padding.
- **Badges (`<Badge>`):** Standardized to `px-2.5 py-0.5`, `text-xs`, `font-medium`, `uppercase`, `tracking-widest`, `rounded-full`.
- **Inputs & Forms:** Minimum height of `44px` (touch-target safe), `bg-white/5`, `border-white/10`, visible `focus:ring-2 focus:ring-white/20`.

## 8. Motion, Interaction & State Choreography
- **Transitions:** Discard `linear` and `ease-in-out`. Use custom cubic-beziers universally: `transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]`.
- **GPU-Safe Animation:** Animate ONLY `transform` and `opacity`. Never animate layout properties (width, height, top).
- **Hover Physics:** Interactive elements should scale down slightly (`active:scale-[0.98]`). Buttons feature internal kinetic tension (icons translate diagonally `translate-x-0.5 -translate-y-0.5`).
- **State Changes:** 
  - **Empty States:** Use a dedicated `<EmptyState>` component with subtle pulsing opacities.
  - **Connecting/Connected:** Transition states using smooth crossfades (opacity/blur), not abrupt DOM snapping. Data canvas fades in gracefully.

## 9. Accessibility & Ergonomics
- **Touch Targets:** Absolute minimum of 44x44px for all interactables (buttons, toggles, language selectors).
- **Focus Rings:** Ensure all interactive elements have highly visible focus states (`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white/50`).
- **Contrast:** Guarantee all text achieves a minimum 4.5:1 WCAG contrast ratio over its background, especially above glassmorphic/aurora layers.
