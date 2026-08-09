# 🎮 ControllerTesting.com — Master System Specification & Architecture Manifest

This document serves as the absolute source of truth for all AI agents, software architects, and engineers working on **ControllerTesting.com**. It contains an exhaustive, verified record of every feature, design token, diagnostic tool, i18n specification, search mechanism, and SEO structure implemented in the repository.

---

## 1. 🏗️ Core Technology Architecture

*   **Framework**: Astro 5.x SSG (Static Site Generation), pre-rendering 100% of HTML pages at build time.
*   **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (`@import "tailwindcss"` and `@theme` tokens in `src/styles/global.css`).
*   **Client Interactivity**: Vanilla JS & Astro Client Islands (`client:visible`, `client:idle`). Zero heavy JavaScript framework overhead on content pages.
*   **Typography**: Geist Sans & Geist Mono font stack. **Inter and Roboto are strictly banned**.
*   **Design System**: 5-Layer Surface Depth System (`--color-surface-0` through `--color-surface-4`), Electric Cobalt accent (`#2563EB`), Pass Emerald (`#10B981`), Warning Amber (`#F59E0B`), Fail Red (`#EF4444`). Uses 8px Spatial Grid System (`--space-1` through `--space-24`) and nested `Doppelrand` shell architecture (`24px` outer radius) for premium component containers (`DiagnosticResultsBento`, `PremiumGuideCard`). Banned all inline `style="margin-top: ..."` overrides codebase-wide.
*   **High-Performance Scrolling Engine**: Hardware-accelerated smooth scrolling (`scroll-behavior: smooth`, `scroll-padding-top: 5rem`), thin custom WebKit/Firefox scrollbars, and compositor-only `IntersectionObserver` scroll reveal (`[data-reveal]`) with immediate `unobserve()` garbage collection to preserve Core Web Vitals and zero main-thread CPU overhead.
*   **Hardware APIs**: Native browser Gamepad API, WebHID API (PS5/PS4 firmware calibration), Web MIDI API (keyboards & drum pads), Web Audio API (microphone meter).
*   **3D Interactive Graphics**: Three.js (bundled via direct npm `three` package with local Vite ESM chunking for zero CDN runtime failures) with `GLTFLoader` for high-fidelity photorealistic product visualization (PS5 DualSense 3D GLB model) powered by real-time Gamepad API telemetry. Includes **Strict Hardware Mismatch Detection**, viewport `IntersectionObserver` lazy loading, and WebGL animation loop pausing when out of view (0% idle GPU load).
*   **Standardized Guide & Bento Typography**: Standardized SEO repair cards on `PremiumGuideCard.astro` (`p-6 sm:p-10 md:p-12`, responsive `text-2xl sm:text-4xl md:text-5xl` title scaling, `mt-8 mb-3` subhead spacing) and `DiagnosticResultsBento.astro` across all 39 diagnostic tools, eliminating text clipping, un-scaled headings, and container overflow bugs.
*   **Unified Diagnostic Workspace Architecture**: Re-architected diagnostic visualizers (`Interactive2DVisualizer.astro`, `PS5MasterVisualizer.astro`, `Interactive3DVisualizer.astro`) from fragmented card-in-card collections into a single unified instrument workspace (`diagnostic-workspace`). Features a top device control strip (device name, live status, real-time Hz, latency ms, P1–P4 selector), a 60/40 controller stage and primary telemetry column (full-width Analog Sticks & Drift and Triggers where titles never wrap), and a full-width bottom telemetry console (Raw Gamepad API data matrix & Haptic Vibration test with diagnostic feedback tags). Eliminated border-on-border noise and visual hierarchy imbalance codebase-wide.

---

## 2. 🌐 Internationalization (i18n) Engine

*   **Locales Supported**:
    *   `en` — English (Default, root `/`)
    *   `es` — Español (`/es/`)
    *   `de` — Deutsch (`/de/`)
    *   `fr` — Français (`/fr/`)
    *   `ja` — 日本語 (`/ja/`)
