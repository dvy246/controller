# Implementation Milestones: ControllerTesting.com

This document outlines a phased, risk-mitigated rollout plan to apply the new Design System to the ControllerTesting.com Astro + Tailwind CSS v4 codebase. We prioritize establishing a systemic foundation over making scattered cosmetic edits, avoiding massive unreviewable rewrites.

## Milestone 1: Token Foundation & Configuration
**Goal:** Establish the single source of truth for spacing, typography, colors, and motion in the project configuration, stripping away arbitrary hardcoded values.
- **Task 1.1:** Audit and update the Tailwind CSS v4 configuration (`app.css` / global stylesheet) to enforce the strict 8px spacing scale, removing arbitrary values like `15px`, `12px`, `2px`, etc.
- **Task 1.2:** Define standard custom cubic-bezier timing functions as Tailwind utility variables for consistent motion.
- **Task 1.3:** Configure core typography scales (line heights and letter spacing) via global CSS variables or Tailwind tokens, standardizing `.prose` classes to remove conflicting header line-heights.
- **Task 1.4:** Define the standard color palette (Ethereal Glass theme) as CSS variables, mapping background, surface, border, and text opacities (e.g., `text-white/90`, `bg-white/5`).

## Milestone 2: Core Component Consolidation
**Goal:** Unify duplicated HTML/CSS snippets into single, reusable Astro components that conform to the new high-end standards.
- **Task 2.1: The `<Badge>` Component.** Unify `.badge-tag`, `.hub-badge`, and `.nav-badge` into a single Astro component with strict size and typography rules (`uppercase tracking-widest text-xs`).
- **Task 2.2: The `<Button>` Component.** Unify `.btn-primary`, `.premium-btn`, and `.nav-search-btn` into a standardized component featuring the "Button-in-Button" nested icon architecture and `active:scale-[0.98]` physical press state.
- **Task 2.3: The `<Card>` Component.** Unify `.card-base`, `.stick-card`, and `.doppelrand-core`. Implement the "Double-Bezel" nested architecture (outer shell with hairline border, inner core with subtle inner shadow).

## Milestone 3: Layout, Spacing & Typography Refactor
**Goal:** Apply the base-8 grid and typography tokens across major pages, ensuring a unified structural rhythm.
- **Task 3.1:** Sweep `global.css` and all Astro layout files (`BaseLayout.astro`) to remove margin/padding violations (e.g., `margin-bottom: 1.25rem` on paragraphs).
- **Task 3.2:** Refactor `DriftTester.astro` and main telemetry views to enforce macro-whitespace (using `gap-4`, `gap-6`, `p-6`).
- **Task 3.3:** Audit font weights. Reduce the over-reliance on `font-weight: 700/800`, shifting emphasis to size and opacity contrast (e.g., semi-bold 600 with `text-white/90`).

## Milestone 4: Motion Choreography & State Interpolation
**Goal:** Elevate the interaction quality by replacing abrupt state changes and performance-heavy effects with fluid, GPU-safe animations.
- **Task 4.1:** Refactor the 3D tilt interactions on `.card-hover`. Replace vanilla JS heavy calculations with lighter, CSS `transform`-based hover effects, or optimize the JS to use `requestAnimationFrame` and bounds checking to prevent jank.
- **Task 4.2:** Build and implement the `<EmptyState>` component for disconnected scenarios. Add smooth, pulsing crossfade logic for waiting states.
- **Task 4.3:** Refactor the Gamepad API connection logic in the UI to smoothly transition the data canvas into view using `opacity` and `transform`, eliminating abrupt snapping.

## Milestone 5: Accessibility & Mobile Polish
**Goal:** Ensure the high-end design remains fully accessible and structurally sound on mobile viewports.
- **Task 5.1:** Audit all interactive elements (language selector, footer links, 3D toggles) to ensure a minimum `44x44px` touch target size.
- **Task 5.2:** Implement uniform `focus-visible` styling for keyboard navigation across all buttons, inputs, and custom toggles, ensuring contrast against the dark background.
- **Task 5.3:** Validate WCAG contrast ratios on all text layered over glassmorphic or aurora backgrounds. Adjust `text-white/*` opacities where necessary.
- **Task 5.4:** Enforce the Mobile Override rule: ensure all multi-column bento grids collapse gracefully to a single column (`grid-cols-1`, `w-full`, `px-4`) below the `md:` (768px) breakpoint.
