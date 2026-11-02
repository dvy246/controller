/**
 * gameSettings.ts — per-game controller settings data for /settings/[game].
 * Merged from the retired /settings/[game]/[controller] and
 * /deadzone-calculator/[game]/[controller] grids (301'd to /settings/[game]).
 * All values are community starting points, not measured results.
 */

const settingsGames = [
    {
      slug: 'fortnite',
      name: 'Fortnite',
      deadzoneScale: '0–50 slider',
      deadzoneRange: '10% – 15%',
      deadzoneNote: 'Fortnite defaults both stick deadzones to 15%. Most competitive players lower toward 10%, or lower, on clean sticks.',
      responseCurve: 'Linear',
      curveNote: 'Linear is the competitive standard; Exponential is the default and smooths small inputs.',
      sensNote: 'Common starting point: X/Y ~35–40, ADS ~15 (sensitivity % sliders).',
      triggerNote: 'Trigger deadzone available in settings; raise it if triggers are loose.',
      driftRiskNote: 'Fortnite is a drift-pressure test: constant aim-down and build inputs wear sticks faster.',
      editorial: 'Fortnite\'s 0–50 deadzone scale is coarser than most games, so every step you raise the slider removes a meaningful chunk of your fine stick range. Because building and editing depend on quick, precise flicks, a deadzone tuned for pure accuracy will feel slow when you snap to edit a wall; the competitive compromise is the lowest deadzone your stick noise allows, paired with Fortnite\'s linear response curve rather than the default exponential. If you notice phantom edits between builds, that is the tell your deadzone is too low for that specific stick.',
    },
    {
      slug: 'apex-legends',
      name: 'Apex Legends',
      deadzoneScale: '0–100 slider',
      deadzoneRange: '3% – 5%',
      deadzoneNote: 'Apex has one of the tightest competitive deadzone scales; many pros run 0–4 on clean sticks and raise to ~10 on drifting sticks.',
      responseCurve: 'Linear',
      curveNote: 'Linear is dominant in competitive Apex for consistent flick aim; "Classic" is the default curve.',
      sensNote: 'Common starting point: Look sensitivity 4–5 (classic), ADS 1x.',
      triggerNote: 'N/A — Apex uses buttons; no trigger-deadzone setting.',
      driftRiskNote: 'Apex rewards micro-aim at long range, so even 2–3% drift is visible in-game.',
      editorial: 'Apex\'s deadzone sits on a fine 0–100 scale, and its competitive meta runs the tightest values in the industry because the game is dominated by long-range beam fights where even a 2% center offset pulls your crosshair off a head at 100 meters. The trade-off is that a deadzone this tight exposes every bit of stick noise — so the real work is separating sensor noise from true mechanical drift. Run the circularity and drift tests first; if the resting value is clean, Apex rewards the lowest deadzone the game allows. Apex also layers its response curve under the deadzone, and the game ships with per-ADS multipliers that stay decoupled from hipfire, so after you set the center zone, verify the 1x sight tracking separately rather than assuming one clean number covers every zoom state. The Legends roster spreads input habits wide: a sniper-oriented legend like Vantage or Seer on a heavy flick stick tolerates a slightly higher center than a close-range skirmisher who needs every pixel of fine tracking, so tune to your legend class rather than a universal value.',
    },
    {
      slug: 'warzone',
      name: 'Call of Duty: Warzone',
      deadzoneScale: '0–100 slider',
      deadzoneRange: '5% – 10%',
      deadzoneNote: 'Warzone exposes minimum/maximum stick deadzones. Community standard starts at ~5%, raised to cover visible drift.',
      responseCurve: 'Dynamic',
      curveNote: 'Dynamic gives fast outer-edge turns with fine small-input control — the popular competitive pick.',
      sensNote: 'Common starting point: Look sens 6–7, ADS multiplier ~0.8–1.0.',
      triggerNote: 'Trigger deadzone matters for semi-auto guns; lower it for instant shots.',
      driftRiskNote: 'Warzone\'s long-range recoil control makes drift visible as slow camera movement.',
      editorial: 'Warzone is the game that most clearly separates minimum and maximum deadzone, and both matter in different fights: the minimum filters center drift while the maximum governs how early your stick reaches its outer turning speed. Because Warzone is a battle royale with both close-range hipfire and long-range recoil control, a one-size slider is wrong — set the minimum to just cover your noise floor, and keep the maximum near 100 so you keep corner speed on the close fights. The recoil-control drill is a good test: if the camera walks during sustained fire, your minimum is doing more harm than the drift it hides.',
    },
    {
      slug: 'rocket-league',
      name: 'Rocket League',
      deadzoneScale: '0–1 float',
      deadzoneRange: '0.05 – 0.10',
      deadzoneNote: 'Rocket League uses 0–1 float deadzones. Community standard: 0.05–0.10 for sticks; dodge deadzone ~0.50.',
      responseCurve: 'N/A',
      curveNote: 'Rocket League has no response curve; stick feel comes from deadzone shape (square vs circle) in settings.',
      sensNote: 'No sensitivity slider — controller feel is tuned entirely via deadzone and the square/circle shape toggle.',
      triggerNote: 'Trigger used for throttle; keep default (no deadzone issue).',
      driftRiskNote: 'Drift shows as slow car rotation at rest; even 0.03 deadzone gaps are noticeable to players.',
      editorial: 'Rocket League is the one game here where the deadzone number is a 0–1 float and the shape toggle (square vs circle) is arguably more important than the deadzone value itself. Square reads the full corner, which is why ceiling-shot and wave-dash players prefer it; circle is more predictable for aerials because diagonal magnitude behaves consistently. Because Rocket League has no response curve, all stick feel flows through these two settings — so if the game feels twitchy or floaty, test the shape toggle before touching the deadzone, then settle on the smallest deadzone your stick tolerates for the air roll and kickoff inputs that define the game.',
    },
    {
      slug: 'street-fighter-6',
      name: 'Street Fighter 6',
      deadzoneScale: 'No in-game slider',
      deadzoneRange: 'System default',
      deadzoneNote: 'SF6 does not expose a stick deadzone setting — lever behavior is governed by system/console-level settings. Keep sticks clean; drift causes phantom directional inputs.',
      responseCurve: 'N/A',
      curveNote: 'Fighting games need raw gate direction; SF6 has no curve option.',
      sensNote: 'N/A — movement is discrete (lever shortcuts available in settings for 360/720 inputs).',
      triggerNote: 'Trigger/L1 are mapped to parry/drive impacts; no deadzone setting.',
      driftRiskNote: 'A drifting stick in SF6 reads as false left/right inputs — the worst kind of failure for a fighting game.',
      editorial: 'Street Fighter 6 has no in-game stick deadzone, which makes it the purest test of your pad\'s hardware: every mechanical offset is visible as phantom movement or a scrub input. Fighting games read the gate direction, so the classic failure is a stick that returns slightly off-center and feeds a false left into your dash. Since there is no slider to hide it, the fix is hardware — clean the gate, re-center the spring, or replace the module. If you play on PC, a third-party remapper with a deadzone filter is the only software-level compensation available.',
    },
    {
      slug: 'valorant',
      name: 'Valorant',
      deadzoneScale: '0–100 slider',
      deadzoneRange: '8% – 15%',
      deadzoneNote: 'Valorant\'s controller support exposes a stick deadzone; community starting point ~10%, raised only if your stick drifts.',
      responseCurve: 'Standard (s-curve)',
      curveNote: 'Valorant\'s controller curve is fixed; aim assist settings matter more than curve choice.',
      sensNote: 'Common starting point: Horizontal/Vertical ~50%, ADS multiplier ~0.7–0.9.',
      triggerNote: 'Trigger not used for shooting on controller defaults (R2 is fire).',
      driftRiskNote: 'Tactical shooters punish drift hardest — a drifting stick moves your crosshair off a held angle.',
      editorial: 'Valorant\'s controller support is deliberately conservative: the aim-assist system is tuned around a fixed response curve, and the stick deadzone exists mainly to filter hardware noise before assist takes over. That ordering matters when you tune — if you set the deadzone too high, you hand the assist system a smaller, less accurate signal to work with, and your micro-corrections feel sticky. The community approach is to run the lowest deadzone your stick tolerates and let the assist do its job, rather than fighting drift with an aggressive zone.',
    },
    {
      slug: 'counter-strike-2',
      name: 'Counter-Strike 2',
      deadzoneScale: '0–100 slider',
      deadzoneRange: '10% – 15%',
      deadzoneNote: 'CS2 shipped official controller support in 2025 with a deadzone slider; community starting point ~10–15%.',
      responseCurve: 'Standard',
      curveNote: 'CS2 offers no curve customization; stick response is fixed.',
      sensNote: 'Common starting point: sensitivity ~1.0–1.5 with controller aim assist enabled.',
      triggerNote: 'Trigger deadzone applies to semi-auto and one-tap shooting — keep it minimal.',
      driftRiskNote: 'One-tap precision makes any center drift a headshot miss; test before ranked.',
      editorial: 'CS2\'s controller path is still maturing, and the community consensus is that the deadzone slider shipped as a blanket solution for pads that were never designed for CS-style precision. Because one-tap accuracy lives and dies on a stable center, CS2 players should measure their stick\'s resting noise floor before touching the slider, then set the deadzone just one notch above that measurement — not at the default. A slider set to hide minor wear will hide your micro-corrections too, and on a game where a single pixel decides the fight, that trade is rarely worth it.',
    },
    {
      slug: 'overwatch-2',
      name: 'Overwatch 2',
      deadzoneScale: '0–100 slider',
      deadzoneRange: '8% – 15%',
      deadzoneNote: 'OW2 deadzone default is 0.10 (10%). Community tuning usually 8–15%, raised to mask drift.',
      responseCurve: 'Dual-Zone',
      curveNote: 'Dual-zone keeps fine inner control with fast outer turns — the competitive standard.',
      sensNote: 'Common starting point: Horizontal/Vertical ~40–50, aim assist window ~25–30.',
      triggerNote: 'N/A — abilities on buttons; no trigger-deadzone setting.',
      driftRiskNote: 'Heroes like Widowmaker make drift immediately visible; supports feel it on flick heals.',
      editorial: 'Overwatch 2\'s dual-zone response curve is the key differentiator here: it keeps fine inner control for precise tracking while ramping to fast outer turns, which is why the game feels good on a tight deadzone. But dual-zone magnifies center noise — the transition between the two zones is exactly where a drifting stick jumps, making heroes like Widowmaker or a flick-healing support feel unsteady. Because Overwatch is a game of many heroes, tune the deadzone to the tightest value that stays clean across a few minutes of idle play, then verify it holds on a high-sensitivity flick hero. Hero roster also matters because aim assist in Overwatch 2 scales per hero and per role, so a support running a small, steady hitbox does not need the same center clearance as a DPS whose kit depends on snapping across sightlines. The dual-zone knee point is the real tuning surface: put your knee just past where your stick stops at rest and the outer ramp feels instantly faster without sacrificing the pixel control the inner zone gives you.',
    },
    {
      slug: 'halo-infinite',
      name: 'Halo Infinite',
      deadzoneScale: '0–10 sliders',
      deadzoneRange: 'Center 0 – 1, Axial 0 – 1',
      deadzoneNote: 'Halo Infinite exposes center + axial deadzones on a 0–10 scale. Most players set center and axial at 0–1 on clean sticks.',
      responseCurve: 'Standard',
      curveNote: 'Halo\'s curve is fixed; feel is tuned via deadzone and "Look Acceleration" settings.',
      sensNote: 'Common starting point: Look sensitivity 3–4, acceleration ~2.',
      triggerNote: 'Trigger deadzone exists for semi-auto weapons; keep near 0.',
      driftRiskNote: 'Halo\'s magnetism and large hitboxes mask some drift, but BR shots expose center offset.',
      editorial: 'Halo Infinite exposes center and axial deadzones as separate 0–10 sliders, which is rarer than a single radial zone and worth understanding: the center deadzone is a circle that filters resting offset, while the axial deadzone clips each axis independently. Because Halo\'s aim assist and magnetism mask small drift during tracking, many players run both sliders at 0–1 and never notice the noise — but the Battle Rifle\'s burst pattern exposes a center offset immediately. Set the center slider just above your resting noise floor and leave the axial at 0 unless you see diagonal bias.',
    },
    {
      slug: 'elden-ring',
      name: 'Elden Ring',
      deadzoneScale: 'No in-game slider',
      deadzoneRange: 'System default',
      deadzoneNote: 'Elden Ring has no in-game deadzone setting — adjust at console/Steam level, or use third-party remapping tools on PC.',
      responseCurve: 'N/A',
      curveNote: 'No curve options; Souls-style camera is raw stick input.',
      sensNote: 'Camera sensitivity slider exists in-game; no deadzone control.',
      triggerNote: 'Triggers are not analog-meaningful (light/heavy attack on R1/R2) — drift on the camera stick is the real problem.',
      driftRiskNote: 'A drifting camera stick causes unintended slow panning — lethal when platforming or fighting.',
      editorial: 'Elden Ring exposes no deadzone control, so the game runs whatever your pad\'s raw center is — which is why Souls-likes are a classic place to first notice drift: the camera slowly pans on its own while you are standing still, and the unintended panning is lethal on narrow walkways and during boss fights. There is no in-game slider to fix it, so the remedies are at the platform level — a system-level remapper on PC, or hardware repair. The camera stick is the one that wears first, so if you play Elden Ring a lot, rotate which stick handles the camera is not an option — plan for module replacement instead of tuning.',
    },
  ];