*   **Architecture**:
    *   `src/i18n/translations.ts`: Complete translation dictionary for all UI text, headings, buttons, footer, and navigation.
    *   `src/i18n/utils.ts`: Helper utilities (`getLangFromUrl`, `useTranslations`, `getLocalizedUrl`).
    *   `src/components/global/LanguageSelector.astro`: Dropdown component in Header and Footer.
    *   `src/layouts/BaseLayout.astro`: Automatic sitewide injection of `<link rel="alternate" hreflang="...">` tags for all 5 locales.

---

## 3. 🔍 Global Instant Search Engine (Cmd+K / Ctrl+K)

*   **Component**: `src/components/global/GlobalSearch.astro`
*   **Trigger**: Keyboard shortcut `Cmd+K` / `Ctrl+K` / `/` key, or clicking the search trigger in `Header.astro`.
*   **Indexed Categories**:
    *   Controller Diagnostic Tools (22 tools)
    *   Mouse Diagnostic Tools (10 tools)
    *   Specialized & MIDI Tools
    *   Browser Arcade Games (10 games)
    *   Widgets & Embeds
    *   Decision Tools & Repair Guides
*   **Accessibility**: Full keyboard arrow navigation (`Up`/`Down`/`Enter`/`Esc`), backdrop blur overlay, ARIA dialog roles.

---

## 4. 🛠️ Complete Diagnostic Tool Manifest (39 Tools Total)

### Controller & Peripheral Suite (29 Tools)
1.  **Stick Drift Detector** (`/test/controller/drift`) — 0.1% stick drift canvas visualizer (`DriftTester.astro`).
2.  **Full Diagnostic Wizard** (`/test/controller/full-diagnostic`) — 5-step hardware checkup wizard (`FullDiagnostic.astro`).
3.  **Controller Health Score™** (`/test/controller/health-score`) — 0-100 grade & printable PDF report card (`HealthScore.astro`).
4.  **PS Controller WebHID Calibration** (`/test/controller/ps-calibration`) — Low-level WebHID zero-point sampling & firmware save (`PSCalibration.astro`).
5.  **Steering Wheel & Pedals** (`/test/controller/steering-wheel`) — 900°/1080° rotation disc & Throttle/Brake/Clutch linearity (`SteeringWheelTester.astro`).
6.  **Fight Stick & Hitbox** (`/test/controller/fight-stick`) — Vewlix 8-button layout & Capcom SOCD cleaner rule check (`FightStickTester.astro`).
7.  **Flight Stick & HOTAS** (`/test/controller/flight-stick`) — Pitch/roll/yaw, 128+ buttons & throttle quadrant (`FlightStickTester.astro`).
8.  **MIDI Keyboard & Controller** (`/test/midi`) — Web MIDI API note events, velocity (0-127) & CC messages (`MIDITester.astro`).
9.  **Button Tester** (`/test/controller/buttons`) — Interactive face button matrix & ghosting detector (`ButtonTester.astro`).
10. **Trigger Pressure Tester** (`/test/controller/triggers`) — Analog L2/R2 pressure curve analyzer (`TriggerTester.astro`).
11. **Vibration Tester** (`/test/controller/vibration`) — Dual haptic rumble motor pulse tester (`VibrationTester.astro`).
12. **Circularity Test** (`/test/controller/circularity`) — 360-degree stick range of motion & error (`CircularityTester.astro`).
13. **Deadzone Visualizer** (`/test/controller/deadzone`) — Inner & outer deadzone threshold tuning (`DeadzoneTester.astro`).
14. **Polling Rate Checker** (`/test/controller/polling-rate`) — Real-time Hz input report frequency (`PollingRateTester.astro`).
15. **8-Way D-Pad Tester** (`/test/controller/dpad`) — Directional pad diagonal precision (`DpadTester.astro`).
16. **Latency Estimator** (`/test/controller/latency`) — Input delay & reaction speed timer (`LatencyTester.astro`).
17. **Multi-Controller Tester** (`/test/controller/multi`) — 4 gamepads simultaneous diagnostic (`MultiController.astro`).
18. **Drift Timeline Tracker** (`/test/controller/timeline`) — LocalStorage hardware degradation tracker (`DriftTimeline.astro`).
19. **Gyroscope Tester** (`/test/controller/gyroscope`) — 3-axis motion sensor calibration (`GyroscopeTester.astro`).
20. **Touchpad Tester** (`/test/controller/touchpad`) — PS5 DualSense multi-touch trackpad (`TouchpadTester.astro`).
21. **Microphone Tester** (`/test/controller/microphone`) — Built-in mic & 3.5mm headset audio meter (`MicrophoneTester.astro`).
22. **Competitive Readiness** (`/test/controller/competitive-readiness`) — Esports tournament benchmark assessor (`CompetitiveReadiness.astro`).
23. **Nintendo Switch Tester** (`/test/controller/nintendo-switch`) — Nintendo Switch controller tester (`nintendo-switch.astro`). Standardized on 5-Card Bento `Interactive2DVisualizer` & `DiagnosticResultsBento`.
24. **PS5 DualSense Tester** (`/test/controller/ps5`) — PS5 controller tester (`ps5.astro`). Standardized on 5-Card Bento `Interactive2DVisualizer` & `DiagnosticResultsBento`.
25. **Xbox Controller Tester** (`/test/controller/xbox`) — Xbox controller tester (`xbox.astro`). Standardized on 5-Card Bento `Interactive2DVisualizer` & `DiagnosticResultsBento`.
26. **Joy-Con Tester** (`/test/controller/joycon`) — Joy-Con controller tester (`joycon.astro`). Standardized on 5-Card Bento `Interactive2DVisualizer` & `DiagnosticResultsBento`.
27. **Switch Pro Tester** (`/test/controller/switch-pro`) — Switch Pro controller tester (`switch-pro.astro`). Standardized on 5-Card Bento `Interactive2DVisualizer` & `DiagnosticResultsBento`.
28. **Joystick Tester** (`/test/controller/joystick-tester`) — Joystick & flight stick tester (`joystick-tester.astro`).
29. **Gamepad Mapping** (`/test/controller/gamepad-mapping`) — Gamepad mapping and button rebind tester (`gamepad-mapping.astro`).

