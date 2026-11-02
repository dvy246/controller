# Low value content audit: controllertesting.com (2026-11-01)

Method: low-value-content-fixer skill. The audit ran against the local build (`controllertesting/dist`, built 2026-10-31 22:37, 295 sitemap URLs) with `controllertesting/scripts/lvc_audit_dist.py`, plus GSC page data in `data/gsc_pages*.json`. Bing page-level data is unavailable: the connector returns no rows for page reports. The detailed reading of individual pages comes from yesterday's audit (`findings/content.md`) and wasn't repeated here.

## Verdict

**Not ready to resubmit** (AdSense review or recrawl request).

1. **Scaled programmatic families are all still indexable.** 0 of 295 URLs are noindexed. /settings, /deadzone-calculator, /circularity-grader, /overclock-validator, /mods and /calibrate carry 0.8–7% site-unique text per page. There are 26 near-duplicate pairs at ≥ 0.7 (all /mods).
2. **Key landing hubs are link lists.** /test/controller, the #1 page with 6,062 GSC impressions, has 140 unique words. /connect, /hz-test, /keyboard-tester, /audio-test, /haptics and /controller each have fewer than 50.
3. **Unbacked or untrue copy is still live:**
   - invented "Health Score: 88/100" on /compare
   - "Guaranteed compatible" on /mods
   - "No ad network, no trackers" on /press
   - "5 browser games… No gaming site has this" on home (13 games exist)
   - "Key findings / most drift-prone / dataset shows" built on a modeled dataset
   - "Hardware Lab" and "Research Team" bylines with no real people behind them

Since yesterday the working tree has fixed the template artifacts, so 0 placeholders remain. It has also removed `Math.random()` from CompetitiveReadiness and hall-effect-mod and the hardcoded BDM IDs.

## Evidence

| Signal | Value |
|---|---|
| Search | Google sitewide demotion since 2026-09-13 (~1,200 → ~35 impr/day, position 30 → 72). Bing ~130 clicks/day and growing. |
| AdSense | ads.txt present (`pub-5910777021067126`). Review not yet requested. |
| Pages audited | 295 sitemap URLs, all indexable |
| Thin | 13 VERY_THIN (< 50 unique words) · 48 THIN (< 200) · 237/295 with < 300 site-unique words |
| Median boilerplate share | 0.11 (main-content extraction, so this one is OK) |
| Near-duplicates | 428 pairs ≥ 0.5 · 26 pairs ≥ 0.7 |
| Placeholders / claim conflicts | 0 / 0 |
| Retired copy still in HTML | 30+ pages (/compare, /connect, /deadzone-calculator, /compatibility, home, /contribute) |
| No `<main>` landmark | 24 pages (/compare, /controller) |

### Site-unique text by template

| Template | Pages | Avg words | Site-unique % |
|---|---|---|---|
| /overclock-validator | 4 | 1,109 | 0.8 |
| /circularity-grader | 10 | 1,418 | 1.5 |
| /settings | 31 | 1,391 | 6.6 |
| /deadzone-calculator | 16 | 1,348 | 6.8 |
| /mods | 22 | 806 | 6.8 |
| /connect | 13 | 391 | 9.2 |
| /aim-trainer | 11 | 321 | 12.7 |
| /haptics | 9 | 745 | 12.7 |
| /fit | 15 | 255 | 14.9 |
| /calibrate | 5 | 1,119 | 20.1 |
| /compare | 10 | 330 | 40.0 |
| /fix/stick-drift | 13 | 251 | 44.8 |
| /test/controller | 32 | 1,191 | 52.0 |
| /test/mouse | 8 | 971 | 56.3 |
| /games | 14 | 294 | 73.5 |
| /reliability | 8 | 279 | 79.1 |
| /learn | 21 | 400 | 91.4 |

## Site-wide problems (ranked by impact)

1. **Programmatic entity pages (skill pattern 4).** Game × controller and controller × sensor grids where only the name changes. Some cells don't exist in reality, such as `/settings/halo-infinite/switch-pro` and `/deadzone-calculator/valorant/switch`. Each variant loads the same widget as a core tool.
2. **The tool page is only a UI (pattern 1).** The hubs that collect search demand are card grids with no explanation.
3. **Claims you can't back up (pattern 7):**
   - /compare Health Scores are hand-entered (`score: 88` in `src/pages/compare/[slug].astro`)
   - latency figures carry no citation
   - /mods says "Guaranteed compatible"
   - competitive-readiness uses ALGS/CDL framing, but neither league publishes a controller spec
