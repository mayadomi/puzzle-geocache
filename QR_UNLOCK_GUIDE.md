# QR Code Unlock Feature Guide

## Overview

The QR Code unlock feature allows puzzle pieces to appear only when a user scans a unique QR code. Each piece has its own QR code that can be printed on physical cards and distributed to users.

## How It Works

1. **Print QR codes** on physical cards (one per puzzle piece)
2. **Distribute cards** to users
3. When a user **scans a QR code**, they're taken to your puzzle URL with an unlock parameter
4. That specific **piece appears** with an unlock animation!
5. Users can then **drag and place** the unlocked piece
6. Progress is **automatically saved** in localStorage

## Enabling QR Unlock

### In Your Code

```typescript
import { Puzzle } from 'puzzle-geocache';

function App() {
  return (
    <Puzzle
      image="/path/to/image.jpg"
      options={{
        enableQRUnlock: true,  // Enable QR unlock feature
        checkLocalStorage: true  // Save unlocked pieces
      }}
      onPieceUnlock={(pieceId) => {
        console.log(`Piece ${pieceId} was unlocked!`);
        // Track analytics, show notification, etc.
      }}
    />
  );
}
```

### In the Demo

1. Open the puzzle demo
2. Click "Update puzzle props"
3. Enable `enableQRUnlock: true`
4. Click "Apply changes"
5. Now only pieces unlocked via QR codes will appear!

## Generating QR Codes

### Step 1: Generate URLs

Use the utility function to generate URLs for all pieces:

```typescript
import { generatePuzzleQRCodes, exportQRCodesAsCSV } from 'puzzle-geocache/utils/generate-qr-codes';

// Generate QR code data for a 4x3 puzzle
const qrData = generatePuzzleQRCodes(
  'https://yoursite.com/puzzle',  // Your puzzle URL
  4,  // rows
  3   // columns
);

// Export as CSV for easy processing
const csv = exportQRCodesAsCSV(qrData);
console.log(csv);

// Or access individual pieces
qrData.forEach(piece => {
  console.log(`${piece.displayName}: ${piece.url}`);
});
```

**Output example:**
```
Piece 1 (0-0): https://yoursite.com/puzzle?unlock=0-0
Piece 2 (0-1): https://yoursite.com/puzzle?unlock=0-1
Piece 3 (0-2): https://yoursite.com/puzzle?unlock=0-2
...
```

### Step 2: Create QR Codes

Choose one of these methods:

#### Option A: Online QR Generator (Easiest)

1. Go to [qr-code-generator.com](https://www.qr-code-generator.com/) or [qrcode-monkey.com](https://www.qrcode-monkey.com/)
2. Paste each URL
3. Download the QR code image
4. Repeat for all pieces

#### Option B: Bulk Generation with Script

Create a Node.js script:

```bash
npm install qrcode
```

```javascript
// generate-qr-images.js
const QRCode = require('qrcode');
const fs = require('fs');
const { generatePuzzleQRCodes } = require('./src/utils/generate-qr-codes');

const qrData = generatePuzzleQRCodes('https://yoursite.com/puzzle', 4, 3);

// Create output directory
if (!fs.existsSync('./qr-codes')) {
  fs.mkdirSync('./qr-codes');
}

// Generate QR code for each piece
qrData.forEach(async (piece) => {
  const filename = `./qr-codes/${piece.pieceId}.png`;
  await QRCode.toFile(filename, piece.url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  console.log(`Generated ${filename}`);
});
```

Run: `node generate-qr-images.js`

### Step 3: Print Cards

1. **Design your cards** (in Canva, Figma, or any design tool):
   - Include the QR code
   - Add piece number/name
   - Optional: Add hints or puzzle info
   
2. **Recommended card size**: 3.5" x 2" (standard business card)

3. **Print on cardstock** for durability

4. **Example card layout:**
```
┌────────────────────┐
│   PUZZLE PIECE 1   │
│                    │
│    [QR CODE]       │
│                    │
│  Scan to unlock!   │
└────────────────────┘
```

## Testing Locally

### Test with URL Parameters

Before printing cards, test by visiting URLs directly:

```
http://localhost:5173/?unlock=0-0  # Unlock piece at row 0, col 0
http://localhost:5173/?unlock=1-2  # Unlock piece at row 1, col 2
```

### Test All Pieces Quickly

Create a test page with buttons:

```typescript
function TestUnlockButtons() {
  const rows = 4, cols = 3;
  const buttons = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const pieceId = `${row}-${col}`;
      buttons.push(
        <button 
          key={pieceId}
          onClick={() => {
            window.location.href = `/?unlock=${pieceId}`;
          }}
        >
          Unlock {pieceId}
        </button>
      );
    }
  }
  
  return <div>{buttons}</div>;
}
```

## Piece ID Format

Pieces are identified by `row-column` format:

- `0-0` = Top-left piece
- `0-2` = Top-right piece (in a 3-column puzzle)
- `3-0` = Bottom-left piece (in a 4-row puzzle)
- `3-2` = Bottom-right piece (4 rows, 3 columns)

## Advanced Features

### Track Unlock Analytics

```typescript
<Puzzle
  options={{ enableQRUnlock: true }}
  onPieceUnlock={(pieceId) => {
    // Send to analytics
    analytics.track('Piece Unlocked', { pieceId });
    
    // Show toast notification
    toast.success(`Piece ${pieceId} unlocked!`);
    
    // Update progress bar
    updateProgress();
  }}
/>
```

### Admin/Debug Mode

Add an "Unlock All" button for testing:

```typescript
// In your puzzle component
const unlockAllPieces = () => {
  const rows = 4, cols = 3;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      window.location.href += `?unlock=${row}-${col}`;
    }
  }
};
```

### Custom Unlock Flow

```typescript
<Puzzle
  options={{ enableQRUnlock: true }}
  onPieceUnlock={(pieceId) => {
    // Custom unlock logic
    if (pieceId === '3-2') {
      showSpecialMessage('You found the final piece!');
    }
  }}
/>
```

## Troubleshooting

### Pieces don't appear after scanning

1. Check that `enableQRUnlock` is `true`
2. Verify the URL parameter format: `?unlock=row-column`
3. Check browser console for errors
4. Ensure localStorage is enabled

### QR code doesn't scan

1. Make sure QR code is large enough (min 1" x 1")
2. Ensure good contrast (black on white)
3. Test with multiple QR reader apps
4. Try increasing QR code margin

### Pieces reset after refresh

1. Enable `checkLocalStorage: true`
2. Check browser localStorage permissions
3. Clear localStorage and try again

## Use Cases

- **Scavenger hunts**: Hide cards around a venue
- **Educational**: Link pieces to learning activities
- **Team building**: Distribute pieces among team members
- **Marketing**: Hand out cards at events
- **Gamification**: Unlock pieces by completing challenges

## Example Implementation

See the demo folder for a complete example:
```bash
cd demo
npm install
npm run dev
```

Then enable QR unlock in the UI and test with URL parameters.

## Questions?

Check the main README or open an issue on GitHub!


