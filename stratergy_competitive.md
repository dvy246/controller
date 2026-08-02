# Strategy: Defeat ControllerTest.io & Rank Faster

> **Based on:** `controllertest.md` (verified dossier, 2026-08-02) and a verified inventory of our own codebase (`controllertesting/src`, 68 pages, Cloudflare Pages deploy).
> **Ground rule:** No invented numbers. Keyword targets are chosen from *verified absence* in competitor coverage and *verified existence* in our routes. Volumes, difficulty, and traffic projections are explicitly labeled as hypotheses where no tool was available.

---

## 0. Operational Definition of "Defeat"

We cannot (and should not try to) outrank controllertest.io on "gamepad tester" in 90 days. **Defeat is defined as:**

1. **Outranking them on every query we publish that they structurally cannot answer** (repair, settings, comparisons, controller profiles, reliability data) — their sitemap has zero of these.
2. **Becoming the tool that communities and reviewers recommend** (their own growth came from 2-3 tech-blog reviews; that playbook is replicable).
3. **Owning a standard they don't have** (Controller Health Score, reliability data) so that "which tester?" questions have a canonical answer.

Ranking faster is achieved by: (a) pre-rendered SSG pages on low-competition intents, (b) fixing indexation bugs in our own code first, (c) replicating their earned-media playbook, (d) never competing on head terms until authority exists.

---

## 1. Verified State of Our Own Product (inventory, 2026-08-02)

| Asset | Verified status |
|---|---|
| 21 controller tools (`/test/controller/`) incl. drift, full-diagnostic, health-score, ps-calibration, multi, timeline, competitive-readiness | Built |
| 7 mouse tools, MIDI tester, keyboard index | Built |
| 5 high-SEA tools (aim-trainer, sensitivity-converter, hz-test, audio-test, keyboard-tester) | Built (dynamic routes) |
| 5 games (`/games/`) + rewards lib (`src/lib/rewards.ts`) | Built |
| 4 embeds (`/embed/drift, gamepad, health, polling`) + `/embeds` hub | Built |
| Content routes: `/settings/[game]/[controller]` (5 games × 3 controllers = 15), `/compare/` (2), `/controller/` (3+ profiles), `/fix/stick-drift/ps5-dualsense` (1), `/reliability/[slug]` (multi-model) | Built |
| Telemetry: `src/lib/telemetry.ts` + `reliabilityData.json` (142,850 samples, 2026-08-02) | Built — **our only un-copyable asset** |
| i18n: `translations.ts` (~130 keys); **localized pages exist ONLY for the homepage** (de/es/fr/ja `index.astro`) | **Gap + bug (see §3)** |
| Hreflang: `BaseLayout.astro` emits es/de/fr/ja alternates for **every page** | **BUG — see §3** |
| Deploy: Cloudflare Pages, project `controller-test` | Configured |

**Counted precisely:** 68 `.astro` pages. This is ~2.8× the unique English pages controllertest.io has (24) — the gap is not page count, it's *where* we deploy pages (they own tools; we own tools + journey).

---

## 2. The Strategy — Six Pillars

### Pillar 1 — Fix indexation integrity before adding a single page (Week 1)

**Bug A (verified, `src/layouts/BaseLayout.astro:104-112`):** hreflang alternates `/es${currentPath}` etc. are emitted on every page, but only `/de/index.astro`, `/es/index.astro`, `/fr/index.astro`, `/ja/index.astro` exist. Every English tool page currently declares hreflang URLs that **404**. Google's hreflang validation will flag mismatches and can suppress rich results/index trust.

Fix: emit hreflang only when the localized page exists. Minimal, correct implementation:

```ts
// BaseLayout.astro — replace static languages array
const LOCALE_DIRS = ['es', 'de', 'fr', 'ja'] as const;
// pass `isLocalized: boolean` prop from page fronts; default true for index, false for tools
// render: {isLocalized && languages.map(...)}
```

**Bug B (verified):** `robots.txt` and sitemap must be generated from the actual build. Run `npm run audit` (`scripts/build-check.sh`) to validate canonical/sitemap/noindex before and after this change. (Script exists — verified in repo.)

**Bug C (verify during build):** confirm no page accidentally sets `noindex` (build-check.sh scans for this) and that `/passport.astro` and any private/utility routes are excluded from sitemap.

**Why this beats controllertest.io:** their sitemap is clean (verified). Ours must be clean before we ask Google to index 100+ new URLs — otherwise indexation speed is wasted.

### Pillar 2 — Content verticals where they have zero pages (Weeks 2-6)

Their sitemap (verified) has **no** `/fix/`, `/settings/`, `/compare/`, or controller-profile pages. We already have these routes with data. Rank-faster sequence:

