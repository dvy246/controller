/**
 * share.ts — Self-verifying shareable controller health certificate links.
 *
 * Reports travel inside the URL itself as a compact base64url payload so any
 * viewer — on any device, in any <iframe> embed — can render the certificate
 * without a server or login. A checksum guards against copy-paste truncation
 * and corruption.
 *
 * HONESTY BOUNDARY (do not copy this differently in UI copy):
 * This is corruption-protection, NOT cryptographic signing. A determined user
 * reading the bundled JS could recompute the checksum for a modified payload.
 * We describe these links as "self-verifying" — never "tamper-proof" or
 * "server-verified". True immutability requires the post-validation backend.
 */

import type { EvidenceReport } from "./report";

export const SHARE_VERSION = 1;

export type VibrationVerdict = "p" | "w" | "u"; // passed / warning / unknown
export type GradeKind = "pass" | "warning" | "fail";

export interface ShareReportPayload {
  v: typeof SHARE_VERSION;
  /** Original report UUID. */
  id: string;
  /** Report timestamp (ms since epoch). */
  ts: number;
  /** Report protocol version. */
  pv: string;
  /** Device name. */
  dn: string;
  /** Mapped reliability model key (optional). */
  mk?: string;
  /** Health score (0-100), stamped at generation time so the card always
   *  matches what the generating tool displayed. */
  s: number;
  /** Grade label, e.g. "GRADE A+ (PASSED)". */
  g: string;
  /** Grade badge kind — drives the emerald/amber/red badge. */
  gc: GradeKind;
  /** Left stick drift %. */
  dl: number;
  /** Right stick drift %. */
  dr: number;
  /** Circularity error %. */
  c: number;
  /** Recommended deadzone (0-1). */
  dz: number;
  /** Face buttons + bumpers passed. */
  bt: boolean;
  /** Triggers passed. */
  tt: boolean;
  /** Vibration verdict. */
  vt: VibrationVerdict;
  /** Browser label. */
  bb: string;
  /** OS label. */
  os: string;
  /** Connection label. */
  cn: string;
}

