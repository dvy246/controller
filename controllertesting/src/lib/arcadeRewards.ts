/**
 * arcadeRewards.ts — shared rewards UX for the browser arcade games.
 * Claims session XP exactly once per game (sessionStorage guard), then
 * renders the level line, level-up callout, and daily streak callout
 * in the game-over panel.
 */
import { addXP, getUserProgress } from './rewards';

export interface ArcadeRewardResult {
  awarded: boolean;
  leveledUp: boolean;
  streak: number | null;
  level: number;
  pts: number;
}

export interface ArcadeRewardEls {
  xpBadge: HTMLElement | null;
  levelLine: HTMLElement | null;
  levelup: HTMLElement | null;
  levelupText: HTMLElement | null;
  streak: HTMLElement | null;
  streakText: HTMLElement | null;
}

export type ArcadeRewardState =
  | { kind: 'award'; result: ArcadeRewardResult; amount: number }
  | { kind: 'claimed'; amount: number }
  | { kind: 'fail'; text: string };

const CLAIM_PREFIX = 'ct_xp_claimed_';

export function claimArcadeXp(gameId: string, amount: number): ArcadeRewardResult | null {
  try {
    if (sessionStorage.getItem(CLAIM_PREFIX + gameId) === '1') return null;
  } catch {
    /* sessionStorage unavailable — still award */
  }
  const before = getUserProgress();
  const progress = addXP(amount);
  const leveledUp = progress.level > (before.level || 1);
  const streak = progress.streak || 0;
  const streakBumped = streak > (before.streak || 0) || streak === 1;
  try {
    sessionStorage.setItem(CLAIM_PREFIX + gameId, '1');
  } catch {
    /* ignore */
  }
  return {
    awarded: true,
    leveledUp,
    streak: streakBumped ? streak : null,
    level: progress.level || 1,
    pts: progress.pts || 0,
  };
}

export function getArcadeRewardEls(baseId: string): ArcadeRewardEls {
  return {
    xpBadge: document.getElementById(`${baseId}-over-xp`),
    levelLine: document.getElementById(`${baseId}-over-level`),
    levelup: document.getElementById(`${baseId}-over-levelup`),
    levelupText: document.getElementById(`${baseId}-over-levelup-text`),
    streak: document.getElementById(`${baseId}-over-streak`),
    streakText: document.getElementById(`${baseId}-over-streak-text`),
  };
}

export function renderArcadeRewards(
  els: ArcadeRewardEls,
  state: ArcadeRewardState,
): void {
  const levelLineEl = els.levelLine;
  const levelupEl = els.levelup;
  const levelupTextEl = els.levelupText;
  const streakEl = els.streak;
  const streakTextEl = els.streakText;

  if (state.kind === 'fail') {
    if (els.xpBadge) {
      els.xpBadge.textContent = state.text;
      els.xpBadge.className = 'badge badge-fail over-xp';
    }
    if (levelLineEl) levelLineEl.hidden = true;
    if (levelupEl) levelupEl.hidden = true;
    if (streakEl) streakEl.hidden = true;
    return;
  }

  if (state.kind === 'award') {
    if (els.xpBadge) {
      els.xpBadge.textContent = `You earned +${state.amount} XP`;
      els.xpBadge.className = 'badge badge-pass over-xp';
    }
  } else {
    if (els.xpBadge) {
      els.xpBadge.textContent = `+${state.amount} XP · claimed this session`;
      els.xpBadge.className = 'badge badge-neutral over-xp';
    }
  }

  const progress =
    state.kind === 'award'
      ? { level: state.result.level, pts: state.result.pts }
      : (() => {
          const p = getUserProgress();
          return { level: p.level || 1, pts: p.pts || 0 };
        })();

  if (levelLineEl) {
    levelLineEl.textContent = `Level ${progress.level} · ${progress.pts} XP`;
    levelLineEl.hidden = false;
  }

  if (levelupEl && levelupTextEl) {
    if (state.kind === 'award' && state.result.leveledUp) {
      levelupTextEl.textContent = `Level up! → Level ${state.result.level}`;
      levelupEl.hidden = false;
      levelupEl.classList.remove('over-animate');
      void levelupEl.offsetWidth;
      levelupEl.classList.add('over-animate');
    } else {
      levelupEl.hidden = true;
    }
  }

  if (streakEl && streakTextEl) {
    if (state.kind === 'award' && state.result.streak) {
      streakTextEl.textContent = `${state.result.streak}-day streak`;
      streakEl.hidden = false;
      streakEl.classList.remove('over-animate');
      void streakEl.offsetWidth;
      streakEl.classList.add('over-animate');
    } else {
      streakEl.hidden = true;
    }
  }
}
