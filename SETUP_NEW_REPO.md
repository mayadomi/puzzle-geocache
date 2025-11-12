# Setting Up Your Own Repository

Follow these steps to push this project to your own GitHub account and deploy it.

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon (top right) → **New repository**
3. Enter a repository name (e.g., `puzzle_react` or `puzzle-geocache`)
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

## Step 2: Update Repository Configuration

### Update package.json

Edit `package.json` and update the repository URL:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git"
}
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual values.

### Update Vite Base Path (if repo name is different)

If your repository name is **not** `puzzle-geocache`, update `demo/vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // Must match your repository name exactly
  // ...
});
```

## Step 3: Update Git Remote

Open your terminal in the project directory and run:

```bash
# Remove the existing remote (if any)
git remote remove origin

# Add your new repository as the remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify it's set correctly
git remote -v
```

## Step 4: Push to Your Repository

```bash
# Make sure you're on the main branch
git branch

# If not on main, switch to it (or create it)
git checkout -b main

# Add all files
git add .

# Commit (if you have uncommitted changes)
git commit -m "Initial commit to my repository"

# Push to your repository
git push -u origin main
```

### If You Encounter Authentication Issues

**HTTPS (Recommended):**
- You may be prompted for credentials
- Use a [Personal Access Token](https://github.com/settings/tokens) instead of your password
- Generate a token with `repo` scope
- Use the token as your password when prompted

**SSH (Alternative):**
```bash
# Use SSH URL instead
git remote set-url origin git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git
```

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

## Step 6: Deploy! 🚀

The deployment will happen automatically:

1. The GitHub Action will trigger on your push
2. Go to the **Actions** tab to watch the progress
3. Once complete (1-2 minutes), your demo will be live at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

## Example

If your username is `janedoe` and repository is `puzzle_react`:

**Repository URL:**
```
https://github.com/janedoe/puzzle_react
```

**Update in package.json:**
```json
"repository": {
  "type": "git",
  "url": "https://github.com/janedoe/puzzle_react.git"
}
```

**Update in demo/vite.config.ts:**
```typescript
base: '/puzzle_react/',
```

**Commands:**
```bash
git remote remove origin
git remote add origin https://github.com/janedoe/puzzle_react.git
git push -u origin main
```

**Live demo will be at:**
```
https://janedoe.github.io/puzzle_react/
```

## Troubleshooting

### "Repository not found" error
- Verify you created the repository on GitHub
- Check the URL is correct (including username and repo name)
- Ensure you have permissions to push to the repository

### Push rejected
```bash
# If the remote has changes you don't have locally
git pull origin main --rebase
git push -u origin main
```

### 404 Error after deployment
- Verify the `base` path in `demo/vite.config.ts` matches your repository name exactly
- Check that GitHub Pages is enabled in Settings → Pages
- Wait a few minutes - it can take time for DNS to propagate

### Workflow permission errors
- Go to Settings → Actions → General
- Under "Workflow permissions", select "Read and write permissions"
- Click Save

## Quick Reference

```bash
# 1. Create repo on GitHub (via website)

# 2. Update remote
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 3. Push
git push -u origin main

# 4. Enable Pages in Settings → Pages → GitHub Actions

# 5. Done! Visit https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Next Steps

After your demo is live:
- Test all features on the deployed site
- Share your demo URL!
- Make changes and push - auto-deploys on every commit
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for advanced options

