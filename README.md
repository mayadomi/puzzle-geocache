# Puzzle Geocache

A React component for creating interactive jigsaw puzzles with customizable options and smooth drag-and-drop functionality.

## Installation

### From GitHub

You can install this component directly from GitHub:

```bash
npm install github:mayadomi/puzzle-geocache
```

```bash
yarn add github:mayadomi/puzzle-geocache
```

## Usage

### Basic Usage

```tsx
import { Puzzle } from 'puzzle-geocache';

function App() {
  const handleComplete = () => {
    console.log('Puzzle completed!');
  };

  return <Puzzle image="/path/to/your/image.jpg" onComplete={handleComplete} />;
}
```

### Advanced Usage with Custom Options

```tsx
import { Puzzle, DEFAULT_PUZZLE_OPTIONS } from 'puzzle-geocache';

function App() {
  const customOptions = {
    checkLocalStorage: true, // Enable progress persistence (default)
    board: {
      className: 'custom-board',
      columns: 6,
      height: 400,
      outlineStrokeColor: '#bbb',
      rows: 4,
      scatterArea: 100,
      showBoardSlotOutlines: true,
      snapThreshold: 15,
      width: 600,
    },
    puzzle: {
      className: 'custom-puzzle',
      responsive: true,
      timer: {
        className: 'custom-timer',
        enabled: true,
      },
      refreshButton: {
        className: 'custom-refresh-btn',
        enabled: true,
      },
      rowsAndColumns: {
        className: 'custom-controls',
        enabled: true,
      },
    },
    puzzlePiece: {
      strokeColor: '#ff6b6b',
      strokeEnabled: true,
    },
  };

  return (
    <Puzzle
      image="/path/to/your/image.jpg"
      options={customOptions}
      onComplete={() => console.log('puzzle completed')}
      onRefresh={() => console.log('puzzle refreshed')}
    />
  );
}
```

### Disabling Progress Persistence

If you want to disable automatic progress saving:

```tsx
import { Puzzle } from 'puzzle-geocache';

function App() {
  return (
    <Puzzle
      image="/path/to/your/image.jpg"
      options={{ checkLocalStorage: false }}
      onComplete={() => console.log('puzzle completed')}
    />
  );
}
```

### Importing Styles (Optional)

If you want to import the default styles:

```tsx
import 'puzzle-geocache/styles';
```

### TypeScript Support

The component includes full TypeScript support:

```tsx
import React from 'react';
import { Puzzle, InitialPuzzleOptions } from 'puzzle-geocache';

function App() {
  const options: InitialPuzzleOptions = {
    board: {
      columns: 5,
      rows: 3,
    },
    puzzle: {
      timer: {
        enabled: true,
      },
    },
  };

  return (
    <Puzzle
      image="https://picsum.photos/400/300"
      options={options}
      onComplete={() => console.log('done')}
    />
  );
}
```

## Props

### Global Options

| Prop                | Type                   | Default                   | Description                                          |
| ------------------- | ---------------------- | ------------------------- | ---------------------------------------------------- |
| `image`             | `string`               | **required**              | URL or path to the image for the puzzle              |
| `onComplete`        | `() => void`           | `() => {}`                | Callback when puzzle is completed                    |
| `onRefresh`         | `() => void`           | `() => {}`                | Callback when puzzle is refreshed                    |
| `options`           | `InitialPuzzleOptions` | `DEFAULT_OPTIONS` (below) | Configuration options for the puzzle                 |
| `checkLocalStorage` | `boolean`              | `true`                    | Enable automatic saving of puzzle progress to localStorage |

### DEFUALT OPTIONS

## Board Options

| Option                  | Type      | Default  | Description                                  |
| ----------------------- | --------- | -------- | -------------------------------------------- |
| `className`             | `string`  | `''`     | CSS class for the board                      |
| `columns`               | `number`  | `3`      | Number of columns in the puzzle              |
| `height`                | `number`  | `500`    | Height of the puzzle board                   |
| `outlineStrokeColor`    | `string`  | `'#000'` | Stroke color for board outlines              |
| `rows`                  | `number`  | `4`      | Number of rows in the puzzle                 |
| `scatterArea`           | `number`  | `0`      | Area around board where pieces are scattered |
| `showBoardSlotOutlines` | `boolean` | `true`   | Show outlines of board slots                 |
| `snapThreshold`         | `number`  | `20`     | Distance threshold for snapping pieces       |
| `width`                 | `number`  | `400`    | Width of the puzzle board                    |

## Puzzle Options

| Option                     | Type      | Default | Description                        |
| -------------------------- | --------- | ------- | ---------------------------------- |
| `className`                | `string`  | `''`    | CSS class for the puzzle container |
| `refreshButton.enabled`    | `boolean` | `true`  | Enable refresh button              |
| `refreshButton.className`  | `string`  | `''`    | CSS class for the refresh button   |
| `responsive`               | `boolean` | `true`  | Enable responsive behavior         |
| `rowsAndColumns.enabled`   | `boolean` | `false` | Enable rows/columns controls       |
| `rowsAndColumns.className` | `string`  | `''`    | CSS class for the controls         |
| `timer.enabled`            | `boolean` | `true`  | Enable timer functionality         |
| `timer.className`          | `string`  | `''`    | CSS class for the timer            |

## Puzzle Piece Options

