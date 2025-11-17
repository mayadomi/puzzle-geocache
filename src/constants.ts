import { PuzzleOptions } from '@/types';

export const DEFAULT_PUZZLE_OPTIONS: PuzzleOptions = {
  board: {
    className: '',
    columns: 3,
    height: 500,
    outlineStrokeColor: '#000',
    rows: 4,
    scatterArea: 0,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
    width: 400,
  },
  checkLocalStorage: true,
  completionAnimation: {
    type: 'confetti',
    className: '',
    duration: 3000,
    message: 'Puzzle Complete! 🎉',
  },
  enableQRUnlock: true,
  onComplete: () => {},
  onPieceUnlock: () => {},
  onRefresh: () => {},
  puzzle: {
    className: '',
    responsive: true,
    timer: {
      className: '',
      enabled: true,
    },
    refreshButton: {
      className: '',
      enabled: true,
    },
    rowsAndColumns: {
      className: '',
      enabled: false,
    },
  },
  puzzlePiece: {
    strokeColor: 'gold',
    strokeEnabled: true,
  },
};

export const PUZZLE_GEOCACHE_STORAGE_KEY = 'puzzle-geocache';

// Storage keys for puzzle persistence
export const STORAGE_KEYS = {
  BOARD_CONFIG: 'puzzle-geocache-board-config',
  PUZZLE_STATE: 'puzzle-geocache-puzzle-state',
  TIMER_STATE: 'puzzle-geocache-timer-state',
} as const;

// Maximum age for saved puzzles (30 days in milliseconds)
export const MAX_PUZZLE_AGE = 30 * 24 * 60 * 60 * 1000;

export const STROKE_WIDTH = 2;
