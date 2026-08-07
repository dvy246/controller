# Phase 3 — Outreach Playbook (Task 13)

> Date: 2026-08-02 · Source of truth: `controllertest.md` dossier (§6.4: "press
> outreach that works (2 tech-blog reviews in 2026)" — the playbook we are
> replicating). Honesty rule: no invented emails. Contacts marked
> **VERIFIED** were confirmed against the outlet's own pages during research;
> all others must be looked up on the outlet's contact page before sending.

---

## A. Proven-playbook targets (already covered controller testers)

| # | Outlet | Contact | Why | Personalized angle |
|---|---|---|---|---|
| 1 | **Ghacks.net** | `arno@ghacks.net` — VERIFIED (ghacks.net/about-us) | Reviewed controllertest.io 2026-05-28; covers browser tools weekly | We're the tool that publishes its data: 142,850+ documented results, methodology page, per-tool limits block, open-source measurement math. "A controller tester that shows its work" |
| 2 | **korben.info** | `korben@korben.info` — VERIFIED (privacy page) | Reviewed CT.io; beat = practical tech, open source, tinkering | Two hooks: (1) our measurement lib is open-source MIT (gamepad-analyzer), (2) we link out to dualshock-tools where we're narrower — a tool that recommends its competitor's open-source tool |
| 3 | **coruzant.com** | LOOKUP (coruzant.com) | Ranked CT.io #1 in "top 5 gamepad testers" listicle 2026-06-05 | Update their listicle with the data angle: which tester has actual reliability data + repair guides? We do |

## B. Software/tool roundup blogs (CT.io hasn't been covered here)

| # | Outlet | Contact | Why | Personalized angle |
|---|---|---|---|---|
| 4 | **How-To Geek** | LOOKUP (howtogeek.com/about) | Huge "how to fix" search presence; stick drift is a perennial reader pain | "How to tell if your controller actually has drift" — browser tools + our 12 repair guides + honest methodology; reader-facing explainer story |
| 5 | **MakeUseOf (MUO)** | LOOKUP (makeuseof.com) | Tool roundups + troubleshooting articles | Roundup: "5 websites that test your gamepad for free" — ours is the one with repair guides + saved drift timeline |
| 6 | **AddictiveTips** | LOOKUP (addictivetips.com/contact) | Windows tool coverage; controller/Steam audience | Steam Input deadzone calibration workflow: measure drift → set per-game deadzone (our 30 settings guides) |
| 7 | **BleepingComputer** | LOOKUP (bleepingcomputer.com) | Security-adjacent but runs useful-tool news; large reach | The privacy angle: no ad network, no trackers, consent-only on-device telemetry in a niche full of AdSense sites |
| 8 | **XDA Developers** | LOOKUP (xda-developers.com) | Gaming handheld/controller coverage; Steam Deck audience | Steam Deck Hall-effect sticks vs stock — measurable data + our steam-deck fix guide |
| 9 | **gamingonlinux.com** | LOOKUP (gamingonlinux.com) | Linux-native gamepad testing (WebHID works on Chromium Linux); open-source audience | Open-source measurement lib + browser-only (no drivers) testing on Linux; dualshock-tools ecosystem synergy |
| 10 | **TechSpot** | LOOKUP (techspot.com/contact) | Hardware + software; long-form tech | "The state of stick drift in 2026" — data-backed feature: 5 models, 142,850 results, Hall-effect vs potentiometer, TMR emergence |

## C. Gaming/hardware sites (feature or tip-jar coverage)

