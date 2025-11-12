# Deploying to GitHub Pages

This guide covers deploying the Puzzle Geocache demo to GitHub Pages.

## Quick Start

The project is configured to automatically deploy to GitHub Pages when you push to the main branch.

## Automatic Deployment (Recommended)

### One-Time Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **That's it!** The GitHub Action will automatically:
   - Build the demo
   - Deploy to GitHub Pages
   - Make it available at: `https://mayadomi.github.io/puzzle-geocache/`

### Manual Trigger

You can also manually trigger a deployment:
- Go to the **Actions** tab in your GitHub repository
- Click on **Deploy to GitHub Pages** workflow
- Click **Run workflow** button
- Select the branch and click **Run workflow**

## Manual Deployment (Alternative)

If you prefer to deploy manually from your local machine:

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd demo && npm install
   ```

2. **Build and deploy:**
   ```bash
   cd demo
   npm run deploy
   ```

This will build the demo and push it to the `gh-pages` branch.

### First Time Manual Deploy

If deploying manually for the first time:

1. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select the **gh-pages** branch
   - Click **Save**

2. **Deploy:**
   ```bash
   cd demo
   npm run deploy
   ```

## Configuration

The base path is already configured in `demo/vite.config.ts`:

```typescript
export default defineConfig({
  base: '/puzzle-geocache/',  // Must match your repo name
  // ...
});
```

If your repository name is different, update this to match.

## Verifying Deployment

After deployment:
1. Go to your repository's **Actions** tab to see the deployment status
2. Once complete, visit: `https://mayadomi.github.io/puzzle-geocache/`
3. The demo should load with all features working

## Troubleshooting

### 404 Error
- Verify the `base` path in `demo/vite.config.ts` matches your repo name
- Check GitHub Pages is enabled in Settings → Pages
- Ensure the deployment completed successfully in the Actions tab

### Assets Not Loading
- Confirm the `base` path is set correctly
- Check browser console for path errors
- Verify all assets are in the `demo/dist` folder after build

### Deployment Failed
- Check the Actions tab for error logs
- Ensure GitHub Actions has write permissions
- Verify `package.json` and `package-lock.json` are committed

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `demo/public/` with your domain:
   ```
   demo.yourdomain.com
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `mayadomi.github.io`

3. In GitHub Settings → Pages, add your custom domain

## Local Preview

To preview the built demo locally:

```bash
cd demo
npm run build
npm run preview
```

This will serve the production build at `http://localhost:4173/puzzle-geocache/`

