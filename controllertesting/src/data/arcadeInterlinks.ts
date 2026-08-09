/**
 * arcadeInterlinks.ts — central registry connecting diagnostic tools and arcade games.
 * Keyed by tool route → related games, and game route → related diagnostic tools.
 * Used by RelatedGamesStrip (ToolLayout) and RelatedToolsStrip (game pages).
 */

export interface GameRef {
  name: string;
  href: string;
  desc: string;
  xp: number;
}

export interface ToolRef {
  name: string;
  href: string;
  desc: string;
}

export const GAMES: Record<string, GameRef> = {
  'stick-sniper': {
    name: 'Stick Sniper',
    href: '/games/stick-sniper',
    desc: 'Aim with the right stick, fire with R2/RT, and track targets before they vanish.',
    xp: 50,
  },
  'button-blitz': {
    name: 'Button Blitz',
    href: '/games/button-blitz',
    desc: 'Mash the on-screen face buttons as fast as you can. Pure reflex test.',
    xp: 50,
  },
  'stick-maze': {
    name: 'Stick Maze Runner',
    href: '/games/stick-maze',
    desc: 'Steer through tight corridors with the analog stick and hold the line.',
    xp: 100,
  },
  'trigger-racer': {
    name: 'Trigger Racer',
    href: '/games/trigger-racer',
    desc: 'Hold R2/RT in the green zone to chase the speed target.',
    xp: 150,
  },
  'quick-draw': {
    name: 'Quick Draw',
    href: '/games/quick-draw',
    desc: 'Press any button the instant the signal turns green. Reaction timer.',
    xp: 75,
  },
  'nova-blaster': {
    name: 'Nova Blaster',
    href: '/games/nova-blaster',
    desc: 'Twin-stick arena shooter — move, aim, and survive waves.',
    xp: 100,
  },
  'beat-drop': {
    name: 'Beat Drop',
    href: '/games/beat-drop',
    desc: 'Tap face buttons in time as notes cross the hit line.',
    xp: 75,
  },
  'memory-pulse': {
    name: 'Memory Pulse',
    href: '/games/memory-pulse',
    desc: 'Repeat the growing face-button sequence from memory.',
    xp: 125,
  },
  'asteroid-dash': {
    name: 'Asteroid Dash',
    href: '/games/asteroid-dash',
    desc: 'Dodge asteroids and collect orbs with R2/RT boost.',
    xp: 125,
  },
  'combo-rush': {
    name: 'Combo Rush',
    href: '/games/combo-rush',
    desc: 'Chain every input — sticks, triggers, buttons, and D-pad.',
    xp: 150,
  },
  'neon-striker': {
    name: 'Neon Striker',
    href: '/games/neon-striker',
    desc: 'Intense 2-player cybernetic air hockey. Bring a second controller!',
    xp: 150,
  },
  'kart-drift': {
    name: 'Kart Drift',
    href: '/games/kart-drift',
    desc: 'High-speed top-down racing. Master the art of the drift in this 3-lap time trial.',
    xp: 150,
  },
  'signal-salvage': {
    name: 'Signal Salvage',
    href: '/games/signal-salvage',
    desc: '2-player twin-stick repair duel. Stress-test both sticks as you capture and return cores in 90 seconds.',
    xp: 200,
  },
};