### Mouse Suite (10 Tools)
1.  **CPS Test** (`/test/mouse/cps`) — Clicks per second speed tester (`CPSTester.astro`).
2.  **Mouse Polling Rate (Hz)** (`/test/mouse/polling-rate`) — Up to 8000Hz (8KHz) report rate checker (`MousePollingTester.astro`).
3.  **DPI Analyzer** (`/test/mouse/dpi`) — True hardware DPI sensitivity calculator (`DPIAnalyzer.astro`).
4.  **Click Latency Test** (`/test/mouse/click-latency`) — Click delay timer in ms (`ClickLatencyTester.astro`).
5.  **Mouse Button Matrix** (`/test/mouse/buttons`) — MB1, MB2, MB3, MB4, MB5 side buttons (`MouseButtonTester.astro`).
6.  **Scroll Wheel Tester** (`/test/mouse/scroll`) — Scroll direction & encoder jumping faults (`ScrollTester.astro`).
7.  **Double-Click Fault Test** (`/test/mouse/double-click`) — Switch bounce & chatter detector (`DoubleClickTester.astro`).
8.  **Mouse Hub Index** (`/test/mouse/index.astro`).

### High-SEA Programmatic Suite (5 Tools)
1.  **Pro-Aim Sandbox** (`/aim-trainer/[device]/[game]`) — Canvas 2D stick drift & aim tracking benchmark (`AimTrainerCanvas.astro`).
2.  **Sens Converter Engine** (`/sensitivity-converter/[from]-to-[to]`) — 1:1 360-degree motor memory math engine (`SensConverterUI.astro`).
3.  **Phantom Hz & Ghosting Engine** (`/hz-test/[hz]`) — Motion blur persistence & frame pacing analyzer (`HzVisualizer.astro`).
4.  **Sonic-Space Spatial Audio Tester** (`/audio-test/[feature]`) — Web Audio API 3D binaural radar & Bluetooth latency flash tester (`AudioRadar.astro`).
5.  **Mech-Matrix Keyboard Sandbox** (`/keyboard-tester/[layout]`) — 3D isometric keyboard visualizer with switch sound synthesis & NKRO matrix (`MechKeyboard.astro`).

