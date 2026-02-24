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
import crypto from "crypto";

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



function verifyShopifyProxy(req, res, next) {
  const { signature, ...query } = req.query;

  const sorted = Object.keys(query)
    .sort()
    .map(key => `${key}=${Array.isArray(query[key]) ? query[key].join(',') : query[key]}`)
    .join('');

  const calculatedSignature = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(sorted)
    .digest('hex');

  if (calculatedSignature !== signature) {
    return res.status(403).send("Invalid proxy signature");
  }

  next();
}



// Static files for diamond filter UI (CORS applied)
app.use('/diamond-filter', express.static(path.join(process.cwd(), 'public')));
app.get('/apps/diamond-filter', verifyShopifyProxy, (req, res) => {
  
  res.set("Content-Type", "application/liquid");
  res.send(`
    <div>
     <div id="diamond-app"></div>

    <script>
      window.SHOP_DOMAIN = "${req.query.shop || ''}";
    </script>

    <script src="https://shopify-app-pndl.onrender.com/diamond-filter/script.js"></script>
    </div>
  `);
});

// 1. Detail Route (Move this to use the proxy path)
app.get('/apps/diamond-filter/diamond-detail', verifyShopifyProxy, (req, res) => {

  res.set("Content-Type", "application/liquid");

  res.send(`
    <div>
    <div id="diamond-app">
      <div id="diamond-detail-root"></div>
    </div>
    <link rel="stylesheet" href="https://shopify-app-pndl.onrender.com/diamond-filter/assets/css/diamond-detail.css">

    <script>
      window.STOCK_ID = "${req.query.Stock_id || ''}";
    </script>

    <script src="https://shopify-app-pndl.onrender.com/diamond-filter/assets/js/diamond-detail.js"></script>
    </div>
  `);
});

// Static build assets (CORS applied)
app.use('/build', express.static(path.join(process.cwd(), 'public', 'build')));

// Custom static assets (CORS applied)
app.use('/custom', express.static(path.join(process.cwd(), 'public', 'custom')));

