/**
 * thresholds.ts — the one set of resting-drift bands used sitewide.
 * Stick Drift tool, calibration check, learn guides and methodology all read
 * these, so the numbers a visitor sees never disagree between pages.
 */

/** Resting drift, in percent of full stick travel. */
export const DRIFT_BANDS = {
  /** Up to this: normal wear; a small in-game deadzone hides it. */
  healthyMax: 2.5,
  /** Up to this: noticeable wear; raise the deadzone or clean the stick. Above: repair or replace. */
  moderateMax: 8,
} as const;
