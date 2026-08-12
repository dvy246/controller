# 🎮 ControllerTesting.com — Master System Specification & Architecture Manifest

This document serves as the absolute source of truth for all AI agents, software architects, and engineers working on **ControllerTesting.com**. It contains an exhaustive, verified record of every feature, design token, diagnostic tool, i18n specification, search mechanism, and SEO structure implemented in the repository.

---

## 1. 🏗️ Core Technology Architecture

*   **Framework**: Astro 5.x SSG (Static Site Generation), pre-rendering 100% of HTML pages at build time.
*   **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (`@import "tailwindcss"` and `@theme` tokens in `src/styles/global.css`).
*   **Client Interactivity**: Vanilla JS & Astro Client Islands (`client:visible`, `client:idle`). Zero heavy JavaScript framework overhead on content pages.
*   **Typography**: Geist Sans & Geist Mono font stack. **Inter and Roboto are strictly banned**.
*   **Design System**: 5-Layer Surface Depth System (`--color-surface-0` through `--color-surface-4`), Electric Cobalt accent (`#2563EB`), Pass Emerald (`#10B981`), Warning Amber (`#F59E0B`), Fail Red (`#EF4444`). Uses 8px Spatial Grid System (`--space-1` through `--space-24`) and sitewide **Gradient Hairline Mask & Specular Glass Highlight System** (`.card-base::before` multi-stop gradient mask, `.card-base::after` top specular highlight bar) for all tool cards, action cards, and bento grids codebase-wide. Banned all inline `style="margin-top: ..."` overrides codebase-wide.
*   **High-Performance Scrolling Engine**: Hardware-accelerated smooth scrolling (`scroll-behavior: smooth`, `scroll-padding-top: 5rem`), thin custom WebKit/Firefox scrollbars, and compositor-only `IntersectionObserver` scroll reveal (`[data-reveal]`) with immediate `unobserve()` garbage collection to preserve Core Web Vitals and zero main-thread CPU overhead.
*   **Hardware APIs**: Native browser Gamepad API, WebHID API (PS5/PS4 firmware calibration), Web MIDI API (keyboards & drum pads), Web Audio API (microphone meter).
*   **3D Interactive Graphics**: Three.js (bundled via direct npm `three` package with local Vite ESM chunking for zero CDN runtime failures) with `GLTFLoader` for high-fidelity photorealistic product visualization (PS5 DualSense 3D GLB model) powered by real-time Gamepad API telemetry. Includes **Strict Hardware Mismatch Detection**, viewport `IntersectionObserver` lazy loading, and WebGL animation loop pausing when out of view (0% idle GPU load).
*   **Standardized Guide & Bento Typography**: Standardized SEO repair cards on `PremiumGuideCard.astro` (`p-6 sm:p-10 md:p-12`, responsive `text-2xl sm:text-4xl md:text-5xl` title scaling, `mt-8 mb-3` subhead spacing) and `DiagnosticResultsBento.astro` across all 39 diagnostic tools, eliminating text clipping, un-scaled headings, and container overflow bugs. Refined hero header card type scale (`clamp(1.25rem, 2.2vw, 1.75rem)` / 20-28px `tool-title`, `0.875rem` description, `padding: 0 1.25rem 1.25rem`). Re-architected all diagnostic cards (`DiagnosticResultsBento.astro`, action cards, `.tool-hub-card`) into a single-border dark bento grid (`bg-[#121215]`, `border-white/10`, `rounded-2xl`, `p-6 sm:p-7`) with top square icon containers, aligned badge pills, bold titles, readable body copy, and full-width action links.
*   **Unified Diagnostic Workspace Architecture**: Re-architected diagnostic visualizers (`Interactive2DVisualizer.astro`, `PS5MasterVisualizer.astro`, `Interactive3DVisualizer.astro`) into a single unified instrument workspace encapsulated by a **Radiant Ambient Under-Glow**, a **Shimmering Multi-Stop Gradient Hairline Shell** (`bg-gradient-to-b from-blue-500/40 via-white/10 to-indigo-500/30`), and a **Top Glass Specular Highlight Glow Bar** (`shadow-[0_0_12px_#3B82F6]`). Includes dedicated 2D Vector Graphic components matching physical hardware 1:1 — **Xbox Wireless Controller** (`XboxSVG.astro`), **PlayStation DualShock 4 Controller** (`PlayStationSVG.astro`), **Dual Nintendo Switch Joy-Cons** (`DualJoyConSVG.astro`), and **Nintendo Switch Pro Controller** (`SwitchProSVG.astro`) with real-time button highlights, symmetrical & asymmetrical thumbsticks, and D-Pad tracking. Features a top control strip, a 60/40 stage, and a full-width bottom telemetry console (Raw Gamepad API matrix & Haptic Vibration test with **Custom Vibration Intensity Slider**). Integrated a standardized 3-Step Guide (`HowToGetStarted.astro`) across all 39 diagnostic tools matching `controllertest.io` reference design. Eliminated border-on-border noise and visual hierarchy imbalance codebase-wide.

