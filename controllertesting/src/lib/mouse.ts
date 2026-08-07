/**
 * mouse.ts — Mouse Testing & Click Diagnostic Engine
 * High-precision performance measurement for CPS (clicks per second),
 * double-click fault detection, click latency, and scroll wheel testing.
 */

export interface ClickRecord {
  timestamp: number;
  button: number;
  intervalMs?: number;
}

export function calculateCPS(clicks: number[], timeWindowMs = 10000): number {
  if (clicks.length === 0) return 0;
  const now = performance.now();
  const valid = clicks.filter((t) => now - t <= timeWindowMs);
  if (valid.length === 0) return 0;
  const cps = valid.length / (timeWindowMs / 1000);
  return parseFloat(cps.toFixed(1));
}

export function detectDoubleClickFault(
  intervalsMs: number[],
  thresholdMs = 80,
): boolean {
  return intervalsMs.some((ms) => ms > 0 && ms < thresholdMs);
}