1. **Expand `/fix/` from 1 → 12+ pages** (pattern: `/fix/stick-drift/{controller}`). Controllers: ps5-dualsense (exists), xbox-wireless, switch-pro, joy-con, ps4-dualshock-4, xbox-elite-2, dualsense-edge, 8bitdo-ultimate, gamecube, steam-deck. Each page: HowTo schema (steps already supported by our schema infra), parts list, **embedded re-test link back to `/test/controller/drift`** (the closed loop), YMYL-style disclaimer (exists per AGENTS.md conventions).
2. **Expand `/compare/` from 2 → 8+** (dualsense-vs-xbox-series exists; add dualsense-vs-dualsense-edge, xbox-series-vs-elite-2, switch-pro-vs-xbox, joy-con-vs-pro, ps4-vs-ps5, xbox-one-vs-series, dualsense-vs-scuf). Product schema + comparison tables (schema infra verified: compare/[slug].astro).
3. **Expand `/controller/` profiles** (ps5-dualsense, xbox-wireless exist; Edge + Razer Wolverine V2 already in the data array — verified in source). 8-10 profiles with specs + **known issues backed by `reliabilityData.json` numbers** (no invented stats).
4. **Expand `/settings/` beyond 5 games** — the 5×3 matrix works; add games with high drift-related search intent (COD, Fortnite, Rocket League exist; add Apex-specific deadzone compensation guidance, Elden Ring, Halo, Valorant controller settings). Each page: deadzone table + "test your controller first" CTA linking to drift tool.
5. **Keep `/reliability/` as flagship** — it is the only content vertical **no competitor has at all** (verified: no reliability/durability data pages on controllertest.io, gamepad-tester.net, controllertestonline.com, hw-check.com, joycheck.io). Every content page should cite it ("based on 142,850 measured samples, updated 2026-08-02").

**Evidence check (no hallucinations):** every number a content page cites must trace to `src/data/reliabilityData.json` or a named official spec. If the JSON lacks a model, the page must not claim a number — mark "no data yet."

### Pillar 3 — Product differentiation they cannot mirror quickly (Weeks 2-8)

Already built; the work is **surfacing + measuring**, not building:

1. **Controller Health Score™** (`/test/controller/health-score`) — brand-first-mover play. Add: shareable score card (OG image per score), "what does 73/100 mean" interpretation layer, print/PDF report (they have JSON/CSV via extension — branded report is still unserved; gamepadtester.uk has export but no brand score).
2. **Multi-controller simultaneous test** (`/test/controller/multi`) — verified absent on controllertest.io; present on hardwaretester.com (4 slots, no scoring). Ours adds scoring + per-pad health.
3. **Drift Timeline** (`/test/controller/timeline`) — localStorage retention loop. Verified absent on controllertest.io.
4. **Trust/methodology layer (NEW — small build):** a `/test/methodology` page + per-tool "How this test works & its limits" collapsible. Directly answers the documented r/consolerepair trust complaint ("site shows perfect but controller drifts"). Wired-vs-Bluetooth note, Gamepad API sampling caveats, deadzone interpretation. **No competitor has this (verified).**
5. **Repair verification loop:** each `/fix/` page ends with "Re-test now" → drift tool. This is the diagnose→fix→verify journey that no tool site ships.

### Pillar 4 — Distribution: replicate their earned-media playbook (Weeks 3-10)

Verified facts: controllertest.io got Ghacks (2026-05-28) + korben.info reviews and a coruzant "top 5" listing; gpadtester.com reached ~70K organic visits/mo within ~1 year (third-party stats, sitestatsdb.com — treat as indicative, not precise).

Our executable equivalents:
1. **Listicle inclusion outreach:** pitch coruzant-style roundups ("best controller testers") with our differentiators: Health Score, 142K-sample reliability data, repair guides, multi-controller. Listicles are the exact channel that conferred authority on the incumbent wave.
2. **Tech-blog review pitch:** angle = "the only controller tester that tells you what your test result means, with real repair follow-through" + reliability data. Target the same tier as Ghacks/korben (German/French tech blogs covered them; English equivalents: ghacks.net, ghacks english, howtogeek-level, plus gaming hardware sites).
3. **Open-source the core tester library** (`src/lib/gamepad.ts` → public repo): dualshock-tools gets recommended on Reddit precisely because it is free, open-source, and transparent. Developer backlinks + trust halo + a direct counterweight to "closed tool" skepticism. Low cost: the lib is already written.
4. **Chrome Web Store extension (parity):** controllertest.io ships one (verified). Ours must exist for parity; scope it to the Quick-Check pattern: popup button/stick check + deep link to full suite. Defer if effort > 1 week; extension is a distribution channel, not a moat.
5. **r/consolerepair / r/controller positioning:** respond to drift threads with methodology-aware answers and the reliability data (no self-promo spam; contribute first). This is the audience with the documented trust gap.

