# TESTS-GAMES-DEBUG-NOTES.md — Learnings & Fix Log

Append-only log from the Ralph Loop debugging pass (tools + games). Purpose: never re-fix the same bug class twice; every entry records the root-cause pattern so future audits can grep-check it in one pass.

## Iteration 0 (2026-08-12) — findings + fixes

### Audit method (worked well)
- 4 parallel `explore` agents: (A) controller tools batch 1, (B) controller tools batch 2, (C) special/mouse/god-mode tools, (D) all 13 games.
- **Self-verify EVERY claim before fixing** — one agent claimed asteroid-dash and trigger-racer had the same frozen-loop bug, but post-verification asteroid-dash was FINE (its rAF at end of frame is unconditional; the early `return` on death still leaves a pending frame from the previous cycle). trigger-racer was genuinely broken (rAF was AFTER the `return`). Only fix what you personally confirmed in source.

### SERIOUS bugs fixed
1. **nova-blaster + beat-drop: game loop never started.** Pattern: `frame()` only reschedules `requestAnimationFrame(frame)` inside `if (isPlaying)`; `startRun()`/`startBeat()` sets `isPlaying=true` but never kicks the loop; init calls `frame()` once (dead). Fix pattern: add `idle()` watchdog (`frame(); if (!isPlaying) requestAnimationFrame(idle)`) called at init, and `requestAnimationFrame(idle)` at the end of `endGame()` so the loop resumes after game-over and Play Again works. **Grep-check: file must contain TWO rAF targets in minified chunk (frame + idle).**
2. **trigger-racer: loop killed permanently on win.** `if (score>=1000){ endGame(); return; }` — `return` skipped the `requestAnimationFrame(loop)` below it; Play Again never restarted. Fix: removed `return` (endGame sets isPlaying=false; scoring is gated by `if (isPlaying)` so nothing accrues post-win). **Grep-check: no `endGame(); return;`.**
3. **HealthScore.astro wizard: steps 1–4 permanently invisible.** Panels had inline `style="...opacity: 0; pointer-events: none..."`; `showPanel()` only toggled Tailwind classes `opacity-0`/`pointer-events-none` — inline styles outrank classes, so the active panel stayed invisible. Fix: `showPanel()` now sets `p.style.opacity`/`p.style.pointerEvents` inline ('1'/'auto' for active, '0'/'none' for inactive). **Grep-check: chunk contains `opacity="1"` AND `pointerEvents="none"` (or minified equivalents).**
4. **DriftTester: dead "Calibrate Deadzone" primary CTA.** Button rendered, zero handlers. Fix: converted `<button>` → `<a href="/test/controller/deadzone">` (cross-tool CTA to the real deadzone tuner). **Grep-check: `href="/test/controller/deadzone"` in drift page HTML.**
5. **PollingRateTester: dead "Start 5-Second Test Sweep" + unused `isTestRunning`.** Fix: wired the button — resets peak/samples, sets isTestRunning, button text → "Sweep running…", after 5000ms restores button and writes peak-based rating. **Grep-check: "Sweep running" in built HTML.**
6. **kart-drift: duplicate render loops.** Init called `render()` AND `startGame()` called `render()` again; each loop self-reschedules unconditionally → 2× physics speed, loops accumulate per race. Fix: removed `render()` from `startGame()` (single loop from init), removed `return` after `endGame(k)` so race-win doesn't kill the loop → Play Again works. **Grep-check: exactly ONE `render()` invocation (minified: single rAF target).**
7. **memory-pulse: final pad of sequence never flashed** (and round 1 showed nothing). `flashPad` was set then immediately reset to `-1` in the same synchronous interval tick. Fix: defer `flashPad=-1; isShowing=false` via `setTimeout(...,450)` after last tick. **Grep-check: `450` literal in chunk.**