| Option          | Type      | Default  | Description           |
| --------------- | --------- | -------- | --------------------- |
| `strokeColor`   | `string`  | `'gold'` | Color of piece stroke |
| `strokeEnabled` | `boolean` | `true`   | Enable piece stroke   |

## Completion Animation Options

| Option            | Type                                          | Default                | Description                                                     |
| ----------------- | --------------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| `type`            | `'confetti' \| 'fade' \| 'zoom' \| 'none'`    | `'confetti'`           | Type of animation to show when puzzle is completed              |
| `className`       | `string`                                      | `''`                   | CSS class for custom styling of the animation                   |
| `duration`        | `number`                                      | `3000`                 | Duration in milliseconds before auto-hiding (0 = don't hide)    |
| `message`         | `string`                                      | `'Puzzle Complete! 🎉'`| Message to display on completion                                |
| `customComponent` | `React.ComponentType`                         | `undefined`            | Custom React component to render instead of built-in animations |

## Features

- **Drag and Drop**: Smooth drag-and-drop functionality for puzzle pieces
- **Snap to Grid**: Pieces automatically snap to correct positions
- **Keyboard Navigation**: Full keyboard accessibility support
- **Mobile Support**: Full drag and drop across iOS and Android
- **Responsive Design**: Optional responsive behavior
- **Completion Animations**: Beautiful built-in animations (confetti, fade, zoom) when puzzle is completed
- **Customizable**: Extensive customization options
- **Timer**: Optional built-in timer
- **Refresh**: Optional refresh button to restart puzzle
- **Row/Column Controls**: Optional controls to adjust puzzle size
- **Progress Persistence**: Automatic saving of puzzle progress to localStorage (no login required!)
- **🆕 QR Code Unlock**: Reveal pieces individually by scanning unique QR codes - perfect for scavenger hunts, team building, and gamification!

### Progress Persistence

When `checkLocalStorage` is enabled (default: `true`), the puzzle automatically saves progress to the browser's localStorage. This means users can:
- Close the browser and return later to continue their puzzle
- Refresh the page without losing progress
- Progress is tied to the specific image and puzzle configuration
- Completed puzzles automatically clear their saved state
- Old puzzles (30+ days) are automatically cleaned up

**Privacy Note**: All progress is saved locally in the user's browser. No data is sent to any server.

### QR Code Unlock

Enable pieces to appear only when users scan unique QR codes! Perfect for:
- **Scavenger hunts** - Hide QR code cards around a venue
- **Team building** - Distribute pieces among team members
- **Educational activities** - Link pieces to learning tasks  
- **Marketing events** - Hand out cards at conferences

```typescript
import { Puzzle, generatePuzzleQRCodes } from 'puzzle-geocache';

// Enable QR unlock
<Puzzle
  image="/path/to/image.jpg"
  options={{ enableQRUnlock: true }}
  onPieceUnlock={(pieceId) => {
    console.log(`Piece ${pieceId} unlocked!`);
  }}
/>

// Generate QR code URLs for printing
const qrData = generatePuzzleQRCodes('https://yoursite.com/puzzle', 4, 3);
qrData.forEach(piece => {
  console.log(`${piece.displayName}: ${piece.url}`);
});
```

**📖 See [QR_UNLOCK_GUIDE.md](./QR_UNLOCK_GUIDE.md) for complete instructions on generating and printing QR codes!**

### Completion Animations

When users complete the puzzle, celebrate with a beautiful animation! Choose from built-in animations or create your own.

#### Built-in Animation Types

**Confetti** (default) - Colorful confetti falls from the top
```typescript
<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      type: 'confetti',
      message: 'You did it! 🎉',
      duration: 3000, // milliseconds
    }
  }}
/>
```

**Fade** - Message fades in and out smoothly
```typescript
<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      type: 'fade',
      message: 'Puzzle Complete!',
      duration: 2500,
    }
  }}
/>
```

**Zoom** - Message zooms in with a bounce effect
```typescript
<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      type: 'zoom',
      message: 'Well Done! ✨',
    }
  }}
/>
```

**None** - Disable animation
```typescript
<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      type: 'none',
    }
  }}
/>
```

#### Custom Animation Component

Create your own completion animation:

```typescript
import { Puzzle, CompletionAnimation } from 'puzzle-geocache';

const MyCustomAnimation = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
    }}>
      <h1 style={{ color: 'white', fontSize: '4rem' }}>
        You're a puzzle master! 🏆
      </h1>
    </div>
  );
};

<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      customComponent: MyCustomAnimation,
    }
  }}
/>
```

#### Custom Styling

Add your own CSS class for custom styling:

```typescript
<Puzzle
  image="/path/to/image.jpg"
  options={{
    completionAnimation: {
      type: 'confetti',
      className: 'my-custom-animation',
      message: 'Awesome!',
    }
  }}
/>
```

```css
.my-custom-animation {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.my-custom-animation .message {
  font-family: 'Comic Sans MS', cursive;
  color: #ffd700;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Demo & Deployment

**Live Demo**: [https://mayadomi.github.io/puzzle-geocache/](https://mayadomi.github.io/puzzle-geocache/)

Want to deploy your own demo? See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions on deploying to GitHub Pages.

## Local development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local development

1. Clone the repository:

```bash
git clone [repo]
cd puzzle-geocache
```

2. Install dependencies:

```bash
npm install
```

3. Start the demo:

```bash
npm run demo
```

4. Run tests:

```bash
npm test
```

### Building

To build the library:

```bash
npm run build
```

This will create the distribution files in the `dist` directory.
