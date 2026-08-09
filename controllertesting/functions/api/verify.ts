/**
 * POST /api/verify — server-sign a share payload.
 *
 * Signs the serialized ShareReportPayload with an HMAC-SHA256 secret and
 * stores the record in KV so GET /api/verify/:token can later prove the
 * payload was created by this service and has not been altered.
 *
 * Deployments without the `PASSPORT_SIGNING_SECRET` / `PASSPORT_KV` bindings
 * respond 503 so clients can degrade gracefully to self-verifying links.
 */

interface Env {
  PASSPORT_SIGNING_SECRET?: string;
  PASSPORT_KV?: {
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

async function hmacSha256Hex(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  const secret = env.PASSPORT_SIGNING_SECRET;
  const kv = env.PASSPORT_KV;
  if (!secret || !kv) return json({ ok: false, reason: "not_configured" }, 503);

  let body: { payload?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid_json" }, 400);
  }

  const payloadStr = typeof body?.payload === "string" ? body.payload : null;
  if (!payloadStr || payloadStr.length > 100_000) {
    return json({ ok: false, reason: "invalid_payload" }, 400);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(payloadStr);
  } catch {
    return json({ ok: false, reason: "invalid_payload" }, 400);
  }

  const payload = parsed as { v?: unknown; s?: unknown; id?: unknown };
  if (
    payload?.v !== 1 ||
    typeof payload.s !== "number" ||
    typeof payload.id !== "string" ||
    payload.id.length < 8 ||
    payload.id.length > 64 ||
    !/^[A-Za-z0-9-]+$/.test(payload.id)
  ) {
    return json({ ok: false, reason: "invalid_payload" }, 400);
  }

  const sig = await hmacSha256Hex(secret, payloadStr);
  const token = payload.id;
  try {
    await kv.put(
      `report:${token}`,
      JSON.stringify({ p: payloadStr, s: sig, t: Date.now() }),
      { expirationTtl: 60 * 60 * 24 * 365 },
    );
  } catch {
    return json({ ok: false, reason: "storage_error" }, 500);
  }

  return json({ ok: true, token, url: `/verify?token=${encodeURIComponent(token)}` });
};