---

## 2. 🌐 Internationalization (i18n) Engine

*   **Status: EN-ONLY LAUNCH (decision 2026-08-10).** Locale trees (`/es /de /fr /ja /pt /ko /ru /zh-tw /it`) are **disabled** until genuine translations exist. `BaseLayout.astro` keeps `languageSet` empty, so **zero hreflang alternate links are emitted sitewide** — no `/es /de ...` pages exist in `dist/` and none are built. Do NOT re-enable via `sync-locales.js`/`add_localized.py` English-content copies: those previously pointed hreflang at English duplicates and would re-trigger "Duplicate, Google chose different canonical" issues.
*   **Locale codegen tooling still present but dormant**: 10-locale sitemap branch in `astro.config.mjs` `serialize` + `src/i18n/` dictionary — no runtime effect while `languageSet` is empty.
*   **Architecture (dormant)**: `src/i18n/translations.ts` (UI dictionary), `src/i18n/utils.ts` (`getLangFromUrl`, `useTranslations`, `getLocalizedUrl`); `src/components/global/LanguageSelector.astro` Dropdown; `BaseLayout.astro` hreflang injection would auto-emit for all locales once enabled.
*   **OG locale pinned**: `og:locale` = `en_US` on all pages.

---

## 3. 🔍 Global Instant Search Engine (Cmd+K / Ctrl+K)

*   **Component**: `src/components/global/GlobalSearch.astro`
*   **Trigger**: Keyboard shortcut `Cmd+K` / `Ctrl+K` / `/` key, or clicking the search trigger in `Header.astro`.
*   **Indexed Categories**:
    *   Controller Diagnostic Tools (22 tools)
    *   Mouse Diagnostic Tools (10 tools)
    *   Specialized & MIDI Tools
    *   Browser Arcade Games (5 games)
    *   Widgets & Embeds
    *   Decision Tools & Repair Guides
*   **Accessibility**: Full keyboard arrow navigation (`Up`/`Down`/`Enter`/`Esc`), backdrop blur overlay, ARIA dialog roles.

---

## 4. 🛠️ Complete Diagnostic Tool Manifest (39 Tools Total = 32 Controller & Peripheral + 7 Mouse)

### Controller & Peripheral Suite (32 Tools, incl. MIDI)
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

