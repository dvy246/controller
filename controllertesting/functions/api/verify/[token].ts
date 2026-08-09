/**
 * GET /api/verify/:token — verify a server-signed record.
 *
 * Loads the stored payload, recomputes the HMAC-SHA256 signature over it, and
 * only returns the payload when the signatures match. Clients render it with
 * the "Server-signed record — verified on ControllerTesting.com" status.
 */

interface Env {
  PASSPORT_SIGNING_SECRET?: string;
  PASSPORT_KV?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

type Ctx = { env: Env; params: Record<string, string> };

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

export const onRequestGet = async ({ env, params }: Ctx): Promise<Response> => {
  const secret = env.PASSPORT_SIGNING_SECRET;
  const kv = env.PASSPORT_KV;
  if (!secret || !kv) return json({ ok: false, verified: false, reason: "not_configured" }, 503);

  const token = params.token ?? "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(token)) {
    return json({ ok: false, verified: false, reason: "invalid_token" }, 400);
  }

  const raw = await kv.get(`report:${token}`);
  if (!raw) return json({ ok: false, verified: false, reason: "not_found" }, 404);

  let entry: { p?: unknown; s?: unknown; t?: unknown };
  try {
    entry = JSON.parse(raw);
  } catch {
    return json({ ok: false, verified: false, reason: "malformed" }, 500);
  }
  if (typeof entry?.p !== "string" || typeof entry?.s !== "string") {
    return json({ ok: false, verified: false, reason: "malformed" }, 500);
  }

  const recomputed = await hmacSha256Hex(secret, entry.p);
  const verified = recomputed === entry.s;
  if (!verified) {
    return json({ ok: false, verified: false, reason: "signature_mismatch" }, 401);
  }

  return json({ ok: true, verified: true, payload: entry.p, signedAt: typeof entry.t === "number" ? entry.t : null });
};