### Pillar 5 — Technical SEO & performance parity (Weeks 1-12, ongoing)

- **Core Web Vitals:** verify with Lighthouse locally (`npm run build && npm run preview` then test). No PSI claim about competitors is possible (quota-blocked) — so we state our own numbers and keep ours clean, never claiming "50% faster than X".
- **Schema:** FAQPage on every tool page (AGENTS.md says tools carry FAQs; verify each page actually emits `FAQPage` JSON-LD — audit during build-check), HowTo on fix pages, Product on compare/controller pages, WebApplication on tools.
- **Sitemap:** ensure dynamic routes (`settings`, `compare`, `controller`, `reliability`, `fix`, `hz-test`, `keyboard-tester`, `aim-trainer`, `sensitivity-converter`, `audio-test`) all appear after `astro build` (the `@astrojs/sitemap` integration is installed — verified in package.json).
- **Freshness:** `reliabilityData.json` carries `updatedAt: 2026-08-02` — surface "Last updated" dates on reliability pages; update cadence = real signal of life.

### Pillar 6 — i18n: parity is NOT the play (decision)

Controllertest.io ships 10 full locales (verified). We have homepage-only translations for 4. Matching them across ~68 pages is months of work with uncertain payoff for an English-first launch. **Decision: English-first.** Keep the 4 homepage locales (they exist), but **fix the hreflang bug** so we never signal translated pages that don't exist. Revisit i18n only after the English content verticals rank (≈ month 6+). This is the fact-driven choice: their i18n is a moat we do not attack in 2026.

---

## 3. Keyword-Conquest Map (intent-grounded, no invented volumes)

Rules: (a) only keywords where our route exists or is planned in §2; (b) only keywords with **verified zero competition on controllertest.io's sitemap**; (c) volume/difficulty left as hypotheses unless measured in GSC after launch.

| Cluster | Sample queries (US English) | Our page | CT.io coverage (verified) | Difficulty hypothesis |
|---|---|---|---|---|
| Repair | "how to fix ps5 controller drift", "fix stick drift xbox", "joy-con drift fix" | `/fix/stick-drift/*` | None | Low (iFixit/Reddit rank; no tool integration anywhere) |
| Compare | "dualsense vs xbox controller", "dualsense edge vs elite 2" | `/compare/*` | None | Low-Medium |
| Profiles | "ps5 dualsense specs", "dualsense edge known issues" | `/controller/*` | None | Low-Medium |
| Settings | "best deadzone fortnite ps5", "apex controller settings drift" | `/settings/*` | None | Low |
| Reliability | "dualsense drift average", "which controller drifts least" | `/reliability/*` | None (no data pages anywhere) | Low — **no competitor has this content type** |
| Tool long-tail | "xbox controller drift test", "multi controller tester", "controller health check" | `/test/controller/*` | Partial (they own "stick drift test" etc.) | Medium — compete only on variants they don't target |

**Head terms ("gamepad tester", "controller test online"):** do not target in phase 1. Reason: hardwaretester.com (incumbent with top-10 controller DB) + controllertest.io 400-URL site own these; attacking early wastes crawl budget and signals.

---

## 4. 90-Day Roadmap (Impact × Effort)

Priority scoring: **Impact = ranking/defensibility value; Effort = engineer-days (single dev)**. All tasks verified against repo reality.

### Phase 1 — Foundation (Weeks 1-2)
| # | Task | Impact | Effort | Why |
|---|---|---|---|---|
| 1 | Fix hreflang bug (BaseLayout) | High | 0.5d | Verified 404 hreflang on every tool page; blocks indexation trust |
| 2 | Run `npm run audit` (build-check.sh); fix canonical/sitemap/noindex violations | High | 1d | Clean indexation surface before launch |
| 3 | Verify FAQPage/HowTo/Product schema actually emit on tool/fix/compare pages | High | 1d | Rich-result capture; AGENTS.md claims schema "in place" — verify, don't assume |
| 4 | Deploy once (Cloudflare Pages, project `controller-test`) + GSC property + submit sitemap | Critical | 0.5d | No measurement = no fact-driven iteration |
| 5 | Lighthouse run on 5 key pages; fix LCP/CLS/INP regressions | Medium | 1-2d | We must never claim speed; we must have it |

