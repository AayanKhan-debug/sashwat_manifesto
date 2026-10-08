/**
 * Frontend-Only Campaign Support Counter & Storage
 * Manages local support counter and browser persistence via localStorage.
 * No backend, database, or API dependencies.
 */

export const INITIAL_SUPPORT_COUNT = 100;
export const STORAGE_KEY_COUNT = 'sk_campaign_support_count';
export const STORAGE_KEY_SUPPORTED = 'sk_campaign_has_supported';

/**
 * Retrieves the current support count from localStorage.
 * Ensures the count never falls below the base of 100.
 */
export const getStoredSupportCount = (): number => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COUNT);
    if (!raw) {
      return INITIAL_SUPPORT_COUNT;
    }
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < INITIAL_SUPPORT_COUNT) {
      return INITIAL_SUPPORT_COUNT;
    }
    return parsed;
  } catch {
    return INITIAL_SUPPORT_COUNT;
  }
};

/**
 * Checks whether this browser has already recorded a support action.
 */
export const getHasSupported = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY_SUPPORTED) === 'true';
  } catch {
    return false;
  }
};

/**
 * Records a support action in localStorage.
 * Increments the local count by 1 (100 -> 101, 101 -> 102, etc.) and sets the supported flag.
 * If this browser has already supported, returns current count without incrementing again.
 */
export const recordLocalSupport = (): { count: number; newlySupported: boolean } => {
  try {
    const alreadySupported = getHasSupported();
    const current = getStoredSupportCount();

    if (alreadySupported) {
      return { count: current, newlySupported: false };
    }

    const newCount = Math.max(INITIAL_SUPPORT_COUNT, current) + 1;
    localStorage.setItem(STORAGE_KEY_COUNT, newCount.toString());
    localStorage.setItem(STORAGE_KEY_SUPPORTED, 'true');

    return { count: newCount, newlySupported: true };
  } catch {
    return { count: INITIAL_SUPPORT_COUNT + 1, newlySupported: true };
  }
};
