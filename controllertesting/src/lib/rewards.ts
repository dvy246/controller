/**
 * rewards.ts — Gamification & Rewards Arcade System
 * LocalStorage points engine, achievement triggers, and level progression.
 */

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  pts: number;
  unlocked: boolean;
}

export interface UserProgress {
  pts: number;
  level: number;
  completedTests: number;
  achievements: Record<string, boolean>;
}

const STORAGE_KEY = 'ct_rewards_user';

export function getUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    pts: 0,
    level: 1,
    completedTests: 0,
    achievements: {},
  };
}

export function addPoints(amount: number): UserProgress {
  const current = getUserProgress();
  current.pts += amount;
  current.level = Math.floor(current.pts / 200) + 1;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {}
  return current;
}

// Backwards-compatible alias used by the browser arcade pages.
export const addXP = addPoints;

export function unlockAchievement(achievementId: string, ptsReward = 50): UserProgress {
  const current = getUserProgress();
  if (!current.achievements[achievementId]) {
    current.achievements[achievementId] = true;
    current.pts += ptsReward;
    current.level = Math.floor(current.pts / 200) + 1;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {}
  }
  return current;
}
