# Controller Quick Check — Chrome Extension

Browser controller diagnostics in one popup: **stick drift %, circularity error,
polling-rate estimate, vibration test**, with **JSON/CSV export**.

Built by ControllerTesting.com. The measurement math is the open-source
[`gamepad-analyzer`](../gamepad-lib) package (MIT) — the same code that powers
the site's live tools, so the extension and the site never disagree.

## Install (unpacked / development)

1. Open `chrome://extensions`
2. Enable **Developer mode** (top-right)
3. Click **Load unpacked** and select this `extension/` folder
4. Pin the extension and click the icon to run a Quick Check

## What it does

- **Live drift** — left/right stick at-rest offset as % of full travel
- **Circularity** — auto-samples the outer rim while you rotate a stick (≥20
  rim samples needed; keep rotating for a stable reading)
- **Polling rate estimate** — derived from Gamepad API `timestamp` deltas
  (wired will read higher than Bluetooth; estimate, not protocol capture)
- **Vibration** — single 300 ms dual-rumble burst via `vibrationActuator`
- **Export** — JSON and CSV snapshots with timestamp, controller ID, model,
  and readings

## Honest limitations (shown in the popup)

- Browser diagnostic, **not a hardware-lab certification**
- Readings depend on connection mode (wired vs Bluetooth) and browser sampling
- Circularity needs a full slow rotation to be meaningful
- `vibrationActuator` support varies by controller and browser

## Privacy

No permissions are requested. No network requests. All readings stay on your
device. For the full-featured versions of these tests, the reliability dataset,
and the testing methodology, visit https://controllertesting.com.
