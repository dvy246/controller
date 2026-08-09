/**
 * POST /api/telemetry — consented aggregate telemetry intake.
 *
 * Accepts one anonymous hardware sample per call (no PII: no IP logging, no
 * identifiers, no browser fingerprinting). Requires the `x-ct-consent: granted`
 * header, which the TelemetryConsent component sets after explicit opt-in.
 *
 * Samples are stored as individual KV keys (`telemetry:<ts>:<rand>`) so they
 * can be aggregated by prefix-list later. Unknown model keys are rejected —
 * we never record under invented model names.
 *
 * TODO: add rate limiting (e.g. per-IP counter in KV with short TTL) before
 * public launch; this endpoint is intentionally lenient during preview.
 */

const ALLOWED_MODELS = new Set(["ps5-dualsense", "xbox-series-x", "switch-pro"]);

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

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  const kv = env.TELEMETRY_KV;
  if (!kv) return json({ ok: false, reason: "not_configured" }, 503);
  if (request.headers.get("x-ct-consent") !== "granted") {
    return json({ ok: false, reason: "consent_required" }, 400);
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

  const key = `telemetry:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
  try {
    await kv.put(key, JSON.stringify(sample));
  } catch {
    return json({ ok: false, reason: "storage_error" }, 500);
  }

  return json({ ok: true, stored: true });
};
