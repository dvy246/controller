export interface DeviceInfo {
  name: string;
  vendorId?: string;
  productId?: string;
  mappedModelKey?: string;
}

export interface EnvironmentInfo {
  browser: string;
  os: string;
  connection: "usb" | "bluetooth" | "wireless_adapter" | "unknown";
}

export interface CapabilityStates {
  gamepad: "supported" | "unsupported";
  haptics: "supported" | "partial" | "unsupported";
  webhid: "supported" | "permission-required" | "unsupported";
}

export interface TestResults {
  buttons: any;
  sticks: {
    driftX: number;
    driftY: number;
    circularityError: number;
    deadzoneRecommendation: number;
  };
  triggers: any;
  vibration: any;
}

export type ConfidenceLevel = 
  | "high" 
  | "repeat-test-recommended" 
  | "browser-limitation" 
  | "unsupported";

export interface EvidenceReport {
  id: string; // UUID
  timestamp: number;
  protocolVersion: string;
  device: DeviceInfo;
  environment: EnvironmentInfo;
  capabilities: CapabilityStates;
  tests: TestResults;
  confidence: ConfidenceLevel;
  limitations: string[];
}

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function detectEnvironment(): EnvironmentInfo {
  if (typeof window === "undefined") {
    return { browser: "Unknown", os: "Unknown", connection: "unknown" };
  }
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";

  let os = "Unknown";
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("like Mac")) os = "iOS";

  return { browser, os, connection: "unknown" };
}

export function checkCapabilities(): CapabilityStates {
  if (typeof window === "undefined") {
    return { gamepad: "unsupported", haptics: "unsupported", webhid: "unsupported" };
  }
  return {
    gamepad: "getGamepads" in navigator ? "supported" : "unsupported",
    haptics: "vibrate" in navigator ? "partial" : "unsupported", // true haptics require gamepad api extension checking
    webhid: "hid" in navigator ? "supported" : "unsupported",
  };
}
