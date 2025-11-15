# Shopify Diamond Filter App - Deployment Guide

## App Overview
- **Type:** Shopify Embedded App (Remix + Express.js)
- **Database:** PostgreSQL (Prisma ORM)
- **Features:** 
  - Diamond product filtering
  - Admin data sync from belgiumdia.com API
  - Color customization for store themes
  - Webhook support for app uninstall events

---

## Quick Deployment to Render.com (FREE)

### Prerequisites
- GitHub account with your code pushed
- Render.com account (https://render.com)
- Shopify Partner Dashboard access

### Step 1: Push to GitHub

```bash
# From project root
git add .
git commit -m "Prepare app for production deployment"
git push origin main
```

### Step 2: Create Render Service

1. Go to https://render.com/dashboard
2. Click **New +** → **Web Service**
3. Select your `shopify-app` GitHub repository
4. Configure:
   - **Name:** `shopify-app` (or your preferred name)
   - **Region:** Select closest to your users
   - **Branch:** `main`
   - **Build Command:**
   ```
   npm install && npm run setup && npm run build
   ```
   - **Start Command:**
   ```
   npm start
   ```
   - **Instance Type:** Free

### Step 3: Add PostgreSQL Database

1. In Render Dashboard, click **New +** → **PostgreSQL**
2. Configure:
   - **Name:** `shopify-app-db`
   - **Region:** Same as web service
   - **Database:** `postgres`
   - **User:** `postgres` (default)
3. Create database
4. Copy the internal database URL (you'll need this)

### Step 4: Add Environment Variables to Web Service

In Render Dashboard → Web Service → Environment:

```
# Shopify Configuration
SHOPIFY_API_KEY=8e6c56fe2f8e5b066c837a301d311caa
SHOPIFY_API_SECRET=<your-api-secret-from-shopify-partner-dashboard>
SHOPIFY_APP_URL=https://<your-render-url>.onrender.com
PORT=3000

# Database (from PostgreSQL service)
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/postgres
DIRECT_URL=postgresql://<user>:<password>@<host>:5432/postgres

# Optional
ALLOWED_ORIGINS=https://<your-render-url>.onrender.com,https://quickstart-fad8588b.myshopify.com
NODE_ENV=production
```

### Step 5: Deploy

1. Click **Deploy** on your web service
2. Wait 5-10 minutes for build and deployment
3. Get your live URL from Render Dashboard (e.g., `https://shopify-app-pndl.onrender.com`)

### Step 6: Update Shopify Configuration

#### In Shopify Partner Dashboard:
1. Go to Apps → Your App → Configuration
2. Update **App URL:**
   - Old: `https://electricity-qualities-corn-makers.trycloudflare.com`
   - New: `https://<your-render-url>.onrender.com`

3. Update **Allowed redirect URIs:**
   ```
   https://<your-render-url>.onrender.com/auth/callback
   https://<your-render-url>.onrender.com/auth/shopify/callback
   https://<your-render-url>.onrender.com/api/auth/callback
   ```

4. Update **Webhook URI:**
   ```
   https://<your-render-url>.onrender.com/webhooks
   ```

#### In Local `.env` (for testing):
```
SHOPIFY_APP_URL=https://<your-render-url>.onrender.com
```

#### In `shopify.app.toml`:
```toml
application_url = "https://<your-render-url>.onrender.com"

[auth]
redirect_urls = [
  "https://<your-render-url>.onrender.com/auth/callback",
  "https://<your-render-url>.onrender.com/auth/shopify/callback",
  "https://<your-render-url>.onrender.com/api/auth/callback"
]

[[webhooks.subscriptions]]
uri = "https://<your-render-url>.onrender.com/webhooks"
```

### Step 7: Reinstall App on Dev Store

1. Go to Shopify Partner Dashboard → Development stores
2. Click **Apps and sales channels** → **App and channel settings**
3. Uninstall the old version of your app
4. Visit: `https://quickstart-fad8588b.myshopify.com/admin/oauth/redirect_from_cli?client_id=8e6c56fe2f8e5b066c837a301d311caa`
5. Click **Install app**
6. Grant permissions and complete OAuth flow

---

## Alternative Deployment Options

### Railway.app
- **Free Tier:** $5 credit/month
- **Includes:** PostgreSQL database
- **Setup:** Similar to Render, connect GitHub repo
- **URL:** https://railway.app

### Vercel
- **Free Tier:** Generous limits
- **Best for:** Remix framework
- **Note:** May need serverless optimization for Express APIs
- **URL:** https://vercel.com

---

## Post-Deployment Verification

After deployment, test these endpoints:

```bash
# Verify app loads
curl https://<your-render-url>.onrender.com/app

# Test sync endpoint (requires auth)
curl -X POST https://<your-render-url>.onrender.com/api/sync \
  -H "Authorization: Bearer <admin-token>"

# Test products API
curl https://<your-render-url>.onrender.com/api/products?page=1&perPage=10

# Test color endpoint
curl https://<your-render-url>.onrender.com/api/get-color
```

---

## Monitoring & Troubleshooting

### Check Logs
**Render Dashboard:**
- Go to Web Service → Logs
- Look for errors during app load

### Database Connection Issues
If you see `ECONNREFUSED` errors:
1. Verify `DATABASE_URL` and `DIRECT_URL` are set correctly
2. Ensure PostgreSQL service is running
3. Run: `npx prisma migrate deploy` in Render deploy logs

### App Won't Start
1. Check Node version: `node --version` (should be ^18.20 or higher)
2. Verify `npm run build` completes: `npm run build`
3. Check `package.json` scripts exist

### Webhooks Not Working
1. Verify webhook URI is accessible from public internet
2. Check app logs for incoming webhook requests
3. Ensure `app/routes/webhooks.jsx` has correct topic names

---

## Security Checklist

- ✅ `.env` file in `.gitignore` (secrets not committed)
- ✅ API keys stored in Render environment variables
- ✅ Database credentials in environment variables only
- ✅ HTTPS enforced for all URLs
- ✅ CORS configured for Shopify domain
- ✅ Webhooks validate Shopify signature (via `authenticate.webhook`)
- ✅ Session storage uses Prisma (encrypted in database)

---

## Database Migrations

On first deployment, Render automatically runs:
```bash
npm run setup
```

Which executes:
```bash
npx prisma generate && npx prisma migrate deploy
```

For future schema changes:
1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name describe_change`
3. Commit and push to GitHub
4. Render automatically runs migrations on deploy

---

## Keeping App Awake (Free Tier)

Render free tier services sleep after 15 minutes of inactivity. To prevent sleep:

Option A: Use monitoring service
- https://uptimerobot.com (free tier)
- Configure: `https://<your-render-url>.onrender.com/app` every 10 minutes

Option B: Upgrade to paid instance
- Render paid tier starts at $7/month
- No sleep, dedicated resources

---

## Environment Variables Reference

| Variable | Required | Example |
|----------|----------|---------|
| `SHOPIFY_API_KEY` | Yes | `8e6c56fe2f8e5b066c837a301d311caa` |
| `SHOPIFY_API_SECRET` | Yes | From Shopify Partner Dashboard |
| `SHOPIFY_APP_URL` | Yes | `https://shopify-app-pndl.onrender.com` |
| `DATABASE_URL` | Yes | `postgresql://user:pass@host:5432/db` |
| `DIRECT_URL` | Yes | Same as DATABASE_URL |
| `PORT` | No | `3000` (default) |
| `NODE_ENV` | No | `production` |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |

---

## Need Help?

- **Render Docs:** https://render.com/docs
- **Shopify CLI Docs:** https://shopify.dev/docs/apps/tools/cli
- **Prisma Docs:** https://www.prisma.io/docs/
- **Remix Docs:** https://remix.run/docs

---

**Last Updated:** November 16, 2025
