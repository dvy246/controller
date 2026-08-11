/**
 * interpretation.ts — Evidence Interpretation Protocol Engine
 *
 * The core differentiator: every competitor shows raw Gamepad API numbers.
 * This engine tells you what those numbers MEAN for your specific controller.
 *
 * Each interpretation card has 5 layers:
 *   1. Measurement  — the raw number
 *   2. Interpretation — what it means (normal / watch / action-needed)
 *   3. Comparison — how you rank against N tested controllers of this model
 *   4. Confidence — how trustworthy is this single measurement
 *   5. Next Steps — what to actually do about it
 *
 * HONESTY BOUNDARY: This engine never claims certainty it cannot have.
 * Browser Gamepad API has real limitations (polling jitter, BT latency,
 * driver-level deadzones) that are stated, not hidden.
 */

import reliabilityData from "../data/reliabilityData.json";

/* ──────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────── */

export type Verdict = "normal" | "watch" | "action-needed";
export type ConfidenceLevel = "high" | "medium" | "low";
export type WearStage = "minimal" | "early" | "moderate" | "advanced" | "unknown";

export interface MeasurementDisplay {
  label: string;
  value: string;
  unit: string;
}

export interface InterpretationResult {
  verdict: Verdict;
  explanation: string;
}

export interface ComparisonResult {
  percentile: number;
  betterThan: string;
  modelName: string;
  datasetDate: string;
}

export interface ConfidenceResult {
  level: ConfidenceLevel;
  factors: string[];
  howToImprove: string;
}

export interface NextStep {
  action: string;
  href?: string;
  priority: "primary" | "secondary";
}

export interface InterpretationCard {
  measurement: MeasurementDisplay;
  interpretation: InterpretationResult;
  comparison: ComparisonResult | null;
  confidence: ConfidenceResult;
  limitations: string[];
  nextSteps: NextStep[];
}

/* ──────────────────────────────────────────────────────────────────────
 * Controller Identity with Confidence
 * ────────────────────────────────────────────────────────────────────── */

export type IdentityConfidence = "exact-match" | "vendor-id" | "generic-mapping";

export interface ControllerIdentity {
  model: string;
  confidence: IdentityConfidence;
  reliabilityKey: string | null;
  rawBrowserId: string;
}

export function identifyControllerWithConfidence(
  rawId: string
): ControllerIdentity {
  const lower = rawId.toLowerCase();

  // Exact string matches → high confidence
  if (lower.includes("dualsense")) {
    return {
      model: "PlayStation 5 DualSense",
      confidence: "exact-match",
      reliabilityKey: "ps5-dualsense",
      rawBrowserId: rawId,
    };
  }
  if (lower.includes("dualshock") || lower.includes("ps4")) {
    return {
      model: "PlayStation 4 DualShock 4",
      confidence: "exact-match",
      reliabilityKey: null, // No baseline dataset for DS4 yet
      rawBrowserId: rawId,
    };
  }
  if (lower.includes("xbox series")) {
    return {
      model: "Xbox Series Controller",
      confidence: "exact-match",
      reliabilityKey: "xbox-series-x",
      rawBrowserId: rawId,
    };
  }
  if (lower.includes("pro controller") && lower.includes("057e")) {
    return {
      model: "Nintendo Switch Pro Controller",
      confidence: "exact-match",
      reliabilityKey: "switch-pro",
      rawBrowserId: rawId,
    };
  }
  if (lower.includes("joy-con")) {
    return {
      model: "Nintendo Joy-Con",
      confidence: "exact-match",
      reliabilityKey: null,
      rawBrowserId: rawId,
    };
  }

  // Vendor-ID-only matches → medium confidence
  // 054c = Sony (could be DualSense OR DualShock 4 — ambiguous)
  if (lower.includes("054c") || lower.includes("playstation")) {
    return {
      model: "PlayStation Controller",
      confidence: "vendor-id",
      reliabilityKey: "ps5-dualsense", // Best guess, but flagged as medium
      rawBrowserId: rawId,
    };
  }
  // 045e = Microsoft (could be Xbox One OR Series — ambiguous)
  if (
    lower.includes("045e") ||
    lower.includes("xinput") ||
    lower.includes("xbox")
  ) {
    return {
      model: "Xbox Controller",
      confidence: "vendor-id",
      reliabilityKey: "xbox-series-x",
      rawBrowserId: rawId,
    };
  }
  // 057e = Nintendo
  if (lower.includes("057e") || lower.includes("switch")) {
    return {
      model: "Nintendo Controller",
      confidence: "vendor-id",
      reliabilityKey: "switch-pro",
      rawBrowserId: rawId,
    };
  }

  // Everything else → standard gamepad mapping only
  return {
    model: "Standard Gamepad",
    confidence: "generic-mapping",
    reliabilityKey: null,
    rawBrowserId: rawId,
  };
}