### MAJOR fixes worth keeping (6 flagship pages)
8. **Interactive2DVisualizer (ps5/xbox/joycon/nintendo-switch/switch-pro/full-diagnostic): three dead features in one script.**
   - SVG button highlights: `getElementById('btn-' + idx)` matched nothing — SVGs use id="btn-cross"/"btn-dpad-up" + `data-btn="N"`. Fix: pre-collect `document.querySelector('[data-btn="N"]')` for 0–17, use that array. Also replaced `filter: url(#glow-blue)` (nonexistent filter) with `brightness(1.6) drop-shadow(...)`.
   - Status badge: wrote to `#connection-subtext` (doesn't exist). Fix: target `#controller-status` (the real amber badge), swap to emerald classes when connected, back to amber+pulse when disconnected.
   - Hz/latency: wrote to `#master-hz`/`#master-latency` (don't exist). Fix: target `#polling-rate-val`/`#latency-val` which are in the markup.

### Notes for future audits (avoid re-verifying)
- **Astro bundles inline scripts into `dist/_astro/*.js` chunks and minifies/renames identifiers** — `idle` becomes `L`/`S`, etc. NEVER grep built HTML for function names; grep for distinctive literals (e.g. `450`, `Sweep running`, `opacity="1"`) or count rAF targets.
- **Games that are fine despite similar-looking code:** asteroid-dash (unconditional rAF at frame end keeps loop alive through early-return death), button-blitz, stick-sniper (unconditional rAF L214/L270).
- **Games output as `dist/games/<name>.html`** (flat), NOT `dist/games/<name>/index.html`. Tools output flat too (`dist/test/controller/drift.html`).
- **Known-not-bugs (do not report again):** canvas `ctx` null-check TS debt in games/god-mode (runtime-guarded), `FightStickTester` impossible condition `lsX < -0.5 && lsX > 0.5` (dead branch, harmless), `QuickHealth` save button no-op (auto-saves on finish), unused imports (`PremiumFaqAccordion` in 4 shells), `ctx.roundRect` on old browsers.
- **MINOR items deliberately NOT fixed (log-only):** CircularityTester hull drawn in arrival order, DpadTester no disconnect-reset, LatencyEstimator double-start double timeout, DriftTester DPR radius inconsistency, Circularity/Deadzone DPR canvas offset on retina (render uses physical width post-`setTransform`), TouchpadTester X/Y tracking unimplemented + `buttons[2]` false-positive, GyroscopeTester uses stick axes not IMU pose, MicrophoneTester stream leak on repeat clicks, CompetitiveReadiness random benchmark output, PSCalibration/WebHIDCalibrator no device write, AimTrainerCanvas no stick input, AudioRadar fabricated latency, HzVisualizer ignores targetHz, combo-rush held-input auto-solve, quick-draw rAF accumulation, stick-maze score not reset, neon-striker NaN on exact center collision, signal-salvage XP farm. If a future pass touches these, reference the original agent evidence (they were found in iteration 0 of this log).
- **Pre-existing QA baseline:** `npm run check` debt is in games canvas `ctx null` narrowing + localized trees; keep edits free of NEW errors. Build = 271 pages.

## Performance pass (2026-08-12) — Three.js hero code-split

- **Homepage critical-path JS: 557 KB → 4 KB** (−99.3%, −142 KB gzipped). The entire Three.js engine (555 KB / 142 KB gz) now lives in `controllerHero3D.ts`, dynamically `import()`-ed ONLY when the hero enters the viewport AND the browser is idle (existing IO+rIC gate preserved verbatim). GLB fetch unchanged (already lazy).
- **Files:** `src/components/global/controllerHero3D.ts` (engine, exported `startHero3D`) + `ControllerHero.astro` now holds only a ~1 KB loader that duplicates the gate + idempotency flag (`dataset.threeInitialized`).
- **Verification pattern:** engine chunk must NOT appear in any built HTML (`grep -rl controllerHero3D dist --include="*.html"` = 0); homepage scripts = 2 tiny files; chunk exists in `dist/_astro/controllerHero3D.*.js`.
- **Structure untouched:** no markup/DOM/SEO changes (canonical, JSON-LD, sitemap 251, 271 pages all re-verified post-build).
- **Gotcha:** functions extracted verbatim may carry unused vars (`delta`) — the TS `noUnusedLocals` warning is silenced by dropping the assignment but KEEPING the side-effect call (`clock.getDelta()` advances the clock used by `getElapsedTime`); never delete a side-effecting call.
- **hreflang non-issue (verified, not a regression):** en-only launch (2026-08-10) intentionally disables locale alternates (`languageSet` empty in BaseLayout) — the "0 hreflang" grep result is by design, not breakage.

## Iteration count
- Iteration 0: 7 serious + 1 major-batch (3 components) fixed, build verified clean, learnings logged.
## 3D hero model compression pass (2026-08-12) — 6.5 MB → 1.2 MB

- **Problem:** `/models/controller.glb` shipped uncompressed; at ~10 Mbps a 6.5 MB fetch ≈ 5 s before the controller appears (the reported "5 second load" bottleneck).
- **Fix:** re-encoded with gltfpack (`/tmp/gltfpack-bin/gltfpack` v1.2, only tool that worked; three's Draco route capped at 3.5 MB):
  - `-cc` (meshopt compression: EXT_meshopt_compression, KHR_mesh_quantization) — 48 meshes merged into 1 mesh/1 node (fewer draw calls), 19 materials kept (1 unused dropped), 7 textures preserved.
  - `-tc -tu color -tq color 10` (KTX2 textures: UASTC near-lossless for color maps, ETC1S q8 for normal/attrib maps) — 7/7 images now KTX2.
  - Result: **1.23 MB (−81%)**, gz ≈ 1.04 MB.
- **Runtime wiring (`controllerHero3D.ts`):** `loader.setMeshoptDecoder(MeshoptDecoder)` + `new KTX2Loader().setTranscoderPath('/libs/basis/').detectSupport(renderer)`; decoders self-hosted in `public/libs/basis/` (311 KB + 488 KB... exactly `basis_transcoder.js`/`.wasm` copied from `node_modules/three/examples/jsm/libs/basis/` — zero CDN, repo rule). Engine chunk grew 555 → 631 KB (lazy only; homepage critical path still 4 KB).
- **Fallback chain intact:** any GLB fetch/decode error → `buildProceduralGamepad()` (pre-existing, untouched). WebGL1 devices degrade via KTX2Loader `detectSupport` (no site breakage).
- **Fidelity choice:** rejected all-ETC1S variant (0.99 MB, banding risk on gradients) in favor of UASTC-color (1.23 MB, color loss invisible, normal/attrib ETC1S — standard practice).
- **Verification (no browser in VM):** meshopt buffers decoded 5/5 clean with the exact shipped `MeshoptDecoder` module via Node (`node --input-type=module` script; call contract is `decodeGltfBuffer(target, count, byteStride, source, mode, filter)` — `byteStride`, NOT `stride`); GLB JSON extensions verified (`EXT_meshopt_compression`, `KHR_mesh_quantization`, `KHR_texture_basisu`, `KHR_texture_transform`); build 271 pages clean; engine chunk still absent from all HTML; `build-check.sh` PASSED.
- **Gotcha:** gltfpack v0.21 URL is dead (9-byte "Not Found") — use the `v1.2` release assets; `-tcx` does not exist in v1.2 (it's `-tc` + `-tu <class>`).

## 3D hero prefetch fan-out (2026-08-12) — kill the serial waterfall

- **Problem:** after idle fired, hero assets downloaded SERIALLY: engine chunk (631 KB) → GLB (1.2 MB) → Basis transcoder (.js 311 KB + .wasm 488 KB loaded only at first KTX2 texture decode). Wall time = sum of three sequential round trips.
- **Fix (`ControllerHero.astro` loader, inside idle callback, before the dynamic import):** inject `<link rel="preload">` for `/models/controller.glb` (as=fetch, type=model/gltf-binary), `/libs/basis/basis_transcoder.js` + `.wasm` (as=fetch). All three fetches now start in the same tick as the engine chunk import → wall time ≈ max(631KB, 1.2MB, 0.8MB) instead of the sum. Dedupe guard (`link[href]` check) + `crossOrigin=anonymous` (matches three's FileLoader credentials mode so the preload is actually consumed, not wasted).
- **Safety:** preloads happen only after idle fires; engine still lazy (0 references in built HTML); if the import fails, preloads are just warm cache. Build 271 pages clean, hints verified present in the hero loader chunk.

## 3D hero timing gate rework (2026-08-12) — target: model ≤2s

- **Problem:** idle gate `timeout: 2500` meant NO byte of the hero might download until up to 2.5s after load — alone blowing the 2s budget before any fetch even started.
- **Fix (`ControllerHero.astro`):** split into two phases —
  1. Preloads (`/models/controller.glb`, `basis_transcoder.js/.wasm`) fire the moment the hero enters the viewport (pure fetches, zero main-thread cost, don't touch rendering budget).
  2. Engine import races `requestIdleCallback(timeout: 1500)` vs `window.load + 150ms` (idempotent `started` flag) — worst-case engine start ≈ load+150ms instead of 2.5s.
- **Expected timeline (typical desktop, ≥10Mbps):** hero visible ~0.1s → GLB/transcoder prefetched by ~1s → engine starts at first idle (~0.2-0.5s typical) or load+150ms (worst) → KTX2 decodes (worker thread) → model painted ≈ **1-2s** vs the old 5s. Slow networks (2Mbps) still bound by the 1.2MB GLB (~5-6s) — bytes are already at the floor without visual regression; the honest next step there is a lower-poly LOD swap (out of scope, visual risk).
- **CWV safety:** preloads are fetch-priority-low (don't compete with font/LCP), engine stays lazy (0 refs in built HTML), spinner shows until first paint so no layout shift. Build 271 pages clean.
