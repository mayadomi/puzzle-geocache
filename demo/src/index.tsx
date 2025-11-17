import { useState } from 'react';
import Puzzle from '@/components/puzzle';
import { PuzzleOptions } from '@/types';

import PropOptionsWrapper from './components/props-options-wrapper';

import './styles.scss';

import aerialHarbor from './assets/aerial-harbor.jpg';

// Check if we're in production mode (using Vite's built-in mode)
const IS_PRODUCTION = import.meta.env.MODE === 'production';

// Production configuration - locked and unchangeable
const PRODUCTION_OPTIONS: PuzzleOptions = {
  enableQRUnlock: true,
  checkLocalStorage: true,
  onComplete: () => {},
  onPieceUnlock: () => {},
  onRefresh: () => {},
  board: {
    className: '',
    columns: 4,
    rows: 3,
    width: 800,
    height: 600,
    snapThreshold: 25,
    scatterArea: 600,
    showBoardSlotOutlines: true,
    outlineStrokeColor: 'rgba(39, 25, 25, 0.5)',
  },
  puzzle: {
    className: '',
    refreshButton: {
      enabled: false,
      className: '',
    },
    timer: {
      enabled: true,
      className: '',
    },
    rowsAndColumns: {
      enabled: false,
      className: '',
    },
    responsive: true,
  },
  puzzlePiece: {
    strokeColor: 'gold',
    strokeEnabled: true,
  },
  completionAnimation: {
    className: '',
    type: 'confetti',
    duration: 0,
    message: (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.5em' }}>
          Congrats! 🎉 You solved it! 🌏
        </h2>
        <p style={{ margin: 0, fontSize: '0.85em', lineHeight: '1.5' }}>
          To look back on more historical imagery head to{' '}
          <a
            href="https://livingatlas.arcgis.com/wayback/#mapCenter=115.85599%2C-31.95859%2C17&mode=swipe&active=48925&swipeWidget=48925%2C10"
            target="_blank"
            rel="noopener noreferrer"
          >
            ESRI Wayback
          </a>{' '}
          tool to see the major changes in the Perth CBD using the time slider.
        </p>
      </div>
    ),
  },
};

const App = () => {
  const [imageSource] = useState(aerialHarbor);
  
  // Check if QR unlock is requested via URL param
  const hasUnlockParam = new URLSearchParams(window.location.search).has('unlock');
  
  // In dev mode, disable QR unlock by default unless ?unlock param is present
  // In production mode, always use PRODUCTION_OPTIONS as-is
  const initialOptions = IS_PRODUCTION 
    ? PRODUCTION_OPTIONS 
    : { 
        ...PRODUCTION_OPTIONS, 
        enableQRUnlock: hasUnlockParam 
      };
  
  const [options, setOptions] = useState<PuzzleOptions | Partial<PuzzleOptions> | undefined>(initialOptions);
  const [puzzleKey, setPuzzleKey] = useState(0);

  const handleRefresh = () => {
    // Refresh handler - currently no image cycling
  };

  const handlePropsChange = (newOptions: PuzzleOptions) => {
    setOptions(newOptions);
    // Force re-render by updating the key
    setPuzzleKey((prev) => prev + 1);
  };

  return (
    <div className="puzzleWrapper">
      <h1 className="header">GIS Day 2025 Puzzle</h1>
      <div className="puzzleContainer">
        <Puzzle key={puzzleKey} image={imageSource} onRefresh={handleRefresh} options={options} />
        {/* Only show prop controls in demo mode */}
        {!IS_PRODUCTION && <PropOptionsWrapper handlePropsChange={handlePropsChange} />}
        {!IS_PRODUCTION && (
          <a
            className="githubLink"
            href="https://github.com/mayadomi/puzzle-geocache"
            rel="noopener noreferrer"
            target="_blank"
          >
            puzzle-geocache
          </a>
        )}
      </div>
    </div>
  );
};

export default App;
