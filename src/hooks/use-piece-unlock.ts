import { useCallback, useEffect, useRef, useState } from 'react';
import { STORAGE_KEYS } from '@/constants';

/**
 * Hook for managing piece unlocking via QR codes
 * Tracks which puzzle pieces have been unlocked and persists to localStorage
 */
export const usePieceUnlock = (
  imageId: string,
  rows: number,
  columns: number,
  enableUnlocking: boolean
) => {
  const [unlockedPieceIds, setUnlockedPieceIds] = useState<Set<string>>(new Set());
  const [newlyUnlockedPieceId, setNewlyUnlockedPieceId] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  /**
   * Unlock a specific piece by its ID (e.g., "2-3" for row 2, col 3)
   */
  const unlockPiece = useCallback((pieceId: string) => {
    setUnlockedPieceIds((prev) => {
      // Check if already unlocked
      if (prev.has(pieceId)) {
        return prev;
      }
      
      // Add to unlocked set
      const updated = new Set([...prev, pieceId]);
      
      // Trigger animation for newly unlocked piece
      setNewlyUnlockedPieceId(pieceId);
      setTimeout(() => setNewlyUnlockedPieceId(null), 1000); // Clear after animation
      
      return updated;
    });
  }, []);

  // Load unlocked pieces from localStorage on mount
  useEffect(() => {
    // Skip if already initialized (prevents double-run in StrictMode from resetting state)
    if (hasInitialized.current) {
      return;
    }
    
    hasInitialized.current = true;
    
    if (!enableUnlocking) {
      // If unlocking is disabled, unlock all pieces by default
      const allPieceIds = new Set<string>();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          allPieceIds.add(`${row}-${col}`);
        }
      }
      setUnlockedPieceIds(allPieceIds);
      return;
    }

    // If unlocking is enabled, start with empty set or load from storage
    try {
      const storageKey = `${STORAGE_KEYS.PUZZLE_STATE}-${imageId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        const state = JSON.parse(saved);
        if (state.unlockedPieceIds && Array.isArray(state.unlockedPieceIds)) {
          setUnlockedPieceIds(new Set(state.unlockedPieceIds));
          return;
        }
      }
      
      // No saved state - start with empty set (no pieces unlocked)
      setUnlockedPieceIds(new Set());
    } catch (error) {
      console.warn('Failed to load unlocked pieces:', error);
      setUnlockedPieceIds(new Set());
    }
  }, [imageId, enableUnlocking, rows, columns]);

  // Check URL for unlock parameter on mount
  useEffect(() => {
    if (!enableUnlocking) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const unlockPieceId = params.get('unlock');
    
    if (unlockPieceId) {
      unlockPiece(unlockPieceId);
      // Clean up URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [enableUnlocking, unlockPiece]);

  /**
   * Check if a specific piece is unlocked
   */
  const isPieceUnlocked = useCallback(
    (pieceId: string) => {
      if (!enableUnlocking) return true; // All pieces unlocked if feature disabled
      return unlockedPieceIds.has(pieceId);
    },
    [unlockedPieceIds, enableUnlocking],
  );

  /**
   * Get the newly unlocked piece ID (for animation)
   */
  const getNewlyUnlockedPieceId = useCallback(() => {
    return newlyUnlockedPieceId;
  }, [newlyUnlockedPieceId]);

  /**
   * Unlock all pieces (for testing/admin)
   */
  const unlockAllPieces = useCallback((allPieceIds: string[]) => {
    setUnlockedPieceIds(new Set(allPieceIds));
  }, []);

  /**
   * Reset all unlocked pieces
   */
  const resetUnlockedPieces = useCallback(() => {
    setUnlockedPieceIds(new Set());
  }, []);

  return {
    unlockedPieceIds: Array.from(unlockedPieceIds),
    unlockPiece,
    isPieceUnlocked,
    getNewlyUnlockedPieceId,
    unlockAllPieces,
    resetUnlockedPieces,
    unlockedCount: unlockedPieceIds.size,
  };
};