const settingsControllerNotes = {
    'ps5-dualsense': {
      sticks: 'Potentiometer sticks. The DualSense exposes no system-level deadzone slider on PS5 — the only deadzone control lives in each game\'s own options menu.',
      connection: 'On PS5, wireless and USB report identical stick values; on PC, the pad shows as a generic gamepad unless you run Steam Input or DualSense feature drivers, so tune {game.name}\'s slider on the platform where you actually play.',
      drift: 'DualSense drift tends to show up as a slow camera or aim drift after 6–12 months of heavy use, and it reads the same in {game.name} as on any other title.',
      faq: `the DualSense has adaptive triggers and haptics but neither affects deadzone — a worn trigger spring shows up as a loose input, not drift. Run the 2-minute stick drift check and the trigger tester before blaming the deadzone setting.`,
      deep: `The DualSense is unique in this set because its adaptive triggers and haptics sit on the same USB link as the stick data. If you run {game.name} on PC, keep the DualSense on a direct USB port — wireless adds a small amount of jitter to the stick stream that a tight deadzone will expose. Also note that the DualSense's built-in audio and touchpad keep the controller awake in a way older pads do not; if your {game.name} stick reads noisy at rest, disconnect the headset from the pad and re-measure before adjusting the game deadzone.`,
    },
    'xbox-wireless': {
      sticks: 'Potentiometer sticks. Windows XInput has no system deadzone control, so Xbox players tune deadzone exclusively inside each game\'s menu.',
      connection: 'The Xbox Wireless Controller runs native XInput on Windows (best compatibility of the three), but the Xbox Accessories app remaps buttons only — it exposes no deadzone slider. Keep {game.name}\'s deadzone slider as your only tuning point.',
      drift: 'Xbox sticks drift most often at the outer edge after heavy FPS use; in {game.name} that reads as aim sway during fine tracking rather than a center jitter.',
      faq: `the Xbox controller\'s share/pair button and 3.5mm jack don\'t influence analog precision. If {game.name} feels off, verify with the deadzone visualizer before adjusting the slider.`,
      deep: `On Windows the Xbox Wireless Controller is the reference implementation for XInput, which means whatever the game reads is exactly what the controller sends — there is no mapping layer to filter a drifting stick before {game.name} sees it. That is good news for tuning (your slider is the only lever) and bad news if the stick is worn (no software can hide it in-game). If you play over Bluetooth on a laptop, the Xbox pad's wireless report can lag in busy environments; switch to the included wireless adapter or USB when you are making precise deadzone decisions.`,
    },
    'switch-pro': {
      sticks: 'Potentiometer sticks. On Switch there is no system deadzone setting; the Pro Controller follows each game\'s per-title deadzone just like the other pads.',
      connection: 'On Switch, motion/gyro works natively; on PC the Pro Controller reports as generic HID with Nintendo-layout buttons (A/B and X/Y swapped), so Steam Input mapping is recommended — but the analog values reaching {game.name} are unchanged.',
      drift: 'The Pro Controller drifts less famously than Joy-Cons, but stick wear still shows as small center offsets in {game.name}\'s menu when you set the deadzone below the stick\'s noise floor.',
      faq: `the Pro Controller\'s gyro and amiibo support have nothing to do with the analog deadzone; if a low deadzone reveals jitter in {game.name}, it is mechanical stick noise, not a console quirk.`,
      deep: `The Switch Pro Controller is the one pad in this set with two completely different input stacks depending on where you play. On Switch, motion aiming and the analog stick share the same wireless link, so a low battery can add stick noise in {game.name} — charge before you tune. On PC, Steam Input is in the path between the controller and the game, and it can apply its own deadzone, response curve, or even a button-rebind that changes your aim behavior. If {game.name} feels different on PC than on Switch with the same slider value, the culprit is usually Steam Input, not the game.`,
    },
  } as Record<string, { sticks: string; connection: string; drift: string; faq: string; deep: string }>;

