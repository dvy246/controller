/**
 * gamepad-analyzer — Web Gamepad API wrapper & calibration math
 *
 * High-performance stick drift calculation, circularity error measurement,
 * and controller model identification. Framework-agnostic; runs anywhere the
 * browser Gamepad API exists. Zero dependencies.
 *
 * MIT License — derived from the open-source core of ControllerTesting.com
 * (https://controllertesting.com). This package is the exact same code that
 * powers the live diagnostic tools on that site.
 */
/** Controller models recognized by the identification heuristics. */
export const SUPPORTED_MODELS = [
    'PlayStation 5 DualSense',
    'PlayStation 4 DualShock 4',
    'Xbox Wireless Controller',
    'Nintendo Switch Pro Controller',
    'Nintendo Joy-Con',
    'Standard Gamepad',
];
/**
 * Identify a controller from the Gamepad API `id` string using vendor ID
 * patterns and common product names. Returns SUPPORTED_MODELS fallbacks.
 */
export function identifyController(id) {
    const lower = id.toLowerCase();
    if (lower.includes('dualsense') || lower.includes('054c') || lower.includes('playstation 5')) {
        return 'PlayStation 5 DualSense';
    }
    if (lower.includes('dualshock') || lower.includes('ps4')) {
        return 'PlayStation 4 DualShock 4';
    }
    if (lower.includes('xbox series') || lower.includes('045e') || lower.includes('xbox 360') || lower.includes('xinput')) {
        return 'Xbox Wireless Controller';
    }
    if (lower.includes('pro controller') || lower.includes('057e') || lower.includes('switch')) {
        return 'Nintendo Switch Pro Controller';
    }
    if (lower.includes('joy-con')) {
        return 'Nintendo Joy-Con';
    }
    return 'Standard Gamepad';
}
/**
 * Convert an at-rest stick offset into a drift percentage of full travel.
 *
 * The offset is measured from center; offsets within the deadzone (default
 * 5% of travel) are treated as zero, which is the convention used by game
 * engines and driver layers.
 *
 * @returns 0-100, clamped and rounded to 2 decimals
 */
export function calculateStickDrift(x, y, deadzone = 0.05) {
    const dist = Math.hypot(x, y);
    if (dist <= deadzone)
        return 0;
    const drift = Math.min(100, Math.max(0, ((dist - deadzone) / (1 - deadzone)) * 100));
    return parseFloat(drift.toFixed(2));
}
/**
 * Measure how far a stick's outer range deviates from a perfect circle.
 *
 * Each sample's distance from center is compared against the ideal radius
 * (1.0 = full displacement). Requires at least 20 samples spread around the
 * rim for a meaningful reading — rotate the stick slowly and fully.
 *
 * @returns average absolute deviation in percent, rounded to 2 decimals
 */
export function calculateCircularityError(points) {
    if (points.length < 20)
        return 0;
    let totalDev = 0;
    for (const p of points) {
        const dist = Math.hypot(p.x, p.y);
        const dev = Math.abs(dist - 1.0);
        totalDev += dev;
    }
    const avgDev = totalDev / points.length;
    return parseFloat((avgDev * 100).toFixed(2));
}
/**
 * Parse a raw `Gamepad` object into a flat, serializable snapshot.
 *
 * Standard mapping assumed: LX=0, LY=1, RX=2, RY=3; L2=button 6, R2=button 7.
 * Non-standard mappings (e.g. `mapping === ''`) will mislabel axes — check
 * `mapping` and calibrate accordingly.
 */
export function parseGamepadState(gp) {
    const axes = Array.from(gp.axes || []);
    const buttons = Array.from(gp.buttons || []).map((b) => ({
        pressed: b.pressed,
        touched: b.touched ?? false,
        value: b.value ?? (b.pressed ? 1 : 0),
    }));
    const lx = axes[0] ?? 0;
    const ly = axes[1] ?? 0;
    const rx = axes[2] ?? 0;
    const ry = axes[3] ?? 0;
    const leftDrift = calculateStickDrift(lx, ly);
    const rightDrift = calculateStickDrift(rx, ry);
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
