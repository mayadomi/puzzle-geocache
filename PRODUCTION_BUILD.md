# Production Build Guide

This guide explains how to build and deploy both demo and production versions of the puzzle geocache.

## Two Versions Available

### 1. Demo Version (Default)
- Shows all puzzle props controls
- Allows users to modify configuration in real-time
- Shows GitHub link
- Good for showcasing features and testing

### 2. Production Version
- **Fixed configuration** - Users cannot change settings
- **QR Unlock enabled by default**
- No prop controls visible
- Clean, focused user experience
- Perfect for actual geocache deployments

## Production Configuration

The production version uses these locked settings (defined in `demo/src/index.tsx`):

```typescript
{
  enableQRUnlock: true,           // QR code unlocking enabled
  checkLocalStorage: true,        // Save progress
  board: {
    columns: 4,
    rows: 3,
    width: 800,
    height: 600,
    snapThreshold: 25,
    scatterArea: 250,
    showBoardSlotOutlines: false,
  },
  puzzle: {
    refreshButton: { enabled: false },
    timer: { enabled: true },
    rowsAndColumns: { enabled: false },
    responsive: true,
  },
  completionAnimation: {
    type: 'confetti',
    duration: 3000,
    message: 'Congratulations! You found all the pieces!',
  },
}
```

**To customize:** Edit the `PRODUCTION_OPTIONS` object in `demo/src/index.tsx`

## Building Locally

### Build Demo Version
```bash
cd demo
npm run build
```

### Build Production Version
```bash
cd demo
npm run build:production
```

### Preview Locally
```bash
# Preview demo version
cd demo
npm run build
npm run preview

# Preview production version
cd demo
npm run preview:production
```

Then visit `http://localhost:4173/puzzle-geocache/`

## Deploying to GitHub Pages

### Current Setup (Production)

The GitHub workflow (`.github/workflows/gh-pages.yml`) is currently configured to deploy the **production version** automatically.

When you push to `main`:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

It will automatically deploy the production version to:
**https://mayadomi.github.io/puzzle-geocache/**

### Switching to Demo Version

To deploy the demo version instead:

1. Edit `.github/workflows/gh-pages.yml`
2. Change this line:
   ```yaml
   - name: Build demo (production mode)
     run: npm run build:production
   ```
   
   To:
   ```yaml
   - name: Build demo
     run: npm run build
   ```

3. Remove the `env` section:
   ```yaml
   env:
     VITE_PRODUCTION_MODE: 'true'
   ```

### Manual Deploy with gh-pages

You can also deploy manually:

```bash
# Deploy demo version
cd demo
npm run deploy

# Deploy production version
cd demo
npm run deploy:production
```

## Customizing the Production Version

### Change the Image

1. Add your image to `demo/src/assets/`
2. Update `demo/src/index.tsx`:
   ```typescript
   import myImage from './assets/my-image.jpg';
   
   // In the App component:
   const [imageSource, setImageSource] = useState(myImage);
   ```

### Change the Configuration

Edit the `PRODUCTION_OPTIONS` object in `demo/src/index.tsx`:

```typescript
const PRODUCTION_OPTIONS: PuzzleOptions = {
  enableQRUnlock: true,  // Keep this true for geocaching!
  board: {
    columns: 5,          // Change puzzle difficulty
    rows: 4,
    // ... other settings
  },
  completionAnimation: {
    message: 'You found it! 🎉',  // Custom success message
  },
};
```

### Change Number of Pieces

To create more/fewer puzzle pieces:

```typescript
board: {
  columns: 6,  // More columns = more pieces
  rows: 4,     // More rows = more pieces
  // Total pieces = columns × rows (6 × 4 = 24 pieces)
}
```

## Testing QR Unlock Feature

The production version has `enableQRUnlock: true`, which means:

1. Puzzle pieces start locked (greyed out)
2. Users must scan QR codes to unlock pieces
3. Once unlocked, pieces can be moved

### Generate QR Codes

See the [QR_UNLOCK_GUIDE.md](./QR_UNLOCK_GUIDE.md) for instructions on generating QR codes for your puzzle.

Quick example:
```typescript
import { generatePuzzleQRCodes } from 'puzzle-geocache/utils/generate-qr-codes';

const qrData = generatePuzzleQRCodes(
  'https://mayadomi.github.io/puzzle-geocache/',
  3,  // rows
  4   // columns
);

// Print QR codes or save to CSV
console.log(qrData);
```

## Environment Variables

The build uses the `VITE_PRODUCTION_MODE` environment variable:

- `VITE_PRODUCTION_MODE=true` → Production version (locked config)
- No variable or `false` → Demo version (editable props)

## Troubleshooting

### "Changes not showing up"

Make sure to:
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Check you're building the correct version
3. Verify the GitHub Action completed successfully

### "QR unlock not working"

1. Check that `enableQRUnlock: true` in production config
2. Verify QR codes are generated with correct base URL
3. Check browser console for errors

### "Props still showing in production"

1. Verify environment variable is set: `VITE_PRODUCTION_MODE=true`
2. Rebuild: `npm run build:production`
3. Check the build output in `demo/dist/`

## Next Steps

1. **Customize** the production configuration
2. **Build** the production version locally to test
3. **Commit** your changes
4. **Push** to deploy automatically via GitHub Actions
5. **Generate** QR codes for your puzzle pieces
6. **Hide** QR codes in physical locations for geocaching!

For more information:
- [Deployment Guide](./DEPLOYMENT.md)
- [QR Unlock Guide](./QR_UNLOCK_GUIDE.md)
- [Main README](./README.md)

