import express from 'express';

// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
import cors from 'cors'; // Use ES6 import for consistency
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createRequestHandler } from "@remix-run/express";
import {  fileURLToPath, pathToFileURL } from 'url';
import "@shopify/shopify-app-remix/adapters/node";

dotenv.config();

const { PrismaClient } = pkg;
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000; // Port for your API server
app.use(bodyParser.json());


const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const rawAllowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://shopify-app-pndl.onrender.com,https://*.myshopify.com,http://192.168.1.136:3000')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Normalize allowed origins to full origins (lowercase, no trailing slash). Support literal host/URLs or wildcard patterns like `https://*.myshopify.com`.
const allowedOrigins = rawAllowed.map(o => {
  try {
    return new URL(o).origin.toLowerCase();
  } catch (e) {
    return o.replace(/\/$/, '').toLowerCase();
  }
});

// Also allow the app's own URL (if provided)
const selfOrigin = (process.env.SHOPIFY_APP_URL || '').replace(/\/$/, '').toLowerCase();
if (selfOrigin && !allowedOrigins.includes(selfOrigin)) {
  allowedOrigins.push(selfOrigin);
}

console.log('Allowed CORS origins:', allowedOrigins);

// Use the CORS middleware with the correct configuration
app.use(cors({
    origin: function (origin, callback) {
    // allow server-to-server, curl, postman
    if (!origin) return callback(null, true);

    let originNormalized;
    try {
      originNormalized = new URL(origin).origin.toLowerCase();
    } catch (e) {
      originNormalized = origin.replace(/\/$/, '').toLowerCase();
    }

    // Exact match
    if (allowedOrigins.includes(originNormalized)) {
      return callback(null, true);
    }

    // Wildcard match (supports * in the config)
    const wildcardMatch = allowedOrigins.some(a => a.includes('*') && new RegExp('^' + a.replace(/\*/g, '.*') + '$').test(originNormalized));
    if (wildcardMatch) {
      return callback(null, true);
    }

    // Don't throw here (causes a 500). Log and return false so CORS headers are simply not set.
    console.warn('CORS not allowed for origin:', origin);
    return callback(null, false);
  },
    methods: ['GET', 'POST', 'OPTIONS'], // Allow only specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as needed
    credentials: false   // If your app uses credentials (like cookies)
}));
app.options('*', cors());
// Middleware to parse JSON request body
app.use(express.json()); // This line should be active for JSON parsing



// Logging middleware to debug incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.get('origin')}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API server is running' });
});

// Static asset CORS middleware — run BEFORE express.static so files include CORS headers
const staticCorsMiddleware = (req, res, next) => {
    const origin = req.get('origin');

    if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') return res.sendStatus(204);
        return next();
    }

    let originNormalized;
    try {
        originNormalized = new URL(origin).origin.toLowerCase();
    } catch (e) {
        originNormalized = origin.replace(/\/$/, '').toLowerCase();
    }

    const isAllowed = allowedOrigins.includes(originNormalized) ||
        allowedOrigins.some(a => a.includes('*') && new RegExp('^' + a.replace(/\*/g, '.*') + '$').test(originNormalized));

    if (isAllowed) {
        res.setHeader('Access-Control-Allow-Origin', originNormalized);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } else {
        console.warn('CORS not allowed for origin (static):', origin);
    }

    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
};

// Static files for diamond filter UI (CORS applied)
app.use('/diamond-filter', staticCorsMiddleware, express.static(path.join(process.cwd(), 'public')));

// Static build assets (CORS applied)
app.use('/build', staticCorsMiddleware, express.static(path.join(process.cwd(), 'public', 'build')));

// Custom static assets (CORS applied)
app.use('/custom', staticCorsMiddleware, express.static(path.join(process.cwd(), 'public', 'custom')));

app.use('/diamond-filter/assets', staticCorsMiddleware, express.static(path.join(process.cwd(), 'public', 'assets'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
        }
    }
}));