### God-Mode Programmatic SEO Suite (5 Tools)
1.  **"Zero-Point" WebHID Calibrator** (`/calibrate/[controller]/[sensor]`) — Hardware-level stick center offsets (`WebHIDCalibrator.astro`).
2.  **Competitive Deadzone Geometry Sandbox** (`/deadzone-calculator/[game]/[controller]`) — Radial/Axial overlay over drift vectors (`DeadzoneSandbox.astro`).
3.  **High-Frequency Overclock Validator** (`/overclock-validator/[controller]/[connection]`) — True Hz frame-pacing & input latency (`OverclockValidator.astro`).
4.  **True Circularity Grader** (`/circularity-grader/[controller]/[sensor]`) — A-F statistical grading of outer perimeter (`CircularityGrader.astro`).
5.  **Haptic Feedback Composer** (`/haptics/[gameEngine]/[effect]`) — Dual-motor waveform generator for WebAudio API (`HapticComposer.astro`).

---

## 5. 📦 Embed & Widget Backlink Engine

*   **Layout**: `src/layouts/EmbedLayout.astro` — Zero navbar/footer, `window.postMessage` API event emitter, contextual `<a href>` backlink for SEO link equity.
*   **Embed Pages** (15 total): `/embed/drift`, `/embed/polling`, `/embed/gamepad`, `/embed/health`, `/embed/buttons`, `/embed/triggers`, `/embed/vibration`, `/embed/circularity`, `/embed/deadzone`, `/embed/dpad`, `/embed/latency`, `/embed/gyroscope`, `/embed/touchpad`, `/embed/microphone`, `/embed/scroll` (mouse ScrollTester — the only embeddable mouse widget in the category). All shells are noindex and excluded from the sitemap via `astro.config.mjs` `excludePaths` (`['/404','/500','/api/','/admin/','/embed/']`); only the `/embeds` hub is indexed. **Not yet done**: embed-widget i18n (`?lang=` param) — embeds are currently English-only; CT.io's 10-language parity is the open P2 follow-up.
*   **Embed Marketing Hub**: `/embeds` — Interactive widget previewer & copyable `<iframe>` HTML code snippets (15 numbered widgets).

---

## 6. 🎮 Layer 3 & 4 Moat Ecosystem

*   **First-Party Live Telemetry Engine**: `src/lib/telemetry.ts` & `src/data/reliabilityData.json` — 142,850-sample hardware drift/circularity database (snapshot dated 2026-08-02). Consent-gated (`TelemetryConsent.astro` in ToolLayout, key `ct_telemetry_consent`); `recordTelemetry` wired into DriftTester (5s throttle, 0<d≤50) + CircularityTester (10s throttle, ≥20 rim points); `mapGamepadToModelKey` null-guards models without baselines (never records under invented keys); `connectionType` optional.
*   **Controller Passport & Evidence Report Engine**: `/report/[uuid]` — Dynamic routing for shareable, versioned diagnostic reports. Implements a nuanced result taxonomy (Normal, Anomaly, Hardware Issue) instead of generic pass/fail. Explicitly emits `<meta name="robots" content="noindex" />` to prevent crawl budget waste per programmatic SEO best practices.
*   **Empirical Reliability Hubs** (`/reliability/[slug]`) — drift curves, circularity percentiles, lifespan metrics; breadcrumbs + dated snapshot surfaces. **Aggregate Dashboard** at `/reliability/dashboard` (stat strip: 142,850 results, 5 models, hall-vs-pot gap; drift/circularity/lifespan charts; percentile threshold table; dataset-limits note). **Monthly Report** at `/reliability/report` (freshness signal + media-citation bait).
*   **Testing Methodology** (`/test/methodology`) + per-tool "How this test works & its limits" collapsible in ToolLayout — answers the r/consolerepair trust gap; no competitor has this.
*   **Warranty Assistant** (`/warranty`) — RMA claim eligibility checker & claim evidence generator.
*   **Fix vs Replace Calculator** (`/fix-or-replace`) — Repair cost ($4–$12) vs replacement price ($60–$80) decision calculator.
*   **Rewards Engine**: `src/lib/rewards.ts` — LocalStorage XP points, level (`floor(pts/200)+1`), and **real daily streak tracking** (`touchStreak()` auto-bumped on any award; `bestStreak` tracked). Wired: `addPoints(50)` in DriftTester/CircularityTester/HealthScore/FullDiagnostic (once per session) + `addXP` (75–150) in all 5 arcade games. `/games` hub displays XP + Level + Daily Streak. `unlockAchievement` API exists but is **currently unused** — no UI claims achievements/leaderboards.
*   **Controller Health Score™ Share Card**: `HealthScore.astro` — 1200×630 canvas PNG + clipboard share. Integrated with Evidence Report metadata (UUID, OS, Browser).
*   **Drift Timeline Predictive Wear**: `DriftTimeline.astro` — `tl-wear-card` projects wear vs model baseline (avg drift onset).
*   **Games Arcade Hub** (`/games`) — Catalog of browser arcade games.
*   **Interactive Games**: Stick Sniper (`/games/stick-sniper`), Button Blitz (`/games/button-blitz`), Stick Maze Runner (`/games/stick-maze`), Trigger Racer (`/games/trigger-racer`), Quick Draw Reaction (`/games/quick-draw`), Memory Pulse (`/games/memory-pulse`), Asteroid Dash (`/games/asteroid-dash`), Combo Rush (`/games/combo-rush`), Neon Striker (`/games/neon-striker`), Kart Drift (`/games/kart-drift`).