4. **Anonymous operator (pattern 8).** The org bylines "ControllerTesting Research Team" and "Hardware Lab" have no named person behind them. There is no Person entity.
5. **Text that doesn't match the data:**
   - "Key findings" and "most drift-prone tracked model" on `/reliability/report`
   - "our baseline dataset shows" on /learn, while `reliabilityData.json` says `communitySamples: 0`
   - home says "5 browser games" (13 exist)
   - /press says "No ad network", but the AdSense cookie banner shows on every page
6. **Batch freshness.** "Published Aug 2 / Updated Aug 10, 2026" appears on about 80 pages, with hardcoded "N min read" times.
7. **Default empty states visible to crawlers:**
   - /compatibility: "No data available"
   - /deadzone-calculator: "Recommended Deadzone 0%"
   - /test/controller/passport: "No Devices Found"

## Page triage

Buckets come from the GSC "before" window (Aug 29 – Sep 12, 2026) plus content signals. Rubric scores are per family (out of 20), from yesterday's page reading and today's numbers.

| URL / family | Bucket | Rubric | Why | Action |
|---|---|---|---|---|
| /settings/[game]/[controller] (30) | **Merge** | 7 | 6.6% unique; combos that don't exist; 413 impr in total | One `/settings/[game]` page per game (10) with visible per-controller sections; 301 the old URLs |
| /deadzone-calculator/[game]/[controller] (15) | **Merge** | 6 | 6.8% unique; same intent as /settings; "Deadzone 0%" default | Fold the guidance into `/settings/[game]`; 301; keep the hub tool |
| /circularity-grader/* (10) | **Merge** | 5 | 1.5% unique; duplicates /test/controller/circularity | 301 → /test/controller/circularity |
| /overclock-validator/* (4) | **Merge** | 5 | 0.8% unique | 301 → /test/controller/polling-rate |
| /calibrate + children (5) | **Merge** | 6 | Duplicates /test/controller/ps-calibration | 301 → /test/controller/ps-calibration |
| /mods/[controller], /mods/.../[mod] (~23) | **Noindex** | 6 | 0.79–0.81 near-duplicates; unsourced "guaranteed" claims; 44 impr | `noindex, follow`; keep the /mods hub; rewrite the claims |
| /aim-trainer/[device]/[game] (10) | **Noindex** | 7 | 12.7% unique; 6 impr | Keep the hub with its selector |
| /haptics/unity, /unreal, /[engine]/[effect] (8) | **Noindex** | 6 | 23-word engine pages | Keep the hub and add an intro |
| /controller/[slug] (9) | **Noindex** | 6 | 66 words of spec list | Keep the /controller hub and add an intro |
| /fit/[slug] with pending measurements | **Noindex** | 7 | "pending caliper" values | Index each entry once it's measured |
| /test/controller/passport | **Noindex** | 3 | Empty localStorage state | — |
| /connect (12) | **Improve** | 10 | 9.2% unique, but real demand (624 impr) | Platform-specific steps with official sources |
| /compare (9) | **Improve** | 10 | 747 impr; invented scores | Remove the scores, cite figures, add `<main>` |
| /test/controller, /test/mouse, /connect, /hz-test, /keyboard-tester, /audio-test, /sensitivity-converter, /compare, /fix, /reliability, /haptics, /deadzone-calculator, /controller hubs | **Improve** | 9–11 | Link-list hubs | 100–200-word answer-first intro plus FAQs from real queries |
| /compatibility, /fix-or-replace, /warranty | **Improve** | 9 | Empty default state, 74–120 words | Static default result and a worked example |
| /hz-test/*, /keyboard-tester/*, /audio-test/*, /sensitivity-converter/* | **Keep** | 12–14 | 41–61% unique, GSC demand | Polish later |
| /test/controller/* and /test/mouse/* tools (~38) | **Keep** | 15–16 | ~50% unique; the tool is above the fold | Light polish |
| /learn (20), /fix (13), /games (13) | **Keep / expand** | 14–16 | 45–91% unique | Add sources and the owner's photos |
| /reliability/[model] (5), dashboard, report | **Improve** | 11 | Modeled numbers worded as findings | Use "modeled estimate" wording; fix the Edge contradiction |

Net: ~295 → ~175 indexable URLs. About 59 are retired by 301; 10 new `/settings/[game]` pages are added; about 60 are noindexed.

## Representative rewrites

### Tool hub: `/test/controller` (top page, currently 140 unique words)

Before: an H1 and a grid of 30 tool cards.

After (intro above the grid):

> **Which controller test do you need?** Plug in your controller, press any button, and the browser reads it through the Gamepad API. Nothing is installed and your input stays in your browser.
> - **The character moves on its own:** start with the [Stick Drift test](/test/controller/drift). Resting drift under ~2.5% is normal wear. Above ~8% usually means the stick module needs cleaning or replacing.
> - **A button misses presses:** use the [Button tester](/test/controller/buttons) and watch for presses that don't register.
> - **Aim feels uneven in one direction:** the [Circularity test](/test/controller/circularity) shows whether the outer range is a circle or a squashed shape.
>
> Not sure where to start? The [Full Diagnostic](/test/controller/full-diagnostic) runs the five core checks in about two minutes.

The thresholds must come from the single shared constants module, so this text can't drift from the tool.

### Pair page: `/connect/switch-pro/steam-deck` (242 impr, 2.4% unique)

Before: a generic controller blurb plus a generic Steam Deck blurb.

After: this pair's own steps:
1. Hold the Pro Controller's **Sync** button (top edge, next to USB-C) until the LEDs sweep.
2. On the Deck, open **Settings → Bluetooth** and pick "Pro Controller".
3. In **Steam → Settings → Controller**, decide whether to enable *Use Nintendo Button Layout*. This setting decides whether A/B are swapped in games.

Then add common faults:
- the controller reconnects as a second player
- the gyro isn't exposed until Steam Input is enabled for the game

Link to Valve's Steam Deck controller support page and Nintendo's pairing page. Mark screenshot slots as HTML comments for the owner's own captures.

### Compare: `/compare/dualsense-vs-dualsense-edge`

Before: "Health Score: 88/100" vs "92/100", plus uncited "~3.1 ms vs ~2.5 ms" latency.

After: no score pills. A spec table that shows only cited facts:
- stick module type: Edge modules are user-replaceable, at Sony's listed module price
- back buttons
- trigger stops
- MSRP

Latency becomes either "community-measured, method linked" with the source, or it is removed. Add one honest summary sentence on who should pay the difference: players whose stock DualSense drifted within a year and who want swappable sticks.

## Fix plan

**Week 1 (templates and trust; one template change fixes many URLs)**
- Noindex mechanism (`noindex, follow`, sitemap exclusion) and the 301 map in `public/_redirects`.
- Merge /settings and /deadzone-calculator into `/settings/[game]`. Retire /circularity-grader, /overclock-validator and /calibrate.
- Remove the Health Scores, "Guaranteed", "No ad network", "5 browser games" and "Key findings" wording.
- Real authorship: Divy Yadav byline and Person schema, using a bio the owner supplies.
- One shared drift-threshold module. Remove batch dates and hardcoded read times.

**Week 2 (pages with demand)**
- Hub intros, highest impressions first: /test/controller, /test/mouse, /connect, /compare, /fix, /hz-test, /keyboard-tester, /audio-test.
- /connect rewrite (12) with official sources.
- `/settings/[game]` content: a starting-point table and worked example per controller.

**Weeks 3–4**
- /learn and /fix: add sources and the owner's photos and test logs.
- /compatibility default state. A worked example on /fix-or-replace.
- Rerun the gates, deploy, resubmit the sitemaps, then wait 1–2 weeks before the AdSense review.

## Resubmission gates

Gates checked by `python3 scripts/lvc_audit_dist.py` (exits 1 on any FAIL):

| Gate | Now |
|---|---|
| No placeholders | **PASS** |
| No conflicting self-claims | **PASS** |
| Median boilerplate < 0.4 | **PASS** (0.11) |
| Zero indexable VERY_THIN pages | **FAIL** (13) |
| No indexable near-duplicates ≥ 0.7 | **FAIL** (26) |
| No retired/unbacked copy in indexable HTML | **FAIL** (30+ pages) |
| Sitemap lists only Keep/Improve URLs | **FAIL** (all 295 listed) |
| Trust pages present (about, contact, privacy, terms, methodology) | **PASS** |
| Named operator on About and bylines | **FAIL** |
| ads.txt OK | **PASS** |
| 5 fixed pages each score ≥ 14/20 | Not yet scored |

Fixing content raises the odds of AdSense approval and Google recovery but guarantees neither. Recovery from a sitewide demotion usually takes months of sustained improvement and a later core update.

## Before deploying the noindex batch

Export **Bing Webmaster → Search Performance → Pages** (last 3 months). Keep indexable any noindex candidate earning more than ~20 Bing clicks/month. Bing is currently about 20× Google's traffic, and noindex applies to Bing too.

---

## Status after fixes (2026-11-02, local build, nothing deployed)

| Gate | Before | After |
|---|---|---|
| Indexable sitemap URLs | 295 | **184** |
| VERY_THIN indexable pages | 13 | **0** |
| Near-duplicate pairs ≥ 0.7 / ≥ 0.5 | 26 / 428 | **0 / 19** |
| Retired/unbacked copy in indexable HTML | 30+ pages | **0** |
| Claim conflicts / placeholders | 0 / 0 | 0 / 0 |
| Internal broken links | 0 | 0 (32,726 checked) |
| Site-unique text: /settings · /connect | 6.6% · 9.2% | **37.6% · 71.7%** |

**What changed**
- **Merged with 301s:**
  - /settings 30 → 10 per-game pages; deadzone guidance folded in (`src/data/gameSettings.ts`)
  - /deadzone-calculator (16) → /settings
  - /circularity-grader → the circularity test
  - /overclock-validator → the polling-rate test
  - /calibrate → /test/controller/ps-calibration
- **Noindexed and removed from the sitemap:** /mods children, /aim-trainer children, /haptics children, /controller profiles, /fit entries still pending measurement, and /test/controller/passport.
- **New finding, fixed:** both calibrators faked their results. `WebHIDCalibrator` showed a scripted "Flashing firmware" animation; `PSCalibration` printed "Offsets Saved!" without writing anything. The pages promised a permanent EEPROM write. PSCalibration is now a real read-only center and range check, and the page points to the open-source dualshock-tools for actual recalibration.
- **Trust copy:**
  - Health Scores and uncited latency/polling removed from /compare.
  - "Guaranteed/verified" removed from /mods, and ALGS/CDL framing from competitive-readiness.
  - Press privacy claim, homepage superlatives and the keyword-stuffed SEO block rewritten; game count generated from the registry.
  - Reliability wording changed to "modeled estimates".
  - One shared drift-threshold module (`src/lib/thresholds.ts`).
- **Authorship:**
  - Divy Yadav is the byline, with Person and Organization `@id`s.
  - /about rewritten; the bio slot is a code comment for the owner.
  - "Research Team" and "Hardware Lab" removed.
  - Placeholder dates and read times removed; sitemap `lastmod` now comes from git.
- **Page content:**
  - Answer-first intros added to 14 hub pages.
  - /compatibility table is rendered at build time.
  - /connect rewritten with official sources (separate session).

**Still open (owner action)**
- Add the real bio on /about (HTML comment marks the spot) and your own screenshots in the /connect comment slots.
- Verify the /learn polling claims ("Xbox hard-capped at 125Hz" etc.). They weren't touched and are unsourced.
- Check the platform lists in `GAME_CONTROLLERS` (`src/data/gameSettings.ts`): Switch is included for Fortnite, Apex, Rocket League, SF6 and Overwatch 2.
- Export Bing WMT Pages data before deploying, and re-index any noindexed URL earning more than ~20 Bing clicks/month.
- Hand-score 5 pages against the rubric on the live site.
- Then deploy, resubmit the sitemaps, wait 1–2 weeks and request AdSense review.