/* ──────────────────────────────────────────────────────────────────────
 * Model Comparison Engine
 * ────────────────────────────────────────────────────────────────────── */

const models = reliabilityData.models as Record<string, any>;

function getModelData(reliabilityKey: string | null) {
  if (!reliabilityKey) return null;
  return models[reliabilityKey] ?? null;
}

function calculatePercentile(
  value: number,
  thresholds: { excellent: number; good: number; average: number; poor: number }
): number {
  if (value <= thresholds.excellent) return 92;
  if (value <= thresholds.good) return 75;
  if (value <= thresholds.average) return 48;
  return 18;
}

/* ──────────────────────────────────────────────────────────────────────
 * Wear Stage Estimation (honest, no fake formulas)
 * ────────────────────────────────────────────────────────────────────── */

export function estimateWearStage(
  driftPct: number,
  reliabilityKey: string | null
): WearStage {
  const model = getModelData(reliabilityKey);
  if (!model) return "unknown";

  const t = model.percentileThresholds;
  if (driftPct <= t.excellent) return "minimal";
  if (driftPct <= t.good) return "early";
  if (driftPct <= t.average) return "moderate";
  return "advanced";
}

/* ──────────────────────────────────────────────────────────────────────
 * Drift Interpretation
 * ────────────────────────────────────────────────────────────────────── */