| # | Outlet | Contact | Why | Personalized angle |
|---|---|---|---|---|
| 11 | **PC Gamer** | LOOKUP (pcgamer.com) | Controller hardware tips; per-game settings culture | Fortnite/Valorant/Apex deadzone settings data (30 per-game guides) — readers constantly ask "what deadzone should I use?" |
| 12 | **Tom's Hardware** | LOOKUP (tomshardware.com) | Hardware testing authority; ran drift/dedicated input coverage | Contrast: lab testing vs browser testing — our methodology page explicitly maps what browser tools can't measure (trust positioning) |
| 13 | **Game Rant** | LOOKUP (gamerant.com) | High-volume gaming news + guides | DualSense Edge module swap vs drift: data-backed comparison + repair CTA loop |
| 14 | **PCGamesN** | LOOKUP (pcgamesn.com) | PC gaming guides; settings content | "Best deadzone settings" per game — ours are free, data-referenced, controller-specific |
| 15 | **Windows Central** | LOOKUP (windowscentral.com) | Xbox peripherals coverage | Xbox controller drift is the #1 complaint — our xbox-wireless repair guide + 5.2% 12-month baseline figure |
| 16 | **Lifewire** | LOOKUP (lifewire.com) | Beginner-facing hardware explainers | "What is controller drift and how do I fix it?" — full-funnel story: test → fix → verify (we have all three) |
| 17 | **Notebookcheck** | LOOKUP (notebookcheck.net) | Deep-dive hardware reviews with measurement culture | Willing to compare our baseline numbers against their lab data — collaborative science angle |
| 18 | **Ghacks Germany / ghacks.net (follow-up)** | `arno@ghacks.net` | Follow-up cadence (2nd pitch, 4 weeks later) | Chrome extension v1.0.0 (Quick Check, JSON/CSV export) — new news hook |

## D. Dev/community (backlink + trust, not press mentions)

| # | Outlet | Contact | Why | Personalized angle |
|---|---|---|---|---|
| 19 | **r/consolerepair** | Community post (see Task 16) | The trust-gap audience from the dossier §7.5 | Value-first: "How to tell real drift from resting-thumb offset — and why one-tool readings get doubted" |
| 20 | **r/ControllerTesting / r/Gamepad / r/gaming (casual)** | Community post | Organic reach | "Browser controller testers: which numbers can you trust?" — our methodology, not a pitch |
| 21 | **Hacker News** | Submission | Dev audience; open-source lib + honesty stance | "I open-sourced the measurement math behind my controller-testing site (MIT)" |

---

## Email template A — proven-playbook blogs (data angle)

**Subject:** The controller tester that publishes its data (142,850+ results)

Hi [NAME],

You covered [THEIR COVERAGE, e.g., "controllertest.io in May"] — you clearly
know this niche, so here's the short version of what we're doing differently:

ControllerTesting.com runs 32 free browser diagnostics, but the part your
readers would care about is what happens after the test:

- Every number we publish traces back to a dated dataset or a methodology
  page. We explicitly say what browser tests can't measure (no lab-cert
  claims — the r/consolerepair crowd is right to distrust single readings).
- 142,850+ documented results across 5 models: Hall-effect sticks average
  0.1% drift after 12 months vs 3.1–5.2% for potentiometers — a 30–50× gap
  that's driving the TMR/Hall-effect hardware shift.
- 12 repair guides + 30 per-game settings guides, so "it drifts" becomes
  "measure → fix → re-test."
- The measurement math is open-source (MIT, gamepad-analyzer) — the exact
  code the site runs.

Happy to walk you through the dataset, methodology, or any specific model.
No invented figures, and I'll answer data questions with data.

Best,
[NAME] · [CONTACT]

---

## Email template B — roundup/hardware editors

**Subject:** One-liner hook for [OUTLET] readers: drift numbers, repair guides

Hi [NAME],

If you ever cover gamepad testing or stick drift, this might be useful for
your readers: a free browser tester that doesn't stop at "your stick is at
0.0231" — it says what that means for their controller, links the repair
guide, and re-tests after the fix.

Standout figures: [one line with THEIR angle, e.g., "Xbox controllers average
5.2% drift after 12 months in our 142,850-result baseline"].

Everything is free, no sign-up, no trackers, telemetry consent-only.
Full press kit: https://controllertesting.com/press

Best,
[NAME]

---

## Sending rules (honesty contract §6)

- 1 pitch per outlet, then 1 follow-up after ~4 weeks (template A/B mix).
- Never claim traffic/rankings we don't have. GSC is the only truth source.
- The data angle must be current: if the dataset updates, re-send the
  "Key findings" line with the new date.
- Track in a sheet: outlet, contact, sent date, reply, result. Kill items
  with no movement after the follow-up.
