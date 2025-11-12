import { useState } from 'react';
import Puzzle from '@/components/puzzle';
import { PuzzleOptions } from '@/types';

import PropOptionsWrapper from './components/props-options-wrapper';

import './styles.scss';

import dasie1 from './assets/dasie-1.jpg';
import dasie2 from './assets/dasie-2.jpg';
import dasie3 from './assets/dasie-3.jpg';
import dasie4 from './assets/dasie-4.jpg';

const DASIE_IMAGES = [dasie1, dasie2, dasie3, dasie4];

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
    scatterArea: 250,
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
    duration: 3000,
    message: 'Congratulations! You found all the pieces!',
  },
};

const App = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageSource, setImageSource] = useState(DASIE_IMAGES[0]);
  
  // In production mode, use fixed options. In demo mode, check URL params
  const hasUnlockParam = new URLSearchParams(window.location.search).has('unlock');
  const initialOptions = IS_PRODUCTION 
    ? PRODUCTION_OPTIONS 
    : (hasUnlockParam ? { enableQRUnlock: true } as Partial<PuzzleOptions> : undefined);
  
  const [options, setOptions] = useState<PuzzleOptions | Partial<PuzzleOptions> | undefined>(initialOptions);
  const [puzzleKey, setPuzzleKey] = useState(0);

  const handleRefresh = () => {
    // Cycle through images
    const nextIndex = (imageIndex + 1) % DASIE_IMAGES.length;
    setImageIndex(nextIndex);
    setImageSource(DASIE_IMAGES[nextIndex]);
  };

  const handlePropsChange = (newOptions: PuzzleOptions) => {
    setOptions(newOptions);
    // Force re-render by updating the key
    setPuzzleKey((prev) => prev + 1);
  };

  return (
    <div className="puzzleWrapper">
      <h1 className="header">Puzzle Geocache {IS_PRODUCTION ? '' : 'Demo'}</h1>
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
