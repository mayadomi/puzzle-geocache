import { useCallback } from 'react';
import { STORAGE_KEYS, MAX_PUZZLE_AGE } from '@/constants';
import { PiecePosition } from '@/types';

export interface PuzzleState {
  imageId: string; // Hash or identifier of the current image
  pieces: PiecePosition[];
  snappedPieceIds: string[];
  unlockedPieceIds: string[]; // Track which pieces have been unlocked via QR codes
  timestamp: number; // When was this saved
  rows: number;
  columns: number;
}

export interface TimerState {
  elapsedTime: number;
  timestamp: number;
}

/**
 * Hook for persisting and restoring puzzle state using localStorage
 */
export const usePuzzlePersistence = () => {
  /**
   * Save the current puzzle state to localStorage
   */
  const savePuzzleState = useCallback((state: PuzzleState) => {
    try {
      const storageKey = `${STORAGE_KEYS.PUZZLE_STATE}-${state.imageId}`;
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // Handle storage quota exceeded or other errors
      console.warn('Failed to save puzzle state:', error);
      
      // Try to cleanup old puzzles and retry once
      cleanupOldPuzzles();
      try {
        const storageKey = `${STORAGE_KEYS.PUZZLE_STATE}-${state.imageId}`;
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (retryError) {
        console.error('Failed to save puzzle state after cleanup:', retryError);
      }
    }
  }, []);

  /**
   * Load puzzle state from localStorage for a specific image
   */
  const loadPuzzleState = useCallback((imageId: string): PuzzleState | null => {
    try {
      const storageKey = `${STORAGE_KEYS.PUZZLE_STATE}-${imageId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (!saved) {
        return null;
      }

      const state: PuzzleState = JSON.parse(saved);

      // Validate the state has required properties
      if (
        !state.imageId ||
        !Array.isArray(state.pieces) ||
        !Array.isArray(state.snappedPieceIds) ||
        typeof state.timestamp !== 'number'
      ) {
        console.warn('Invalid puzzle state found, ignoring');
        return null;
      }

      // Migrate old state that doesn't have unlockedPieceIds
      if (!state.unlockedPieceIds) {
        state.unlockedPieceIds = [];
      }

      // Only return if it's for the same image and not too old
      if (state.imageId === imageId && Date.now() - state.timestamp < MAX_PUZZLE_AGE) {
        return state;
      }

      // Clean up expired state
      if (Date.now() - state.timestamp >= MAX_PUZZLE_AGE) {
        localStorage.removeItem(storageKey);
      }

      return null;
    } catch (error) {
      console.warn('Failed to load puzzle state:', error);
      return null;
    }
  }, []);

  /**
   * Clear puzzle state for a specific image
   */
  const clearPuzzleState = useCallback((imageId: string) => {
    try {
      const storageKey = `${STORAGE_KEYS.PUZZLE_STATE}-${imageId}`;
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to clear puzzle state:', error);
    }
  }, []);

  /**
   * Save timer state to localStorage
   */
  const saveTimerState = useCallback((imageId: string, state: TimerState) => {
    try {
      const storageKey = `${STORAGE_KEYS.TIMER_STATE}-${imageId}`;
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save timer state:', error);
    }
  }, []);

  /**
   * Load timer state from localStorage
   */
  const loadTimerState = useCallback((imageId: string): TimerState | null => {
    try {
      const storageKey = `${STORAGE_KEYS.TIMER_STATE}-${imageId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (!saved) return null;

      const state: TimerState = JSON.parse(saved);

      // Validate the state
      if (typeof state.elapsedTime !== 'number' || typeof state.timestamp !== 'number') {
        return null;
      }

      // Only return if not too old
      if (Date.now() - state.timestamp < MAX_PUZZLE_AGE) {
        return state;
      }

      return null;
    } catch (error) {
      console.warn('Failed to load timer state:', error);
      return null;
    }
  }, []);

  /**
   * Clear timer state for a specific image
   */
  const clearTimerState = useCallback((imageId: string) => {
    try {
      const storageKey = `${STORAGE_KEYS.TIMER_STATE}-${imageId}`;
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to clear timer state:', error);
    }
  }, []);

  return {
    savePuzzleState,
    loadPuzzleState,
    clearPuzzleState,
    saveTimerState,
    loadTimerState,
    clearTimerState,
  };
};

/**
 * Cleanup old puzzle states from localStorage
 * Removes puzzles older than MAX_PUZZLE_AGE
 */
export const cleanupOldPuzzles = () => {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();

    keys.forEach((key) => {
      if (
        key.startsWith(STORAGE_KEYS.PUZZLE_STATE) ||
        key.startsWith(STORAGE_KEYS.TIMER_STATE)
      ) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            if (parsed.timestamp && now - parsed.timestamp >= MAX_PUZZLE_AGE) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // If we can't parse it, it's probably corrupted, remove it
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.warn('Failed to cleanup old puzzles:', error);
  }
};

