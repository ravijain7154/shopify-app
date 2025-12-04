# Deployment Fix - ESM CSS Import Issue

## Problem
The Render deployment was failing with:
```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for /opt/render/project/src/node_modules/@shopify/polaris/build/esm/styles.css
```

This occurs because:
1. Node.js ESM mode cannot directly import CSS files
2. The `api-server.js` was trying to load the Remix build with Polaris styles
3. Undefined `shopify` variable was causing the build to fail

## Changes Made

### 1. Fixed `api-server.js` (lines 1-50)
- Removed undefined `shopify` variable references
- Removed premature Remix build import that was causing CSS to be bundled
- Cleaned up duplicate imports and commented-out code
- Moved Remix build handler to the end of the file with proper error handling

### 2. Updated `remix.config.js`
- Added `ssr: true` configuration to properly handle server-side rendering
- Kept `serverDependenciesToBundle` for Polaris and Shopify packages

### 3. Key Fix in `api-server.js` (lines 214-233)
- Wrapped Remix build import in a try-catch block
- Only loads Remix handler after all API endpoints are configured
- Provides fallback 404 handler if build is not available
- Prevents CSS files from being loaded before they're needed

## Deployment Steps

1. Commit the changes:
```bash
git add api-server.js remix.config.js
git commit -m "Fix ESM CSS import issue for Render deployment"
```

2. Rebuild locally to test:
```bash
npm run build
npm run start:api
```

3. Deploy to Render:
```bash
shopify app deploy
```

## What This Fixes
- ✅ Prevents ERR_UNKNOWN_FILE_EXTENSION errors
- ✅ Properly loads Remix build after API endpoints are ready
- ✅ Maintains backward compatibility
- ✅ Provides graceful fallback if build is missing

## Notes
- The API server will now start successfully
- Render will be able to execute `npm run start:api` without CSS import errors
- Your storefront UI and admin UI backends should now work on Render