export interface ShareOverrides {
  score?: number;
  grade?: string;
  gradeKind?: GradeKind;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Checksum (FNV-1a 32-bit) — corruption detection, not security.
 * ──────────────────────────────────────────────────────────────────────────── */

const FNV_PRIME = 0x01000193;
const FNV_OFFSET = 0x811c9dc5;

export function fnv1a(str: string): string {
  let hash = FNV_OFFSET >>> 0;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, FNV_PRIME) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/* ────────────────────────────────────────────────────────────────────────────
 * base64url (unicode-safe, SSR-safe).
 * ──────────────────────────────────────────────────────────────────────────── */

export function encodeBase64Url(str: string): string {
  if (typeof btoa === "undefined") {
    // Node/SSR fallback (used by static generation if ever needed).
    return Buffer.from(str, "utf8").toString("base64url");
  }
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeBase64Url(str: string): string {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof atob === "undefined") {
    return Buffer.from(b64, "base64").toString("utf8");
  }
  return decodeURIComponent(escape(atob(b64)));
}

/* ────────────────────────────────────────────────────────────────────────────
 * Canonical health score — mirrors the legacy report card algorithm so that
 * same-device (localStorage) renders and URL payloads agree on a baseline.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface HealthGrade {
  score: number;
  grade: string;
  gradeKind: GradeKind;
}

export function computeHealthGrade(report: EvidenceReport): HealthGrade {
  const maxDrift = Math.max(
    report.tests.sticks?.driftX ?? 0,
    report.tests.sticks?.driftY ?? 0,
  );
  const circErr = report.tests.sticks?.circularityError ?? 0;

  let score = 100;
  score -= Math.round(maxDrift * 5);
  score -= Math.round(circErr * 1.5);
  score = Math.max(20, Math.min(100, score));

  if (score >= 90) return { score, grade: "GRADE A+ (PASSED)", gradeKind: "pass" };
  if (score >= 75) return { score, grade: "GRADE A (GOOD)", gradeKind: "pass" };
  if (score >= 60) return { score, grade: "GRADE B (WARNING)", gradeKind: "warning" };
  return { score, grade: "GRADE C (HARDWARE ISSUE)", gradeKind: "fail" };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Encode / decode the share payload.
 * ──────────────────────────────────────────────────────────────────────────── */

function vibrationVerdict(status: unknown): VibrationVerdict {
  if (status === "passed") return "p";
  if (status === "warning" || status === "check") return "w";
  return "u";
}

export function encodeSharePayload(
  report: EvidenceReport,
  overrides: ShareOverrides = {},
): ShareReportPayload {
  const grade =
    overrides.score !== undefined && overrides.grade !== undefined
      ? { score: overrides.score, grade: overrides.grade, gradeKind: overrides.gradeKind ?? "pass" }
      : computeHealthGrade(report);

  const buttons = report.tests.buttons ?? {};
  const triggers = report.tests.triggers ?? {};

  const bt =
    typeof buttons.facePassed === "boolean"
      ? buttons.facePassed && (buttons.bumpersPassed !== false)
      : buttons.pressedCount !== 0;

  const tt =
    typeof triggers.l2Passed === "boolean"
      ? triggers.l2Passed && triggers.r2Passed !== false
      : true;

  return {
    v: SHARE_VERSION,
    id: report.id,
    ts: report.timestamp,
    pv: report.protocolVersion || "2.4.0",
    dn: report.device?.name || "Gamepad",
    ...(report.device?.mappedModelKey ? { mk: report.device.mappedModelKey } : {}),
    s: grade.score,
    g: grade.grade,
    gc: grade.gradeKind,
    dl: report.tests.sticks?.driftX ?? 0,
    dr: report.tests.sticks?.driftY ?? 0,
    c: report.tests.sticks?.circularityError ?? 0,
    dz: report.tests.sticks?.deadzoneRecommendation ?? 0.02,
    bt,
    tt,
    vt: vibrationVerdict(report.tests.vibration?.status),
    bb: report.environment?.browser || "Unknown",
    os: report.environment?.os || "Unknown",
    cn: report.environment?.connection || "unknown",
  };
}

export function serializePayload(payload: ShareReportPayload): string {
  return JSON.stringify(payload);
}

export function parsePayload(str: string): ShareReportPayload | null {
  try {
    const parsed = JSON.parse(str) as ShareReportPayload;
    if (parsed?.v !== SHARE_VERSION || typeof parsed.s !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Rebuild a full EvidenceReport from a decoded share payload (for re-sharing
 *  from the /verify page, saving to Passport, etc.). */
export function payloadToReport(payload: ShareReportPayload): EvidenceReport {
  return {
    id: payload.id,
    timestamp: payload.ts,
    protocolVersion: payload.pv,
    device: {
      name: payload.dn,
      ...(payload.mk ? { mappedModelKey: payload.mk } : {}),
    },
    environment: {
      browser: payload.bb,
      os: payload.os,
      connection: (payload.cn as EvidenceReport["environment"]["connection"]) || "unknown",
    },
    capabilities: {
      gamepad: "supported",
      haptics: "partial",
      webhid: "supported",
    },
    tests: {
      buttons: { facePassed: payload.bt, bumpersPassed: payload.bt },
      sticks: {
        driftX: payload.dl,
        driftY: payload.dr,
        circularityError: payload.c,
        deadzoneRecommendation: payload.dz,
      },
      triggers: { l2Passed: payload.tt, r2Passed: payload.tt },
      vibration: { status: payload.vt === "p" ? "passed" : payload.vt === "w" ? "warning" : "unknown" },
    },
    confidence: payload.gc === "fail" ? "repeat-test-recommended" : "high",
    limitations: [],
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * URL builders.
 * ──────────────────────────────────────────────────────────────────────────── */

export const SITE_ORIGIN = "https://controllertesting.com";

export function buildShareQuery(
  report: EvidenceReport,
  overrides: ShareOverrides = {},
): string {
  const payload = encodeSharePayload(report, overrides);
  const encoded = encodeBase64Url(serializePayload(payload));
  return `d=${encodeURIComponent(encoded)}&c=${fnv1a(encoded)}`;
}

export function buildShareUrl(
  report: EvidenceReport,
  overrides: ShareOverrides = {},
  base: string = SITE_ORIGIN,
): string {
  return `${base}/verify?${buildShareQuery(report, overrides)}`;
}

export interface DecodedShare {
  ok: boolean;
  payload: ShareReportPayload | null;
  corrupt: boolean;
  reason?: string;
}

/** Read + verify `d` and `c` query params. */
export function decodeShareQuery(
  d: string | null,
  c: string | null,
): DecodedShare {
  if (!d) return { ok: false, payload: null, corrupt: false, reason: "missing" };
  let payloadStr: string;
  try {
    payloadStr = decodeBase64Url(d);
  } catch {
    return { ok: false, payload: null, corrupt: true, reason: "encoding" };
  }
  const payload = parsePayload(payloadStr);
  if (!payload) {
    return { ok: false, payload: null, corrupt: true, reason: "format" };
  }
  const expected = fnv1a(d);
  if (c !== expected) {
    return { ok: false, payload, corrupt: true, reason: "checksum" };
  }
  return { ok: true, payload, corrupt: false };
}

/** Best-effort clipboard copy with a legacy fallback. Returns success. */
export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}