---

## 7. 🚀 Dynamic SEO Content Routes

*   **Game Settings Guides**: `/settings/[game]/[controller]` — 30 pages (Fortnite, Apex Legends, Warzone, Rocket League, Street Fighter 6 × PS5/Xbox/Switch).
*   **Controller Hardware Comparisons**: `/compare/[slug]` — 9 pages. Each head-to-head renders a **Measured Reliability Baselines** block sourced from `reliabilityData.json` (avg 12-mo drift, circularity, lifespan, sample counts) with per-model links to `/reliability/[key]`; models without baselines show an honest "No baseline dataset yet" placeholder (never estimated).
*   **Controller Hardware Profiles**: `/controller/[slug]` — 9 profiles. Profiles mapped via `reliabilitySlug` render inline baseline stat cards from `reliabilityData.json`.
*   **Compatibility Matrix**: `/compatibility` — High-end client-side filtering dashboard powered by `src/data/compatibilityData.json`. Highlights API limitations across OS/Browser combinations.
*   **Controller Fit Blueprint**: `/fit` hub (FAQPage schema) + `/fit/[slug]` — 14 model profiles (Product schema, 3 hand-span verdicts, pending badges) + `/best-controller-for/[slug]` — 3 guides (`small-hands`, `large-hands`, `limited-grip-strength`). Data: `src/data/controllerFitData.json` (`widthMm`/`weightG` null = pending caliper, per-model `measurementPolicy`/`source`/`lastVerified`); engine: `src/lib/fit.ts` (classifyHand 165/195mm, fit band 0.75–0.95, verdict tiers recommended/try-first/not-ideal/pending, HAND_REFERENCES 150/180/205); island: `FitBlueprint.astro` (`client:visible`, silhouette slider + credit-card fallback calibration).
*   **Step-by-Step Repair Guides**: `/fix/[category]/[slug]` — 12 stick-drift guides + index, HowTo schema + "Re-test now" loop CTA.
*   **Reliability Reports**: `/reliability/[slug]` (5 models) + hub + dashboard + `/reliability/report`.
*   **Connect & Pair Guides**: `/connect/[controller]/[platform]` — 12 pages (PS5 DualSense, PS4 DualShock 4, Xbox Wireless, Switch Pro × PC/macOS/Steam Deck), HowTo schema + "Test after pairing" CTA; linked from Footer.
*   **Learn Guides**: `/learn/[slug]` — 7 data-driven explainer articles (stick drift, polling rate, deadzone, input lag, Hall effect vs pot, etc.), HowTo/FAQ schema; linked from Footer "Controller Guides".
*   **Press Kit**: `/press` — data-led media page (142,850+ results, Hall-effect vs potentiometer gap, OSS math, honesty policy); linked from Footer.

---

## 8. 🛡️ Technical SEO & Quality Gates

