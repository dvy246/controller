# 🎮 ControllerTesting.com — Master Agents & System Specification

This document serves as the single source of truth for all AI agents, engineers, and automated tools working on **ControllerTesting.com**. It contains an exhaustive, non-hallucinated manifest of every architectural decision, design system rule, feature, tool, route, i18n mechanism, and SEO specification in the codebase.

---

## 1. 🏗️ Tech Stack & Architecture Overview

*   **Framework**: Astro 5.x (SSG / Static Site Generation)
*   **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (`@import "tailwindcss"` and `@theme` tokens in `src/styles/global.css`)
*   **Interactivity**: Vanilla JS & Astro Client Islands (`client:visible`, `client:idle`). Zero heavy JavaScript frameworks on content pages.
*   **Typography**: `Geist` (Display & Body) and `Geist Mono` (Data, Numbers, Timers, Coordinates). **Inter and Roboto are strictly banned**.
*   **Color System**: 5-Layer Surface Depth (`--color-surface-0` to `--color-surface-4`), Electric Cobalt accent (`#2563EB`), Pass Emerald (`#10B981`), Warning Amber (`#F59E0B`), Fail Red (`#EF4444`).
*   **Hardware APIs**: Native browser Gamepad API, WebHID API (PS5/PS4 firmware calibration), Web MIDI API (keyboards & drum pads), Web Audio API (microphone meter).

---

## 2. 🌐 Internationalization (i18n) Engine

*   **Supported Languages**:
    *   `en` — English (Default, root `/`)
    *   `es` — Español (`/es/`)
    *   `de` — Deutsch (`/de/`)
    *   `fr` — Français (`/fr/`)
    *   `ja` — 日本語 (`/ja/`)
*   **Implementation**:
    *   `src/i18n/translations.ts`: Key-value translation dictionaries for all UI text, headings, buttons, footer, and navigation.
    *   `src/i18n/utils.ts`: Helper functions (`getLangFromUrl`, `useTranslations`, `getLocalizedUrl`).
    *   `src/components/global/LanguageSelector.astro`: Accessible dropdown selector rendered in Header and Footer.
    *   `src/layouts/BaseLayout.astro`: Sitewide injection of `<link rel="alternate" hreflang="...">` tags for all 5 locales.

---

## 3. 🔍 Global Search Engine (Cmd+K / Ctrl+K)

*   **Component**: `src/components/global/GlobalSearch.astro`
*   **Trigger**: Shortcut keys `Cmd+K` / `Ctrl+K` / `/` key, or clicking the search trigger in `Header.astro`.
*   **Indexed Categories**:
    *   Controller Diagnostic Tools (22 tools)
    *   Mouse Diagnostic Tools (10 tools)
    *   Specialized & MIDI Tools
    *   Browser Arcade Games (5 games)
    *   Widgets & Embeds
    *   Decision Tools & Repair Guides
*   **Accessibility**: Full keyboard navigation (`Up`/`Down` arrows, `Enter` to navigate, `Esc` to close), backdrop blur, ARIA dialog roles.

---

## 4. 🛠️ Complete Diagnostic Tool Manifest (32 Tools Total)

### A. Controller & Peripheral Diagnostic Suite (22 Tools)
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

### B. Mouse Diagnostic Suite (10 Tools)
1.  **CPS Test** (`/test/mouse/cps`) — Clicks per second speed tester (`CPSTester.astro`).
2.  **Mouse Polling Rate (Hz)** (`/test/mouse/polling-rate`) — Up to 8000Hz (8KHz) report rate checker (`MousePollingTester.astro`).
3.  **DPI Analyzer** (`/test/mouse/dpi`) — True hardware DPI sensitivity calculator (`DPIAnalyzer.astro`).
4.  **Click Latency Test** (`/test/mouse/click-latency`) — Click delay timer in ms (`ClickLatencyTester.astro`).
5.  **Mouse Button Matrix** (`/test/mouse/buttons`) — MB1, MB2, MB3, MB4, MB5 side buttons (`MouseButtonTester.astro`).
6.  **Scroll Wheel Tester** (`/test/mouse/scroll`) — Scroll direction & encoder jumping faults (`ScrollTester.astro`).
7.  **Double-Click Fault Test** (`/test/mouse/double-click`) — Switch bounce & chatter detector (`DoubleClickTester.astro`).
8.  **Mouse Hub Index** (`/test/mouse/index.astro`).

