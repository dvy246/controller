/**
 * GET /api/telemetry/count — live aggregate telemetry totals.
 *
 * Lists stored `telemetry:*` keys, groups by model, and caches the result in
 * KV under `telemetry:count` for 60s so the homepage never pays a full prefix
 * scan per visitor. Returns zero-filled totals when no samples exist yet —
 * the site only ever displays real consenting-user counts.
 */

const MODELS = ["ps5-dualsense", "xbox-series-x", "switch-pro"];

const COUNT_CACHE_KEY = "telemetry:count";
const COUNT_CACHE_TTL = 60;

interface Env {
  TELEMETRY_KV?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
    list(opts?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
  };
}

type Ctx = { request: Request; env: Env };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=60" },
  });
}

async function computeCounts(kv: NonNullable<Env["TELEMETRY_KV"]>): Promise<{ total: number; perModel: Record<string, number> }> {
  const perModel: Record<string, number> = {};
  MODELS.forEach((m) => (perModel[m] = 0));
  let total = 0;
  let cursor = "";
  do {
    const page = await kv.list({ prefix: "telemetry:", limit: 1000, cursor: cursor || undefined });
    for (const key of page.keys) {
      if (key.name === COUNT_CACHE_KEY) continue;
      const model = key.name.split(":")[1];
      if (model && model in perModel) perModel[model] += 1;
      total += 1;
    }
    cursor = page.list_complete ? "" : (page as { cursor?: string }).cursor ?? "";
  } while (cursor);
  return { total, perModel };
}

export const onRequestGet = async ({ env }: Ctx): Promise<Response> => {
  const kv = env.TELEMETRY_KV;
  if (!kv) return json({ ok: false, reason: "not_configured", total: 0, perModel: {} }, 503);

  const cached = await kv.get(COUNT_CACHE_KEY);
  if (cached) {
    try {
      return json(JSON.parse(cached));
    } catch {
      // fall through and recompute
    }
  }

  const counts = await computeCounts(kv);
  await kv.put(COUNT_CACHE_KEY, JSON.stringify(counts), { expirationTtl: COUNT_CACHE_TTL });
  return json(counts);
};
