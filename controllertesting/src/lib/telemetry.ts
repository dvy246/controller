import reliabilityData from "../data/reliabilityData.json";

export interface TelemetryPayload {
  modelKey: string;
  driftX: number;
  driftY: number;
  circularityError: number;
  pollingRateHz?: number;
  /** Not detectable from the browser Gamepad API — omit when unknown. */
  connectionType?: "usb" | "bluetooth" | "wireless_adapter";
  controllerAgeMonths?: number;
}


const LOCAL_CONSENT_KEY = "ct_telemetry_consent";
const LOCAL_TELEMETRY_LOG = "ct_telemetry_log";

export function getTelemetryConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LOCAL_CONSENT_KEY) === "true";
}

export function setTelemetryConsent(consent: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_CONSENT_KEY, consent ? "true" : "false");
}

/**
 * Map an identified controller model to a key in reliabilityData.json.
 * Returns null when the model has no baseline dataset — telemetry must never
 * be recorded under an invented key.
 */
export function mapGamepadToModelKey(detectedModel: string): string | null {
  switch (detectedModel) {
    case "PlayStation 5 DualSense":
      return "ps5-dualsense";
    case "Xbox Wireless Controller":
      return "xbox-series-x";
    case "Nintendo Switch Pro Controller":
      return "switch-pro";
    default:
      return null;
  }
}


export function recordTelemetry(payload: TelemetryPayload): boolean {
  if (typeof window === "undefined") return false;
  if (!getTelemetryConsent()) return false;

  try {
    const existing = JSON.parse(
      localStorage.getItem(LOCAL_TELEMETRY_LOG) || "[]",
    );
    existing.push({
      ...payload,
      timestamp: Date.now(),
    });
    // Keep last 50 local logs
    if (existing.length > 50) existing.shift();
    localStorage.setItem(LOCAL_TELEMETRY_LOG, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}
