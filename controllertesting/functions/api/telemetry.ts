/**
 * POST /api/telemetry — consented aggregate telemetry intake.
 *
 * Accepts one anonymous hardware sample per call (no PII: no IP logging, no
 * identifiers, no browser fingerprinting). Requires the `x-ct-consent: granted`
 * header, which the TelemetryConsent component sets after explicit opt-in.
 *
 * Samples are stored as individual KV keys (`telemetry:<model>:<ts>:<rand>`)
 * so they can be aggregated by prefix-list later. Unknown model keys are
 * rejected — we never record under invented model names.
 *
 * Rate limiting: per-IP counter in KV (`ratelimit:<ip>`) with a 60s TTL;
 * at most 5 accepted samples per IP per minute. Requests that fail validation
 * do not consume the budget.
 */

const ALLOWED_MODELS = new Set(["ps5-dualsense", "xbox-series-x", "switch-pro"]);

const RATE_LIMIT_WINDOW_TTL = 60;
const RATE_LIMIT_MAX_PER_WINDOW = 5;

interface Env {
  TELEMETRY_KV?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

type Ctx = { request: Request; env: Env };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function finiteNum(v: unknown, min: number, max: number): number | null {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max) return null;
  return v;
}

async function consumeRateLimit(kv: NonNullable<Env["TELEMETRY_KV"]>, ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${ip}`;
  const raw = await kv.get(key);
  const current = raw ? parseInt(raw, 10) || 0 : 0;
  if (current >= RATE_LIMIT_MAX_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  const next = current + 1;
  await kv.put(key, String(next), { expirationTtl: RATE_LIMIT_WINDOW_TTL });
  return { allowed: true, remaining: RATE_LIMIT_MAX_PER_WINDOW - next };
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  const kv = env.TELEMETRY_KV;
  if (!kv) return json({ ok: false, reason: "not_configured" }, 503);
  if (request.headers.get("x-ct-consent") !== "granted") {
    return json({ ok: false, reason: "consent_required" }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const rate = await consumeRateLimit(kv, ip);
  if (!rate.allowed) {
    return json({ ok: false, reason: "rate_limited", remaining: 0 }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid_json" }, 400);
  }

  const modelKey = body.modelKey;
  if (typeof modelKey !== "string" || !ALLOWED_MODELS.has(modelKey)) {
    return json({ ok: false, reason: "unknown_model" }, 400);
  }

  const driftX = finiteNum(body.driftX, 0, 100);
  const driftY = finiteNum(body.driftY, 0, 100);
  const circularityError = finiteNum(body.circularityError, 0, 100);
  if (driftX === null || driftY === null || circularityError === null) {
    return json({ ok: false, reason: "invalid_measurements" }, 400);
  }

  const connectionType = typeof body.connectionType === "string" && body.connectionType.length <= 20 ? body.connectionType : undefined;
  const controllerAgeMonths = finiteNum(body.controllerAgeMonths, 0, 600);

  const sample: Record<string, unknown> = {
    modelKey,
    driftX,
    driftY,
    circularityError,
    ts: Date.now(),
    consent: true,
  };
  if (connectionType) sample.connectionType = connectionType;
  if (controllerAgeMonths !== null) sample.controllerAgeMonths = controllerAgeMonths;

  const key = `telemetry:${modelKey}:${Date.now()}:${crypto.randomUUID()}`;
  try {
    await kv.put(key, JSON.stringify(sample));
  } catch {
    return json({ ok: false, reason: "storage_error" }, 500);
  }

  return json({ ok: true, stored: true, remaining: rate.remaining });
};
