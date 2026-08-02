# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gamers, PC builders, and device owners who need to check whether a controller or gaming peripheral is working correctly before playing, repairing, replacing, or tuning it.

## Product Purpose

ControllerTesting.com provides free, browser-based hardware diagnostics for controllers and related peripherals. Visitors connect a device, run a focused test or guided diagnostic, and get an understandable result without downloads or an account.

## Positioning

The product combines real-time browser hardware tests with a broader diagnosis-to-repair journey: measure the issue, understand the result, decide whether to fix or replace the device, and retest.

## Operating Context

Use happens in a desktop or mobile browser while a controller is connected over USB, Bluetooth, or a supported browser hardware API. The visitor may be troubleshooting drift, checking buttons and triggers, validating polling or latency, or preparing a device for competitive play.

## Capabilities and Constraints

- Astro 5 static output with pre-rendered pages; client-side JavaScript is reserved for hardware tests and small interactions.
- Supports controller, mouse, keyboard, MIDI, audio, calibration, repair, settings, games, embeds, and reliability content routes documented in `AGENTS.md`.
- Uses the native Gamepad, WebHID, Web MIDI, Web Audio, Canvas, and LocalStorage APIs where supported.
- The site must remain fast, accessible, responsive, privacy-conscious, and useful without a sign-up.
- Claims about measured telemetry, indexed pages, tool counts, or benchmarks must stay aligned with repository evidence; do not fabricate testimonials or external proof.

## Brand Commitments

- Product name: ControllerTesting.com.
- Existing dark-tech precision-instrument language, Electric Cobalt accent, Pass Emerald status color, and Geist / Geist Mono typography remain in force.
- The supplied DualSense controller image is an approved homepage visual asset.

## Evidence on Hand

- Repository product manifest: `AGENTS.md`.
- Existing product and architecture documents in the workspace root.
- Implemented Astro routes and diagnostic components under `controllertesting/src/`.
- Supplied controller photograph copied to `controllertesting/public/images/controller-hero.jpg`.
- No customer testimonials or independently verified competitor data were supplied for this redesign.

## Product Principles

- Show the visitor what the diagnostic can do before asking them to explore.
- Make raw hardware signals understandable and actionable.
- Keep tests private, lightweight, and usable without an account.
- Treat performance and accessibility as product behavior, not polish.

## Accessibility & Inclusion

Preserve keyboard access, visible focus, readable contrast, reduced-motion support, touch targets of at least 44px, and a usable fallback when a browser does not expose a hardware API.