const deadzoneGames = [
    {
      slug: 'fortnite', name: 'Fortnite', shape: 'radial' as const,
      scale: '0–50 slider', range: '10% – 15%',
      note: 'Fortnite defaults both stick deadzones to 15% (on its 0–50 scale). Most competitive players lower toward 10% or below on clean sticks; if your red indicator drifts, raise just enough to hide it.',
      deep: 'Fortnite applies a radial deadzone to a 0–50 scale, which means each step is coarse relative to Apex or Valorant. Because building relies on tiny stick flicks, a deadzone set too high is felt as "sticky" stair-step movement between builds; a deadzone set too low registers phantom edits when your thumb settles. Fortnite\'s input also includes a separate legacy "exponential" vs "linear" response curve, which changes how the same deadzone feels across the stick\'s range — tune the curve first, then the deadzone.',
      editorial: 'Fortnite\'s piece-by-piece building system is the real reason its deadzone discussion exists at all: pro builders and the "zero deadzone" movement grew out of Fortnite because building requires the stick to return to an exact neutral after every flick. Between build pieces your stick taps neutral hundreds of times a match, so any deadzone big enough to hide drift also rounds off those taps into slower, mushier builds. Test in Creative, not Battle Royale — a protected creative island gives you the same stick readings without a live storm timer pressuring the result.',
    },
    {
      slug: 'apex-legends', name: 'Apex Legends', shape: 'axial' as const,
      scale: '0–100 slider', range: '3% – 5%',
      note: 'Apex has one of the tightest competitive deadzone scales in the industry — many pros run 0–4% on clean sticks. Long-range micro-aim makes even 2–3% drift visible in-game, so test before you tune.',
      deep: 'Apex applies an axial deadzone on a 0–100 scale and layers it under its response-curve and per-ADS-sensitivity settings. The axial shape matters: it clips each axis independently, so a small center offset can rotate your aim during a tracking fight even when the stick is returned to rest. Apex also lets you set deadzone and "outer threshold" separately — keep the outer threshold near 100 so you do not trade corner reach for a cleaner center.',
      editorial: 'Apex\'s axial deadzone is the direct result of the game\'s origins in the Titanfall movement lineage, where precise air-strafe control demanded independent axis handling. In practice that means testing the left and right sticks separately in Apex rather than expecting a single symmetric result — a fight stick that is fine on the right can still have a worn left axis from slide-jump spam. Use the firing range (not an arena match) to measure: the dummies give you a stationary crosshair reference for center drift that a live fight will never show.',
    },
    {
      slug: 'warzone', name: 'Warzone', shape: 'radial' as const,
      scale: '0–100 slider', range: '5% – 10%',
      note: 'Warzone exposes separate minimum and maximum stick deadzones. The community standard starts around 5%, raised only to cover visible drift; keep the maximum low so outer-edge turning stays responsive.',
      deep: 'Warzone exposes separate minimum and maximum stick deadzones — the minimum hides center drift while the maximum lets you tune the outer edge. Since Warzone uses a radial shape on a 0–100 scale, the minimum behaves like a true circle: any stick deflection inside it is ignored entirely. Because the game is heavy on aim-down-sights tracking, an aggressive minimum that is one or two units above your noise floor is the common competitive target, and the maximum is best left just under 100 to preserve corner speed.',
      editorial: 'Warzone\'s loadout meta changed how the community thinks about deadzone because of the slide-cancel and drop-shot mechanics baked into its movement system — both require the left stick to hit and release full deflection repeatedly, which wears the center faster than pure aiming. The practical result is that Warzone players often end up with a slightly higher minimum than they would run in a pure aim trainer. Load into a private match with no AI, set the slider just above your measured noise, and verify with a full sprint-slide-cancel cycle before you trust the number in an actual lobby.',
    },
    {
      slug: 'rocket-league', name: 'Rocket League', shape: 'radial' as const,
      scale: '0–1 float', range: '0.05 – 0.10',
      note: 'Rocket League uses 0–1 float deadzones plus a separate dodge deadzone (~0.50). The stick deadzone standard is 0.05–0.10, and the square-vs-circle shape toggle changes how diagonal input is read.',
      deep: 'Rocket League is the only game in this set that tunes on a 0–1 float scale and pairs the stick deadzone with a separate dodge deadzone around 0.50. The "controller deadzone" here affects all analog input, while the dodge deadzone governs when a flick registers a flip — so a tight stick deadzone does not make dodging twitchier by itself. Rocket League also offers square and circle input shapes: square reads the full corner for maximum diagonal power (used for ceiling shots), while circle is more predictable for aerials. Match the shape to your play style before finalizing the deadzone value.',
      editorial: 'Rocket League is the outlier in this set because the stick input is not about aiming at all — it is about commanding a car, and the game\'s famous "square vs circle" shape toggle only makes sense once you understand that: square reads the full corner so your car turns harder diagonally, while circle keeps diagonal magnitude consistent for air roll control. Because the deadzone is a 0–1 float, even a 0.03 difference changes your aerial response audibly. Warm up in free play and hit the same wall-to-air dribble a few times per setting; the deadzone that feels clean in the air is the one that wins.',
    },
    {
      slug: 'valorant', name: 'Valorant', shape: 'radial' as const,
      scale: '0–100 slider', range: '8% – 15%',
      note: 'Valorant\'s controller support exposes a stick deadzone on a 0–100 scale; the community starting point is ~10%, raised only if your stick drifts. Tactical shooters punish a drifting stick hardest — a center offset moves your crosshair off a held angle.',
      deep: 'Valorant\'s controller support is still evolving, and its radial deadzone on a 0–100 scale sits toward the higher end of the spectrum, with community values typically starting around 10%. Because a tactical shooter is about holding angles, even a small at-rest offset drags your crosshair off a pixel when you release the stick — the worst case in this set. Valorant also separates aim-assist strength and pre-aim assist from the deadzone, so a clean stick can run a lower deadzone without losing the game\'s assist behavior.',
      editorial: 'Valorant\'s controller support arrived late and is still shaped by the mouse-and-keyboard DNA of the PC game, which is why the deadzone debate on it is louder than on any shooter in this set: controller players are fighting for every pixel the mouse never has to give up. Because the game rewards holding precise angles, a center drift that would be a nuisance in Apex becomes a whiffed operator shot in Valorant. Set your deadzone in the range with a bot, hold a long angle, and confirm the crosshair does not creep; the tightest number that passes that check is the competitive one.',
    },
  ];

