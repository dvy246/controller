import type { EvidenceReport } from "./report";
export type { EvidenceReport };

const LOCAL_PASSPORT_KEY = "ct_passport_history";

export interface PassportRecord {
  deviceId: string; // e.g., "ps5-dualsense" or "vid-pid"
  deviceName: string;
  reports: EvidenceReport[];
}

/**
 * Generate a consistent device ID from the Gamepad API or mapped name.
 */
export function generateDeviceId(deviceName: string, vendorId?: string, productId?: string): string {
  if (vendorId && productId) {
    return `${vendorId}-${productId}`;
  }
  return deviceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

/**
 * Load the entire passport history from local storage.
 */
export function getPassportHistory(): Record<string, PassportRecord> {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(LOCAL_PASSPORT_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Save an EvidenceReport to the local Passport.
 */
export function saveToPassport(report: EvidenceReport): void {
  if (typeof window === "undefined") return;
  
  try {
    const history = getPassportHistory();
    const deviceId = generateDeviceId(report.device.name, report.device.vendorId, report.device.productId);
    
    if (!history[deviceId]) {
      history[deviceId] = {
        deviceId,
        deviceName: report.device.name,
        reports: []
      };
    }
    
    // Check if this exact report ID already exists to prevent duplicates
    if (!history[deviceId].reports.find(r => r.id === report.id)) {
      history[deviceId].reports.push(report);
      // Sort newest first
      history[deviceId].reports.sort((a, b) => b.timestamp - a.timestamp);
      
      localStorage.setItem(LOCAL_PASSPORT_KEY, JSON.stringify(history));
    }
  } catch (err) {
    console.error("Failed to save to passport", err);
  }
}

/**
 * Compare two reports to detect improvements or degradation.
 */
export function compareReports(oldReport: EvidenceReport, newReport: EvidenceReport) {
  const oldDrift = Math.max(oldReport.tests.sticks.driftX, oldReport.tests.sticks.driftY);
  const newDrift = Math.max(newReport.tests.sticks.driftX, newReport.tests.sticks.driftY);
  
  const driftDiff = newDrift - oldDrift; // negative means improvement
  
  const oldCirc = oldReport.tests.sticks.circularityError;
  const newCirc = newReport.tests.sticks.circularityError;
  const circDiff = newCirc - oldCirc; // negative means improvement
  
  return {
    driftDiff,
    circDiff,
    improved: driftDiff < -0.5 || circDiff < -1.0,
    degraded: driftDiff > 0.5 || circDiff > 1.0,
  };
}
