# Git Push Instructions

## Quick Start (Copy & Paste These Commands)

### 1. First Time Setup (if repo not on GitHub yet)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Shopify diamond app setup with sync feature and Shopify compliance"

# Add remote (replace USERNAME and REPO with your details)
git remote add origin https://github.com/YOUR_USERNAME/shopify-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 2. Subsequent Pushes (Regular workflow)

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with meaningful message
git commit -m "Update app: [describe your changes]"

# Push to GitHub
git push
```

---

## Suggested Git Commit Message for This Session

```bash
git commit -m "Production ready: Add on-demand sync feature, fix API paths, update Shopify config

- Added Sync button UI with loading state and result feedback
- Created /api/sync endpoint for on-demand diamond data fetching
- Extracted diamond sync logic to shared utility (syncDiamonds.server.js)
- Fixed import paths in sync route (../../ relative imports)
- Added webhook topic normalization for multiple formats
- Updated API version to 2024-07 for webhook consistency
- Updated shopify.app.toml with production URLs and proper scopes
- Added DEPLOYMENT.md and DEPLOYMENT_CHECKLIST.md guides
- App is now ready for production deployment to Render.com"
```

---

## Verify Before Pushing

```bash
# Check for uncommitted changes
git status

# See what will be pushed
git log origin/main..HEAD

# Verify .env is NOT being tracked
git ls-files | grep -i ".env"  # Should be empty

# Verify build/ is NOT being tracked  
git ls-files | grep "^build/"  # Should be empty

# List all files that will be pushed
git ls-files
```

---

## After Push: Verify on GitHub

1. Go to: https://github.com/YOUR_USERNAME/shopify-app
2. Check:
   - ✅ Files are all visible
   - ✅ No `.env` file in repo
   - ✅ No `/build` directory
   - ✅ `.gitignore` is applied
   - ✅ Recent commit message visible
   - ✅ Correct branch (main)

---

## Troubleshooting

### Problem: "Permission denied (publickey)"

```bash
# Solution: Set up SSH or use HTTPS with token
# HTTPS method:
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/shopify-app.git

# Then push
git push
```

### Problem: "remote: Please make a pull request instead"

```bash
# Solution: Push to a new branch first
git push -u origin feature/my-changes

# Then create pull request on GitHub
```

### Problem: ".env file would be committed"

```bash
# Solution: Remove from staging
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

---

## Final Push Command (Copy This!)

```powershell
# Run these in PowerShell from D:\shopify-app

git add .
git commit -m "Production ready: Add sync feature, fix imports, Shopify compliant"
git push -u origin main
```

**Then visit:** `https://github.com/YOUR_USERNAME/shopify-app` to verify!

---

Ready? Execute:
```bash
git push origin main
```
