import reliabilityData from '../data/reliabilityData.json';

export interface TelemetryPayload {
  modelKey: string;
  driftX: number;
  driftY: number;
  circularityError: number;
  pollingRateHz?: number;
  connectionType: 'usb' | 'bluetooth' | 'wireless_adapter';
  controllerAgeMonths?: number;
}

export interface PercentileResult {
  percentile: number; // 0 - 100 (higher is better than X% of controllers)
  tier: 'excellent' | 'good' | 'average' | 'poor';
  avgLifespanRemainingMonths: number;
  totalModelSamples: number;
}

const LOCAL_CONSENT_KEY = 'ct_telemetry_consent';
const LOCAL_TELEMETRY_LOG = 'ct_telemetry_log';

export function getTelemetryConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(LOCAL_CONSENT_KEY) === 'true';
}

export function setTelemetryConsent(consent: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_CONSENT_KEY, consent ? 'true' : 'false');
}

export function calculateDriftPercentile(modelKey: string, measuredDriftPercent: number): PercentileResult {
  const model = (reliabilityData.models as Record<string, any>)[modelKey] || reliabilityData.models['ps5-dualsense'];
  const thresholds = model.percentileThresholds;

  let percentile = 50;
  let tier: 'excellent' | 'good' | 'average' | 'poor' = 'average';

  if (measuredDriftPercent <= thresholds.excellent) {
    percentile = 92;
    tier = 'excellent';
  } else if (measuredDriftPercent <= thresholds.good) {
    percentile = 75;
    tier = 'good';
  } else if (measuredDriftPercent <= thresholds.average) {
    percentile = 48;
    tier = 'average';
  } else {
    percentile = 18;
    tier = 'poor';
  }

  // Estimate remaining lifespan before deadzone tuning required (>5% drift)
  const remainingMonths = Math.max(0, Math.round((5 - measuredDriftPercent) * 2.5));

  return {
    percentile,
    tier,
    avgLifespanRemainingMonths: remainingMonths,
    totalModelSamples: model.samples
  };
}

export function recordTelemetry(payload: TelemetryPayload): boolean {
  if (typeof window === 'undefined') return false;
  if (!getTelemetryConsent()) return false;

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_TELEMETRY_LOG) || '[]');
    existing.push({
      ...payload,
      timestamp: Date.now()
    });
    // Keep last 50 local logs
    if (existing.length > 50) existing.shift();
    localStorage.setItem(LOCAL_TELEMETRY_LOG, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}
