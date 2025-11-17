import React, { FC, useEffect } from 'react';

import { STROKE_WIDTH } from '@/constants';
import { useMovePieces } from '@/hooks/use-move-pieces';
import { PuzzleOptions, BoardRef } from '@/types';

import styles from './styles.module.scss';

const STEP_SIZE = 10;

interface PuzzlePieceProps {
  boardHeight: number;
  boardWidth: number;
  image: string;
  pieceIndex: number;
  initialX: number;
  initialY: number;
  initialIsSnapped?: boolean;
  isNewlyUnlocked?: boolean;
  path: string;
  snapThreshold: number;
  boardRef: BoardRef;
  targetX: number;
  targetY: number;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  onSnap?: () => void;
  onSnapWithKeyboard?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  registerPieceRef?: (boardSlotKey: string, ref: SVGGElement | null) => void;
  boardSlotKey: string;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const PuzzlePiece: FC<PuzzlePieceProps> = ({
  boardHeight,
  boardWidth,
  image,
  pieceIndex,
  initialX,
  initialY,
  initialIsSnapped,
  isNewlyUnlocked,
  path,
  snapThreshold,
  boardRef,
  targetX,
  targetY,
  puzzlePieceOptions,
  onSnap,
  onSnapWithKeyboard,
  onPositionChange,
  registerPieceRef,
  boardSlotKey,
  onDragStart,
  onDragEnd,
}) => {
  const { ref, dragState, isSnapped, moveBy, trySnap, handlers} = useMovePieces({
    initialX,
    initialY,
    initialIsSnapped,
    snapThreshold,
    boardRef,
    targetX,
    targetY,
    onSnap,
    onPositionChange,
    onDragStart,
    onDragEnd,
  });

  // Register this piece's ref with the parent
  useEffect(() => {
    if (registerPieceRef) {
      registerPieceRef(boardSlotKey, ref.current);
    }

    return () => {
      if (registerPieceRef) {
        registerPieceRef(boardSlotKey, null);
      }
    };
  }, [ref, registerPieceRef, boardSlotKey]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSnapped) return;

    const step = STEP_SIZE; // 10px movement per key press

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        moveBy(0, -step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveBy(0, step);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveBy(-step, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveBy(step, 0);
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const snapSuccess = trySnap();
        // Only call the keyboard-specific callback if snap was successful
        if (snapSuccess && onSnapWithKeyboard) {
          onSnapWithKeyboard();
        }
        break;
      }
    }
  };

  // Bring element to front when dragging starts
  useEffect(() => {
    if (dragState.isDragging && ref.current && ref.current.parentNode && !isSnapped) {
      ref.current.parentNode.appendChild(ref.current);
    }
  }, [ref, dragState.isDragging, isSnapped]);

  // Move element to back when snapped and drag ends
  useEffect(() => {
    if (!dragState.isDragging && isSnapped && ref.current && ref.current.parentNode) {
      const parent = ref.current.parentNode;
      if (parent.firstChild !== ref.current) {
        parent.insertBefore(ref.current, parent.firstChild);
      }
    }
  }, [ref, dragState.isDragging, isSnapped]);

  // Build class names (don't add unlockAnimation here, it's on the wrapper)
  const pieceClasses = [
    styles.puzzlePiece,
  ]
    .filter(Boolean)
    .join(' ');

  // For newly unlocked pieces, force the transform to be applied immediately
  // by baking it into the element structure rather than relying on React timing
  const transform = isSnapped ? '' : `translate(${dragState.x},${dragState.y})`;
  const unlockWrapperTransform = isNewlyUnlocked ? transform : '';
  const normalTransform = !isNewlyUnlocked ? transform : '';

  return (
    <>
      {isNewlyUnlocked ? (
        // For newly unlocked: Use double wrapper with transform on OUTER group
        // This ensures transform is in the initial DOM structure
        <g transform={unlockWrapperTransform} opacity="0" className={styles.unlockAnimationWrapper}>
          <g
            ref={ref}
            {...handlers}
            className={`${pieceClasses} ${styles.unlockAnimation}`}
            tabIndex={isSnapped ? -1 : 0}
            onKeyDown={handleKeyDown}
          >
            <defs>
              <clipPath id={`piece-clip-${pieceIndex}`}>
                <path d={path} />
              </clipPath>
            </defs>
            <image
              href={image}
              x={0}
              y={0}
              width={boardWidth}
              height={boardHeight}
              clipPath={`url(#piece-clip-${pieceIndex})`}
              preserveAspectRatio="xMidYMid slice"
            />
            <path
              d={path}
              fill="none"
              stroke={
                isSnapped || !puzzlePieceOptions.strokeEnabled ? '' : puzzlePieceOptions.strokeColor
              }
              strokeWidth={puzzlePieceOptions.strokeEnabled ? STROKE_WIDTH : 0}
            />
          </g>
        </g>
      ) : (
        // Normal piece rendering
        <g
          ref={ref}
          transform={normalTransform}
          {...handlers}
          className={pieceClasses}
          tabIndex={isSnapped ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          <defs>
            <clipPath id={`piece-clip-${pieceIndex}`}>
              <path d={path} />
            </clipPath>
          </defs>
          <image
            href={image}
            x={0}
            y={0}
            width={boardWidth}
            height={boardHeight}
            clipPath={`url(#piece-clip-${pieceIndex})`}
            preserveAspectRatio="xMidYMid slice"
          />
          <path
            d={path}
            fill="none"
            stroke={
              isSnapped || !puzzlePieceOptions.strokeEnabled ? '' : puzzlePieceOptions.strokeColor
            }
            strokeWidth={puzzlePieceOptions.strokeEnabled ? STROKE_WIDTH : 0}
          />
        </g>
      )}
    </>
  );
};

export default PuzzlePiece;