*   **First-Party Live Telemetry Engine**: `src/lib/telemetry.ts` & `src/data/reliabilityData.json` — **modeled reference baselines** (drift/circularity/lifespan/percentiles for 5 models, `datasetSource: "modeled-reference"`, `communitySamples: 0`). **No fabricated sample counts — `totalSamplesMeasured`/per-model `samples` were removed 2026-08-10**; any "measured/verified/tested" figure must be true or labeled simulated (hard rule before AdSense). Consent-gated (`TelemetryConsent.astro` in ToolLayout, key `ct_telemetry_consent`); `recordTelemetry` (DriftTester 5s throttle 0<d≤50, CircularityTester 10s throttle ≥20 rim points) writes localStorage log AND fire-and-forget POSTs `/api/telemetry` with `x-ct-consent: granted`; server rate-limits 5 samples/IP/60s (KV `ratelimit:<ip>` TTL 60) and rejects unknown model keys (`telemetry:<model>:<ts>:<rand>` — never invented keys). Homepage count-up reads `GET /api/telemetry/count` (KV-cached 60s, `{total, perModel}`) and shows 0 until real samples exist. **KV namespaces NOT created yet**: `TELEMETRY_KV`/`PASSPORT_KV` + `PASSPORT_SIGNING_SECRET` must be added in the Pages dashboard (see `wrangler.toml`); endpoints 503 `not_configured` until then.
*   **Controller Passport & Evidence Report Engine**: `/report/[uuid]` — Dynamic routing for shareable, versioned diagnostic reports. Implements a nuanced result taxonomy (Normal, Anomaly, Hardware Issue) instead of generic pass/fail. Explicitly emits `<meta name="robots" content="noindex" />` to prevent crawl budget waste per programmatic SEO best practices. **Flagship `/passport` inspection page** (`src/pages/passport.astro`): 5-point hardware inspection form → timestamped health report with grade badge, metrics, checklist summary, repair before/after comparison, print/PDF, shareable report link, and copyable embed snippet. Report output uses `card-base card-gradient` premium shell (gradient hairline + radial specular) revealed via the `hidden` attribute (NOT the `hidden` class — a class-based `hidden` + `output.hidden=false` mismatch previously kept the generated report permanently invisible). Theme-aware global `.badge-*` classes (not hardcoded rgba) for correct light-mode contrast.
*   **Empirical Reliability Hubs** (`/reliability/[slug]`) — modeled drift curves, circularity percentiles, lifespan metrics; breadcrumbs + dated snapshot surfaces. **Aggregate Dashboard** at `/reliability/dashboard` (community-samples stat strip — 0 until real telemetry exists, 5 models, hall-vs-pot gap; drift/circularity/lifespan charts; percentile threshold table; "engineering estimates, not measured results" note). **Monthly Report** at `/reliability/report` (freshness signal + media-citation bait).
*   **Testing Methodology** (`/test/methodology`) + per-tool "How this test works & its limits" collapsible in ToolLayout — answers the r/consolerepair trust gap; no competitor has this.
*   **Warranty Assistant** (`/warranty`) — RMA claim eligibility checker & claim evidence generator.
*   **Fix vs Replace Calculator** (`/fix-or-replace`) — Repair cost ($4–$12) vs replacement price ($60–$80) decision calculator.
*   **Rewards Engine**: `src/lib/rewards.ts` — LocalStorage XP points, level (`floor(pts/200)+1`), and **real daily streak tracking** (`touchStreak()` auto-bumped on any award; `bestStreak` tracked). Wired: `addPoints(50)` in DriftTester/CircularityTester/HealthScore/FullDiagnostic (once per session) + `addXP` (75–150) in all 13 arcade games. `/games` hub displays XP + Level + Daily Streak. `unlockAchievement` API exists but is **currently unused** — no UI claims achievements/leaderboards.
*   **Controller Health Score™ Share Card**: `HealthScore.astro` — 1200×630 canvas PNG + clipboard share. Integrated with Evidence Report metadata (UUID, OS, Browser).
*   **Drift Timeline Predictive Wear**: `DriftTimeline.astro` — `tl-wear-card` projects wear vs model baseline (avg drift onset).
*   **Games Arcade Hub** (`/games`) — Catalog of browser arcade games. All games share `GameHowToPlay.astro` guide component and wire `addXP` (75–150) on game over.
*   **Bidirectional Test↔Game Interlink Engine**: `src/data/arcadeInterlinks.ts` (central registry: `GAMES` 13, `TOOLS` 15, `TOOL_GAME_LINKS` 16 tool→game maps, `GAME_TOOL_LINKS` 13 game→tool maps, resolvers `resolveGamesForTool` / `resolveToolsForGame`) + `src/components/global/InterlinkStrip.astro` (theme-aware card strip, dark/light via design tokens, `data-reveal`, badge + XP pill + CTA). Wired into `ToolLayout.astro` (auto-resolves via `Astro.url.pathname` — note: at build the pathname carries a `.html` suffix, so the resolver strips it) rendering a "Practice what you just tested" games strip on all 16 mapped tool routes, and into all 13 `src/pages/games/*.astro` pages rendering a "Verify with a diagnostic tool" tools strip. Zero JS — pure SSG HTML. Verified via `interlink-probe.mjs` (60 checks: both themes × desktop/mobile × positive/negative cases) = ALL PASS.
*   **Interactive Games (13 total)**:
    *   Stick Sniper (`/games/stick-sniper`, 50 XP) — analog stick aim.
    *   Button Blitz (`/games/button-blitz`, 50 XP) — face button mashing.
    *   Stick Maze Runner (`/games/stick-maze`, 100 XP) — stick-maze navigation.
    *   Trigger Racer (`/games/trigger-racer`, 150 XP) — trigger pressure racing.
    *   Quick Draw Reaction (`/games/quick-draw`, 75 XP) — reaction timer.
    *   Nova Blaster (`/games/nova-blaster`, 100 XP) — twin-stick shooter.
    *   Beat Drop (`/games/beat-drop`, 75 XP) — rhythm timing.
    *   Memory Pulse (`/games/memory-pulse`, 125 XP) — stick/button Simon game.
    *   Asteroid Dash (`/games/asteroid-dash`, 125 XP) — dodge & collect.
    *   Combo Rush (`/games/combo-rush`, 150 XP) — dpad combo sequence.
    *   Neon Striker (`/games/neon-striker`, 150 XP) — twin-stick bullet hell.
    *   Kart Drift (`/games/kart-drift`, 150 XP) — 4-player top-down racer.
    *   Signal Salvage (`/games/signal-salvage`, 150 XP) — 2-player twin-stick repair duel.
    All rendered via shared canvas pipeline; combo-rush reads dpad (`buttons[12..15]`). Mobile-verified at 390px (no overflow, no console errors).

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
*   **Press Kit**: `/press` — data-led media page (Hall-effect vs potentiometer gap, OSS math, honesty policy, community telemetry at 0 until real samples exist); linked from Footer.

