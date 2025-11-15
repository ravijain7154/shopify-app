# Shopify Diamond Filter App

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node](https://img.shields.io/badge/Node-18%2B-blue)
![License](https://img.shields.io/badge/License-ISC-blue)

A powerful Shopify embedded app built with **Remix** for filtering and managing diamond products with real-time sync capabilities.

## 🎯 Features

- **Shopify OAuth Integration** - Secure admin authentication
- **Diamond Data Sync** - Fetch and sync diamond inventory from belgiumdia.com API
- **On-Demand Sync Button** - Manual trigger for database updates with real-time feedback
- **Product Filtering** - Advanced filter by shape, price, carat, color, clarity, and cut
- **Admin Dashboard** - Manage product data and customization
- **Webhook Support** - Handle app uninstall events
- **Theme Customization** - Dynamic color settings for store themes
- **RESTful APIs** - Open endpoints for external integrations

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v18.20+ or v20.10+ ([Download](https://nodejs.org/))
- **PostgreSQL** (local dev) or cloud database (Supabase/Render)
- **Shopify Partner Account** ([Create one](https://partners.shopify.com/signup))
- **Development Store** ([Create here](https://help.shopify.com/en/partners/dashboard/development-stores))
- **Git** for version control

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Setup Environment

Create a `.env` file in the root directory:

```env
# Shopify Configuration
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-url.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_URL=postgresql://user:password@host:5432/database

# Optional
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://your-store.myshopify.com
```

### 3. Database Setup

```bash
npm run setup
# This runs: prisma generate && prisma migrate deploy
```

### 4. Start Development Server

```bash
npm run dev
```

The Shopify CLI will:
- Start the Remix dev server
- Create a tunneling URL
- Load your app into the dev store
- Watch for file changes

---

## 📁 Project Structure

```
shopify-app/
├── app/
│   ├── routes/
│   │   ├── app.jsx              # Admin home page
│   │   ├── app.additional.jsx   # Additional features
│   │   ├── auth.$.jsx           # OAuth flow
│   │   ├── webhooks.jsx         # App uninstall webhook
│   │   ├── _index/              # Root page
│   │   └── api/
│   │       ├── sync.jsx         # Diamond sync endpoint
│   │       └── products.js      # Product filtering API
│   ├── root.jsx                 # Root layout + Sync button UI
│   ├── shopify.server.js        # Shopify app configuration
│   ├── db.server.js             # Prisma database client
│   ├── utils/
│   │   └── syncDiamonds.server.js # Diamond fetch & sync logic
│   └── entry.server.jsx         # Server entry point
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Migration history
├── public/                      # Static files (CSS, JS, images)
├── build/                       # Production build (generated)
├── package.json
├── shopify.app.toml            # Shopify app config
├── remix.config.mjs            # Remix configuration
├── vite.config.js              # Vite bundler config
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md
```

---

## 🔧 Key Commands

```bash
# Development
npm run dev                  # Start dev server with Shopify CLI
npm run build              # Build for production
npm start                  # Start production server

# Database
npm run setup              # Generate Prisma + run migrations
npx prisma migrate dev     # Create new database migration
npx prisma studio         # Open visual database editor

# Linting
npm run lint               # Check code quality
npm run lint --fix         # Auto-fix linting issues

# Deployment
npm run deploy             # Deploy via Shopify CLI
npm run vercel-build       # Vercel-specific build
```

---

## 🔄 Data Sync Feature

### Sync Button in Admin

The admin dashboard includes a **"Sync Diamonds"** button that:
1. Fetches latest diamond data from belgiumdia.com API
2. Updates the database with new/modified records
3. Shows real-time sync progress
4. Displays success or error messages

### API Endpoint

**POST** `/api/sync`

- **Authentication:** Requires Shopify admin token
- **Response:** JSON with inserted/updated counts
- **Usage:** Called by UI button or external systems

```bash
curl -X POST https://your-app.com/api/sync \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json"
```

---

## 📊 API Endpoints

### Products Filter
**GET** `/api/products`

Query Parameters:
- `page` - Page number (default: 1)
- `perPage` - Items per page (default: 25)
- `Shape` - Diamond shape (comma-separated)
- `price_min`, `price_max` - Price range
- `carat_min`, `carat_max` - Weight range
- `color_min`, `color_max` - Color range
- `clarity_min`, `clarity_max` - Clarity range
- `cut_min`, `cut_max` - Cut grade range

Example:
```bash
GET /api/products?page=1&perPage=10&Shape=Round,Cushion&price_min=1000&price_max=5000
```

### Color Management
**GET** `/api/get-color` - Retrieve current theme color
**POST** `/api/save-color` - Update theme color

---

## 🗄️ Database Schema

### Tables
- `Session` - OAuth session storage
- `Diamond` - Diamond product inventory
- `ColorSetting` - Theme color preferences

[View full schema](prisma/schema.prisma)

---

## 🚢 Deployment

### Recommended: Render.com (FREE)

Render offers a generous free tier perfect for Shopify apps:
- ✅ Free PostgreSQL database included
- ✅ Auto-deploy from GitHub
- ✅ Automatic SSL certificates
- ✅ 750 free compute hours/month

**See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step guide.**

### Quick Render Deploy:

1. Push code to GitHub
2. Create Render account
3. Create Web Service from GitHub repo
4. Set build & start commands
5. Add environment variables
6. Deploy!

---

## 🔐 Security

- ✅ OAuth 2.0 with Shopify
- ✅ Secure session storage in database
- ✅ Environment variables for secrets (no hardcoding)
- ✅ HTTPS only in production
- ✅ Webhook signature verification
- ✅ CORS configured for Shopify domains
- ✅ `.env` files excluded from version control

---

## 🐛 Troubleshooting

### Sync Button Not Working

```bash
# Check logs
npm run dev

# Verify endpoint is accessible
curl -X POST http://localhost:3000/api/sync

# Check database connection
npx prisma db execute --stdin < "SELECT 1"
```

### Database Connection Error

```bash
# Verify DATABASE_URL format
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin < "SELECT VERSION()"

# Run migrations
npm run setup
```

### App Won't Load in Shopify Admin

1. Verify app URL in `shopify.app.toml`
2. Check Shopify Partner Dashboard → App configuration
3. Ensure redirect URIs match exactly
4. Test tunnel URL is publicly accessible

---

## 📚 Documentation

- [Shopify App Development](https://shopify.dev/docs/apps)
- [Remix Framework](https://remix.run/docs)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Open a pull request

---

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SHOPIFY_API_KEY` | ✅ | API key from Shopify Partner Dashboard |
| `SHOPIFY_API_SECRET` | ✅ | API secret from Shopify Partner Dashboard |
| `SHOPIFY_APP_URL` | ✅ | Public URL of your deployed app |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `DIRECT_URL` | ✅ | PostgreSQL direct connection (for migrations) |
| `PORT` | ❌ | Server port (default: 3000) |
| `NODE_ENV` | ❌ | Environment: development, production |
| `ALLOWED_ORIGINS` | ❌ | CORS allowed origins |

---

## 📄 License

ISC - See [LICENSE](LICENSE) for details

---

## 👤 Author

Created as a Shopify app for diamond product management.

---

## 🎯 Next Steps

1. **Local Development**
   - Run `npm run dev`
   - Test features in dev store
   - Make code changes

2. **Prepare for Production**
   - Read [DEPLOYMENT.md](DEPLOYMENT.md)
   - Set up Render.com account
   - Configure environment variables

3. **Deploy**
   - Push to GitHub
   - Connect to Render
   - Configure Shopify app URLs
   - Test in production

4. **Monitor**
   - Check Render logs
   - Monitor database performance
   - Keep dependencies updated

---

**Created:** November 2025  
**Last Updated:** November 16, 2025  
**Status:** ✅ Production Ready