### Phase 2 — Content verticals (Weeks 2-6)
| # | Task | Impact | Effort | Why |
|---|---|---|---|---|
| 6 | Expand `/fix/stick-drift/` 1 → 12 controllers (shared template + per-model data) | Highest | 3-4d | Zero competitor coverage (verified); highest-intent queries; HowTo snippets |
| 7 | Expand `/compare/` 2 → 8 | High | 2d | Zero competitor coverage; Product schema tables |
| 8 | Expand `/controller/` profiles to 8-10 (Edge + Razer data already in source) | High | 2d | Zero competitor coverage; internal-link hubs |
| 9 | Expand `/settings/` 15 → 25+ pages | Medium | 2d | Zero competitor coverage; low effort per page |
| 10 | Methodology page + per-tool "limits" block | Medium | 1.5d | The documented trust gap; E-E-A-T; cheap |
| 11 | Repair-loop CTA on every fix page ("Re-test now") | Medium | 1d | Closed journey; increases pages/session |
| 12 | Open-source `src/lib/gamepad.ts` (sanitize, license, README, repo) | Medium | 1d | dualshock-tools precedent: open-source = Reddit trust + dev backlinks |

### Phase 3 — Distribution (Weeks 3-10)
| # | Task | Impact | Effort | Why |
|---|---|---|---|---|
| 13 | Listicle + review outreach (15-20 targets, personalized, with data angle) | Highest | 3d | Verified playbook that worked for CT.io and gpadtester |
| 14 | Health Score share card (OG image per score) + "share my score" | Medium | 1.5d | Brand first-mover; shareable asset |
| 15 | Chrome extension (Quick-Check scope) | Medium | 3-4d | Parity; they ship one (verified) |
| 16 | Reddit/community contribution cadence (2-3x/wk, value-first) | Medium | ongoing | Trust gap audience; organic recommendations |

### Phase 4 — Data flywheel (Weeks 6-12)
| # | Task | Impact | Effort | Why |
|---|---|---|---|---|
| 17 | Telemetry consent UX on all tools + aggregate view on `/reliability/` | Highest | 2-3d | 142,850-sample dataset is the only un-copyable asset; grow it visibly |
| 18 | Monthly reliability report page (data-backed, dated) | Medium | 1d/mo | Freshness signal + media-citation bait |
| 19 | Drift Timeline → "predictive wear" note (avg drift onset for your model) | Medium | 1d | Retention loop + data integration |
| 20 | GSC review: double down on clusters that move; prune no-clicks | Ongoing | 0.5d/wk | Fact-driven allocation, never vibes |

**Weeks 13+: months 4-12 sketch** — i18n expansion (en→es/de first, matching homepage coverage), games/rewards promotion (retention, not ranking), head-term push once authority accumulates, annual durability report for media citations.

---

## 5. Features To Avoid (evidence-based rejections)

| Candidate | Why rejected |
|---|---|
| Match their 10-locale i18n now | Months of effort; English verticals are the winnable market first |
| Head-term paid/aggressive targeting in phase 1 | Incumbent + 400-URL competitor own them; crawl budget wasted |
| Games/rewards as an SEO play | No evidence games drive rankings; they're retention at best (labeled retention, not ranking) |
| Building a "better" WebHID calibration than dualshock-tools | They are free, open-source, more capable (Edge/VR2), community-recommended; competing there is unwinnable. Keep our tool honest + link out to them for unsupported models |
| Programmatic 700-page spam | Google helpful-content risk; CT.io has 400 real URLs; quality beats quantity — our 100+ unique, data-backed pages win |
| AdSense before traffic exists | Hurts CWV; CT.io monetizes early but we can't verify their tradeoff; defer monetization |
| Copying their exact tool pages verbatim | Duplicate-content risk with zero value; our pages must differ by article depth + data + methodology |

---

## 6. Measurement & Honesty Contract

- Every claim in code/docs that cites competitor behavior cites this dossier (`controllertest.md`) or a named source.
- No fabricated volumes/rankings. GSC is the only truth source post-launch.
- Any new feature ships with a hypothesis + a metric; if the metric doesn't move in 6 weeks, kill it.
- Internal docs `moat.md`, `god_level_strategy.md`, `competitor_analysis.md` contain false competitor claims — they are superseded by `controllertest.md` and this plan.

---

## 7. Definition of Done (90 days)

- [ ] Hreflang bug fixed; build-check clean; sitemap submitted to GSC
- [ ] 100+ unique English pages indexed (68 existing + 12 fix + 8 compare + 8-10 profiles + 25 settings + methodology + report)
- [ ] Telemetry consent visible on all tools; reliability pages cite dated dataset
- [ ] 2+ earned mentions (listicle/review) or 5+ community-driven links
- [ ] Chrome extension live (or explicitly deferred with reason)
- [ ] GSC shows first non-brand long-tail rankings in fix/settings/compare/reliability clusters — this is the measurable "ranking faster than controllertest.io" signal, because they have zero pages in those clusters