### C. High-SEA Programmatic Suite (5 Tools)
1.  **Pro-Aim Sandbox** (`/aim-trainer/[device]/[game]`) — Canvas 2D stick drift & aim tracking benchmark (`AimTrainerCanvas.astro`).
2.  **Sens Converter Engine** (`/sensitivity-converter/[from]-to-[to]`) — 1:1 360-degree motor memory math engine (`SensConverterUI.astro`).
3.  **Phantom Hz & Ghosting Engine** (`/hz-test/[hz]`) — Motion blur persistence & frame pacing analyzer (`HzVisualizer.astro`).
4.  **Sonic-Space Spatial Audio Tester** (`/audio-test/[feature]`) — Web Audio API 3D binaural radar & Bluetooth latency flash tester (`AudioRadar.astro`).
5.  **Mech-Matrix Keyboard Sandbox** (`/keyboard-tester/[layout]`) — 3D isometric keyboard visualizer with switch sound synthesis & NKRO matrix (`MechKeyboard.astro`).

---

## 5. 📦 Embed & Widget Backlink Engine

*   **Layout**: `src/layouts/EmbedLayout.astro` — Zero navbar/footer, `window.postMessage` API event emitter, contextual `<a href>` backlink for SEO link equity.
*   **Embed Pages**:
    *   `/embed/drift` — Stick Drift Detector widget
    *   `/embed/polling` — Polling Rate Hz widget
    *   `/embed/gamepad` — Full Gamepad Tester widget
    *   `/embed/health` — Controller Health Score widget
*   **Embed Marketing Hub**: `/embeds` — Interactive widget previewer & copyable `<iframe>` HTML code snippets.

---

## 6. 🎮 Layer 3 & 4 Moat Ecosystem

*   **First-Party Live Telemetry Engine**: `src/lib/telemetry.ts` & `src/data/reliabilityData.json` — Empirical hardware stick drift & circularity sensor database collected directly from live diagnostic runs.
*   **Empirical Reliability Hubs** (`/reliability/[slug]`) — Programmatic SEO pages displaying measured drift degradation curves, circularity percentiles, and sensor lifespan metrics across 140,000+ live hardware tests.
*   **Warranty Assistant** (`/warranty`) — RMA claim eligibility checker & claim evidence generator.
*   **Fix vs Replace Calculator** (`/fix-or-replace`) — Repair cost ($4–$12) vs replacement price ($60–$80) decision calculator.
*   **Rewards & Achievements Engine**: `src/lib/rewards.ts` — LocalStorage XP points, streak tracking, unlockable achievements.
*   **Games Arcade Hub** (`/games`) — Catalog of browser arcade games.
*   **Interactive Games**:
    1.  *Stick Sniper Aim Trainer* (`/games/stick-sniper`) — Canvas target acquisition.
    2.  *Button Blitz Reaction Challenge* (`/games/button-blitz`) — Reflex button prompt challenge.
    3.  *Stick Maze Runner* (`/games/stick-maze`) — Analog stick vector corridor maze navigation.
    4.  *Trigger Racer* (`/games/trigger-racer`) — Analog trigger throttle zone modulation.
    5.  *Quick Draw Reaction* (`/games/quick-draw`) — Millisecond signal reaction shootout.

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

---

## 9. 📁 Directory Structure Summary

```
controllertesting/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/
│   │   ├── global/ (Header, Footer, Breadcrumbs, GlobalSearch, LanguageSelector)
│   │   └── tools/ (controller/, mouse/, midi/)
│   ├── i18n/ (translations.ts, utils.ts)
│   ├── layouts/ (BaseLayout, ToolLayout, EmbedLayout)
│   ├── lib/ (gamepad.ts, mouse.ts, rewards.ts)
│   ├── pages/
│   │   ├── index.astro, 404.astro, 500.astro, warranty.astro, fix-or-replace.astro, embeds.astro
│   │   ├── es/, de/, fr/, ja/ (localized pages)
│   │   ├── test/ (controller/, mouse/, midi.astro)
│   │   ├── games/ (stick-sniper, button-blitz, stick-maze, trigger-racer, quick-draw)
│   │   ├── controller/[slug].astro
│   │   ├── compare/[slug].astro
│   │   ├── settings/[game]/[controller].astro
│   │   └── fix/[category]/[slug].astro
│   └── styles/ (global.css — Tailwind v4 @import & @theme)
├── scripts/ (build-check.sh)
└── astro.config.mjs
```
