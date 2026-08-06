/**
 * Controller Fit Blueprint — fit verdict engine.
 *
 * All logic is transparent and documented; no hidden scoring.
 * Verdicts are computed from the published dimensions in controllerFitData.json.
 * Models without measured body width always return 'pending' — we never guess.
 */

import fitData from '../data/controllerFitData.json';

export interface FitModel {
  name: string;
  brand: string;
  priceUsd: number | null;
  weightG: number | null;
  widthMm: number | null;
  heightMm: number | null;
  depthMm: number | null;
  stickLayout: 'symmetrical' | 'asymmetric' | 'either';
  gripMeasured: boolean;
  fitNotes: string[];
  source: string;
  lastVerified: string;
}

export type HandKey = 'small' | 'medium' | 'large';
export type VerdictTier = 'recommended' | 'try-first' | 'not-ideal' | 'pending';
export type FitBand = 'tight' | 'comfortable' | 'roomy';
export type WeightTier = 'light' | 'moderate' | 'heavy' | null;

export interface FitResult {
  slug: string;
  name: string;
  widthMm: number | null;
  weightG: number | null;
  stickLayout: string;
  ratio: number | null;
  band: FitBand | null;
  layoutMatch: boolean | null;
  weightTier: WeightTier;
  verdict: VerdictTier;
  reason: string;
}

export interface HandCalibration {
  spanMm: number;
  palmWidthMm: number;
  /** Which hand-band the span falls into (reference thresholds, documented below). */
  handKey: HandKey;
}

/**
 * Reference hand-size bands (span = thumb-tip to pinky-tip, open hand).
 * These are published guidelines for comparing against controller widths —
 * see the "how this test works" note on /fit.
 */
export function classifyHand(spanMm: number): HandKey {
  if (spanMm < 165) return 'small';
  if (spanMm <= 195) return 'medium';
  return 'large';
}

export function getFitModels(): Record<string, FitModel> {
  return fitData.models as Record<string, FitModel>;
}

export function getFitModel(slug: string): FitModel | null {
  return (fitData.models as Record<string, FitModel>)[slug] ?? null;
}

export function weightTier(weightG: number | null): WeightTier {
  if (weightG === null) return null;
  if (weightG <= 250) return 'light';
  if (weightG <= 300) return 'moderate';
  return 'heavy';
}

/**
 * Compute the fit band from the width/span ratio:
 *   ratio > 0.95   → 'tight'  (controller nearly as wide as your full span)
 *   ratio 0.75–0.95 → 'comfortable'
 *   ratio < 0.75   → 'roomy'  (plenty of span left over — expect finger overhang)
 */
export function fitBand(spanMm: number, widthMm: number | null): FitBand | null {
  if (widthMm === null) return null;
  const ratio = widthMm / spanMm;
  if (ratio > 0.95) return 'tight';
  if (ratio >= 0.75) return 'comfortable';
  return 'roomy';
}

export function computeVerdict(
  slug: string,
  model: FitModel,
  spanMm: number,
  stickPreference: 'symmetrical' | 'asymmetric'
): FitResult {
  const width = model.widthMm;
  const ratio = width !== null ? Math.round((width / spanMm) * 1000) / 1000 : null;
  const band = fitBand(spanMm, width);
  const layoutMatch = model.stickLayout === 'either' ? true : model.stickLayout === stickPreference;

  let verdict: VerdictTier;
  let reason: string;

  if (width === null) {
    verdict = 'pending';
    reason = `Body width pending caliper verification — no verdict until measured.`;
  } else if (band === 'tight') {
    verdict = 'not-ideal';
    reason = `Body is ~${Math.round(width / 10)} cm wide, near your full ${Math.round(spanMm)} mm span — expect thumb stretch and palm pressure on long sessions.`;
  } else if (band === 'roomy') {
    verdict = 'not-ideal';
    reason = `Body is ~${Math.round(width / 10)} cm wide against a ${Math.round(spanMm)} mm span — fingers will wrap and overhang the back of the grips.`;
  } else if (layoutMatch) {
    verdict = 'recommended';
    reason = `Comfortable width ratio for a ${Math.round(spanMm)} mm span, and the ${model.stickLayout} stick layout matches your preference.`;
  } else {
    verdict = 'try-first';
    reason = `Width fits a ${Math.round(spanMm)} mm span, but the ${model.stickLayout} stick layout differs from your preference — try before you buy.`;
  }

  return {
    slug,
    name: model.name,
    widthMm: width,
    weightG: model.weightG,
    stickLayout: model.stickLayout,
    ratio,
    band,
    layoutMatch: width === null ? null : layoutMatch,
    weightTier: weightTier(model.weightG),
    verdict,
    reason,
  };
}

export interface RankedFit {
  results: FitResult[];
  countByTier: Record<VerdictTier, number>;
}

export function rankAll(spanMm: number, stickPreference: 'symmetrical' | 'asymmetric'): RankedFit {
  const tierOrder: VerdictTier[] = ['recommended', 'try-first', 'not-ideal', 'pending'];
  const models = getFitModels();
  const results = Object.entries(models).map(([slug, model]) =>
    computeVerdict(slug, model, spanMm, stickPreference)
  );
  results.sort((a, b) => tierOrder.indexOf(a.verdict) - tierOrder.indexOf(b.verdict));

  const countByTier: Record<VerdictTier, number> = {
    recommended: 0,
    'try-first': 0,
    'not-ideal': 0,
    pending: 0,
  };
  results.forEach((r) => countByTier[r.verdict]++);

  return { results, countByTier };
}

/**
 * Static builder for /best-controller-for/[hand-key] pages.
 * Reference spans are documented on-page so the recommendations are checkable.
 */
export const HAND_REFERENCES: Record<HandKey, { spanMm: number; note: string }> = {
  small: { spanMm: 150, note: 'reference hand span used on this page: 150 mm (thumb to pinky, open hand)' },
  medium: { spanMm: 180, note: 'reference hand span used on this page: 180 mm (thumb to pinky, open hand)' },
  large: { spanMm: 205, note: 'reference hand span used on this page: 205 mm (thumb to pinky, open hand)' },
};

export function picksForHandKey(handKey: HandKey): RankedFit {
  return rankAll(HAND_REFERENCES[handKey].spanMm, 'symmetrical');
}
