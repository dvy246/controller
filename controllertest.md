# ControllerTest.io — Verified Evidence Dossier

> **Date of investigation:** 2026-08-02
> **Method:** Direct fetches of `https://controllertest.io/` (raw HTML), `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml` (full 400-URL extraction), Chrome Web Store listing, plus third-party coverage (Ghacks, korben.info, coruzant.com, website.informer.com).
> **Rule:** Every claim below is labeled `VERIFIED` (observed directly), `REASONED` (inference from verified facts), or `EVIDENCE INSUFFICIENT` (no data — never guessed).

---

## 1. Executive Facts

| Fact | Value | Status |
|---|---|---|
| Framework | **Astro v5.17.3** static site generation (`<meta name="generator" content="Astro v5.17.3">`) | VERIFIED (homepage HTML) |
| Sitemap footprint | **400 URLs** (`sitemap-index.xml` → `sitemap-0.xml`) | VERIFIED |
| Unique English pages | **24** (1 home, 16 tools, 16 embeds, about, contact, privacy, support, terms, tools hub, widgets) | VERIFIED (deduplicated loc extraction) |
| Locales | **10 full locales**: en, es, pt, ko, fr, de, ru, zh-tw, ja, it — every page translated with complete hreflang | VERIFIED (sitemap hreflang alternates) |
| Monetization | Google AdSense (`ca-pub-4887195146618385`), GA4 (`G-W515YK1V5J`), Partytown 0.11.2 | VERIFIED (homepage HTML) |
| Earned press | Ghacks.net review (2026-05-28), korben.info review, coruzant.com "top 5 gamepad testers" listicle (2026-06-05) | VERIFIED (independent pages) |
| Chrome extension | "ControllerTest Quick Check" — toolbar popup + full tester tab, drift sampling, circularity coverage, polling estimates, vibration checks, **JSON/CSV report export**, explicit "not hardware-lab certification" disclaimer | VERIFIED (Chrome Web Store listing) |
| Deep-link capability | **WebHID PS4/PS5 firmware calibration** (writes to controller non-volatile memory) | VERIFIED (tool page + Ghacks review) |

**Implication for internal documents:** `moat.md`, `god_level_strategy.md`, and `competitor_analysis.md` describe controllertest.io as "SPA (vanilla JS), ~5 indexed pages, zero content." All three claims are **false**. This dossier supersedes them.

---

## 2. Information Architecture (VERIFIED from sitemap)

```
/                            Homepage: full gamepad tester + 3-step guide + FAQ
/tools/                      Tools hub page
[16 tool pages]              One dedicated page per diagnostic
[16 /embed/ pages]           Iframe widgets (drift, circularity, fight-stick, gamepad-mapping,
                             gamepad-tester, gyroscope, joy-con, joystick, latency, midi,
                             polling-rate, ps5-controller, steering-wheel, stick-drift,
                             switch-pro-controller, vibration, xbox-controller)
/about/ /contact/ /privacy/ /support/ /terms/ /widgets/
```

Tool pages: `stick-drift-test`, `circularity-test`, `polling-rate-test`, `latency-test`, `vibration-test`, `joystick-tester`, `xbox-controller-test`, `ps5-controller-test`, `switch-pro-controller-test`, `switch-joycon-test`, `gyroscope-test`, `steering-wheel-tester`, `fight-stick-tester`, `midi-tester`, `gamepad-mapping-test`, `ps-controller-calibration`.

**What is NOT in their IA (VERIFIED absence — their sitemap contains none of these):**
- No `/fix/` repair guides
- No `/settings/` game-specific settings
- No `/compare/` controller comparisons
- No controller profile/reference pages
- No buying guides
- No reliability/durability data pages
- No retention mechanism (no saved test history, no score, no timeline)

---

## 3. Feature Set (VERIFIED from fetched pages)

| Feature | Detail |
|---|---|
| Gamepad tester (home) | Buttons, sticks, triggers, raw axes, connection activation |
| Stick drift test | Real-time coordinate tracking, deadzone circle, jitter classification (minor tremble / slow drift / violent snapping), hall-effect upgrade guidance |
| Circularity test | 360° range error analysis |
| Polling rate test | Avg/peak Hz, interval, jitter, stability visualizer, wired vs BT reference values, D-Input mode tip |
| Latency test | Input timing |
| Vibration test | Dual motor, independent L/R control, 4 modes (heavy/light/burst/pulse per korben review) |
| Gyroscope test | Motion sensor — rare among browser tools (noted by coruzant) |
| Steering wheel tester | Rotation + pedals |
| Fight stick tester | Vewlix layout, SOCD test |
| MIDI tester | Web MIDI |
| Xbox test page | Impulse-trigger limitation documented |
| Joy-Con test | Separate L/R display, SL/SR buttons |
| Gamepad mapping test | Layout/mapping verification |
| **PS Controller Calibration (WebHID)** | DS4 CUH-ZCT1/CUH-ZCT2, DualSense CFI-ZCT1 only. **No DualSense Edge, no DS3, no clones** (clones auto-blocked). USB only, ≥30% battery required, temp-check before permanent save. Writes center/range to controller NVS. |
| Chrome extension | See §1. JSON/CSV export = the "data export" gap internal docs claimed was unserved |

---

## 4. UX / UI / Design System (VERIFIED)

