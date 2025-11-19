import { FC, useEffect, useRef, useState, useMemo, useCallback } from 'react';

import PuzzlePiece from '@/components/puzzle-piece';
import CompletionAnimation from '@/components/completion-animation';

import { BoardPathOptions, PiecePosition, PuzzleOptions, SnappedPieceIds } from '@/types';
import { generateBoardPath, computeEdgeMap } from '@/components/board/helpers/generate-board-path';
import { usePuzzlePersistence, cleanupOldPuzzles } from '@/hooks/use-puzzle-persistence';
import { usePieceUnlock } from '@/hooks/use-piece-unlock';
import { generateImageHash } from '@/utils/image-hash';

import BoardOutlines from './components/board-outlines';
import { generateBoardSlots } from './helpers/generate-board-slots';
import { shufflePieces } from './helpers/shuffle-pieces';

import styles from './styles.module.scss';

type PieceRefs = Map<string, SVGGElement>;
interface BoardProps {
  boardHeight: number;
  boardWidth: number;
  checkLocalStorage: boolean;
  className: string;
  columns: number;
  completionAnimation: PuzzleOptions['completionAnimation'];
  enableQRUnlock: boolean;
  image: string;
  onPieceUnlock?: (pieceId: string) => void;
  onPuzzleComplete?: () => void;
  outlineStrokeColor: string;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  rows: number;
  showBoardSlotOutlines: boolean;
  snapThreshold: number;
  scatterArea: number;
  onAnyPieceActiveChange?: (isActive: boolean) => void;
}

