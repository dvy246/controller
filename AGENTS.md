# 🎮 ControllerTesting.com — Master System Specification & Architecture Manifest

This document serves as the absolute source of truth for all AI agents, software architects, and engineers working on **ControllerTesting.com**. It contains an exhaustive, verified record of every feature, design token, diagnostic tool, i18n specification, search mechanism, and SEO structure implemented in the repository.

---

## 1. 🏗️ Core Technology Architecture

*   **Framework**: Astro 5.x SSG (Static Site Generation), pre-rendering 100% of HTML pages at build time.
*   **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (`@import "tailwindcss"` and `@theme` tokens in `src/styles/global.css`).
*   **Client Interactivity**: Vanilla JS & Astro Client Islands (`client:visible`, `client:idle`). Zero heavy JavaScript framework overhead on content pages.
*   **Typography**: Geist Sans & Geist Mono font stack. **Inter and Roboto are strictly banned**.
*   **Design System**: 5-Layer Surface Depth System (`--color-surface-0` through `--color-surface-4`), Electric Cobalt accent (`#2563EB`), Pass Emerald (`#10B981`), Warning Amber (`#F59E0B`), Fail Red (`#EF4444`).
*   **Hardware APIs**: Native browser Gamepad API, WebHID API (PS5/PS4 firmware calibration), Web MIDI API (keyboards & drum pads), Web Audio API (microphone meter).

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
    *   Browser Arcade Games (5 games)
    *   Widgets & Embeds
    *   Decision Tools & Repair Guides
*   **Accessibility**: Full keyboard arrow navigation (`Up`/`Down`/`Enter`/`Esc`), backdrop blur overlay, ARIA dialog roles.

---

## 4. 🛠️ Complete Diagnostic Tool Manifest (32 Tools Total)

### Controller & Peripheral Suite (22 Tools)
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

---

## 5. 📦 Embed & Widget Backlink Engine

*   **Layout**: `src/layouts/EmbedLayout.astro` — Zero navbar/footer, `window.postMessage` API event emitter, contextual `<a href>` backlink for SEO link equity.
*   **Embed Pages**: `/embed/drift`, `/embed/polling`, `/embed/gamepad`, `/embed/health`.
*   **Embed Marketing Hub**: `/embeds` — Interactive widget previewer & copyable `<iframe>` HTML code snippets.

---

## 6. 🎮 Layer 3 & 4 Moat Ecosystem

*   **First-Party Live Telemetry Engine**: `src/lib/telemetry.ts` & `src/data/reliabilityData.json` — Empirical hardware stick drift & circularity sensor database collected directly from live diagnostic runs.
*   **Empirical Reliability Hubs** (`/reliability/[slug]`) — Programmatic SEO pages displaying measured drift degradation curves, circularity percentiles, and sensor lifespan metrics across 140,000+ live hardware tests.
*   **Warranty Assistant** (`/warranty`) — RMA claim eligibility checker & claim evidence generator.
*   **Fix vs Replace Calculator** (`/fix-or-replace`) — Repair cost ($4–$12) vs replacement price ($60–$80) decision calculator.
*   **Rewards & Achievements Engine**: `src/lib/rewards.ts` — LocalStorage XP points, streak tracking, unlockable achievements.
*   **Games Arcade Hub** (`/games`) — Catalog of browser arcade games.
*   **Interactive Games**: Stick Sniper (`/games/stick-sniper`), Button Blitz (`/games/button-blitz`), Stick Maze Runner (`/games/stick-maze`), Trigger Racer (`/games/trigger-racer`), Quick Draw Reaction (`/games/quick-draw`).

---

## 7. 🚀 Dynamic SEO Content Routes

*   **Game Settings Guides**: `/settings/[game]/[controller]` (Fortnite, Apex Legends, Warzone, Rocket League, Street Fighter 6 on PS5, Xbox, Switch).
*   **Controller Hardware Comparisons**: `/compare/[slug]` (PS5 DualSense vs Xbox Series, DualSense Edge vs Xbox Elite Series 2).
*   **Controller Hardware Profiles**: `/controller/[slug]` (PS5 DualSense, Xbox Wireless, Switch Pro).
*   **Step-by-Step Repair Guides**: `/fix/[category]/[slug]` (PS5 DualSense Drift Repair).

---

## 8. 🛡️ Technical SEO & Quality Gates

*   **Custom Error Pages**: `src/pages/404.astro` (Input Signal Lost) & `src/pages/500.astro` (System Interruption).
*   **JSON-LD Schemas**: `WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`, `ItemList`, `HowTo`, `Product`, `VideoGame`.
*   **SEO Verification Script**: `scripts/build-check.sh` — Validates canonical tags, sitemaps (`dist/sitemap-index.xml`), `robots.txt`, and scans for unintended `noindex` tags.
*   **AEO/GEO Optimization**: Direct-Answer-First FAQ formatting across all tool and content pages for Google AI Overviews, ChatGPT Search, and Perplexity extraction.