export const TOOLS: Record<string, ToolRef> = {
  drift: {
    name: 'Stick Drift Test',
    href: '/test/controller/drift',
    desc: 'Detect stick drift down to 0.1% with the live canvas visualizer.',
  },
  buttons: {
    name: 'Button Tester',
    href: '/test/controller/buttons',
    desc: 'Interactive face button matrix with ghosting detection.',
  },
  triggers: {
    name: 'Trigger Pressure Test',
    href: '/test/controller/triggers',
    desc: 'Analog L2/R2 pressure curve analyzer.',
  },
  dpad: {
    name: '8-Way D-Pad Tester',
    href: '/test/controller/dpad',
    desc: 'Directional pad diagonal precision check.',
  },
  deadzone: {
    name: 'Deadzone Visualizer',
    href: '/test/controller/deadzone',
    desc: 'Tune inner and outer deadzone thresholds.',
  },
  circularity: {
    name: 'Circularity Test',
    href: '/test/controller/circularity',
    desc: '360-degree stick range-of-motion and error analysis.',
  },
  latency: {
    name: 'Latency Estimator',
    href: '/test/controller/latency',
    desc: 'Input delay and reaction-speed timer.',
  },
  polling: {
    name: 'Polling Rate Checker',
    href: '/test/controller/polling-rate',
    desc: 'Real-time Hz input report frequency.',
  },
  aimtrainer: {
    name: 'Pro-Aim Sandbox',
    href: '/aim-trainer/controller/fortnite',
    desc: 'Aim tracking benchmark for controller stick control.',
  },
  health: {
    name: 'Controller Health Score',
    href: '/test/controller/health-score',
    desc: '0-100 grade with a printable report card.',
  },
  full: {
    name: 'Full Diagnostic Wizard',
    href: '/test/controller/full-diagnostic',
    desc: 'Five-step hardware checkup wizard.',
  },
  vibration: {
    name: 'Vibration Tester',
    href: '/test/controller/vibration',
    desc: 'Dual haptic rumble motor pulse test.',
  },
  competitive: {
    name: 'Competitive Readiness',
    href: '/test/controller/competitive-readiness',
    desc: 'Esports tournament benchmark assessment.',
  },
  mapping: {
    name: 'Gamepad Mapping',
    href: '/test/controller/gamepad-mapping',
    desc: 'Button mapping and rebind tester.',
  },
  multi: {
    name: 'Multi-Controller Tester',
    href: '/test/controller/multi',
    desc: 'Diagnose four gamepads simultaneously.',
  },
};

/**
 * Tool route → related games. Keyed by the tool's URL pathname (no leading slash,
 * no trailing slash). A tool with no entry gets no game strip.
 */
export const TOOL_GAME_LINKS: Record<string, string[]> = {
  'test/controller/drift': ['stick-sniper', 'stick-maze', 'asteroid-dash', 'kart-drift'],
  'test/controller/buttons': ['button-blitz', 'beat-drop', 'memory-pulse'],
  'test/controller/triggers': ['trigger-racer', 'asteroid-dash', 'kart-drift'],
  'test/controller/dpad': ['combo-rush', 'memory-pulse'],
  'test/controller/deadzone': ['stick-sniper', 'stick-maze'],
  'test/controller/circularity': ['stick-sniper', 'nova-blaster'],
  'test/controller/latency': ['quick-draw', 'beat-drop'],
  'test/controller/polling-rate': ['nova-blaster', 'quick-draw'],
  'test/controller/vibration': ['beat-drop', 'nova-blaster'],
  'test/controller/competitive-readiness': ['stick-sniper', 'nova-blaster', 'quick-draw'],
  'test/controller/full-diagnostic': ['memory-pulse', 'combo-rush'],
  'test/controller/health-score': ['stick-maze', 'memory-pulse'],
  'test/controller/gamepad-mapping': ['combo-rush', 'button-blitz'],
  'test/controller/multi': ['combo-rush', 'nova-blaster', 'neon-striker'],
  'aim-trainer/controller/fortnite': ['stick-sniper', 'nova-blaster'],
  'aim-trainer/controller/apex-legends': ['stick-sniper', 'nova-blaster'],
};

/**
 * Game route → related diagnostic tools. Keyed by game slug.
 */
export const GAME_TOOL_LINKS: Record<string, string[]> = {
  'stick-sniper': ['drift', 'deadzone', 'circularity'],
  'button-blitz': ['buttons', 'latency'],
  'stick-maze': ['drift', 'deadzone'],
  'trigger-racer': ['triggers', 'latency'],
  'quick-draw': ['latency', 'polling'],
  'nova-blaster': ['drift', 'aimtrainer', 'polling'],
  'beat-drop': ['buttons', 'latency'],
  'memory-pulse': ['buttons', 'mapping'],
  'asteroid-dash': ['drift', 'triggers'],
  'combo-rush': ['dpad', 'buttons', 'multi'],
  'neon-striker': ['multi', 'drift', 'buttons'],
  'kart-drift': ['drift', 'triggers', 'circularity'],
  'signal-salvage': ['multi', 'circularity', 'deadzone'],
};

export function resolveGamesForTool(pathname: string): GameRef[] {
  const key = pathname.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.html$/, '');
  const slugs = TOOL_GAME_LINKS[key];
  if (!slugs) return [];
  return slugs.map((s) => GAMES[s]).filter(Boolean);
}

export function resolveToolsForGame(slug: string): ToolRef[] {
  const slugs = GAME_TOOL_LINKS[slug];
  if (!slugs) return [];
  return slugs.map((s) => TOOLS[s]).filter(Boolean);
}