// Endpoint to fetch products from the database
app.get('/api/products', async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 25;

        const shapes = req.query.Shape ? decodeURIComponent(req.query.Shape).split(',') : [];
        const priceMin = req.query.price_min ? parseFloat(req.query.price_min) : undefined;
        const priceMax = req.query.price_max ? parseFloat(req.query.price_max) : undefined;
        // Parsing the carat range from the URL
        const caratMin = req.query.carat_min ? parseFloat(req.query.carat_min) : undefined;
        const caratMax = req.query.carat_max ? parseFloat(req.query.carat_max) : undefined;
        // Parsing the color range from the URL
        let colorMin = req.query.color_min ? req.query.color_min : undefined;
        let colorMax = req.query.color_max ? req.query.color_max : undefined;
        // Support shorthand `?color=MIN;MAX` or `?color=MIN,MAX` (semicolon or comma separated)
        if (req.query.color) {
            const parts = decodeURIComponent(req.query.color).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) colorMin = parts[0];
            if (parts[1]) colorMax = parts[1];
        }
        console.log('colorMin:', colorMin);
        // Parsing the color range from the URL
        const clarityMin = req.query.clarity_min ? req.query.clarity_min : undefined;
        const clarityMax = req.query.clarity_max ? req.query.clarity_max : undefined;

        const cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : undefined;
        const cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : undefined;


        // Calculate the pagination range
        const skip = (page - 1) * perPage;
        const take = perPage;

        const filterCriteria = {};

        // Add shape filter if present
        if (shapes.length > 0) {
            filterCriteria.Shape = { in: shapes };  // Use `in` to filter for multiple shapes
        }
         // Filter by price range (if provided)
         if (priceMin !== undefined && priceMax !== undefined) {
            filterCriteria.Buy_Price = {
                gte: priceMin,
                lte: priceMax,
            };
        } else if (priceMin !== undefined) {
            filterCriteria.Buy_Price = {
                gte: priceMin,
            };
        } else if (priceMax !== undefined) {
            filterCriteria.Buy_Price = {
                lte: priceMax,
            };
        }

       // Apply carat (weight) filter if present
        if (caratMin !== undefined && caratMax !== undefined) {
            filterCriteria.Weight = { gte: caratMin, lte: caratMax };
        } else if (caratMin !== undefined) {
            filterCriteria.Weight = { gte: caratMin };
        } else if (caratMax !== undefined) {
            filterCriteria.Weight = { lte: caratMax };
        }
        
       
        // if (colorMin !== undefined && colorMax !== undefined) {
        //     filterCriteria.Color = { gte: colorMin, lte: colorMax };
        //     console.log('color filter applied', filterCriteria.Color);
        // } else if (colorMin !== undefined) {
        //     filterCriteria.Color = { gte: colorMin };
        // } else if (colorMax !== undefined) {
        //     filterCriteria.Color = { lte: colorMax };
        // }
        
        const COLOR_ORDER = ["D","E","F","G","H","I","J","K","L","M"];

        if (colorMin && colorMax) {
            const start = COLOR_ORDER.indexOf(colorMin);
            const end = COLOR_ORDER.indexOf(colorMax);

            if (start !== -1 && end !== -1) {
                const allowedColors = COLOR_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );

                filterCriteria.Color = {
                    in: allowedColors
                };
            }
        }

        if (clarityMin !== undefined && clarityMax !== undefined) {
            filterCriteria.Clarity = { gte: clarityMin, lte: clarityMax };
        } else if (clarityMin !== undefined) {
            filterCriteria.Clarity = { gte: clarityMin };
        } else if (clarityMax !== undefined) {
            filterCriteria.Clarity = { lte: clarityMax };
        }
         // Apply cut (cut) filter if present
        if (cutMin !== undefined && cutMax !== undefined) {
            filterCriteria.Cut_Grade = { gte: cutMin, lte: cutMax };
        } else if (cutMin !== undefined) {
            filterCriteria.Cut_Grade = { gte: cutMin };
        } else if (cutMax !== undefined) {
            filterCriteria.Cut_Grade = { lte: cutMax };
        }


        
        // console.log('filterCriteria', filterCriteria);
        const products = await prisma.diamond.findMany({
            where: filterCriteria,
            skip: skip,  
            take: take   
        }); 
         // Get the total number of products in the database for pagination metadata
         const totalCount = await prisma.diamond.count({
            where: filterCriteria
        });

        const totalPages = Math.ceil(totalCount / perPage);
         
        // console.log(products);
        res.json({
            products,
            pagination: {
                currentPage: page,
                perPage: perPage,
                totalPages: totalPages,
                totalCount: totalCount 

            }
        }); // Send products as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products from the database' });
    }
});


// Endpoint to save color to style.css
app.get('/api/get-color', async (req, res) => {
    try {
        const colorSetting = await prisma.colorsetting.findFirst({
            orderBy: { createdAt: 'desc' },  // Get the most recent color setting
        });

        if (colorSetting) {
            res.json({ color: colorSetting.color });
        } else {
            res.json({ color: '#ffffff' }); // Default color if none is set
        }
    } catch (error) {
        console.error('Error fetching color:', error);
        res.status(500).json({ error: 'Failed to fetch color' });
    }
});

// Endpoint to save the color selected by the admin
app.post('/api/save-color', async (req, res) => {
    const { color } = req.body;
    if (!color) {
        return res.status(400).json({ error: 'No color provided' });
    }

    try {
        // Save the color in the database
        await prisma.colorsetting.create({
            data: {
                color
            }
        });

        // Send a success response
        res.status(200).json({ message: 'Color saved successfully' });
    } catch (error) {
        console.error('Error saving color:', error);
        res.status(500).json({ error: 'Failed to save color' });
    }
});

// 🚨 BLOCK SHOPIFY CDN REQUESTS — MUST BE BEFORE REMIX
app.use('/cdn', (req, res) => {
    const shop = process.env.SHOPIFY_STORE_URL; // quickstart-fad8588b.myshopify.com
    return res.redirect(`https://${shop}${req.originalUrl}`);
});
// ===== REMIX ADMIN OR FALLBACK 404 =====
// Try to import the Remix server build and let it handle all other routes.
// const buildPath = path.join(process.cwd(), 'build', 'index.js');


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_PATH = path.join(process.cwd(), "build", "index.js");


if (fs.existsSync(BUILD_PATH)) {
    console.log('Remix build found at', BUILD_PATH, '- importing...');
    try {
        const build = await import(pathToFileURL(BUILD_PATH).href);
        console.log('Remix build imported successfully. Mounting request handler.');
        app.all('*', createRequestHandler({ build: build, mode: process.env.NODE_ENV }));
    } catch (err) {
        console.error('Failed to import Remix build:', err);
        app.all('*', (req, res) => {
            res.status(500).json({ message: 'Server error importing Remix build' });
        });
    }
} else {
    console.log('No Remix build found; serving API-only fallback.');
    app.all('*', (req, res) => {
        console.log(`→ Unhandled: ${req.method} ${req.path}`);
        res.status(404).json({ 
            message: 'Not Found - API Server Only',
            path: req.path,
            method: req.method,
            note: 'Admin UI not built. Run `npm run build` to generate the Remix build.',
            availableEndpoints: [
                'GET /health',
                'GET /api/products',
                'GET /api/get-color',
                'POST /api/save-color',
                'GET /diamond-filter',
            ]
        });
    });
}

// Start the API server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});