export function interpretDrift(
  driftPct: number,
  identity: ControllerIdentity,
  connectionType: "usb" | "bluetooth" | "unknown" = "unknown",
  sampleDurationSec: number = 0
): InterpretationCard {
  const model = getModelData(identity.reliabilityKey);
  const wearStage = estimateWearStage(driftPct, identity.reliabilityKey);

  // ── Measurement
  const measurement: MeasurementDisplay = {
    label: "Stick Drift",
    value: driftPct.toFixed(2),
    unit: "%",
  };

  // ── Interpretation
  let verdict: Verdict;
  let explanation: string;

  if (driftPct <= 2.0) {
    verdict = "normal";
    explanation =
      "Within normal variance. No in-game phantom movement expected, even at 0% deadzone.";
  } else if (driftPct <= 10.0) {
    verdict = "watch";
    const deadzoneRecommendation = Math.ceil(driftPct * 1.5);
    explanation = `Minor potentiometer wear detected. Set in-game deadzone to ${deadzoneRecommendation}% to eliminate phantom movement. Consider cleaning the stick base with 99% isopropyl alcohol.`;
  } else {
    verdict = "action-needed";
    explanation =
      "Significant analog stick wear. The potentiometer contact surface has degraded beyond deadzone compensation. Consider stick module replacement or manufacturer warranty claim.";
  }

  // Add model-specific context if available
  if (model && wearStage !== "unknown") {
    const stageDescriptions: Record<string, string> = {
      minimal: "This reading is typical of a new or lightly-used unit.",
      early: `Early wear — typical after several months of regular use for ${model.name} controllers.`,
      moderate: `Moderate wear — consistent with ${model.name} potentiometer aging patterns.`,
      advanced: `Advanced wear — beyond the average for ${model.name} controllers in our reference model.`,
    };
    explanation += ` ${stageDescriptions[wearStage]}`;
  }

  // ── Comparison
  let comparison: ComparisonResult | null = null;
  if (model) {
    const percentile = calculatePercentile(
      driftPct,
      model.percentileThresholds
    );
    comparison = {
      percentile,
      betterThan: `${percentile}% of the ${model.name} reference distribution`,
      modelName: model.name,
      datasetDate: reliabilityData.updatedAt,
    };
  }

  // ── Confidence
  const confidenceFactors: string[] = [];
  let confidenceLevel: ConfidenceLevel = "medium";

  if (identity.confidence === "exact-match") {
    confidenceFactors.push("Controller model identified from device data");
  } else if (identity.confidence === "vendor-id") {
    confidenceFactors.push(
      "Controller identified by vendor ID only — exact model uncertain"
    );
    confidenceLevel = "low";
  } else {
    confidenceFactors.push(
      "Controller reported as standard gamepad — model-specific comparison unavailable"
    );
    confidenceLevel = "low";
  }

  if (connectionType === "usb") {
    confidenceFactors.push("USB connection — minimal transport latency");
  } else if (connectionType === "bluetooth") {
    confidenceFactors.push(
      "Bluetooth connection — transport jitter may affect reading by ±0.5%"
    );
  } else {
    confidenceFactors.push(
      "Connection type unknown — USB recommended for highest accuracy"
    );
  }

  if (sampleDurationSec >= 30) {
    confidenceFactors.push(
      `Measured over ${sampleDurationSec}s — sufficient sampling window`
    );
    if (identity.confidence === "exact-match" && connectionType === "usb") {
      confidenceLevel = "high";
    }
  } else if (sampleDurationSec > 0) {
    confidenceFactors.push(
      `Short sampling window (${sampleDurationSec}s) — retest for 30+ seconds recommended`
    );
  }

  const confidence: ConfidenceResult = {
    level: confidenceLevel,
    factors: confidenceFactors,
    howToImprove:
      confidenceLevel === "high"
        ? "This is a high-confidence reading."
        : "For higher confidence: use USB, keep sticks untouched for 30+ seconds, and retest on a different day.",
  };

  // ── Limitations
  const limitations = [
    "Browser Gamepad API reads the OS-level driver output, not raw hardware. Some drivers apply their own deadzone filtering.",
    "A single measurement session cannot distinguish permanent hardware drift from temporary environmental factors (dust, temperature).",
    "Bluetooth connections add transport jitter that can appear as drift.",
  ];

  if (identity.confidence !== "exact-match") {
    limitations.push(
      `This controller was identified as "${identity.model}" from the browser's device string. The exact model could not be confirmed.`
    );
  }

  // ── Next Steps
  const nextSteps: NextStep[] = [];

  if (verdict === "normal") {
    nextSteps.push({
      action: "Retest in 30 days to track wear over time",
      href: "/test/controller/drift",
      priority: "secondary",
    });
    nextSteps.push({
      action: "Run the full diagnostic for a complete health check",
      href: "/test/controller/full-diagnostic",
      priority: "primary",
    });
  } else if (verdict === "watch") {
    nextSteps.push({
      action: "Try cleaning with isopropyl alcohol",
      href: "/fix/stick-drift",
      priority: "primary",
    });
    nextSteps.push({
      action: "Check if your warranty covers this",
      href: "/warranty",
      priority: "secondary",
    });
    nextSteps.push({
      action: "Estimate fix vs replace cost",
      href: "/fix-or-replace",
      priority: "secondary",
    });
  } else {
    nextSteps.push({
      action: "Check warranty coverage",
      href: "/warranty",
      priority: "primary",
    });
    nextSteps.push({
      action: "Export evidence for warranty claim",
      priority: "primary",
    });
    nextSteps.push({
      action: "Compare fix cost vs replacement",
      href: "/fix-or-replace",
      priority: "secondary",
    });
  }

  return {
    measurement,
    interpretation: { verdict, explanation },
    comparison,
    confidence,
    limitations,
    nextSteps,
  };
}

/* ──────────────────────────────────────────────────────────────────────
 * Circularity Interpretation
 * ────────────────────────────────────────────────────────────────────── */