app.use('/diamond-filter/assets', express.static(path.join(process.cwd(), 'public', 'assets'), {
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
app.get('/apps/diamond-filter/api/products', async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 25;
        const skip = (page - 1) * perPage;
        const take = perPage;

        const filterCriteria = {};
        
        const shapes = req.query.Shape ? decodeURIComponent(req.query.Shape).split(',') : [];
                // Add shape filter if present
        if (shapes.length > 0) {
            filterCriteria.Shape = { in: shapes };  // Use `in` to filter for multiple shapes
        }
        
  

        let priceMin = req.query.price_min ? parseFloat(req.query.price_min) : undefined;
        let priceMax = req.query.price_max ? parseFloat(req.query.price_max) : undefined;
         if (req.query.price) {
            const parts = decodeURIComponent(req.query.price).split(/[;,]/).map(p => parseFloat(p.trim())).filter(v => !isNaN(v));
            // if (parts[0]) priceMin = parts[0];
            // if (parts[1]) priceMax = parts[1];
            if (parts.length > 0) priceMin = parts[0];
            if (parts.length > 1) priceMax = parts[1];
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


        // Parsing the carat range from the URL
        let caratMin = req.query.carat_min ? parseFloat(req.query.carat_min) : undefined;
        let caratMax = req.query.carat_max ? parseFloat(req.query.carat_max) : undefined;
            if (req.query.carat) {
            // const parts = decodeURIComponent(req.query.carat).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            const parts = decodeURIComponent(req.query.carat)
      .split(/[;,]/)
      .map(p => parseFloat(p.trim()))
      .filter(v => !isNaN(v));
            // if (parts[0]) caratMin = parts[0];
            // if (parts[1]) caratMax = parts[1];

    if (parts.length > 0) caratMin = parts[0];
    if (parts.length > 1) caratMax = parts[1];
        }
             // Apply carat (weight) filter if present
        if (caratMin !== undefined && caratMax !== undefined) {
            filterCriteria.Weight = { gte: caratMin, lte: caratMax };
        } else if (caratMin !== undefined) {
            filterCriteria.Weight = { gte: caratMin };
        } else if (caratMax !== undefined) {
            filterCriteria.Weight = { lte: caratMax };
        }
        


        // Parsing the color range from the URL
        let colorMin = req.query.color_min ? req.query.color_min : undefined;
        let colorMax = req.query.color_max ? req.query.color_max : undefined;
        // Support shorthand `?color=MIN;MAX` or `?color=MIN,MAX` (semicolon or comma separated)
        if (req.query.color) {
            const parts = decodeURIComponent(req.query.color).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) colorMin = parts[0];
            if (parts[1]) colorMax = parts[1];
        }
                const COLOR_ORDER = ["D","E","F","G","H","I","J","K","L","M"];

        if (colorMin || colorMax) {
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

        // Parsing the color range from the URL
        let clarityMin = req.query.clarity_min ? req.query.clarity_min : undefined;
        let clarityMax = req.query.clarity_max ? req.query.clarity_max : undefined;
        if (req.query.clarity) {
            const parts = decodeURIComponent(req.query.clarity).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) clarityMin = parts[0];
            if (parts[1]) clarityMax = parts[1];
        }

         const CLARITY_ORDER = ["I3","I2","I1","SI2","SI1","VS2","VS1","VVS2","VVS1","IF","FL"];

        if (clarityMin || clarityMax) {
            const start = CLARITY_ORDER.indexOf(clarityMin);
            const end = CLARITY_ORDER.indexOf(clarityMax);
            if (start !== -1 && end !== -1) {
                const allowedClarities = CLARITY_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );
                filterCriteria.Clarity = {
                    in: allowedClarities
                };
            }
        }
        


        let cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : undefined;
        let cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : undefined;
        if (req.query.cut) {
            const parts = decodeURIComponent(req.query.cut).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) cutMin = parts[0];
            if (parts[1]) cutMax = parts[1];
        }   
                 // Apply cut (cut) filter if present
        const CUT_ORDER     = ["EX", "VG", "GD", "FR", "I"];
        
        if (cutMin || cutMax) {
            const start = CUT_ORDER.indexOf(cutMin);
            const end = CUT_ORDER.indexOf(cutMax); 
            if (start !== -1 && end !== -1) {
                const allowedCuts = CUT_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );
                filterCriteria.Cut_Grade = { 
                    in: allowedCuts
                };
            }
        }

        let polishMin = req.query.polish_min ? decodeURIComponent(req.query.polish_min) : undefined;
        let polishMax = req.query.polish_max ? decodeURIComponent(req.query.polish_max) : undefined;
        if (req.query.polish) {
            const parts = decodeURIComponent(req.query.polish).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) polishMin = parts[0];
            if (parts[1]) polishMax = parts[1];
        }   
                 // Apply polish filter if present
        const POLISH_ORDER     = ["EX", "VG", "GD", "FR", "I"];
        
        if (polishMin || polishMax) {
            const start = POLISH_ORDER.indexOf(polishMin);
            const end = POLISH_ORDER.indexOf(polishMax); 
            if (start !== -1 && end !== -1) {
                const allowedPolishes = POLISH_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );
                filterCriteria.Polish = { 
                    in: allowedPolishes
                };
            }
        }
        
         let fluorMin = req.query.fluor_min ? decodeURIComponent(req.query.fluor_min) : undefined;
        let fluorMax = req.query.fluor_max ? decodeURIComponent(req.query.fluor_max) : undefined;
        if (req.query.fluor) {
            const parts = decodeURIComponent(req.query.fluor).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) fluorMin = parts[0];
            if (parts[1]) fluorMax = parts[1];
        }   
                 // Apply fluor filter if present
        const FLUOR_ORDER     = ["EX", "VG", "GD", "FR", "I"];
        
        if (fluorMin || fluorMax) {
            const start = FLUOR_ORDER.indexOf(fluorMin);
            const end = FLUOR_ORDER.indexOf(fluorMax); 
            if (start !== -1 && end !== -1) {
                const allowedFluors = FLUOR_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );
                filterCriteria.Fluorescence = { 
                    in: allowedFluors
                };
            }
        }

         let symMin = req.query.sym_min ? decodeURIComponent(req.query.sym_min) : undefined;
        let symMax = req.query.sym_max ? decodeURIComponent(req.query.sym_max) : undefined;
        if (req.query.sym) {
            const parts = decodeURIComponent(req.query.sym).split(/[;,]/).map(p => p.trim()).filter(Boolean);
            if (parts[0]) symMin = parts[0];
            if (parts[1]) symMax = parts[1];
        }   
                 // Apply symmetry filter if present
        const SYM_ORDER     = ["EX", "VG", "GD", "FR", "I"];
        
        if (symMin || symMax) {
            const start = SYM_ORDER.indexOf(symMin);
            const end = SYM_ORDER.indexOf(symMax); 
            if (start !== -1 && end !== -1) {
                const allowedSymmetries = SYM_ORDER.slice(
                    Math.min(start, end),
                    Math.max(start, end) + 1
                );
                filterCriteria.Symmetry = { 
                    in: allowedSymmetries
                };
            }
        }
       
        // if (colorMin !== undefined && colorMax !== undefined) {
        //     filterCriteria.Color = { gte: colorMin, lte: colorMax };
        //     console.log('color filter applied', filterCriteria.Color);
        // } else if (colorMin !== undefined) {
        //     filterCriteria.Color = { gte: colorMin };
        // } else if (colorMax !== undefined) {
        //     filterCriteria.Color = { lte: colorMax };
        // }
        


        

        // if (clarityMin !== undefined && clarityMax !== undefined) {
        //     filterCriteria.Clarity = { gte: clarityMin, lte: clarityMax };
        // } else if (clarityMin !== undefined) {
        //     filterCriteria.Clarity = { gte: clarityMin };
        // } else if (clarityMax !== undefined) {
        //     filterCriteria.Clarity = { lte: clarityMax };
        // }



        //  if (cutMin !== undefined && cutMax !== undefined) {
        //     filterCriteria.Cut_Grade = { gte: cutMin, lte: cutMax };
        // } else if (cutMin !== undefined) {
        //     filterCriteria.Cut_Grade = { gte: cutMin };
        // } else if (cutMax !== undefined) {
        //     filterCriteria.Cut_Grade = { lte: cutMax };
        // }


        
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

app.get('/apps/diamond-filter/api/diamond-detail', async(req, res) => {
    try {
        const Stock_id = req.query.Stock_id;
                // Add shape filter if present
        if (!Stock_id) {
            return res.status(400).json({ message: 'Stock_id query parameter is required' });
        }

        const diamondData = await prisma.diamond.findFirst({
            where: { Stock_No: Stock_id },
        }); 

        if (!diamondData || diamondData.length === 0) {
            return res.status(404).json({ message: 'Diamond not found' });
        }

        res.json({ diamond: [diamondData] }); // Send products as JSON

    } catch (error) {
        
        console.error('Error fetching diamond details:', error);
        res.status(500).json({ message: 'Error fetching diamond details from the database' });
    }
});


// Endpoint to save color to style.css
app.get('/apps/diamond-filter/api/get-color', async (req, res) => {
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