- **Typography:** Inter + system fallbacks (`font-family:Inter,-apple-system,...`). Light/dark mode (`gamepad-ui-theme` in localStorage + `prefers-color-scheme` fallback, FOUC-guard script).
- **Palette:** Stone neutrals (`#fafaf9` light / `#0c0a09` dark, text `#1c1917`/`#f5f5f4`).
- **Motion:** Astro View Transitions enabled with reduced-motion fallback.
- **Mobile:** `width=device-width` viewport; widgets documented as responsive.
- **Copy:** Confident, precise, technical. Per-tool explainers ("0% Error: Excellent precision"), FAQ sections with real answers (why rotate sticks during polling, why 125 Hz BT is normal, D-Input tips).
- **Accessibility:** No skip-link, ARIA dialog, or keyboard nav patterns observed in fetched HTML. **EVIDENCE INSUFFICIENT** for a full a11y verdict; not a demonstrable strength.
- **Page speed:** HTML/CSS is lightweight and inline-styled; AdSense + GA present. **EVIDENCE INSUFFICIENT** (PageSpeed Insights API returned quota error 2026-08-02; no Lab scores captured).

---

## 5. SEO Analysis (VERIFIED)

- **SSG architecture** — all 400 URLs are pre-rendered HTML (identical architecture to ours; the "SPA indexation moat" argument in internal docs is void).
- **Canonical + hreflang:** complete 10-locale alternates on every URL (VERIFIED in sitemap and homepage head).
- **Structured data:** `WebSite` schema on homepage (VERIFIED). Schema on subpages: **EVIDENCE INSUFFICIENT** (not fetched).
- **Meta:** Title, description, keywords present and coherent.
- **Content depth:** each tool page carries genuine educational text (deadzone art, polling-rate value guide, Hall-effect guidance) — this is real content, not placeholder filler.
- **Estimated index surface:** 400 URLs × competitive head + long-tail tool queries ("stick drift test", "polling rate test", "xbox controller test", localized equivalents in 10 languages).
- **Backlink/traffic data:** **EVIDENCE INSUFFICIENT** (no Ahrefs/Semrush access). Known backlinks: Ghacks, korben, coruzant, Chrome Web Store listing.

---

## 6. What ControllerTest.io Does Well (EVIDENCED)

1. **Modern, consistent product** — every diagnostic has a dedicated, well-designed page with real guidance. Coruzant independently ranked them "best modern gamepad tester suite."
2. **i18n depth** — 10 full locales is a structural barrier for new entrants and a ranking asset in non-English markets.
3. **WebHID calibration** — genuinely rare; wrote to DualSense/DS4 firmware from a browser. Earned them a Ghacks review precisely because of it.
4. **Distribution mechanics** — Chrome extension, 16 embeddable widgets, and press outreach that works (2 tech-blog reviews in 2026).
5. **Active maintenance** — Ghacks review May 2026, current sitemap, extension listing live. They iterate.

---

## 7. Weaknesses & Gaps (EVIDENCED)

1. **No full-funnel content.** Zero repair guides, zero game settings, zero comparisons, zero buying guides. Their 24 pages are 100% tool + boilerplate. The diagnose→fix→decide journey dead-ends at the test result.
2. **No first-party reliability data.** No aggregate drift statistics, no model durability pages, no "average drift after N months" claims anywhere in fetched content. Internal docs claim "140K+ test telemetry" is our asset — controllertest.io has no observable equivalent.
3. **No scoring standard / retention.** No health score, no saved history, no timeline, no report card. No reason to return after the test.
4. **Calibration is narrower than the open-source alternative.** dualshock-tools.github.io (free, open-source, GitHub-hosted, v2.27 updated 2026-08-01) supports DualShock 4, DualSense, **DualSense Edge and PS VR2 controllers**, offers quick + four-step calibration, expert mode, restore/reboot, and is actively recommended on r/consolerepair. ControllerTest.io supports fewer models and no restore. **They are not the category leader here.**
5. **Trust gap with repair-minded users.** r/consolerepair threads show users doubting single-tool readings ("my Xbox controller drifts but this site shows it's perfect" — r/consolerepair, 1y ago). ControllerTest.io does not address measurement trust/methodology.
6. **No multi-controller simultaneous diagnostics** (not present on any fetched page).
7. **Monetization pressure:** AdSense + GA on a tool page means ad layout shifts and third-party requests; no evidence they've solved ad-perf tradeoff. (PSI scores: EVIDENCE INSUFFICIENT.)

---

## 8. Threat Assessment (REASONED)

| Dimension | Risk to us | Reasoning |
|---|---|---|
| Tool parity | MEDIUM | They ship fast; any tool we add is copyable in ~1-2 quarters |
| SEO head terms | HIGH | 400 URLs, 10 locales, press links, active maintenance |
| Content verticals (fix/settings/compare) | LOW (now) | Verified absence; they have no content pipeline evidence |
| Data moat | LOW (now) | No aggregation visible; we have a head start with shipped telemetry |
| Calibration | HIGH | Open-source dualshock-tools already owns "serious" users; both of us are marginal there |
| Trust positioning | LOW (now) | Neither competitor addresses methodology/accuracy transparency |
| Distribution (widgets/extensions) | MEDIUM | They already ship both |

---

## 9. What Remains UNVERIFIED (honesty section)

- Exact monthly traffic, keyword rankings, DR/UR, referring domains.
- PageSpeed / Core Web Vitals numbers (API quota-blocked).
- Structured data on subpages.
- Social presence (Twitter/Reddit/YouTube) and community sentiment beyond the one r/consolerepair thread.
- Whether their widgets pages earn meaningful backlinks.
- Revenue.

---

## 10. Bottom Line

ControllerTest.io is a **capable, modern, actively-maintained competitor** — not the weak "SPA with 5 pages" described in our internal docs. It cannot be beaten on tool parity or head-term SEO in the near term, and its 10-locale i18n is structural. Its verified weaknesses are: **zero full-funnel content, zero reliability data, zero scoring/retention, no trust/methodology positioning, and a calibration feature that a free open-source tool already exceeds.** Our strategy must attack exactly those gaps — and fix the inaccuracies in our own internal documents before planning on top of them.