export function interpretCircularity(
  errorPct: number,
  identity: ControllerIdentity
): InterpretationCard {
  const model = getModelData(identity.reliabilityKey);

  const measurement: MeasurementDisplay = {
    label: "Circularity Error",
    value: errorPct.toFixed(2),
    unit: "%",
  };

  let verdict: Verdict;
  let explanation: string;

  if (errorPct <= 5.0) {
    verdict = "normal";
    explanation =
      "Excellent stick range. Full 360° travel with minimal deviation from a perfect circle. No in-game aiming disadvantage.";
  } else if (errorPct <= 12.0) {
    verdict = "watch";
    explanation =
      "Moderate circularity error — the stick does not reach full displacement in all directions equally. This can slightly affect diagonal aim consistency in competitive play.";
  } else {
    verdict = "action-needed";
    explanation =
      "Significant range limitation — the stick is mechanically restricted in one or more directions. Spring tension may be worn or the stick housing may be obstructed.";
  }

  let comparison: ComparisonResult | null = null;
  if (model) {
    // Circularity uses its own percentile logic
    let percentile: number;
    if (errorPct <= model.avgCircularityErrorPercent * 0.5) percentile = 90;
    else if (errorPct <= model.avgCircularityErrorPercent * 0.8) percentile = 72;
    else if (errorPct <= model.avgCircularityErrorPercent * 1.2) percentile = 45;
    else percentile = 20;

    comparison = {
      percentile,
      betterThan: `${percentile}% of the ${model.name} reference distribution`,
      modelName: model.name,
      datasetDate: reliabilityData.updatedAt,
    };
  }

  return {
    measurement,
    interpretation: { verdict, explanation },
    comparison,
    confidence: {
      level: "medium",
      factors: [
        "Circularity requires manual full-circle stick rotation",
        "Result quality depends on how smoothly the user traced the rim",
      ],
      howToImprove:
        "Trace the outer edge of the stick slowly and smoothly for best results. Repeat 3 times and compare.",
    },
    limitations: [
      "Circularity accuracy depends on the user's manual input — an uneven trace can appear as a hardware fault.",
      "Some controller drivers apply a circular deadzone that clips diagonal displacement, which is a driver behavior, not a hardware defect.",
    ],
    nextSteps: [
      {
        action: "Check stick drift for a complete picture",
        href: "/test/controller/drift",
        priority: "primary",
      },
      {
        action: "View your controller's reliability profile",
        href: "/reliability",
        priority: "secondary",
      },
    ],
  };
}

/* ──────────────────────────────────────────────────────────────────────
 * Health Score Interpretation
 * ────────────────────────────────────────────────────────────────────── */

export interface HealthScoreBreakdown {
  metric: string;
  weight: string;
  value: string;
  status: Verdict;
}

export function interpretHealthScore(
  score: number,
  grade: string,
  breakdown: HealthScoreBreakdown[],
  identity: ControllerIdentity
): InterpretationCard {
  const measurement: MeasurementDisplay = {
    label: "Health Score",
    value: String(score),
    unit: `/ 100 (${grade})`,
  };

  let verdict: Verdict;
  let explanation: string;

  if (score >= 85) {
    verdict = "normal";
    explanation = `This controller is in good working condition. All major subsystems — sticks, buttons, triggers, and rumble — are functioning within expected parameters.`;
  } else if (score >= 60) {
    verdict = "watch";
    const weakest = breakdown.find((b) => b.status !== "normal");
    explanation = `Some wear detected${weakest ? ` — weakest area is ${weakest.metric.toLowerCase()}` : ""}. The controller is still usable but may benefit from maintenance or deadzone adjustment.`;
  } else {
    verdict = "action-needed";
    const failing = breakdown.filter((b) => b.status === "action-needed");
    explanation = `Multiple subsystems showing significant wear${failing.length > 0 ? `: ${failing.map((f) => f.metric.toLowerCase()).join(", ")}` : ""}. Consider manufacturer warranty, repair, or replacement.`;
  }

  return {
    measurement,
    interpretation: { verdict, explanation },
    comparison: null,
    confidence: {
      level: "medium",
      factors: [
        "Composite score combines 6 sub-metrics with fixed weights",
        "Score weights: Drift 30%, Circularity 20%, Buttons 15%, Triggers 15%, Vibration 10%, Polling 10%",
      ],
      howToImprove:
        "Run the full diagnostic wizard for the most complete score. Individual tool pages test one metric at a time.",
    },
    limitations: [
      "The Health Score is a weighted composite — it summarizes, but cannot replace individual metric analysis.",
      "Vibration testing depends on browser haptic API support, which varies across browsers and operating systems.",
      "The score does not account for cosmetic condition, battery health, or wireless signal quality.",
    ],
    nextSteps:
      verdict === "normal"
        ? [
            {
              action: "Save to your Controller Passport for future comparison",
              href: "/passport",
              priority: "primary",
            },
            {
              action: "Share your score as a verified certificate",
              priority: "secondary",
            },
          ]
        : [
            {
              action: "Check warranty coverage",
              href: "/warranty",
              priority: "primary",
            },
            {
              action: "Estimate fix vs replace cost",
              href: "/fix-or-replace",
              priority: "primary",
            },
            {
              action: "View step-by-step repair guide",
              href: "/fix/stick-drift",
              priority: "secondary",
            },
          ],
  };
}
