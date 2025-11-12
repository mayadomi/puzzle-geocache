// Main entry point for the puzzle-geocache package
export { default as Puzzle } from './components/puzzle';
export type { InitialPuzzleOptions, PuzzleOptions, CompletionAnimationType } from './types';
export { DEFAULT_PUZZLE_OPTIONS } from './constants';

// Completion Animation (for custom implementations)
export { default as CompletionAnimation } from './components/completion-animation';
export type { CompletionAnimationProps } from './components/completion-animation';

// QR Code unlock utilities
export {
  generatePuzzleQRCodes,
  generateSinglePieceQRCode,
  exportQRCodesAsCSV,
  printQRCodeExample,
} from './utils/generate-qr-codes';
export type { PieceQRData } from './utils/generate-qr-codes';