---

## 8. 🛡️ Technical SEO & Quality Gates

*   **Custom Error Pages**: `src/pages/404.astro` (Input Signal Lost) & `src/pages/500.astro` (System Interruption).
*   **JSON-LD Schemas**: `WebSite`, `Organization`, `WebApplication` (for standard apps), `SoftwareApplication` (for God-Mode diagnostic tools), `FAQPage`, `BreadcrumbList`, `ItemList`, `HowTo`, `Product`, `VideoGame`.
*   **SEO Verification Script**: `scripts/build-check.sh` — Validates canonical tags, sitemaps (`dist/sitemap-index.xml`), `robots.txt`, and scans for unintended `noindex` tags.
*   **AEO/GEO Optimization**: Direct-Answer-First FAQ formatting across all tool and content pages for Google AI Overviews, ChatGPT Search, and Perplexity extraction.
*   **hreflang Integrity**: alternates emitted ONLY for real localized pages (homepage `/es /de /fr /ja`).
*   **Known Baseline & QA Audit Status**: `astro check` returns a nonzero error count (documented pre-existing debt; last full sweep 2026-08-09: 2876 errors across 1346 files — the bulk isolated in `src/components/tools/controller/HealthScore.astro` ~163, `drift.astro` ~54, arcade games canvas `ctx null` checks, and ~269 per untracked localized tree `src/pages/{es,de,fr,ja,zh-tw}/` added by `add_localized.py`/`sync-locales.js`; `contribute.astro` was 2 errors until `PremiumGuideCard.astro` Props were widened). My edited files hold 0 errors. Build emits **3220 pages** with the localized trees present (321 without). **IMPORTANT**: the "78 game errors" claim was stale — real baseline is far higher because the tree grew (zh-tw localized pages, games, God-Mode tools).
*   **Bidirectional Interlink Verification (2026-08-09)**: `interlink-probe.mjs` (60 checks) = **ALL PASS** — games strips on 8 mapped tool routes, tools strips on 10 game pages, correct card counts, correct hrefs, both themes, desktop+390px mobile, zero horizontal scroll, negative cases (unmapped routes) correctly strip-free. Also fixed two real bugs found during the sweep: (1) drift page `.export-buttons` overflowed 390px (buttons row lacked `flex-wrap: wrap`); (2) `.doppelrand-shell` was `overflow: visible`, letting the 150%-wide decorative `.ambient-glow` create body-level horizontal scroll on drift/god-mode pages — fixed with `overflow-x: clip` (visual glow preserved, scrollWidth now == clientWidth on all breakpoints). **`contribute.astro` build fix**: the untracked page imported `PremiumGuideCard` from `../components/features/` but the component lives at `../components/seo/` — corrected (the wrong path broke the build). Verified clean: 0 overflow, 0 console errors, dark+light × 1440/390px.
*   **Color Contrast Compliance**: Verified >7.8:1 contrast in Dark Mode and >8.2:1 in Light Mode across all text layers and status cards (exceeds WCAG AA minimums). CDP light-mode sweep (`sweep.mjs`, 47 routes) = **0 illegible elements**; game pages sweep = 0. **Full-site regression 2026-08-09**: `sweep2.mjs` (67 routes light) + `sweep2-dark.mjs` = **0 illegible**; `clean-scan.mjs` (i18n) = 8/8 CLEAN; `full-overflow.mjs` (92 routes) = mobile `osh:0` everywhere, desktop 0 issues (mobile `hiddenOver` flags are false positives: aurora-blob decorations clipped by `.header-aurora { overflow:hidden }` + the new clipped `.ambient-glow`); `gameverify.mjs` = 20/20 (10 games × both themes) 0 console errors; `gameplay2.mjs` = 10/10 XP/level/failure-state paths clean. Dark-in-both-themes instruments (God-Mode tools + legacy `#*-tester-root` workspaces) carry ID-scoped `[data-theme="light"]` overrides in `src/styles/global.css` — generic light-mode `h1-h4/strong/p` remaps are blocked from overriding their dark palettes. **Mobile layout verified at 390px across 65+ pages** (games, tools, passport, hubs, God-Mode, report, error pages): zero horizontal overflow and zero console errors.
*   **Header (Liquid Purple)**: `Header.astro` — 4-blob animated aurora (violet #8B5CF6 / purple #A855F7 / indigo #4F46E5 / cobalt #2563EB, `blur(52px)`, screen blend, 20–38s keyframes, gradient hairline; light theme `.16` opacity; `prefers-reduced-motion` respected). Nav: 3 top-level items — **Diagnostics ▾** (Controller/Mouse/Keyboard/Full Diagnostic), **Play ▾** (all 13 arcade games, 2-column dropdown with XP badges, generated from `arcadeInterlinks.ts` `GAMES` registry; mobile drawer lists all 13 too), **Resources ▾** (Fix & Repair/Warranty/Widgets/Learn) — CSS hover/focus dropdowns (`:hover` + `:focus-within`, no JS), 64px one-line, backdrop blur.
*   **Interactive 3D Hero Section**: `ControllerHero.astro` — Floating photorealistic PS5 controller loaded via Three.js (GLTFLoader + self-hosted `MeshoptDecoder` + `KTX2Loader`/Basis transcoder; GLB is gltfpack-optimized: meshopt mesh compression + UASTC color / ETC1S normal-attrib KTX2 textures, 6.5MB → 1.2MB). Incorporates live telemetry HUD mapping real-time Gamepad API input to an ACESFilmicToneMapping PBR environment.

---

## 9. 🚀 Deployment & Operations (CRITICAL)

*   **`npm run deploy` deploys to PREVIEW** (git branch `main` → Preview env). **Production = `--branch=production`**: `npx wrangler pages deploy dist --project-name=controller-test --branch=production`.
*   **Custom domain NOT live**: `controllertesting.com` registered but zero DNS records, NOT in Cloudflare account (API-verified 2026-08-02). Blocking: add zone → registrar NS change → attach custom domain in Pages → GSC property + submit `sitemap-index.xml`. GSC deferred by user.
*   **Distribution assets (repo root)**: `gamepad-lib/` (npm `gamepad-analyzer`, MIT, 14/14 tests, git init'd with ZERO commits — needs user's GitHub/publish approval; `extension/lib/gamepad-analyzer.js` must stay byte-identical to `gamepad-lib/dist/index.js`) · `extension/` (MV3, no permissions, zip `controller-quick-check-v1.0.0.zip`) · `outreach_targets.md` (21 targets; VERIFIED: Ghacks `arno@ghacks.net`, korben `korben@korben.info`) · `reddit_drafts.md` (2 value-first posts, numbers must match `reliabilityData.json`).
*   **Roadmap status** (`stratergy_competitive.md`): Phases 1–3 + Phase 4 tasks 17–19 done. Task 20 (GSC review) deferred. **Task 5 (Lighthouse CWV) DONE with honesty boundary** — structure verified clean (SEO 100%, a11y 90-96%, best-practices 100%, CLS ≈ 0 on all 5 key pages); applied sitewide perf fix (deferred decorative aurora animations past first paint via `animation-delay`: home TBT 3180→~1500-2700ms, drift 910→~490ms — consistent within-batch). Absolute LCP/TBT figures are NOT trustworthy in this VM: CPU throttling drifts FCP 5-10x between identical builds, only Chrome is pyppeteer Chromium 117 (EOL, `--disable-gpu` software rendering). Re-verify CWV on modern hardware once custom domain is live; do not delete `run_lh_tmp.mjs` (LH 13 `navigation()` runner) until then.