const Board: FC<BoardProps> = (props: BoardProps) => {
  const {
    boardHeight,
    boardWidth,
    checkLocalStorage,
    className,
    columns,
    completionAnimation,
    enableQRUnlock,
    image,
    onPieceUnlock,
    onPuzzleComplete,
    outlineStrokeColor,
    puzzlePieceOptions,
    rows,
    showBoardSlotOutlines,
    snapThreshold,
    scatterArea,
    onAnyPieceActiveChange,
  } = props;

  const pieceHeight = boardHeight / rows;
  const pieceWidth = boardWidth / columns;

  // Shuffled pieces with random positions
  const [shuffledPieces, setShuffledPieces] = useState<PiecePosition[]>([]);

  // Track which pieces are snapped to the board
  const [snappedPieceIds, setSnappedPieceIds] = useState<SnappedPieceIds>(new Set());

  // Track if we've loaded saved state (to prevent overwriting on mount)
  const [hasLoadedSavedState, setHasLoadedSavedState] = useState(false);

  // Track puzzle completion for animation
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

  // Board ref for drag coordinate transforms
  const boardRef = useRef<SVGSVGElement | null>(null);

  // Refs to track puzzle pieces by their stable ID
  const pieceRefs = useRef<PieceRefs>(new Map());

  // Persistence hook
  const { savePuzzleState, loadPuzzleState, clearPuzzleState } = usePuzzlePersistence();

  // Generate a unique ID for this image
  const imageId = useMemo(() => generateImageHash(image), [image]);

  // Piece unlock hook for QR code functionality
  const {
    unlockedPieceIds,
    unlockPiece,
    isPieceUnlocked,
    getNewlyUnlockedPieceId,
  } = usePieceUnlock(imageId, rows, columns, enableQRUnlock);

  // Track previously unlocked pieces to detect new unlocks
  const prevUnlockedPieceIdsRef = useRef<string[]>([]);

  // Memoize edgeMap and options
  const edgeMap = useMemo(() => computeEdgeMap({ rows, columns }), [rows, columns]);

  // Memoize boardPathOptions to avoid unnecessary recalculations and re-renders
  // Only recompute when board dimensions, columns, rows, or edgeMap change
  const boardPathOptions: BoardPathOptions = useMemo(
    () => ({
      boardHeight,
      boardWidth,
      columns,
      edgeMap,
      outlineStrokeColor,
      rows,
    }),
    [boardHeight, boardWidth, columns, edgeMap, outlineStrokeColor, rows],
  );

  // Generate board slots once and memoize them
  const boardSlots = useMemo(() => generateBoardSlots(rows, columns), [rows, columns]);

  // Clean up old puzzles on mount
  useEffect(() => {
    if (checkLocalStorage) {
      cleanupOldPuzzles();
    }
  }, [checkLocalStorage]);

  // Try to load saved state on mount or when image changes
  useEffect(() => {
    let savedState = null;
    
    if (checkLocalStorage) {
      savedState = loadPuzzleState(imageId);
    }

    if (
      savedState &&
      savedState.rows === rows &&
      savedState.columns === columns &&
      savedState.pieces.length === rows * columns
    ) {
      // Restore saved puzzle state
      setShuffledPieces(savedState.pieces);
      setSnappedPieceIds(new Set(savedState.snappedPieceIds));
      // Note: unlocked pieces are restored by usePieceUnlock hook automatically
      setHasLoadedSavedState(true);
    } else {
      // No saved state or incompatible - create new shuffled pieces
      const newShuffledPieces = shufflePieces({
        boardHeight,
        boardWidth,
        boardSlots,
        pieceHeight,
        pieceWidth,
        scatterArea,
      });
      setShuffledPieces(newShuffledPieces);
      setSnappedPieceIds(new Set());
      setHasLoadedSavedState(true);
    }
    pieceRefs.current.clear(); // Clear piece refs when board changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, rows, columns, checkLocalStorage]);

  // Track previous dimensions to detect actual changes (not initial values)
  const prevDimensionsRef = useRef({ boardHeight, boardWidth, scatterArea });

  // Reshuffle if board dimensions change (but not on initial mount or when loading saved state)
  useEffect(() => {
    if (!hasLoadedSavedState) return; // Skip on first render

    // Check if dimensions actually changed
    const dimensionsChanged = 
      prevDimensionsRef.current.boardHeight !== boardHeight ||
      prevDimensionsRef.current.boardWidth !== boardWidth ||
      prevDimensionsRef.current.scatterArea !== scatterArea;

    if (dimensionsChanged) {
      prevDimensionsRef.current = { boardHeight, boardWidth, scatterArea };
      
      const newShuffledPieces = shufflePieces({
        boardHeight,
        boardWidth,
        boardSlots,
        pieceHeight,
        pieceWidth,
        scatterArea,
      });
      setShuffledPieces(newShuffledPieces);
      setSnappedPieceIds(new Set());
      pieceRefs.current.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardHeight, boardWidth, scatterArea, hasLoadedSavedState]);

  // Position newly unlocked pieces randomly within the board boundaries
  useEffect(() => {
    if (!hasLoadedSavedState || !enableQRUnlock) return;

    // Find newly unlocked pieces
    const prevUnlocked = prevUnlockedPieceIdsRef.current;
    const newlyUnlocked = unlockedPieceIds.filter((id) => !prevUnlocked.includes(id));

    if (newlyUnlocked.length > 0) {
      // Update positions for newly unlocked pieces
      setShuffledPieces((prev) => {
        return prev.map((piece) => {
          const pieceId = `${piece.pieceRow}-${piece.pieceCol}`;
          
          // If this piece was just unlocked, give it a new random position within board boundaries
          if (newlyUnlocked.includes(pieceId)) {
            // Calculate random position within the board (no scatter area extension)
            const randomX = Math.random() * (boardWidth - pieceWidth);
            const randomY = Math.random() * (boardHeight - pieceHeight);
            
            // Calculate offset from piece's natural board position
            const originalBoardX = piece.pieceCol * pieceWidth;
            const originalBoardY = piece.pieceRow * pieceHeight;
            
            return {
              ...piece,
              x: randomX - originalBoardX,
              y: randomY - originalBoardY,
            };
          }
          
          return piece;
        });
      });

      // Call onPieceUnlock callback for each newly unlocked piece
      newlyUnlocked.forEach((pieceId) => {
        onPieceUnlock?.(pieceId);
      });

      // Update the ref to track current unlocked pieces
      prevUnlockedPieceIdsRef.current = unlockedPieceIds;
    }
  }, [unlockedPieceIds, hasLoadedSavedState, enableQRUnlock, boardWidth, boardHeight, pieceWidth, pieceHeight, onPieceUnlock]);

  // Save puzzle state when pieces move or snap (debounced)
  useEffect(() => {
    // Skip if localStorage disabled, state not loaded yet, or no pieces
    if (!checkLocalStorage || !hasLoadedSavedState || shuffledPieces.length === 0) {
      return;
    }

    // Debounce saves to avoid too many writes
    const timeoutId = setTimeout(() => {
      savePuzzleState({
        imageId,
        pieces: shuffledPieces,
        snappedPieceIds: Array.from(snappedPieceIds),
        unlockedPieceIds: unlockedPieceIds,
        timestamp: Date.now(),
        rows,
        columns,
      });
    }, 500); // Save after 500ms of inactivity

    return () => clearTimeout(timeoutId);
  }, [
    shuffledPieces,
    snappedPieceIds,
    unlockedPieceIds,
    imageId,
    rows,
    columns,
    checkLocalStorage,
    hasLoadedSavedState,
    savePuzzleState,
  ]);

  // Check for puzzle completion
  useEffect(() => {
    const totalPieces = rows * columns;
    if (snappedPieceIds.size === totalPieces && snappedPieceIds.size > 0) {
      // Set completion state for animation
      setIsPuzzleComplete(true);
      
      // Clear saved state when puzzle is completed
      if (checkLocalStorage) {
        clearPuzzleState(imageId);
      }
      onPuzzleComplete?.();
    }
  }, [snappedPieceIds.size, rows, columns, onPuzzleComplete, clearPuzzleState, imageId, checkLocalStorage]);

  // Update piece position when it moves (for persistence)
  const handlePieceMove = useCallback((pieceIndex: number, x: number, y: number) => {
    setShuffledPieces((prev) => {
      const updated = [...prev];
      updated[pieceIndex] = { ...updated[pieceIndex], x, y };
      return updated;
    });
  }, []);

  // Mark a piece as snapped to the board when it's placed correctly
  const handlePieceSnap = (pieceIndex: number) => {
    const { pieceRow, pieceCol } = shuffledPieces[pieceIndex];
    const boardSlotKey = `${pieceRow}-${pieceCol}`;
    // Add the piece to the set of snapped pieces
    setSnappedPieceIds((prev) => new Set([...prev, boardSlotKey]));
  };

  // Focus the next unsnapped piece for keyboard navigation after a piece snaps
  const handleSnapWithKeyboard = (currentPieceIndex: number) => {
    // Find any unsnapped piece (doesn't matter which one)
    const unsnappedPiece = shuffledPieces.find((pos, idx) => {
      const boardSlotKey = `${pos.pieceRow}-${pos.pieceCol}`;
      // Exclude the current piece that just snapped
      return idx !== currentPieceIndex && !snappedPieceIds.has(boardSlotKey);
    });

    if (unsnappedPiece) {
      const boardSlotKey = `${unsnappedPiece.pieceRow}-${unsnappedPiece.pieceCol}`;
      // Get the DOM reference and focus the next unsnapped piece
      const pieceRef = pieceRefs.current.get(boardSlotKey);
      if (pieceRef) {
        pieceRef.focus();
      }
    }
  };

  // Register/unregister puzzle piece refs for keyboard navigation and programmatic control
  const registerPieceRef = (boardSlotKey: string, ref: SVGGElement | null) => {
    if (ref) {
      // Store the DOM reference when piece mounts
      pieceRefs.current.set(boardSlotKey, ref);
    } else {
      // Remove the DOM reference when piece unmounts
      pieceRefs.current.delete(boardSlotKey);
    }
  };

  return (
    <div className={styles.boardWrapper}>
      <svg
        ref={boardRef}
        className={`${styles.board} ${className}`}
        data-testid="board"
        height={boardHeight}
        width={boardWidth}
        viewBox={`0 0 ${boardWidth} ${boardHeight}`}
      >
        <BoardOutlines
          boardPathOptions={boardPathOptions}
          boardSlots={boardSlots}
          showBoardSlotOutlines={showBoardSlotOutlines}
          snappedPieceIds={snappedPieceIds}
        />
        {shuffledPieces
          .map((piece, originalIndex) => ({ ...piece, originalIndex }))
          .filter(({ pieceRow, pieceCol }) => {
            const boardSlotKey = `${pieceRow}-${pieceCol}`;
            // If QR unlock is disabled, show all pieces
            if (!enableQRUnlock) {
              return true;
            }
            // Otherwise only show unlocked pieces
            return isPieceUnlocked(boardSlotKey);
          })
          .map(({ pieceRow, pieceCol, x, y, originalIndex }, _filteredIndex) => {
            const boardSlotKey = `${pieceRow}-${pieceCol}`;
            const isSnapped = snappedPieceIds.has(boardSlotKey);
            const isNewlyUnlocked = getNewlyUnlockedPieceId() === boardSlotKey;
            
            return (
              <PuzzlePiece
                key={boardSlotKey}
                boardHeight={boardHeight}
                boardWidth={boardWidth}
                boardSlotKey={boardSlotKey}
                image={image}
                pieceIndex={originalIndex}
                initialX={x}
                initialY={y}
                initialIsSnapped={isSnapped}
                isNewlyUnlocked={isNewlyUnlocked}
                onSnap={() => handlePieceSnap(originalIndex)}
                onSnapWithKeyboard={() => handleSnapWithKeyboard(originalIndex)}
                onPositionChange={(newX, newY) => handlePieceMove(originalIndex, newX, newY)}
                path={generateBoardPath({ col: pieceCol, row: pieceRow, options: boardPathOptions })}
                puzzlePieceOptions={puzzlePieceOptions}
                registerPieceRef={registerPieceRef}
                snapThreshold={snapThreshold}
                boardRef={boardRef}
                targetX={(pieceCol * pieceWidth) / 100}
                targetY={(pieceRow * pieceHeight) / 100}
                onDragStart={() => onAnyPieceActiveChange?.(true)}
                onDragEnd={() => onAnyPieceActiveChange?.(false)}
              />
            );
          })}
      </svg>

      {/* Completion Animation */}
      {isPuzzleComplete && completionAnimation.customComponent ? (
        <completionAnimation.customComponent />
      ) : isPuzzleComplete && completionAnimation.type !== 'none' ? (
        <CompletionAnimation
          animationType={completionAnimation.type}
          className={completionAnimation.className}
          duration={completionAnimation.duration}
          message={completionAnimation.message}
          onAnimationComplete={completionAnimation.duration > 0 ? () => setIsPuzzleComplete(false) : undefined}
        />
      ) : null}
    </div>
  );
};

export default Board;
