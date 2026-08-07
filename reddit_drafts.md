# Phase 3 — Reddit Drafts (Task 16)

> Date: 2026-08-02 · Strategy: value-first, trust-gap audience (dossier §7.5:
> "the r/consolerepair audience already has credibility mechanisms — align
> with them, don't fight them"). No link-dumping; the site link appears once
> and only as supporting material. Wait 2+ weeks between the two posts.

---

## Draft 1 — r/consolerepair (education-first, no pitch)

**Title:** PSA: "drift tester" apps usually can't tell resting-thumb offset
from real drift — here's how to check

Body:

If you've spent any time here you've seen the pattern: someone runs a browser
drift test, gets 2-3% on a fresh controller, and starts RMA paperwork. Then
they plug in a different tool and get 0.2%.

Which one is right?

Honestly? Neither, alone. Browser gamepad testing has real, measurable
limits that most sites don't tell you about:

1. **The resting-thumb problem.** If you rest your thumb on the stick while
   the test samples, you're measuring your thumb, not the potentiometer.
   Resting bias of 1-3% is normal and not drift.
2. **The browser vs the API.** The Gamepad API only reports what the OS
   driver gives it. USB vs Bluetooth, polling rate, driver-level deadzones
   (Steam Input is famous for this) — all change the reading. A browser test
   can't see the raw potentiometer voltage; only WebHID can, and only on
   some controllers.
3. **The sample-time problem.** Real drift is a *trend over months*, not a
   snapshot. A 30-second test tells you current offset, not degradation.

How to actually check, in order:

- Test twice, 30 minutes apart, *no hands on the stick*, controller on a
  flat surface. Difference of >0.5% between runs = suspicious.
- Compare USB vs Bluetooth readings. If USB is clean and BT drifts, that's
  connection noise, not a worn pot.
- Test with Steam Input disabled (it applies its own deadzones).
- For the trend: log your offset once a month. A controller that goes
  0.1% → 0.8% over 6 months is wearing out; one that's flat at 1.5% for
  a year probably always had that rest offset.

Relevant reading: https://controllertesting.com/test/methodology (yes I
built the site — but the points above stand regardless, and their
methodology page says the same thing about the limits)

---

## Draft 2 — r/ControllerTesting (data/community)

**Title:** 140k+ documented drift results — what browser testers actually
show, and the Hall-effect gap

Body:

I run a browser controller tester and I've been logging anonymized,
consent-only drift results (no personal data, just model + measurement).
After 140k+ results across 5 controller models the patterns are consistent
enough to share:

- Potentiometer sticks (DualSense, Xbox Wireless): median drift creeps up
  ~3-5% by month 12, with onset typically at 9-14 months of use.
- Hall-effect sticks: median stays under 0.5% at 12 months.
- The single biggest source of "false drift" readings is resting-thumb
  bias, not hardware — around a third of high readings we see are user
  error, which is exactly why we publish what a browser test can and
  can't measure.

Caveats, since I know how this sub works: this is self-reported browser
data, not a lab. Polling rates, Steam deadzones, and Bluetooth all add
noise. It's a useful baseline, not gospel. Lab testing (GamersNexus-style
LDAT rigs) is the gold standard — I'd love to see more of it for sticks.

Full breakdown: https://controllertesting.com/reliability/report
And the measurement math is open source (MIT) if anyone wants to audit or
fork it: https://controllertesting.com/press

---

## Posting rules

- Never post in a sub that bans self-promo (check sidebar; r/consolerepair
  tolerates tools when the post is education-first).
- Engage with every comment for 48h. Repair-tech audiences smell a drive-by
  pitch and will roast it in the first hour.
- No second post in the same sub. One education post per community, ever.
- Numbers quoted must match `src/data/reliabilityData.json` — if the
  dataset updates, update the post copy before posting.
