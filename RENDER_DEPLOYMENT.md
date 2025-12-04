# Render Deployment Guide

This guide explains how to deploy the Shopify app with separate API and Admin UI services on Render.

## Architecture

The app is split into two independent services on Render:

1. **API Server** (`api-server.js`)
   - Handles: `/api/*`, `/diamond-filter`, `/health`
   - Port: 10000 (or environment PORT)
   - Run command: `npm run start:api`

2. **Admin UI Server** (Remix)
   - Handles: Admin dashboard routes (`/app/*`, `/auth/*`)
   - Port: 3000
   - Run command: `npm run start` (uses `remix-serve ./build/index.js`)

## Why Split Services?

The admin UI uses the Shopify Polaris library which includes CSS files. Node.js in ESM mode cannot directly import `.css` files, causing errors if we try to load the Remix build in the same process as the API server.

By splitting them:
- ✅ API server stays lightweight and fast
- ✅ Admin UI gets proper CSS handling
- ✅ Independent scaling and restarts
- ✅ Cleaner separation of concerns

## Render Setup Instructions

### Step 1: Create Two Services on Render

#### Service 1: API Server

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +"  → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `shopify-app-api` (or similar)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start:api`
   - **Plan**: Free or Starter (based on needs)

5. Add Environment Variables (in Render settings):
   - `SHOPIFY_API_KEY` → Your Shopify API key
   - `SHOPIFY_API_SECRET` → Your Shopify API secret
   - `SHOPIFY_APP_URL` → Your admin UI service URL (e.g., `https://shopify-app-ui.onrender.com`)
   - `SCOPES` → Your Shopify scopes
   - `DATABASE_URL` → Your Prisma database URL
   - `ALLOWED_ORIGINS` → Comma-separated list of allowed origins

6. Deploy

#### Service 2: Admin UI Server

1. Click "New +"  → "Web Service"
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `shopify-app-ui` (or similar)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: Free or Starter

4. Add the **same environment variables** as the API service

5. Deploy

### Step 2: Update Your Shopify App Configuration

In your Shopify app admin:

1. Set the **API endpoint** to: `https://shopify-app-api.onrender.com/api`
2. Set the **Admin URL** to: `https://shopify-app-ui.onrender.com`

### Step 3: Update Render.yaml (Optional but Recommended)

Create or update `render.yaml` in your repo root:

```yaml
services:
  - type: web
    name: shopify-app-api
    env: node
    buildCommand: npm run build
    startCommand: npm run start:api
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: SHOPIFY_API_KEY
        sync: false
      - key: SHOPIFY_API_SECRET
        sync: false

  - type: web
    name: shopify-app-ui
    env: node
    buildCommand: npm run build
    startCommand: npm run start
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: SHOPIFY_API_KEY
        sync: false
      - key: SHOPIFY_API_SECRET
        sync: false
```

## Testing Locally

### Test API Server:
```bash
npm run build
npm run start:api
# Visit http://localhost:3000/health
```

### Test Admin UI Server:
```bash
npm run build
npm run start
# Visit http://localhost:3000 (admin routes)
```

## Troubleshooting

### "Not Found" response
- Check that you're hitting the correct service URL
- API endpoints should be: `https://api-service-url/api/products` etc.
- Admin UI should be at: `https://ui-service-url/app` etc.

### CSS errors on Render
- This has been fixed! The services are now separated so CSS isn't an issue

### Database connection errors
- Ensure `DATABASE_URL` environment variable is set in both services
- Check that your database is accessible from Render's network

###Environment variables not working
- Add them in Render dashboard, not in a `.env` file
- `.env` files are git-ignored and won't deploy

## Logs and Debugging

Monitor logs in Render dashboard:
1. Go to the service
2. Click "Logs" tab
3. Look for error messages

The API server logs requests like:
```
[2025-12-05T20:12:10.422Z] GET /api/products - Origin: https://shopify-app-ui.onrender.com
```

## Cost Considerations

- **Free tier**: Each service can be free ($0/month) but will spin down after 15 minutes of inactivity
- **Paid tier**: $7/month per service for always-on hosting
- **Database**: Costs depend on your database provider

For development/testing, free tier is sufficient. For production, consider upgrading at least one service to always-on.
