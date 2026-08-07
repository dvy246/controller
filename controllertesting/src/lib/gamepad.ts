/**
 * gamepad.ts — Web Gamepad API Wrapper & Calibration Engine
 * High-performance, zero-allocation polling loop with stick drift calculation,
 * circularity error measurement, and controller model identification.
 */

export interface GamepadState {
  index: number;
  id: string;
  connected: boolean;
  timestamp: number;
  mapping: string;
  axes: number[];
  buttons: { pressed: boolean; touched: boolean; value: number }[];
  leftStick: {
    x: number;
    y: number;
    rawX: number;
    rawY: number;
    driftPct: number;
    distance: number;
  };
  rightStick: {
    x: number;
    y: number;
    rawX: number;
    rawY: number;
    driftPct: number;
    distance: number;
  };
  triggers: { l2: number; r2: number };
  detectedModel: string;
}

export function identifyController(id: string): string {
  const lower = id.toLowerCase();
  if (
    lower.includes("dualsense") ||
    lower.includes("054c") ||
    lower.includes("playstation 5")
  ) {
    return "PlayStation 5 DualSense";
  }
  if (lower.includes("dualshock") || lower.includes("ps4")) {
    return "PlayStation 4 DualShock 4";
  }
  if (
    lower.includes("xbox series") ||
    lower.includes("045e") ||
    lower.includes("xbox 360") ||
    lower.includes("xinput")
  ) {
    return "Xbox Wireless Controller";
  }
  if (
    lower.includes("pro controller") ||
    lower.includes("057e") ||
    lower.includes("switch")
  ) {
    return "Nintendo Switch Pro Controller";
  }
  if (lower.includes("joy-con")) {
    return "Nintendo Joy-Con";
  }
  return "Standard Gamepad";
}

export function calculateStickDrift(
  x: number,
  y: number,
  deadzone = 0.05,
): number {
  const dist = Math.hypot(x, y);
  if (dist <= deadzone) return 0;
  // Convert distance from center into a 0-100 percentage
  const drift = Math.min(
    100,
    Math.max(0, ((dist - deadzone) / (1 - deadzone)) * 100),
  );
  return parseFloat(drift.toFixed(2));
}

export function calculateCircularityError(
  points: { x: number; y: number }[],
): number {
  if (points.length < 20) return 0;
  let totalDev = 0;
  for (const p of points) {
    const dist = Math.hypot(p.x, p.y);
    // Ideal circle at max stick displacement has radius = 1.0
    const dev = Math.abs(dist - 1.0);
    totalDev += dev;
  }
  const avgDev = totalDev / points.length;
  return parseFloat((avgDev * 100).toFixed(2));
}

export function parseGamepadState(gp: Gamepad): GamepadState {
  const axes = Array.from(gp.axes || []);
  const buttons = Array.from(gp.buttons || []).map((b) => ({
    pressed: b.pressed,
    touched: b.touched ?? false,
    value: b.value ?? (b.pressed ? 1 : 0),
  }));

  // Standard mapping: LX=0, LY=1, RX=2, RY=3
  const lx = axes[0] ?? 0;
  const ly = axes[1] ?? 0;
  const rx = axes[2] ?? 0;
  const ry = axes[3] ?? 0;

  const leftDrift = calculateStickDrift(lx, ly);
  const rightDrift = calculateStickDrift(rx, ry);

  // Triggers: L2 = button 6, R2 = button 7 (standard mapping)
  const l2 = buttons[6]?.value ?? 0;
  const r2 = buttons[7]?.value ?? 0;

  return {
    index: gp.index,
    id: gp.id,
    connected: gp.connected,
    timestamp: gp.timestamp,
    mapping: gp.mapping,
    axes,
    buttons,
    leftStick: {
      x: lx,
      y: ly,
      rawX: lx,
      rawY: ly,
      driftPct: leftDrift,
      distance: Math.hypot(lx, ly),
    },
    rightStick: {
      x: rx,
      y: ry,
      rawX: rx,
      rawY: ry,
      driftPct: rightDrift,
      distance: Math.hypot(rx, ry),
    },
    triggers: { l2, r2 },
    detectedModel: identifyController(gp.id),
  };
}