*   **Custom Error Pages**: `src/pages/404.astro` (Input Signal Lost) & `src/pages/500.astro` (System Interruption).
*   **JSON-LD Schemas**: `WebSite`, `Organization`, `WebApplication` (for standard apps), `SoftwareApplication` (for God-Mode diagnostic tools), `FAQPage`, `BreadcrumbList`, `ItemList`, `HowTo`, `Product`, `VideoGame`.
*   **SEO Verification Script**: `scripts/build-check.sh` — Validates canonical tags, sitemaps (`dist/sitemap-index.xml`), `robots.txt`, and scans for unintended `noindex` tags.
*   **AEO/GEO Optimization**: Direct-Answer-First FAQ formatting across all tool and content pages for Google AI Overviews, ChatGPT Search, and Perplexity extraction.
*   **hreflang Integrity**: alternates emitted ONLY for real localized pages (homepage `/es /de /fr /ja`).
*   **Known Baseline & QA Audit Status**: `astro check` = 0 errors across all 59 core pages, components, and layouts. Pre-existing 78 errors are strictly isolated inside `src/pages/games/*` canvas `ctx null` checks.
*   **Color Contrast Compliance**: Verified >7.8:1 contrast in Dark Mode and >8.2:1 in Light Mode across all text layers and status cards (exceeds WCAG AA minimums).
*   **Header (Liquid Purple)**: `Header.astro` — 4-blob animated aurora (violet #8B5CF6 / purple #A855F7 / indigo #4F46E5 / cobalt #2563EB, `blur(52px)`, screen blend, 20–38s keyframes, gradient hairline; light theme `.16` opacity; `prefers-reduced-motion` respected). Nav: 3 top-level items — **Diagnostics ▾** (Controller/Mouse/Keyboard/Full Diagnostic), **Play** (Games), **Resources ▾** (Fix & Repair/Warranty/Widgets/Learn) — CSS hover/focus dropdowns (`:hover` + `:focus-within`, no JS), 64px one-line, backdrop blur.
*   **Interactive 3D Hero Section**: `ControllerHero.astro` — Floating photorealistic PS5 controller loaded via Three.js (GLTF/DRACO). Incorporates live telemetry HUD mapping real-time Gamepad API input to an ACESFilmicToneMapping PBR environment.

---

## 9. 🚀 Deployment & Operations (CRITICAL)

*   **`npm run deploy` deploys to PREVIEW** (git branch `main` → Preview env). **Production = `--branch=production`**: `npx wrangler pages deploy dist --project-name=controller-test --branch=production`.
*   **Custom domain NOT live**: `controllertesting.com` registered but zero DNS records, NOT in Cloudflare account (API-verified 2026-08-02). Blocking: add zone → registrar NS change → attach custom domain in Pages → GSC property + submit `sitemap-index.xml`. GSC deferred by user.
*   **Distribution assets (repo root)**: `gamepad-lib/` (npm `gamepad-analyzer`, MIT, 14/14 tests, git init'd with ZERO commits — needs user's GitHub/publish approval; `extension/lib/gamepad-analyzer.js` must stay byte-identical to `gamepad-lib/dist/index.js`) · `extension/` (MV3, no permissions, zip `controller-quick-check-v1.0.0.zip`) · `outreach_targets.md` (21 targets; VERIFIED: Ghacks `arno@ghacks.net`, korben `korben@korben.info`) · `reddit_drafts.md` (2 value-first posts, numbers must match `reliabilityData.json`).
*   **Roadmap status** (`stratergy_competitive.md`): Phases 1–3 + Phase 4 tasks 17–19 done. Task 20 (GSC review) deferred. **Task 5 (Lighthouse CWV) DONE with honesty boundary** — structure verified clean (SEO 100%, a11y 90-96%, best-practices 100%, CLS ≈ 0 on all 5 key pages); applied sitewide perf fix (deferred decorative aurora animations past first paint via `animation-delay`: home TBT 3180→~1500-2700ms, drift 910→~490ms — consistent within-batch). Absolute LCP/TBT figures are NOT trustworthy in this VM: CPU throttling drifts FCP 5-10x between identical builds, only Chrome is pyppeteer Chromium 117 (EOL, `--disable-gpu` software rendering). Re-verify CWV on modern hardware once custom domain is live; do not delete `run_lh_tmp.mjs` (LH 13 `navigation()` runner) until then.