export const CONTROLLERS = [
  { slug: 'ps5-dualsense', name: 'PS5 DualSense' },
  { slug: 'xbox-wireless', name: 'Xbox Wireless Controller' },
  { slug: 'switch-pro', name: 'Nintendo Switch Pro Controller' },
] as const;

// Controllers covered per game: only platforms where the game actually ships
// (CS2, Valorant, Halo Infinite and Warzone have no Switch release).
const GAME_CONTROLLERS: Record<string, string[]> = {
  'fortnite': ['ps5-dualsense', 'xbox-wireless', 'switch-pro'],
  'apex-legends': ['ps5-dualsense', 'xbox-wireless', 'switch-pro'],
  'warzone': ['ps5-dualsense', 'xbox-wireless'],
  'rocket-league': ['ps5-dualsense', 'xbox-wireless', 'switch-pro'],
  'street-fighter-6': ['ps5-dualsense', 'xbox-wireless', 'switch-pro'],
  'valorant': ['ps5-dualsense', 'xbox-wireless'],
  'counter-strike-2': ['ps5-dualsense', 'xbox-wireless'],
  'overwatch-2': ['ps5-dualsense', 'xbox-wireless', 'switch-pro'],
  'halo-infinite': ['ps5-dualsense', 'xbox-wireless'],
  'elden-ring': ['ps5-dualsense', 'xbox-wireless'],
};

export type ControllerNote = { slug: string; name: string; sticks: string; connection: string };

export const GAMES = settingsGames.map((game) => {
  const dz = deadzoneGames.find((g) => g.slug === game.slug);
  const controllers: ControllerNote[] = (GAME_CONTROLLERS[game.slug] ?? []).map((slug) => {
    const c = CONTROLLERS.find((x) => x.slug === slug)!;
    const note = settingsControllerNotes[slug];
    return {
      slug,
      name: c.name,
      sticks: note.sticks,
      connection: note.connection.replaceAll('{game.name}', game.name),
    };
  });
  return {
    ...game,
    controllers,
    deadzone: dz ? { shape: dz.shape, note: dz.note, deep: dz.deep, editorial: dz.editorial } : null,
  };
});

export type GameSettings = (typeof GAMES)[number];
